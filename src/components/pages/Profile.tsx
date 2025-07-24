import { MapPin, Link as LinkIcon, Calendar, Star, GitFork, Code, Users, Building } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'

const contributionData = [
  { day: 'Mon', contributions: 3 },
  { day: 'Tue', contributions: 7 },
  { day: 'Wed', contributions: 2 },
  { day: 'Thu', contributions: 12 },
  { day: 'Fri', contributions: 8 },
  { day: 'Sat', contributions: 1 },
  { day: 'Sun', contributions: 5 },
]

const topRepositories = [
  {
    name: 'react-dashboard',
    description: 'A modern React dashboard with TypeScript and Tailwind CSS',
    language: 'TypeScript',
    stars: 234,
    forks: 45,
    updated: '2 days ago'
  },
  {
    name: 'ml-training-pipeline',
    description: 'Scalable machine learning training pipeline using PyTorch',
    language: 'Python',
    stars: 189,
    forks: 32,
    updated: '1 week ago'
  },
  {
    name: 'api-gateway',
    description: 'Microservices API gateway built with Node.js and Express',
    language: 'JavaScript',
    stars: 156,
    forks: 28,
    updated: '3 days ago'
  }
]

const skills = [
  { name: 'React', level: 95 },
  { name: 'TypeScript', level: 90 },
  { name: 'Node.js', level: 85 },
  { name: 'Python', level: 80 },
  { name: 'AWS', level: 75 },
  { name: 'Docker', level: 70 }
]

export function Profile() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Profile Info */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile Card */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col items-center text-center">
                <Avatar className="h-24 w-24 mb-4">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback className="text-lg">JD</AvatarFallback>
                </Avatar>
                <h1 className="text-xl font-bold">John Developer</h1>
                <p className="text-muted-foreground mb-2">Senior Full Stack Engineer</p>
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <Building className="h-4 w-4 mr-1" />
                  <span>TechCorp Inc.</span>
                </div>
                <div className="flex items-center text-sm text-muted-foreground mb-4">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span>San Francisco, CA</span>
                </div>
                <Button className="w-full mb-2">Connect</Button>
                <Button variant="outline" className="w-full">Message</Button>
              </div>
              
              <Separator className="my-4" />
              
              <div className="space-y-2">
                <div className="flex items-center text-sm">
                  <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>1,234 connections</span>
                </div>
                <div className="flex items-center text-sm">
                  <LinkIcon className="h-4 w-4 mr-2 text-muted-foreground" />
                  <a href="#" className="text-primary hover:underline">github.com/johndeveloper</a>
                </div>
                <div className="flex items-center text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                  <span>Joined March 2020</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Skills Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Skills</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{skill.name}</span>
                    <span className="text-muted-foreground">{skill.level}%</span>
                  </div>
                  <Progress value={skill.level} className="h-2" />
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Activity & Repositories */}
        <div className="lg:col-span-2 space-y-6">
          {/* About */}
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed">
                Passionate full-stack developer with 8+ years of experience building scalable web applications. 
                Specialized in React, Node.js, and cloud architecture. Love contributing to open source and 
                mentoring junior developers. Currently working on AI-powered developer tools at TechCorp.
              </p>
            </CardContent>
          </Card>

          {/* GitHub Activity */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Code className="h-5 w-5 mr-2 text-accent" />
                GitHub Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-1 mb-4">
                {contributionData.map((day, index) => (
                  <div key={index} className="text-center">
                    <div className="text-xs text-muted-foreground mb-1">{day.day}</div>
                    <div 
                      className={`h-8 w-8 rounded-sm mx-auto ${
                        day.contributions > 10 ? 'bg-accent' :
                        day.contributions > 5 ? 'bg-accent/70' :
                        day.contributions > 0 ? 'bg-accent/40' : 'bg-muted'
                      }`}
                      title={`${day.contributions} contributions`}
                    />
                  </div>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                38 contributions in the last week
              </p>
            </CardContent>
          </Card>

          {/* Top Repositories */}
          <Card>
            <CardHeader>
              <CardTitle>Top Repositories</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {topRepositories.map((repo, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-semibold text-primary hover:underline cursor-pointer">
                      {repo.name}
                    </h3>
                    <Badge variant="outline" className="text-xs">
                      {repo.language}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">
                    {repo.description}
                  </p>
                  <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Star className="h-3 w-3" />
                      <span>{repo.stars}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <GitFork className="h-3 w-3" />
                      <span>{repo.forks}</span>
                    </div>
                    <span>Updated {repo.updated}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}