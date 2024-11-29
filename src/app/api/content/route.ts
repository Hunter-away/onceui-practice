import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const filePath = searchParams.get('path')

  if (!filePath) {
    return NextResponse.json({ error: 'No path provided' }, { status: 400 })
  }

  try {
    const fullPath = path.join(process.cwd(), filePath)
    const content = fs.readFileSync(fullPath, 'utf8')
    return NextResponse.json({ content })
  } catch (error) {
    console.error('Error reading file:', error)
    return NextResponse.json({ error: 'File not found' }, { status: 404 })
  }
}

