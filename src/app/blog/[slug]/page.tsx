import { getPostData, getSortedPostsData } from '@/lib/api'
import BlogPost from '@/components/BlogPost'

export async function generateStaticParams() {
  const posts = getSortedPostsData()
  return posts.map((post) => ({
    slug: post.slug,
  }))
}

export default async function Post({ params }: { params: { slug: string } }) {
  const post = await getPostData(params.slug)
  return <BlogPost post={post} />
}

