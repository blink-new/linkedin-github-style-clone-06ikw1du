import React, { useState, useEffect } from 'react'
import { 
  Search, 
  Filter, 
  MapPin, 
  Clock, 
  DollarSign, 
  Star, 
  Bookmark,
  TrendingUp,
  Brain,
  Target,
  Lightbulb,
  Video,
  Code
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { aiJobMatching, type JobMatch, type UserProfile, type JobListing } from '@/services/aiJobMatching'

export default function EnhancedJobs() {
  const [searchQuery, setSearchQuery] = useState('')
  const [jobMatches, setJobMatches] = useState<JobMatch[]>([])
  const [loading, setLoading] = useState(false)
  const [selectedMatch, setSelectedMatch] = useState<JobMatch | null>(null)
  const [jobSearchTips, setJobSearchTips] = useState<string[]>([])
  const [marketTrends, setMarketTrends] = useState<any>(null)

  // Mock user profile - in a real app, this would come from the authenticated user
  const userProfile: UserProfile = {
    id: 'user-1',
    name: 'John Developer',
    email: 'john@example.com',
    skills: ['React', 'TypeScript', 'Node.js', 'Python', 'AWS', 'Docker'],
    experience: 'Mid-level',
    location: 'San Francisco, CA',
    bio: 'Full-stack developer passionate about building scalable web applications',
    githubUsername: 'johndeveloper',
    preferredRoles: ['Full Stack Developer', 'Frontend Developer', 'Software Engineer'],
    salaryRange: { min: 120, max: 180 },
    workPreference: 'remote'
  }

  // Mock job listings
  const mockJobs: JobListing[] = [
    {
      id: 'job-1',
      title: 'Senior Full Stack Developer',
      company: 'TechCorp',
      location: 'San Francisco, CA',
      type: 'full-time',
      experience: 'Senior',
      salary: { min: 140, max: 200 },
      description: 'Join our team to build next-generation web applications using modern technologies.',
      requirements: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker', '5+ years experience'],
      techStack: ['React', 'Node.js', 'TypeScript', 'PostgreSQL', 'AWS', 'Docker'],
      benefits: ['Health Insurance', 'Stock Options', 'Remote Work', '401k'],
      remote: true,
      postedDate: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      companyLogo: 'https://images.unsplash.com/photo-1549923746-c502d488b3ea?w=100&h=100&fit=crop'
    },
    {
      id: 'job-2',
      title: 'React Frontend Developer',
      company: 'StartupXYZ',
      location: 'Remote',
      type: 'full-time',
      experience: 'Mid-level',
      salary: { min: 100, max: 140 },
      description: 'Build beautiful, responsive user interfaces for our SaaS platform.',
      requirements: ['React', 'TypeScript', 'CSS', 'Jest', '3+ years experience'],
      techStack: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js', 'Vercel'],
      benefits: ['Health Insurance', 'Flexible Hours', 'Learning Budget'],
      remote: true,
      postedDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      companyLogo: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=100&h=100&fit=crop'
    },
    {
      id: 'job-3',
      title: 'DevOps Engineer',
      company: 'CloudTech',
      location: 'New York, NY',
      type: 'full-time',
      experience: 'Mid-level',
      salary: { min: 130, max: 170 },
      description: 'Manage cloud infrastructure and deployment pipelines.',
      requirements: ['AWS', 'Docker', 'Kubernetes', 'Python', 'Terraform'],
      techStack: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Python', 'Jenkins'],
      benefits: ['Health Insurance', 'Stock Options', 'Relocation Assistance'],
      remote: false,
      postedDate: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      companyLogo: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=100&h=100&fit=crop'
    }
  ]

  const loadJobMatches = async () => {
    setLoading(true)
    try {
      const matches = await aiJobMatching.findMatchingJobs(userProfile, mockJobs)
      setJobMatches(matches)
    } catch (error) {
      console.error('Error loading job matches:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadJobSearchTips = async () => {
    try {
      const tips = await aiJobMatching.generateJobSearchTips(userProfile, jobMatches)
      setJobSearchTips(tips)
    } catch (error) {
      console.error('Error loading job search tips:', error)
    }
  }

  const loadMarketTrends = async () => {
    try {
      const trends = await aiJobMatching.analyzeJobMarketTrends(userProfile.skills)
      setMarketTrends(trends)
    } catch (error) {
      console.error('Error loading market trends:', error)
    }
  }

  useEffect(() => {
    loadJobMatches()
    loadJobSearchTips()
    loadMarketTrends()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const getMatchScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600'
    if (score >= 80) return 'text-blue-600'
    if (score >= 70) return 'text-yellow-600'
    return 'text-gray-600'
  }

  const formatSalary = (min: number, max: number) => {
    return `$${min}k - $${max}k`
  }

  const formatDate = (date: Date) => {
    const days = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24))
    if (days === 0) return 'Today'
    if (days === 1) return 'Yesterday'
    return `${days} days ago`
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-7xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold">AI-Powered Job Matching</h1>
          <p className="text-muted-foreground mt-1">
            Discover opportunities tailored to your skills and preferences
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={() => setSelectedMatch(null)}>
            <Code className="w-4 h-4 mr-2" />
            Code Editor
          </Button>
          <Button variant="outline">
            <Video className="w-4 h-4 mr-2" />
            Video Interview
          </Button>
        </div>
      </div>

      <Tabs defaultValue="matches" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="matches">Job Matches</TabsTrigger>
          <TabsTrigger value="insights">Market Insights</TabsTrigger>
          <TabsTrigger value="tips">Career Tips</TabsTrigger>
          <TabsTrigger value="profile">Profile Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="matches" className="space-y-6">
          {/* Search and Filters */}
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search jobs by title, company, or skills..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
          </div>

          {/* Job Matches */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Your Matches</h2>
              {loading ? (
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <Card key={i} className="animate-pulse">
                      <CardContent className="p-6">
                        <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                        <div className="h-3 bg-muted rounded w-1/2 mb-4"></div>
                        <div className="h-3 bg-muted rounded w-full"></div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="space-y-4">
                  {jobMatches.map((match) => (
                    <Card 
                      key={match.job.id} 
                      className={`cursor-pointer transition-all hover:shadow-md ${
                        selectedMatch?.job.id === match.job.id ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => setSelectedMatch(match)}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={match.job.companyLogo}
                              alt={match.job.company}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <h3 className="font-semibold text-lg">{match.job.title}</h3>
                              <p className="text-muted-foreground">{match.job.company}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`text-2xl font-bold ${getMatchScoreColor(match.matchScore)}`}>
                              {match.matchScore}%
                            </div>
                            <p className="text-xs text-muted-foreground">Match</p>
                          </div>
                        </div>

                        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center gap-1">
                            <MapPin className="w-4 h-4" />
                            {match.job.location}
                          </div>
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            {formatSalary(match.job.salary.min, match.job.salary.max)}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {formatDate(match.job.postedDate)}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {match.job.techStack.slice(0, 4).map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                          {match.job.techStack.length > 4 && (
                            <Badge variant="outline" className="text-xs">
                              +{match.job.techStack.length - 4} more
                            </Badge>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex gap-2">
                            {match.salaryMatch && (
                              <Badge variant="default" className="text-xs">
                                💰 Salary Match
                              </Badge>
                            )}
                            {match.locationMatch && (
                              <Badge variant="default" className="text-xs">
                                📍 Location Match
                              </Badge>
                            )}
                          </div>
                          <Button size="sm" variant="outline">
                            <Bookmark className="w-4 h-4 mr-1" />
                            Save
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>

            {/* Job Details */}
            <div className="lg:sticky lg:top-6">
              {selectedMatch ? (
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-xl">{selectedMatch.job.title}</CardTitle>
                        <p className="text-muted-foreground">{selectedMatch.job.company}</p>
                      </div>
                      <div className={`text-3xl font-bold ${getMatchScoreColor(selectedMatch.matchScore)}`}>
                        {selectedMatch.matchScore}%
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Match Analysis */}
                    <div>
                      <h4 className="font-semibold mb-3 flex items-center gap-2">
                        <Target className="w-4 h-4" />
                        Why This Matches
                      </h4>
                      <ul className="space-y-2">
                        {selectedMatch.matchReasons.map((reason, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                            {reason}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Missing Skills */}
                    {selectedMatch.missingSkills.length > 0 && (
                      <div>
                        <h4 className="font-semibold mb-3 flex items-center gap-2">
                          <Lightbulb className="w-4 h-4" />
                          Skills to Develop
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedMatch.missingSkills.map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Job Description */}
                    <div>
                      <h4 className="font-semibold mb-3">Job Description</h4>
                      <p className="text-sm text-muted-foreground">
                        {selectedMatch.job.description}
                      </p>
                    </div>

                    {/* Requirements */}
                    <div>
                      <h4 className="font-semibold mb-3">Requirements</h4>
                      <ul className="space-y-1">
                        {selectedMatch.job.requirements.map((req, index) => (
                          <li key={index} className="flex items-start gap-2 text-sm">
                            <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full mt-2 flex-shrink-0"></div>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Benefits */}
                    <div>
                      <h4 className="font-semibold mb-3">Benefits</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedMatch.job.benefits.map((benefit) => (
                          <Badge key={benefit} variant="secondary" className="text-xs">
                            {benefit}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button className="flex-1">Apply Now</Button>
                      <Button variant="outline">
                        <Video className="w-4 h-4 mr-2" />
                        Interview Prep
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardContent className="p-12 text-center">
                    <Target className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="font-semibold mb-2">Select a Job Match</h3>
                    <p className="text-muted-foreground text-sm">
                      Click on a job match to see detailed analysis and requirements
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          {marketTrends && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" />
                    Trending Skills
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {marketTrends.trendingSkills?.map((skill: string, index: number) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{skill}</span>
                        <Badge variant="secondary">Hot</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <DollarSign className="w-5 h-5" />
                    Salary Trends
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {marketTrends.salaryTrends?.map((trend: any, index: number) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="text-sm">{trend.skill}</span>
                        <div className="flex items-center gap-2">
                          <span className={`text-sm ${
                            trend.trend === 'up' ? 'text-green-600' : 
                            trend.trend === 'down' ? 'text-red-600' : 'text-gray-600'
                          }`}>
                            {trend.trend === 'up' ? '↗' : trend.trend === 'down' ? '↘' : '→'} {trend.percentage}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </TabsContent>

        <TabsContent value="tips" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="w-5 h-5" />
                Personalized Career Tips
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {jobSearchTips.map((tip, index) => (
                  <div key={index} className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
                    <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-semibold flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-sm">{tip}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="profile" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Strength Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Overall Profile Strength</span>
                  <span className="text-sm text-muted-foreground">85%</span>
                </div>
                <Progress value={85} className="h-2" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{userProfile.skills.length}</div>
                  <div className="text-sm text-muted-foreground">Skills Listed</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{jobMatches.length}</div>
                  <div className="text-sm text-muted-foreground">Job Matches</div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">
                    {jobMatches.length > 0 ? Math.round(jobMatches.reduce((acc, match) => acc + match.matchScore, 0) / jobMatches.length) : 0}%
                  </div>
                  <div className="text-sm text-muted-foreground">Avg Match Score</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}