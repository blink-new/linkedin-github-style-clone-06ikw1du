import { useState } from 'react'
import { Heart, MessageCircle, Share2, MoreHorizontal, Code, GitBranch, Star, GitCommit } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'

interface Post {
  id: string
  type: 'post' | 'github_activity'
  author: {
    name: string
    title: string
    avatar: string
    verified?: boolean
  }
  content: string
  timestamp: string
  likes: number
  comments: number
  shares: number
  githubData?: {
    repo: string
    action: string
    language: string
    stars: number
  }
}

const mockPosts: Post[] = [
  {
    id: '1',
    type: 'post',
    author: {
      name: 'Sarah Chen',
      title: 'Senior Frontend Developer at Vercel',
      avatar: '/placeholder-avatar.jpg',
      verified: true
    },
    content: 'Just shipped a new feature using React Server Components! The performance improvements are incredible. Here\'s what I learned about streaming and suspense boundaries...',
    timestamp: '2h',
    likes: 127,
    comments: 23,
    shares: 8
  },
  {
    id: '2',
    type: 'github_activity',
    author: {
      name: 'Alex Rodriguez',
      title: 'Full Stack Engineer at GitHub',
      avatar: '/placeholder-avatar.jpg'
    },
    content: 'Pushed 3 commits to react-dashboard',
    timestamp: '4h',
    likes: 45,
    comments: 7,
    shares: 2,
    githubData: {
      repo: 'alex/react-dashboard',
      action: 'pushed commits',
      language: 'TypeScript',
      stars: 234
    }
  },
  {
    id: '3',
    type: 'post',
    author: {
      name: 'Marcus Johnson',
      title: 'DevOps Engineer at AWS',
      avatar: '/placeholder-avatar.jpg'
    },
    content: 'Kubernetes vs Docker Swarm in 2024: After migrating 50+ microservices, here are my thoughts on orchestration platforms...',
    timestamp: '6h',
    likes: 89,
    comments: 15,
    shares: 12
  },
  {
    id: '4',
    type: 'github_activity',
    author: {
      name: 'Emma Wilson',
      title: 'Machine Learning Engineer at OpenAI',
      avatar: '/placeholder-avatar.jpg'
    },
    content: 'Created a new repository: ml-training-pipeline',
    timestamp: '8h',
    likes: 156,
    comments: 31,
    shares: 19,
    githubData: {
      repo: 'emma/ml-training-pipeline',
      action: 'created repository',
      language: 'Python',
      stars: 89
    }
  }
]

export function Feed() {
  const [posts] = useState<Post[]>(mockPosts)

  const handleLike = (postId: string) => {
    console.log('Liked post:', postId)
  }

  const handleComment = (postId: string) => {
    console.log('Comment on post:', postId)
  }

  const handleShare = (postId: string) => {
    console.log('Share post:', postId)
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-6">
      {/* Create Post */}
      <Card className="mb-6">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <Avatar>
              <AvatarFallback>You</AvatarFallback>
            </Avatar>
            <Button variant="outline" className="flex-1 justify-start text-muted-foreground">
              Start a post...
            </Button>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <div className="flex space-x-4">
              <Button variant="ghost" size="sm" className="text-primary">
                <Code className="mr-2 h-4 w-4" />
                Code
              </Button>
              <Button variant="ghost" size="sm" className="text-accent">
                <GitBranch className="mr-2 h-4 w-4" />
                Repository
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map((post) => (
          <Card key={post.id} className="overflow-hidden">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={post.author.avatar} />
                    <AvatarFallback>
                      {post.author.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-sm">{post.author.name}</h3>
                      {post.author.verified && (
                        <Badge variant="secondary" className="h-4 px-1 text-xs">
                          ✓
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground">{post.author.title}</p>
                    <p className="text-xs text-muted-foreground">{post.timestamp}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              {post.type === 'github_activity' && post.githubData && (
                <div className="mb-4 rounded-lg border bg-muted/50 p-3">
                  <div className="flex items-center space-x-2 mb-2">
                    <GitCommit className="h-4 w-4 text-accent" />
                    <span className="text-sm font-medium">{post.githubData.repo}</span>
                    <Badge variant="outline" className="text-xs">
                      {post.githubData.language}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3" />
                      <span>{post.githubData.stars}</span>
                    </div>
                    <span>{post.githubData.action}</span>
                  </div>
                </div>
              )}

              <p className="text-sm leading-relaxed">{post.content}</p>

              <Separator className="my-4" />

              <div className="flex items-center justify-between">
                <div className="flex space-x-6">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleLike(post.id)}
                    className="flex items-center space-x-2 text-muted-foreground hover:text-red-500"
                  >
                    <Heart className="h-4 w-4" />
                    <span className="text-xs">{post.likes}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleComment(post.id)}
                    className="flex items-center space-x-2 text-muted-foreground hover:text-primary"
                  >
                    <MessageCircle className="h-4 w-4" />
                    <span className="text-xs">{post.comments}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleShare(post.id)}
                    className="flex items-center space-x-2 text-muted-foreground hover:text-accent"
                  >
                    <Share2 className="h-4 w-4" />
                    <span className="text-xs">{post.shares}</span>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}