import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Users, UserPlus, Search, MapPin, Building, Code, Star, GitFork } from 'lucide-react'

const Network = () => {
  const [searchQuery, setSearchQuery] = useState('')

  const connectionSuggestions = [
    {
      id: 1,
      name: 'Sarah Chen',
      title: 'Senior Frontend Developer',
      company: 'Vercel',
      location: 'San Francisco, CA',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      mutualConnections: 12,
      skills: ['React', 'TypeScript', 'Next.js'],
      githubStats: { repos: 45, stars: 1200, followers: 340 },
      reason: 'Works at companies you follow'
    },
    {
      id: 2,
      name: 'Marcus Rodriguez',
      title: 'DevOps Engineer',
      company: 'GitHub',
      location: 'Austin, TX',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      mutualConnections: 8,
      skills: ['Kubernetes', 'Docker', 'AWS'],
      githubStats: { repos: 32, stars: 890, followers: 220 },
      reason: 'Similar skills and interests'
    },
    {
      id: 3,
      name: 'Emily Watson',
      title: 'Full Stack Developer',
      company: 'Stripe',
      location: 'Remote',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      mutualConnections: 15,
      skills: ['Node.js', 'Python', 'PostgreSQL'],
      githubStats: { repos: 67, stars: 2100, followers: 450 },
      reason: 'Mutual connections'
    },
    {
      id: 4,
      name: 'David Kim',
      title: 'Machine Learning Engineer',
      company: 'OpenAI',
      location: 'Seattle, WA',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      mutualConnections: 6,
      skills: ['Python', 'TensorFlow', 'PyTorch'],
      githubStats: { repos: 28, stars: 3400, followers: 680 },
      reason: 'Works in AI/ML field'
    }
  ]

  const recentConnections = [
    {
      id: 1,
      name: 'Alex Thompson',
      title: 'Backend Developer',
      company: 'Shopify',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      connectedDate: '2 days ago'
    },
    {
      id: 2,
      name: 'Lisa Park',
      title: 'Product Manager',
      company: 'Figma',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
      connectedDate: '1 week ago'
    },
    {
      id: 3,
      name: 'James Wilson',
      title: 'UI/UX Designer',
      company: 'Adobe',
      avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=150&h=150&fit=crop&crop=face',
      connectedDate: '2 weeks ago'
    }
  ]

  const filteredSuggestions = connectionSuggestions.filter(person =>
    person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
    person.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Network</h1>
          <p className="text-gray-600 mt-1">Grow your professional developer network</p>
        </div>
        <div className="flex items-center gap-2">
          <Users className="h-5 w-5 text-primary" />
          <span className="text-sm text-gray-600">1,247 connections</span>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search developers by name, skills, or company..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>

      <Tabs defaultValue="suggestions" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="suggestions">Suggestions</TabsTrigger>
          <TabsTrigger value="recent">Recent</TabsTrigger>
          <TabsTrigger value="invitations">Invitations</TabsTrigger>
        </TabsList>

        <TabsContent value="suggestions" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredSuggestions.map((person) => (
              <Card key={person.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-16 w-16">
                        <AvatarImage src={person.avatar} alt={person.name} />
                        <AvatarFallback>{person.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-lg">{person.name}</h3>
                        <p className="text-gray-600">{person.title}</p>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Building className="h-3 w-3 mr-1" />
                          {person.company}
                          <MapPin className="h-3 w-3 ml-3 mr-1" />
                          {person.location}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* GitHub Stats */}
                  <div className="flex items-center justify-between text-sm bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center">
                        <Code className="h-4 w-4 mr-1 text-github" />
                        <span>{person.githubStats.repos} repos</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 text-yellow-500" />
                        <span>{person.githubStats.stars}</span>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1 text-gray-500" />
                        <span>{person.githubStats.followers}</span>
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2">
                    {person.skills.map((skill) => (
                      <Badge key={skill} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  {/* Connection Info */}
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-500">
                      {person.mutualConnections} mutual connections • {person.reason}
                    </span>
                  </div>

                  {/* Actions */}
                  <div className="flex space-x-2">
                    <Button className="flex-1">
                      <UserPlus className="h-4 w-4 mr-2" />
                      Connect
                    </Button>
                    <Button variant="outline" className="flex-1">
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {recentConnections.map((person) => (
              <Card key={person.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={person.avatar} alt={person.name} />
                      <AvatarFallback>{person.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="font-semibold">{person.name}</h3>
                      <p className="text-sm text-gray-600">{person.title}</p>
                      <p className="text-sm text-gray-500">{person.company}</p>
                      <p className="text-xs text-gray-400 mt-1">Connected {person.connectedDate}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="invitations" className="space-y-4">
          <Card>
            <CardContent className="p-8 text-center">
              <Users className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No pending invitations</h3>
              <p className="text-gray-600">When you receive connection requests, they'll appear here.</p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Network