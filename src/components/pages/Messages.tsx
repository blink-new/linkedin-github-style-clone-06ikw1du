import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { ScrollArea } from '@/components/ui/scroll-area'
import { 
  Send, 
  Search, 
  MoreVertical, 
  Phone, 
  Video, 
  Info,
  Paperclip,
  Smile,
  Code,
  FileText
} from 'lucide-react'
import { blink } from '@/blink/client'

const Messages = () => {
  const [selectedChat, setSelectedChat] = useState<number | null>(1)
  const [newMessage, setNewMessage] = useState('')
  const [searchQuery, setSearchQuery] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const conversations = [
    {
      id: 1,
      name: 'Sarah Chen',
      title: 'Senior Frontend Developer at Vercel',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Thanks for sharing that React pattern!',
      timestamp: '2m ago',
      unread: 2,
      online: true
    },
    {
      id: 2,
      name: 'Marcus Rodriguez',
      title: 'DevOps Engineer at GitHub',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'The Kubernetes setup looks good',
      timestamp: '1h ago',
      unread: 0,
      online: true
    },
    {
      id: 3,
      name: 'Emily Watson',
      title: 'Full Stack Developer at Stripe',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Would love to collaborate on that project',
      timestamp: '3h ago',
      unread: 1,
      online: false
    },
    {
      id: 4,
      name: 'David Kim',
      title: 'ML Engineer at OpenAI',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      lastMessage: 'Check out this new model architecture',
      timestamp: '1d ago',
      unread: 0,
      online: false
    }
  ]

  const messages = useMemo(() => [
    {
      id: 1,
      senderId: 1,
      senderName: 'Sarah Chen',
      content: 'Hey! I saw your latest commit on the React performance optimization. Really clever approach with the memo usage!',
      timestamp: '10:30 AM',
      type: 'text'
    },
    {
      id: 2,
      senderId: 'me',
      senderName: 'You',
      content: 'Thanks! I\'ve been experimenting with different patterns. The key was identifying the expensive re-renders.',
      timestamp: '10:32 AM',
      type: 'text'
    },
    {
      id: 3,
      senderId: 1,
      senderName: 'Sarah Chen',
      content: 'Exactly! I\'ve been working on something similar. Mind if I share a code snippet?',
      timestamp: '10:33 AM',
      type: 'text'
    },
    {
      id: 4,
      senderId: 1,
      senderName: 'Sarah Chen',
      content: `const OptimizedComponent = memo(({ data, onUpdate }) => {
  const memoizedValue = useMemo(() => 
    expensiveCalculation(data), [data.id]
  );
  
  return <div>{memoizedValue}</div>;
});`,
      timestamp: '10:34 AM',
      type: 'code',
      language: 'javascript'
    },
    {
      id: 5,
      senderId: 'me',
      senderName: 'You',
      content: 'That\'s a great pattern! I like how you\'re memoizing based on data.id instead of the entire data object.',
      timestamp: '10:36 AM',
      type: 'text'
    },
    {
      id: 6,
      senderId: 1,
      senderName: 'Sarah Chen',
      content: 'Thanks for sharing that React pattern!',
      timestamp: '10:38 AM',
      type: 'text'
    }
  ], [])

  const selectedConversation = conversations.find(c => c.id === selectedChat)
  const filteredConversations = conversations.filter(conv =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    conv.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedChat) return

    // In a real app, this would send via Blink realtime
    // await blink.realtime.publish('messages', 'new_message', {
    //   content: newMessage,
    //   recipientId: selectedChat,
    //   timestamp: Date.now()
    // })

    setNewMessage('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(100vh-8rem)]">
        {/* Conversations List */}
        <Card className="lg:col-span-1">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Messages</CardTitle>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[calc(100vh-16rem)]">
              {filteredConversations.map((conversation) => (
                <div
                  key={conversation.id}
                  className={`p-4 cursor-pointer hover:bg-gray-50 border-l-4 transition-colors ${
                    selectedChat === conversation.id 
                      ? 'bg-blue-50 border-l-primary' 
                      : 'border-l-transparent'
                  }`}
                  onClick={() => setSelectedChat(conversation.id)}
                >
                  <div className="flex items-start space-x-3">
                    <div className="relative">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={conversation.avatar} alt={conversation.name} />
                        <AvatarFallback>
                          {conversation.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {conversation.online && (
                        <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 border-2 border-white rounded-full" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-sm truncate">{conversation.name}</h3>
                        <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                      </div>
                      <p className="text-xs text-gray-600 truncate mb-1">{conversation.title}</p>
                      <p className="text-sm text-gray-700 truncate">{conversation.lastMessage}</p>
                    </div>
                    {conversation.unread > 0 && (
                      <Badge className="bg-primary text-white text-xs min-w-[20px] h-5 flex items-center justify-center">
                        {conversation.unread}
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Chat Area */}
        <Card className="lg:col-span-2 flex flex-col">
          {selectedConversation ? (
            <>
              {/* Chat Header */}
              <CardHeader className="pb-4 border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={selectedConversation.avatar} alt={selectedConversation.name} />
                        <AvatarFallback>
                          {selectedConversation.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {selectedConversation.online && (
                        <div className="absolute -bottom-1 -right-1 h-3 w-3 bg-green-500 border-2 border-white rounded-full" />
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold">{selectedConversation.name}</h3>
                      <p className="text-sm text-gray-600">{selectedConversation.title}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button variant="ghost" size="sm">
                      <Phone className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Video className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Info className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 p-0">
                <ScrollArea className="h-[calc(100vh-20rem)] p-4">
                  <div className="space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.senderId === 'me' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[70%] ${message.senderId === 'me' ? 'order-2' : 'order-1'}`}>
                          {message.senderId !== 'me' && (
                            <div className="flex items-center space-x-2 mb-1">
                              <Avatar className="h-6 w-6">
                                <AvatarImage src={selectedConversation.avatar} alt={message.senderName} />
                                <AvatarFallback className="text-xs">
                                  {message.senderName.split(' ').map(n => n[0]).join('')}
                                </AvatarFallback>
                              </Avatar>
                              <span className="text-xs text-gray-600">{message.senderName}</span>
                            </div>
                          )}
                          <div
                            className={`rounded-lg p-3 ${
                              message.senderId === 'me'
                                ? 'bg-primary text-white'
                                : 'bg-gray-100 text-gray-900'
                            }`}
                          >
                            {message.type === 'code' ? (
                              <div className="space-y-2">
                                <div className="flex items-center space-x-2">
                                  <Code className="h-4 w-4" />
                                  <span className="text-xs font-medium">Code Snippet</span>
                                </div>
                                <pre className="bg-gray-900 text-green-400 p-3 rounded text-sm overflow-x-auto font-mono">
                                  <code>{message.content}</code>
                                </pre>
                              </div>
                            ) : (
                              <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                            )}
                          </div>
                          <div className={`text-xs text-gray-500 mt-1 ${
                            message.senderId === 'me' ? 'text-right' : 'text-left'
                          }`}>
                            {message.timestamp}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>
                </ScrollArea>
              </CardContent>

              {/* Message Input */}
              <div className="p-4 border-t">
                <div className="flex items-end space-x-2">
                  <Button variant="ghost" size="sm">
                    <Paperclip className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Code className="h-4 w-4" />
                  </Button>
                  <div className="flex-1">
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      onKeyPress={handleKeyPress}
                      className="resize-none"
                    />
                  </div>
                  <Button variant="ghost" size="sm">
                    <Smile className="h-4 w-4" />
                  </Button>
                  <Button 
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          ) : (
            <CardContent className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Select a conversation</h3>
                <p className="text-gray-600">Choose a conversation from the sidebar to start messaging</p>
              </div>
            </CardContent>
          )}
        </Card>
      </div>
    </div>
  )
}

export default Messages