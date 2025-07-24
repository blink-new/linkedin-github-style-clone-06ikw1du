import { createClient } from '@blinkdotnew/sdk'

const blink = createClient({
  projectId: 'linkedin-github-style-clone-06ikw1du',
  authRequired: true
})

export interface GitHubUser {
  login: string
  id: number
  avatar_url: string
  name: string
  company: string
  blog: string
  location: string
  email: string
  bio: string
  public_repos: number
  public_gists: number
  followers: number
  following: number
  created_at: string
  updated_at: string
}

export interface GitHubRepo {
  id: number
  name: string
  full_name: string
  description: string
  html_url: string
  clone_url: string
  language: string
  stargazers_count: number
  watchers_count: number
  forks_count: number
  open_issues_count: number
  created_at: string
  updated_at: string
  pushed_at: string
  topics: string[]
  visibility: 'public' | 'private'
  default_branch: string
}

export interface GitHubCommit {
  sha: string
  commit: {
    author: {
      name: string
      email: string
      date: string
    }
    message: string
  }
  author: {
    login: string
    avatar_url: string
  }
  html_url: string
}

export interface ContributionDay {
  date: string
  count: number
  level: 0 | 1 | 2 | 3 | 4
}

class GitHubApiService {
  private baseUrl = 'https://api.github.com'

  // Get user profile
  async getUser(username: string): Promise<GitHubUser> {
    try {
      const response = await blink.data.fetch({
        url: `${this.baseUrl}/users/${username}`,
        method: 'GET',
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': 'token {{github_token}}' // Secret substitution
        }
      })

      if (response.status !== 200) {
        throw new Error(`GitHub API error: ${response.status}`)
      }

      return response.body as GitHubUser
    } catch (error) {
      console.error('Error fetching GitHub user:', error)
      throw error
    }
  }

  // Get user repositories
  async getUserRepos(username: string, page = 1, perPage = 30): Promise<GitHubRepo[]> {
    try {
      const response = await blink.data.fetch({
        url: `${this.baseUrl}/users/${username}/repos`,
        method: 'GET',
        query: {
          sort: 'updated',
          direction: 'desc',
          page: page.toString(),
          per_page: perPage.toString()
        },
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': 'token {{github_token}}'
        }
      })

      if (response.status !== 200) {
        throw new Error(`GitHub API error: ${response.status}`)
      }

      return response.body as GitHubRepo[]
    } catch (error) {
      console.error('Error fetching GitHub repos:', error)
      throw error
    }
  }

  // Get repository commits
  async getRepoCommits(owner: string, repo: string, page = 1): Promise<GitHubCommit[]> {
    try {
      const response = await blink.data.fetch({
        url: `${this.baseUrl}/repos/${owner}/${repo}/commits`,
        method: 'GET',
        query: {
          page: page.toString(),
          per_page: '10'
        },
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': 'token {{github_token}}'
        }
      })

      if (response.status !== 200) {
        throw new Error(`GitHub API error: ${response.status}`)
      }

      return response.body as GitHubCommit[]
    } catch (error) {
      console.error('Error fetching repo commits:', error)
      throw error
    }
  }

  // Search repositories
  async searchRepos(query: string, sort = 'stars', order = 'desc'): Promise<{ items: GitHubRepo[], total_count: number }> {
    try {
      const response = await blink.data.fetch({
        url: `${this.baseUrl}/search/repositories`,
        method: 'GET',
        query: {
          q: query,
          sort,
          order,
          per_page: '20'
        },
        headers: {
          'Accept': 'application/vnd.github.v3+json',
          'Authorization': 'token {{github_token}}'
        }
      })

      if (response.status !== 200) {
        throw new Error(`GitHub API error: ${response.status}`)
      }

      return response.body as { items: GitHubRepo[], total_count: number }
    } catch (error) {
      console.error('Error searching GitHub repos:', error)
      throw error
    }
  }

  // Get user's contribution activity (mock implementation)
  async getUserContributions(username: string): Promise<ContributionDay[]> {
    // Note: GitHub's contribution graph data is not available via public API
    // This is a mock implementation that generates realistic contribution data
    const contributions: ContributionDay[] = []
    const today = new Date()
    
    // Generate last 365 days of contribution data
    for (let i = 364; i >= 0; i--) {
      const date = new Date(today)
      date.setDate(date.getDate() - i)
      
      // Generate realistic contribution patterns
      const dayOfWeek = date.getDay()
      const isWeekend = dayOfWeek === 0 || dayOfWeek === 6
      
      let count = 0
      const random = Math.random()
      
      if (!isWeekend) {
        if (random < 0.3) count = 0
        else if (random < 0.6) count = Math.floor(Math.random() * 3) + 1
        else if (random < 0.85) count = Math.floor(Math.random() * 5) + 4
        else count = Math.floor(Math.random() * 10) + 9
      } else {
        if (random < 0.7) count = 0
        else count = Math.floor(Math.random() * 3) + 1
      }
      
      let level: 0 | 1 | 2 | 3 | 4 = 0
      if (count === 0) level = 0
      else if (count <= 2) level = 1
      else if (count <= 5) level = 2
      else if (count <= 8) level = 3
      else level = 4
      
      contributions.push({
        date: date.toISOString().split('T')[0],
        count,
        level
      })
    }
    
    return contributions
  }

  // Get trending repositories
  async getTrendingRepos(language?: string, since = 'daily'): Promise<GitHubRepo[]> {
    const query = language 
      ? `language:${language} created:>${this.getDateString(since)}`
      : `created:>${this.getDateString(since)}`
    
    try {
      const response = await this.searchRepos(query, 'stars', 'desc')
      return response.items.slice(0, 10)
    } catch (error) {
      console.error('Error fetching trending repos:', error)
      throw error
    }
  }

  private getDateString(since: string): string {
    const date = new Date()
    switch (since) {
      case 'daily':
        date.setDate(date.getDate() - 1)
        break
      case 'weekly':
        date.setDate(date.getDate() - 7)
        break
      case 'monthly':
        date.setMonth(date.getMonth() - 1)
        break
      default:
        date.setDate(date.getDate() - 1)
    }
    return date.toISOString().split('T')[0]
  }
}

export const githubApi = new GitHubApiService()