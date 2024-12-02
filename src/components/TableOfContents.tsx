'use client'

import React from 'react'
import { motion } from 'framer-motion'

interface TOCItem {
  id: string
  text: string
  level: number
}

interface TableOfContentsProps {
  toc: TOCItem[]
  onItemClick: (id: string) => void
}

export function TableOfContents({ toc, onItemClick }: TableOfContentsProps) {
  return (
    <nav className="w-64 p-4 overflow-auto">
      <h2 className="text-lg font-semibold mb-4">Table of Contents</h2>
      <motion.ul className="space-y-2">
        {toc.map((item) => (
          <motion.li
            key={item.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            style={{ marginLeft: `${(item.level - 1) * 16}px` }}
          >
            <a
              href={`#${item.id}`}
              className="text-blue-600 hover:underline dark:text-blue-400"
              onClick={(e) => {
                e.preventDefault()
                onItemClick(item.id)
              }}
            >
              {item.text}
            </a>
          </motion.li>
        ))}
      </motion.ul>
    </nav>
  )
}

