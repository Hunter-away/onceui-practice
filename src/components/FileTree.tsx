'use client'

import React from 'react'
import { FolderIcon, FileIcon, ChevronDownIcon, ChevronRightIcon } from 'lucide-react'
import { motion } from 'framer-motion'

interface FileTreeProps {
  files: FileNode[]
  onSelectFile: (path: string) => void
  selectedPath: string
}

export interface FileNode {
  name: string
  path: string
  type: 'file' | 'directory'
  children?: FileNode[]
}

export function FileTree({ files, onSelectFile, selectedPath }: FileTreeProps) {
  const [expandedFolders, setExpandedFolders] = React.useState<Set<string>>(new Set(['content']))

  const toggleFolder = (path: string) => {
    const newExpanded = new Set(expandedFolders)
    if (newExpanded.has(path)) {
      newExpanded.delete(path)
    } else {
      newExpanded.add(path)
    }
    setExpandedFolders(newExpanded)
  }

  const renderFileNode = (node: FileNode, depth: number = 0) => {
    const isExpanded = expandedFolders.has(node.path)
    const isSelected = selectedPath === node.path

    const indentationStyle = {
      paddingLeft: `${depth * 23}px`,
    }

    if (node.type === 'directory') {
      return (
        <motion.div
          key={node.path}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <div
            className="flex items-center py-1 px-2 hover:bg-blue-100 dark:hover:bg-blue-900 cursor-pointer transition-colors duration-200"
            onClick={() => toggleFolder(node.path)}
            style={indentationStyle}
          >
            {isExpanded ? (
              <ChevronDownIcon className="h-4 w-4 mr-1 flex-shrink-0" />
            ) : (
              <ChevronRightIcon className="h-4 w-4 mr-1 flex-shrink-0" />
            )}
            <FolderIcon className="h-4 w-4 mr-2 text-blue-500 flex-shrink-0" />
            <span className="truncate">{node.name}</span>
          </div>
          {isExpanded && node.children && (
            <div>
              {node.children.map((child) => renderFileNode(child, depth + 1))}
            </div>
          )}
        </motion.div>
      )
    }

    return (
      <motion.div
        key={node.path}
        className={`flex items-center py-1 px-2 cursor-pointer transition-colors duration-200 ${
          isSelected
            ? 'bg-blue-200 dark:bg-blue-800'
            : 'hover:bg-blue-100 dark:hover:bg-blue-900'
        }`}
        onClick={() => onSelectFile(node.path)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        style={indentationStyle}
      >
        <FileIcon className="h-4 w-4 mr-2 text-gray-500 flex-shrink-0" />
        <span className="truncate">{node.name}</span>
      </motion.div>
    )
  }

  return (
    <div className="p-4 border-r min-h-screen dark:bg-gray-800 dark:text-white overflow-auto">
      {files.map((file) => renderFileNode(file))}
    </div>
  )
}

