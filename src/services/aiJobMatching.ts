import { createClient } from '@blinkdotnew/sdk'

const blink = createClient({
  projectId: 'linkedin-github-style-clone-06ikw1du',
  authRequired: true
})

export interface UserProfile {
  id: string
  name: string
  email: string
  skills: string[]
  experience: string
  location: string
  bio: string
  githubUsername?: string
  preferredRoles: string[]
  salaryRange: {
    min: number
    max: number
  }
  workPreference: 'remote' | 'hybrid' | 'onsite' | 'any'
}

export interface JobListing {
  id: string
  title: string
  company: string
  location: string
  type: 'full-time' | 'part-time' | 'contract' | 'internship'
  experience: string
  salary: {
    min: number
    max: number
  }
  description: string
  requirements: string[]
  techStack: string[]
  benefits: string[]
  remote: boolean
  postedDate: Date
  companyLogo?: string
}

export interface JobMatch {
  job: JobListing
  matchScore: number
  matchReasons: string[]
  missingSkills: string[]
  salaryMatch: boolean
  locationMatch: boolean
  experienceMatch: boolean
}

class AIJobMatchingService {
  // Analyze user profile and generate skill recommendations
  async analyzeUserProfile(profile: UserProfile): Promise<{
    skillGaps: string[]
    careerSuggestions: string[]
    learningPath: string[]
  }> {
    try {
      const { object } = await blink.ai.generateObject({
        prompt: `Analyze this developer profile and provide career guidance:
        
        Profile:
        - Name: ${profile.name}
        - Skills: ${profile.skills.join(', ')}
        - Experience: ${profile.experience}
        - Preferred Roles: ${profile.preferredRoles.join(', ')}
        - Bio: ${profile.bio}
        
        Based on current tech industry trends and this profile, provide:
        1. Skill gaps that would improve their marketability
        2. Career progression suggestions
        3. Learning path recommendations
        
        Focus on practical, actionable advice for a ${profile.experience} developer.`,
        schema: {
          type: 'object',
          properties: {
            skillGaps: {
              type: 'array',
              items: { type: 'string' },
              description: 'Skills that would improve their marketability'
            },
            careerSuggestions: {
              type: 'array',
              items: { type: 'string' },
              description: 'Career progression suggestions'
            },
            learningPath: {
              type: 'array',
              items: { type: 'string' },
              description: 'Ordered learning recommendations'
            }
          },
          required: ['skillGaps', 'careerSuggestions', 'learningPath']
        }
      })

      return object
    } catch (error) {
      console.error('Error analyzing user profile:', error)
      throw error
    }
  }

  // Find matching jobs using AI
  async findMatchingJobs(profile: UserProfile, jobs: JobListing[]): Promise<JobMatch[]> {
    try {
      const { object } = await blink.ai.generateObject({
        prompt: `You are an expert technical recruiter. Analyze this developer profile and match it against the provided job listings.

        Developer Profile:
        - Skills: ${profile.skills.join(', ')}
        - Experience: ${profile.experience}
        - Location: ${profile.location}
        - Preferred Roles: ${profile.preferredRoles.join(', ')}
        - Salary Range: $${profile.salaryRange.min}k - $${profile.salaryRange.max}k
        - Work Preference: ${profile.workPreference}

        Job Listings:
        ${jobs.map(job => `
        Job ID: ${job.id}
        Title: ${job.title}
        Company: ${job.company}
        Location: ${job.location}
        Experience: ${job.experience}
        Salary: $${job.salary.min}k - $${job.salary.max}k
        Tech Stack: ${job.techStack.join(', ')}
        Requirements: ${job.requirements.join(', ')}
        Remote: ${job.remote}
        `).join('\n')}

        For each job, calculate:
        1. Match score (0-100) based on skills, experience, location, salary
        2. Specific reasons why it's a good match
        3. Missing skills that would improve the match
        4. Whether salary, location, and experience requirements align

        Only include jobs with match score >= 60.`,
        schema: {
          type: 'object',
          properties: {
            matches: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  jobId: { type: 'string' },
                  matchScore: { type: 'number' },
                  matchReasons: {
                    type: 'array',
                    items: { type: 'string' }
                  },
                  missingSkills: {
                    type: 'array',
                    items: { type: 'string' }
                  },
                  salaryMatch: { type: 'boolean' },
                  locationMatch: { type: 'boolean' },
                  experienceMatch: { type: 'boolean' }
                },
                required: ['jobId', 'matchScore', 'matchReasons', 'missingSkills', 'salaryMatch', 'locationMatch', 'experienceMatch']
              }
            }
          },
          required: ['matches']
        }
      })

      // Map AI results back to job objects
      const jobMatches: JobMatch[] = object.matches
        .map(match => {
          const job = jobs.find(j => j.id === match.jobId)
          if (!job) return null
          
          return {
            job,
            matchScore: match.matchScore,
            matchReasons: match.matchReasons,
            missingSkills: match.missingSkills,
            salaryMatch: match.salaryMatch,
            locationMatch: match.locationMatch,
            experienceMatch: match.experienceMatch
          }
        })
        .filter((match): match is JobMatch => match !== null)
        .sort((a, b) => b.matchScore - a.matchScore)

      return jobMatches
    } catch (error) {
      console.error('Error finding matching jobs:', error)
      throw error
    }
  }

  // Generate personalized job search tips
  async generateJobSearchTips(profile: UserProfile, recentMatches: JobMatch[]): Promise<string[]> {
    try {
      const { object } = await blink.ai.generateObject({
        prompt: `Based on this developer's profile and recent job matches, provide personalized job search tips:

        Profile:
        - Skills: ${profile.skills.join(', ')}
        - Experience: ${profile.experience}
        - Recent Match Scores: ${recentMatches.map(m => m.matchScore).join(', ')}
        - Common Missing Skills: ${[...new Set(recentMatches.flatMap(m => m.missingSkills))].join(', ')}

        Provide 5-7 specific, actionable job search tips tailored to this developer's situation.`,
        schema: {
          type: 'object',
          properties: {
            tips: {
              type: 'array',
              items: { type: 'string' },
              description: 'Personalized job search tips'
            }
          },
          required: ['tips']
        }
      })

      return object.tips
    } catch (error) {
      console.error('Error generating job search tips:', error)
      throw error
    }
  }

  // Analyze job market trends
  async analyzeJobMarketTrends(skills: string[]): Promise<{
    trendingSkills: string[]
    marketInsights: string[]
    salaryTrends: { skill: string; trend: 'up' | 'down' | 'stable'; percentage: number }[]
  }> {
    try {
      const { object } = await blink.ai.generateObject({
        prompt: `Analyze current job market trends for developers with these skills: ${skills.join(', ')}

        Provide:
        1. Currently trending skills that complement these existing skills
        2. Market insights about demand and opportunities
        3. Salary trends for related skills (up/down/stable with percentage change)

        Base your analysis on 2024 tech industry trends.`,
        schema: {
          type: 'object',
          properties: {
            trendingSkills: {
              type: 'array',
              items: { type: 'string' },
              description: 'Skills that are currently trending and complement existing skills'
            },
            marketInsights: {
              type: 'array',
              items: { type: 'string' },
              description: 'Key insights about the job market'
            },
            salaryTrends: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  skill: { type: 'string' },
                  trend: { type: 'string', enum: ['up', 'down', 'stable'] },
                  percentage: { type: 'number' }
                },
                required: ['skill', 'trend', 'percentage']
              }
            }
          },
          required: ['trendingSkills', 'marketInsights', 'salaryTrends']
        }
      })

      return object
    } catch (error) {
      console.error('Error analyzing job market trends:', error)
      throw error
    }
  }

  // Generate interview preparation based on job match
  async generateInterviewPrep(jobMatch: JobMatch, profile: UserProfile): Promise<{
    questions: string[]
    techTopics: string[]
    projectSuggestions: string[]
  }> {
    try {
      const { object } = await blink.ai.generateObject({
        prompt: `Generate interview preparation for this job match:

        Job: ${jobMatch.job.title} at ${jobMatch.job.company}
        Tech Stack: ${jobMatch.job.techStack.join(', ')}
        Requirements: ${jobMatch.job.requirements.join(', ')}
        
        Candidate Profile:
        - Skills: ${profile.skills.join(', ')}
        - Experience: ${profile.experience}
        - Missing Skills: ${jobMatch.missingSkills.join(', ')}

        Provide:
        1. Likely interview questions specific to this role
        2. Technical topics to review
        3. Project ideas to demonstrate relevant skills`,
        schema: {
          type: 'object',
          properties: {
            questions: {
              type: 'array',
              items: { type: 'string' },
              description: 'Likely interview questions'
            },
            techTopics: {
              type: 'array',
              items: { type: 'string' },
              description: 'Technical topics to review'
            },
            projectSuggestions: {
              type: 'array',
              items: { type: 'string' },
              description: 'Project ideas to demonstrate skills'
            }
          },
          required: ['questions', 'techTopics', 'projectSuggestions']
        }
      })

      return object
    } catch (error) {
      console.error('Error generating interview prep:', error)
      throw error
    }
  }
}

export const aiJobMatching = new AIJobMatchingService()