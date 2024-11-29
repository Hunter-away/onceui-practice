import { motion } from 'framer-motion'
import { PostData } from '@/lib/api'
import { MarkdownRenderer } from '@/components/MarkdownRenderer'
import { Flex} from '@/once-ui/components';

interface BlogPostProps {
  post: PostData
}

export default function BlogPost({ post }: BlogPostProps) {
  return (
    <>
      <Flex fillWidth paddingBottom="xl" paddingX="l"
			direction="row" flex={1}>
        <Flex flex={1}> LEFT</Flex>

        <Flex 
          maxWidth="m"
          justifyContent="center" paddingX="l"
          gap="m" alignItems="center">
            <div
              // initial={{ opacity: 0, y: 20 }}
              // animate={{ opacity: 1, y: 0 }}
              // transition={{ duration: 0.5 }}
              className="prose lg:prose-xl"
            >
              <h1>{post.title}</h1>
              <p className="text-gray-600">{post.date}</p>
              <MarkdownRenderer content={post.content} />
            </div>
        </Flex>

        <Flex>Right MAY BE TABLE OF CONTENT</Flex>
      </Flex>
    </>
  )
}

