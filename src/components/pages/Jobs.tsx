import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Search, 
  MapPin, 
  Building, 
  Clock, 
  DollarSign, 
  Users, 
  Bookmark,
  BookmarkCheck,
  ExternalLink,
  Code,
  Star,
  TrendingUp
} from 'lucide-react'

const Jobs = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [locationFilter, setLocationFilter] = useState('')
  const [experienceFilter, setExperienceFilter] = useState('')
  const [savedJobs, setSavedJobs] = useState<number[]>([])

  const jobListings = [
    {
      id: 1,
      title: 'Senior Frontend Developer',
      company: 'Vercel',
      location: 'San Francisco, CA',
      type: 'Full-time',
      remote: true,
      salary: '$140k - $180k',
      postedDate: '2 days ago',
      applicants: 47,
      logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop',
      description: 'Join our team building the future of web development. Work on Next.js, React, and cutting-edge frontend technologies.',
      requirements: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS'],
      techStack: ['React', 'TypeScript', 'Next.js', 'Vercel', 'Tailwind'],
      experience: 'Senior',
      featured: true
    },
    {
      id: 2,
      title: 'DevOps Engineer',
      company: 'GitHub',
      location: 'Remote',
      type: 'Full-time',
      remote: true,
      salary: '$130k - $170k',
      postedDate: '1 day ago',
      applicants: 23,
      logo: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=100&h=100&fit=crop',
      description: 'Scale GitHub\'s infrastructure to serve millions of developers worldwide. Work with Kubernetes, Docker, and cloud technologies.',
      requirements: ['Kubernetes', 'Docker', 'AWS', 'Terraform'],
      techStack: ['Kubernetes', 'Docker', 'AWS', 'Terraform', 'Go'],
      experience: 'Mid-level',
      featured: false
    },
    {
      id: 3,
      title: 'Full Stack Developer',
      company: 'Stripe',
      location: 'New York, NY',
      type: 'Full-time',
      remote: false,
      salary: '$120k - $160k',
      postedDate: '3 days ago',
      applicants: 89,
      logo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop',
      description: 'Build payment infrastructure that powers the internet economy. Work with Ruby, JavaScript, and distributed systems.',
      requirements: ['Ruby', 'JavaScript', 'PostgreSQL', 'Redis'],
      techStack: ['Ruby', 'Rails', 'JavaScript', 'PostgreSQL', 'Redis'],
      experience: 'Mid-level',
      featured: true
    },
    {
      id: 4,
      title: 'Machine Learning Engineer',
      company: 'OpenAI',
      location: 'San Francisco, CA',
      type: 'Full-time',
      remote: true,
      salary: '$180k - $250k',
      postedDate: '1 week ago',
      applicants: 156,
      logo: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=100&h=100&fit=crop',
      description: 'Research and develop cutting-edge AI models. Work on large language models, training infrastructure, and AI safety.',
      requirements: ['Python', 'PyTorch', 'TensorFlow', 'CUDA'],
      techStack: ['Python', 'PyTorch', 'TensorFlow', 'CUDA', 'Kubernetes'],
      experience: 'Senior',
      featured: true
    },
    {
      id: 5,
      title: 'Backend Developer',
      company: 'Shopify',
      location: 'Toronto, Canada',
      type: 'Full-time',
      remote: true,
      salary: '$100k - $140k',
      postedDate: '4 days ago',
      applicants: 67,
      logo: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=100&h=100&fit=crop',
      description: 'Build scalable e-commerce infrastructure serving millions of merchants. Work with Ruby, GraphQL, and microservices.',
      requirements: ['Ruby', 'GraphQL', 'PostgreSQL', 'Redis'],
      techStack: ['Ruby', 'Rails', 'GraphQL', 'PostgreSQL', 'Kafka'],
      experience: 'Mid-level',
      featured: false
    },
    {
      id: 6,
      title: 'Frontend Engineer',
      company: 'Figma',
      location: 'San Francisco, CA',
      type: 'Full-time',
      remote: true,
      salary: '$130k - $170k',
      postedDate: '5 days ago',
      applicants: 92,
      logo: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=100&h=100&fit=crop',
      description: 'Build the design tools used by millions of designers and developers. Work with React, WebGL, and real-time collaboration.',
      requirements: ['React', 'TypeScript', 'WebGL', 'Canvas API'],
      techStack: ['React', 'TypeScript', 'WebGL', 'Canvas', 'WebRTC'],
      experience: 'Mid-level',
      featured: false
    }
  ]

  const filteredJobs = jobListings.filter(job => {
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.techStack.some(tech => tech.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesLocation = !locationFilter || job.location.toLowerCase().includes(locationFilter.toLowerCase()) || job.remote
    const matchesExperience = !experienceFilter || experienceFilter === 'all' || job.experience === experienceFilter
    
    return matchesSearch && matchesLocation && matchesExperience
  })

  const toggleSaveJob = (jobId: number) => {
    setSavedJobs(prev => 
      prev.includes(jobId) 
        ? prev.filter(id => id !== jobId)
        : [...prev, jobId]
    )
  }

  const featuredJobs = filteredJobs.filter(job => job.featured)
  const regularJobs = filteredJobs.filter(job => !job.featured)

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Developer Jobs</h1>
          <p className="text-gray-600 mt-1">Find your next opportunity in tech</p>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-github" />
          <span className="text-sm text-gray-600">{filteredJobs.length} jobs available</span>
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search jobs, companies, or technologies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Location"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={experienceFilter} onValueChange={setExperienceFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Experience Level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Levels</SelectItem>
                <SelectItem value="Junior">Junior</SelectItem>
                <SelectItem value="Mid-level">Mid-level</SelectItem>
                <SelectItem value="Senior">Senior</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="w-full">
              More Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="all">All Jobs ({filteredJobs.length})</TabsTrigger>
          <TabsTrigger value="featured">Featured ({featuredJobs.length})</TabsTrigger>
          <TabsTrigger value="saved">Saved ({savedJobs.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-4">
          {/* Featured Jobs */}
          {featuredJobs.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-500" />
                Featured Jobs
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {featuredJobs.map((job) => (
                  <Card key={job.id} className="border-l-4 border-l-yellow-500 hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <img 
                            src={job.logo} 
                            alt={job.company}
                            className="w-16 h-16 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                                <div className="flex items-center space-x-4 text-gray-600 mt-1">
                                  <div className="flex items-center">
                                    <Building className="h-4 w-4 mr-1" />
                                    {job.company}
                                  </div>
                                  <div className="flex items-center">
                                    <MapPin className="h-4 w-4 mr-1" />
                                    {job.location}
                                    {job.remote && <Badge variant="secondary" className="ml-2">Remote</Badge>}
                                  </div>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleSaveJob(job.id)}
                                className="text-gray-500 hover:text-primary"
                              >
                                {savedJobs.includes(job.id) ? (
                                  <BookmarkCheck className="h-5 w-5" />
                                ) : (
                                  <Bookmark className="h-5 w-5" />
                                )}
                              </Button>
                            </div>
                            
                            <p className="text-gray-700 mt-3 line-clamp-2">{job.description}</p>
                            
                            <div className="flex flex-wrap gap-2 mt-3">
                              {job.techStack.map((tech) => (
                                <Badge key={tech} variant="outline" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                            
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <div className="flex items-center">
                                  <DollarSign className="h-4 w-4 mr-1" />
                                  {job.salary}
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  {job.postedDate}
                                </div>
                                <div className="flex items-center">
                                  <Users className="h-4 w-4 mr-1" />
                                  {job.applicants} applicants
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  <ExternalLink className="h-4 w-4 mr-2" />
                                  View Details
                                </Button>
                                <Button size="sm">
                                  Apply Now
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* Regular Jobs */}
          {regularJobs.length > 0 && (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">All Jobs</h2>
              <div className="grid grid-cols-1 gap-4">
                {regularJobs.map((job) => (
                  <Card key={job.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1">
                          <img 
                            src={job.logo} 
                            alt={job.company}
                            className="w-12 h-12 rounded-lg object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-start justify-between">
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                                <div className="flex items-center space-x-4 text-gray-600 mt-1">
                                  <div className="flex items-center">
                                    <Building className="h-4 w-4 mr-1" />
                                    {job.company}
                                  </div>
                                  <div className="flex items-center">
                                    <MapPin className="h-4 w-4 mr-1" />
                                    {job.location}
                                    {job.remote && <Badge variant="secondary" className="ml-2">Remote</Badge>}
                                  </div>
                                </div>
                              </div>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => toggleSaveJob(job.id)}
                                className="text-gray-500 hover:text-primary"
                              >
                                {savedJobs.includes(job.id) ? (
                                  <BookmarkCheck className="h-5 w-5" />
                                ) : (
                                  <Bookmark className="h-5 w-5" />
                                )}
                              </Button>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 mt-3">
                              {job.techStack.slice(0, 4).map((tech) => (
                                <Badge key={tech} variant="outline" className="text-xs">
                                  {tech}
                                </Badge>
                              ))}
                              {job.techStack.length > 4 && (
                                <Badge variant="outline" className="text-xs">
                                  +{job.techStack.length - 4} more
                                </Badge>
                              )}
                            </div>
                            
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <div className="flex items-center">
                                  <DollarSign className="h-4 w-4 mr-1" />
                                  {job.salary}
                                </div>
                                <div className="flex items-center">
                                  <Clock className="h-4 w-4 mr-1" />
                                  {job.postedDate}
                                </div>
                                <div className="flex items-center">
                                  <Users className="h-4 w-4 mr-1" />
                                  {job.applicants} applicants
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <Button variant="outline" size="sm">
                                  View Details
                                </Button>
                                <Button size="sm">
                                  Apply
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="featured" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {featuredJobs.map((job) => (
              <Card key={job.id} className="border-l-4 border-l-yellow-500">
                <CardContent className="p-6">
                  {/* Same content as featured jobs above */}
                  <div className="flex items-center space-x-4">
                    <img src={job.logo} alt={job.company} className="w-16 h-16 rounded-lg" />
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold">{job.title}</h3>
                      <p className="text-gray-600">{job.company} • {job.location}</p>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {job.techStack.map((tech) => (
                          <Badge key={tech} variant="outline" className="text-xs">{tech}</Badge>
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-lg">{job.salary}</p>
                      <p className="text-sm text-gray-600">{job.postedDate}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="saved" className="space-y-4">
          {savedJobs.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Bookmark className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No saved jobs yet</h3>
                <p className="text-gray-600">Save jobs you're interested in to view them here later.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {jobListings.filter(job => savedJobs.includes(job.id)).map((job) => (
                <Card key={job.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <img src={job.logo} alt={job.company} className="w-12 h-12 rounded-lg" />
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold">{job.title}</h3>
                        <p className="text-gray-600">{job.company} • {job.location}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => toggleSaveJob(job.id)}
                        className="text-primary"
                      >
                        <BookmarkCheck className="h-5 w-5" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Jobs