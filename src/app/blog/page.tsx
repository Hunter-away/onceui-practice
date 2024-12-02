'use client'

import { useEffect, useState, useRef, useCallback } from 'react'
import { FileTree, type FileNode } from '@/components/FileTree'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import { TableOfContents } from '@/components/TableOfContents'
import { Flex } from '@/once-ui/components'
import matter from 'gray-matter'

async function getFileContent(path: string) {
  try {
    const response = await fetch(`/api/content?path=${encodeURIComponent(path)}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const data = await response.json()
    return data.content
  } catch (error) {
    console.error('Error fetching file content:', error)
    throw error
  }
}

async function getFileTree() {
  try {
    const response = await fetch('/api/file-tree')
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching file tree:', error)
    throw error
  }
}

export default function BlogPage() {
  const [selectedFile, setSelectedFile] = useState<string>('')
  const [fileContent, setFileContent] = useState<string>('')
  const [error, setError] = useState<string | null>(null)
  const [files, setFiles] = useState<FileNode[]>([])
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [toc, setToc] = useState<{ id: string; text: string; level: number }[]>([])
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    getFileTree().then(setFiles).catch(console.error)
  }, [])

  useEffect(() => {
    if (selectedFile) {
      setError(null)
      setToc([]) // Clear the TOC when loading a new file
      getFileContent(selectedFile)
        .then((content) => {
          const { content: markdownContent } = matter(content)
          setFileContent(markdownContent)
        })
        .catch((err) => {
          console.error('Error in useEffect:', err)
          setError('Failed to load file content. Please try again.')
          setFileContent('')
        })
    }
  }, [selectedFile])

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  const handleTOCItemClick = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const handleTocGenerated = useCallback((newToc: { id: string; text: string; level: number }[]) => {
    setToc(prevToc => {
      if (JSON.stringify(prevToc) !== JSON.stringify(newToc)) {
        return newToc
      }
      return prevToc
    })
  }, [])

  return (
    <>
    <div className={`flex min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <Flex fillWidth paddingBottom="xl" paddingX="l" paddingTop='m'
			direction="row" flex={1}>
        <Flex border="success-strong" borderStyle="solid-2" radius="m" padding="12">
          <div className="w-64 border-r border-gray-200 dark:border-gray-700 overflow-auto">
            <FileTree
              files={files}
              onSelectFile={setSelectedFile}
              selectedPath={selectedFile}
            />
          </div>
        </Flex>

        <Flex 
          width="m"
          justifyContent="center" paddingX="l"
          gap="m" alignItems="center">
           <div className="flex-1 overflow-auto p-6" ref={contentRef}>
        <button
          onClick={toggleTheme}
          className={`mb-4 px-4 py-2 rounded ${
            theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'
          }`}
        >
          Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
        </button>
        {error ? (
          <div className="text-red-500">{error}</div>
        ) : fileContent ? (
          <MarkdownRenderer 
            content={fileContent} 
            theme={theme} 
            onTocGenerated={handleTocGenerated}
          />
        ) : (
          <div className="text-gray-500 dark:text-gray-400">
            Select a file from the tree to view its content
          </div>
        )}
      </div>
        </Flex>

        <Flex>
          <div className="w-64 border-l border-gray-200 dark:border-gray-700 overflow-auto">
            <TableOfContents toc={toc} onItemClick={handleTOCItemClick} />
          </div>
        </Flex>
      </Flex>
    </div>
    </>
    // <div className={`flex min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
    //   <div className="w-64 border-r border-gray-200 dark:border-gray-700 overflow-auto">
    //     <FileTree
    //       files={files}
    //       onSelectFile={setSelectedFile}
    //       selectedPath={selectedFile}
    //     />
    //   </div>
    //   <div className="flex-1 overflow-auto p-6" ref={contentRef}>
    //     <button
    //       onClick={toggleTheme}
    //       className={`mb-4 px-4 py-2 rounded ${
    //         theme === 'dark' ? 'bg-gray-700 text-white' : 'bg-gray-200 text-black'
    //       }`}
    //     >
    //       Toggle {theme === 'light' ? 'Dark' : 'Light'} Mode
    //     </button>
    //     {error ? (
    //       <div className="text-red-500">{error}</div>
    //     ) : fileContent ? (
    //       <MarkdownRenderer 
    //         content={fileContent} 
    //         theme={theme} 
    //         onTocGenerated={handleTocGenerated}
    //       />
    //     ) : (
    //       <div className="text-gray-500 dark:text-gray-400">
    //         Select a file from the tree to view its content
    //       </div>
    //     )}
    //   </div>
    //   <div className="w-64 border-l border-gray-200 dark:border-gray-700 overflow-auto">
    //     <TableOfContents toc={toc} onItemClick={handleTOCItemClick} />
    //   </div>
    // </div>
  )
}

