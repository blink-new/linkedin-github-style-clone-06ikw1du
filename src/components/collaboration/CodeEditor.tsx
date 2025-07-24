import React, { useState, useEffect, useRef } from 'react'
import { Play, Save, Share2, Users, MessageSquare, Video, Settings } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { createClient } from '@blinkdotnew/sdk'

const blink = createClient({
  projectId: 'linkedin-github-style-clone-06ikw1du',
  authRequired: true
})

interface Collaborator {
  id: string
  name: string
  avatar: string
  cursor: { line: number; column: number }
  color: string
  isActive: boolean
}

interface CodeSession {
  id: string
  title: string
  language: string
  code: string
  collaborators: Collaborator[]
  isLive: boolean
}

export default function CodeEditor() {
  const [session, setSession] = useState<CodeSession>({
    id: 'session-1',
    title: 'React Component Refactoring',
    language: 'typescript',
    code: `import React, { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'

interface UserProfileProps {
  userId: string
  onUpdate?: (data: any) => void
}

export default function UserProfile({ userId, onUpdate }: UserProfileProps) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(false)

  useEffect(() => {
    // Fetch user data
    fetchUserData(userId)
      .then(setUser)
      .finally(() => setLoading(false))
  }, [userId])

  const handleSave = async (userData: any) => {
    try {
      await updateUser(userId, userData)
      setUser(userData)
      setEditing(false)
      onUpdate?.(userData)
    } catch (error) {
      console.error('Failed to update user:', error)
    }
  }

  if (loading) return <div>Loading...</div>

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">User Profile</h1>
        <Button 
          onClick={() => setEditing(!editing)}
          variant={editing ? "outline" : "default"}
        >
          {editing ? 'Cancel' : 'Edit'}
        </Button>
      </div>
      
      {/* Profile content would go here */}
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Name</label>
          <input 
            type="text" 
            value={user?.name || ''} 
            disabled={!editing}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input 
            type="email" 
            value={user?.email || ''} 
            disabled={!editing}
            className="w-full p-2 border rounded"
          />
        </div>
      </div>
      
      {editing && (
        <div className="mt-6 flex gap-2">
          <Button onClick={() => handleSave(user)}>
            Save Changes
          </Button>
          <Button variant="outline" onClick={() => setEditing(false)}>
            Cancel
          </Button>
        </div>
      )}
    </div>
  )
}`,
    collaborators: [
      {
        id: '1',
        name: 'Sarah Chen',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face',
        cursor: { line: 15, column: 20 },
        color: '#3b82f6',
        isActive: true
      },
      {
        id: '2',
        name: 'Alex Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
        cursor: { line: 25, column: 10 },
        color: '#10b981',
        isActive: true
      },
      {
        id: '3',
        name: 'Maria Garcia',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop&crop=face',
        cursor: { line: 0, column: 0 },
        color: '#f59e0b',
        isActive: false
      }
    ],
    isLive: true
  })

  const [chatMessages, setChatMessages] = useState([
    {
      id: '1',
      user: 'Sarah Chen',
      message: 'Should we extract the form logic into a custom hook?',
      timestamp: new Date(Date.now() - 2 * 60 * 1000),
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=40&h=40&fit=crop&crop=face'
    },
    {
      id: '2',
      user: 'Alex Rodriguez',
      message: 'Good idea! We could create a useUserProfile hook',
      timestamp: new Date(Date.now() - 1 * 60 * 1000),
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face'
    }
  ])

  const [newMessage, setNewMessage] = useState('')
  const [showChat, setShowChat] = useState(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleCodeChange = (value: string) => {
    setSession(prev => ({ ...prev, code: value }))
    // In a real app, this would sync with other collaborators via WebSocket
  }

  const sendMessage = () => {
    if (!newMessage.trim()) return
    
    const message = {
      id: Date.now().toString(),
      user: 'You',
      message: newMessage,
      timestamp: new Date(),
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop&crop=face'
    }
    
    setChatMessages(prev => [...prev, message])
    setNewMessage('')
  }

  const runCode = () => {
    // Mock code execution
    console.log('Running code:', session.code)
  }

  const saveSession = () => {
    // Mock save functionality
    console.log('Saving session:', session.id)
  }

  return (
    <div className="h-screen flex bg-background">
      {/* Main Editor */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b bg-card">
          <div className="flex items-center gap-3">
            <h2 className="font-semibold">{session.title}</h2>
            <Badge variant="secondary" className="text-xs">
              {session.language}
            </Badge>
            {session.isLive && (
              <Badge variant="destructive" className="text-xs animate-pulse">
                LIVE
              </Badge>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            {/* Collaborators */}
            <div className="flex items-center gap-1">
              {session.collaborators.map((collaborator) => (
                <TooltipProvider key={collaborator.id}>
                  <Tooltip>
                    <TooltipTrigger>
                      <Avatar className="w-8 h-8 border-2" style={{ borderColor: collaborator.color }}>
                        <AvatarImage src={collaborator.avatar} />
                        <AvatarFallback>{collaborator.name[0]}</AvatarFallback>
                      </Avatar>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{collaborator.name} {collaborator.isActive ? '(Active)' : '(Away)'}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              ))}
            </div>
            
            <div className="flex items-center gap-1 ml-4">
              <Button size="sm" variant="outline" onClick={runCode}>
                <Play className="w-4 h-4 mr-1" />
                Run
              </Button>
              <Button size="sm" variant="outline" onClick={saveSession}>
                <Save className="w-4 h-4 mr-1" />
                Save
              </Button>
              <Button size="sm" variant="outline">
                <Share2 className="w-4 h-4 mr-1" />
                Share
              </Button>
              <Button size="sm" variant="outline">
                <Video className="w-4 h-4 mr-1" />
                Call
              </Button>
              <Button 
                size="sm" 
                variant={showChat ? "default" : "outline"}
                onClick={() => setShowChat(!showChat)}
              >
                <MessageSquare className="w-4 h-4 mr-1" />
                Chat
              </Button>
            </div>
          </div>
        </div>

        {/* Code Editor */}
        <div className="flex-1 p-4">
          <Textarea
            ref={textareaRef}
            value={session.code}
            onChange={(e) => handleCodeChange(e.target.value)}
            className="w-full h-full font-mono text-sm resize-none border-0 focus-visible:ring-0"
            placeholder="Start coding..."
          />
        </div>
      </div>

      {/* Chat Sidebar */}
      {showChat && (
        <div className="w-80 border-l bg-card flex flex-col">
          <div className="p-4 border-b">
            <h3 className="font-semibold flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Session Chat
            </h3>
          </div>
          
          <div className="flex-1 p-4 overflow-y-auto space-y-4">
            {chatMessages.map((msg) => (
              <div key={msg.id} className="flex gap-3">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={msg.avatar} />
                  <AvatarFallback>{msg.user[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">{msg.user}</span>
                    <span className="text-xs text-muted-foreground">
                      {msg.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <p className="text-sm mt-1">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 min-h-0 h-10 resize-none"
                onKeyPress={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault()
                    sendMessage()
                  }
                }}
              />
              <Button size="sm" onClick={sendMessage}>
                Send
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}