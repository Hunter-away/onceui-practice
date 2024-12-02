'use client'

import React, { useEffect, useRef } from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow, tomorrowNight } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import remarkGfm from 'remark-gfm'
// import 'github-markdown-css/github-markdown.css'

interface MarkdownRendererProps {
  content: string
  theme: 'light' | 'dark'
  onTocGenerated: (toc: { id: string; text: string; level: number }[]) => void
}

export function MarkdownRenderer({ content, theme, onTocGenerated }: MarkdownRendererProps) {
  const tocRef = useRef<{ id: string; text: string; level: number }[]>([])

  useEffect(() => {
    tocRef.current = []
    onTocGenerated([])
  }, [content])

  useEffect(() => {
    if (tocRef.current.length > 0) {
      onTocGenerated(tocRef.current)
    }
  })

  const addToToc = (text: string, level: number) => {
    const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')
    if (!tocRef.current.some(item => item.id === id)) {
      tocRef.current.push({ id, text, level })
    }
    return id
  }

  return (
    <div className={`markdown-body ${theme === 'dark' ? 'dark' : ''}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          code({ node, inline, className, children, ...props }) {
            const match = /language-(\w+)/.exec(className || '')
            return !inline && match ? (
              <SyntaxHighlighter
                style={theme === 'dark' ? tomorrowNight : tomorrow}
                language={match[1]}
                PreTag="div"
                {...props}
              >
                {String(children).replace(/\n$/, '')}
              </SyntaxHighlighter>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            )
          },
          h1: ({ children }) => {
            const text = children?.toString() ?? ''
            const id = addToToc(text, 1)
            return <h1 id={id}>{text}</h1>
          },
          h2: ({ children }) => {
            const text = children?.toString() ?? ''
            const id = addToToc(text, 2)
            return <h2 id={id}>{text}</h2>
          },
          h3: ({ children }) => {
            const text = children?.toString() ?? ''
            const id = addToToc(text, 3)
            return <h3 id={id}>{text}</h3>
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

