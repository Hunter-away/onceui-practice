'use client'

import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { tomorrow, tomorrowNight } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import remarkGfm from 'remark-gfm'
// import 'github-markdown-css/github-markdown.css'

interface MarkdownRendererProps {
  content: string
  theme: 'light' | 'dark'
}

export function MarkdownRenderer({ content, theme }: MarkdownRendererProps) {
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
          }
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  )
}

