import { useState } from 'react'
import { Search, MessageCircle, Users, Briefcase, Home, Code, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import NotificationCenter from './NotificationCenter'

interface HeaderProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export function Header({ activeTab, onTabChange }: HeaderProps) {
  const [searchQuery, setSearchQuery] = useState('')

  const navItems = [
    { id: 'feed', icon: Home, label: 'Home' },
    { id: 'network', icon: Users, label: 'My Network' },
    { id: 'jobs', icon: Briefcase, label: 'Jobs' },
    { id: 'repositories', icon: Code, label: 'Repositories' },
    { id: 'messages', icon: MessageCircle, label: 'Messaging' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-primary">
                <span className="text-sm font-bold text-white">LG</span>
              </div>
              <span className="hidden font-semibold text-foreground sm:inline-block">
                LinkedGit
              </span>
            </div>
          </div>

          {/* Search */}
          <div className="flex flex-1 items-center justify-center px-4">
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search for people, repositories, jobs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={activeTab === item.id ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onTabChange(item.id)}
                className="flex flex-col items-center space-y-1 h-12 px-3"
              >
                <item.icon className="h-4 w-4" />
                <span className="text-xs">{item.label}</span>
              </Button>
            ))}
          </nav>

          {/* Right side actions */}
          <div className="flex items-center space-x-2">
            <NotificationCenter />
            
            <Button
              variant={activeTab === 'profile' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onTabChange('profile')}
              className="flex items-center space-x-2"
            >
              <Avatar className="h-6 w-6">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback>
                  <User className="h-3 w-3" />
                </AvatarFallback>
              </Avatar>
              <span className="hidden sm:inline text-xs">Me</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}