import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

interface FileNode {
  name: string
  path: string
  type: 'file' | 'directory'
  children?: FileNode[]
}

function buildFileTree(dir: string): FileNode[] {
  const files = fs.readdirSync(dir)
  const tree: FileNode[] = []

  // 首先处理目录
  for (const file of files) {
    const filePath = path.join(dir, file)
    const stats = fs.statSync(filePath)
    const relativePath = path.relative(process.cwd(), filePath)

    if (stats.isDirectory()) {
      tree.push({
        name: file,
        path: relativePath,
        type: 'directory',
        children: buildFileTree(filePath)
      })
    }
  }

  // 然后处理文件
  for (const file of files) {
    const filePath = path.join(dir, file)
    const stats = fs.statSync(filePath)
    const relativePath = path.relative(process.cwd(), filePath)

    if (stats.isFile() && path.extname(file) === '.md') {
      tree.push({
        name: file.replace(/\.md$/, ''),
        path: relativePath,
        type: 'file'
      })
    }
  }

  // 对目录和文件分别按名称排序
  tree.sort((a, b) => {
    if (a.type === b.type) {
      return a.name.localeCompare(b.name)
    }
    return a.type === 'directory' ? -1 : 1
  })

  return tree
}

export async function GET() {
  const contentDir = path.join(process.cwd(), 'src/content')
  const fileTree = buildFileTree(contentDir)
  return NextResponse.json(fileTree)
}

