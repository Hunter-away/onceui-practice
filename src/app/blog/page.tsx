'use client'

import { useEffect, useState } from 'react'
import { FileTree, type FileNode } from '@/components/FileTree'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import matter from 'gray-matter'
import { style } from '@/once-ui/resources/config'

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

  useEffect(() => {
    getFileTree().then(setFiles).catch(console.error)
  }, [])

  useEffect(() => {
    if (selectedFile) {
      setError(null)
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
    // setTheme(theme === 'light' ? 'dark' : 'light')
    style.theme = 'light'
  }

  return (
    <div className={`flex min-h-screen ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className="w-64 border-r border-gray-200 dark:border-gray-700 overflow-auto">
        <FileTree
          files={files}
          onSelectFile={setSelectedFile}
          selectedPath={selectedFile}
        />
      </div>
      <div className="flex-1 overflow-auto p-6">
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
          <MarkdownRenderer content={fileContent} theme={theme} />
        ) : (
          <div className="text-gray-500 dark:text-gray-400">
            Select a file from the tree to view its content
          </div>
        )}
      </div>
    </div>
  )
}

