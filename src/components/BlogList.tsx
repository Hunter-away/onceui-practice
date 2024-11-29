import Link from 'next/link'
import { motion } from 'framer-motion'
import { PostData } from '@/lib/api'

interface BlogListProps {
  posts: PostData[]
}

export default function BlogList({ posts }: BlogListProps) {
  return (
    <div
      className="space-y-4"
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      // transition={{ duration: 0.5 }}
    >
      {posts.map((post) => (
        <div
          key={post.slug}
          // whileHover={{ scale: 1.03 }}
          // whileTap={{ scale: 0.98 }}
        >
          <Link href={`/blog/${post.slug}`} className="block p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow">
            <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
            <p className="text-gray-600">{post.date}</p>
          </Link>
        </div>
      ))}
    </div>
  )
}

