import { useState } from 'react'
import { Search, Star, GitFork, Code, Calendar, Filter, Plus } from 'lucide-react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

interface Repository {
  id: string
  name: string
  description: string
  language: string
  stars: number
  forks: number
  isPrivate: boolean
  lastUpdated: string
  topics: string[]
}

const mockRepositories: Repository[] = [
  {
    id: '1',
    name: 'react-dashboard',
    description: 'A modern React dashboard with TypeScript and Tailwind CSS. Features include real-time analytics, user management, and responsive design.',
    language: 'TypeScript',
    stars: 234,
    forks: 45,
    isPrivate: false,
    lastUpdated: '2 days ago',
    topics: ['react', 'typescript', 'dashboard', 'tailwindcss']
  },
  {
    id: '2',
    name: 'ml-training-pipeline',
    description: 'Scalable machine learning training pipeline using PyTorch and MLflow for experiment tracking.',
    language: 'Python',
    stars: 189,
    forks: 32,
    isPrivate: false,
    lastUpdated: '1 week ago',
    topics: ['machine-learning', 'pytorch', 'mlops', 'python']
  },
  {
    id: '3',
    name: 'api-gateway',
    description: 'Microservices API gateway built with Node.js, Express, and Redis for caching.',
    language: 'JavaScript',
    stars: 156,
    forks: 28,
    isPrivate: false,
    lastUpdated: '3 days ago',
    topics: ['nodejs', 'microservices', 'api', 'redis']
  },
  {
    id: '4',
    name: 'private-config',
    description: 'Private configuration and deployment scripts for production environments.',
    language: 'Shell',
    stars: 0,
    forks: 0,
    isPrivate: true,
    lastUpdated: '5 days ago',
    topics: ['devops', 'configuration', 'deployment']
  },
  {
    id: '5',
    name: 'data-visualization',
    description: 'Interactive data visualization library built with D3.js and React.',
    language: 'JavaScript',
    stars: 98,
    forks: 15,
    isPrivate: false,
    lastUpdated: '1 month ago',
    topics: ['d3js', 'visualization', 'react', 'charts']
  },
  {
    id: '6',
    name: 'blockchain-wallet',
    description: 'Secure cryptocurrency wallet with multi-chain support and hardware wallet integration.',
    language: 'Rust',
    stars: 312,
    forks: 67,
    isPrivate: false,
    lastUpdated: '4 days ago',
    topics: ['blockchain', 'cryptocurrency', 'rust', 'security']
  }
]

const languageColors: Record<string, string> = {
  TypeScript: 'bg-blue-500',
  JavaScript: 'bg-yellow-500',
  Python: 'bg-green-500',
  Rust: 'bg-orange-500',
  Shell: 'bg-gray-500'
}

export function Repositories() {
  const [repositories] = useState<Repository[]>(mockRepositories)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('updated')
  const [filterBy, setFilterBy] = useState('all')

  const filteredRepositories = repositories.filter(repo => {
    const matchesSearch = repo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         repo.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    if (filterBy === 'public') return matchesSearch && !repo.isPrivate
    if (filterBy === 'private') return matchesSearch && repo.isPrivate
    return matchesSearch
  })

  return (
    <div className="container mx-auto max-w-6xl px-4 py-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold mb-2">Repositories</h1>
          <p className="text-muted-foreground">
            {repositories.length} repositories • {repositories.filter(r => !r.isPrivate).length} public • {repositories.filter(r => r.isPrivate).length} private
          </p>
        </div>
        <Button className="mt-4 sm:mt-0">
          <Plus className="h-4 w-4 mr-2" />
          New Repository
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Find a repository..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <div className="flex gap-2">
          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="w-32">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="public">Public</SelectItem>
              <SelectItem value="private">Private</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="updated">Recently updated</SelectItem>
              <SelectItem value="name">Name</SelectItem>
              <SelectItem value="stars">Most stars</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Repository List */}
      <div className="space-y-4">
        {filteredRepositories.map((repo) => (
          <Card key={repo.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-3">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="text-lg font-semibold text-primary hover:underline cursor-pointer">
                      {repo.name}
                    </h3>
                    <Badge variant={repo.isPrivate ? 'secondary' : 'outline'} className="text-xs">
                      {repo.isPrivate ? 'Private' : 'Public'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                    {repo.description}
                  </p>
                  
                  {/* Topics */}
                  {repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {repo.topics.map((topic) => (
                        <Badge key={topic} variant="secondary" className="text-xs px-2 py-1">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                <Button variant="outline" size="sm">
                  <Star className="h-4 w-4 mr-1" />
                  Star
                </Button>
              </div>
            </CardHeader>
            
            <CardContent className="pt-0">
              <div className="flex items-center space-x-6 text-sm text-muted-foreground">
                <div className="flex items-center space-x-1">
                  <div className={`h-3 w-3 rounded-full ${languageColors[repo.language] || 'bg-gray-500'}`} />
                  <span>{repo.language}</span>
                </div>
                
                {repo.stars > 0 && (
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3" />
                    <span>{repo.stars}</span>
                  </div>
                )}
                
                {repo.forks > 0 && (
                  <div className="flex items-center space-x-1">
                    <GitFork className="h-3 w-3" />
                    <span>{repo.forks}</span>
                  </div>
                )}
                
                <div className="flex items-center space-x-1">
                  <Calendar className="h-3 w-3" />
                  <span>Updated {repo.lastUpdated}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredRepositories.length === 0 && (
        <div className="text-center py-12">
          <Code className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">No repositories found</h3>
          <p className="text-muted-foreground">
            {searchQuery ? 'Try adjusting your search terms.' : 'Create your first repository to get started.'}
          </p>
        </div>
      )}
    </div>
  )
}