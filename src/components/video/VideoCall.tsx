import React, { useState, useRef, useEffect } from 'react'
import { 
  Video, 
  VideoOff, 
  Mic, 
  MicOff, 
  Phone, 
  PhoneOff, 
  Monitor, 
  Settings, 
  Users,
  MessageSquare,
  MoreVertical
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'

interface Participant {
  id: string
  name: string
  avatar: string
  isVideoOn: boolean
  isAudioOn: boolean
  isScreenSharing: boolean
  isHost: boolean
}

interface ChatMessage {
  id: string
  userId: string
  userName: string
  message: string
  timestamp: Date
}

export default function VideoCall() {
  const [isVideoOn, setIsVideoOn] = useState(true)
  const [isAudioOn, setIsAudioOn] = useState(true)
  const [isScreenSharing, setIsScreenSharing] = useState(false)
  const [showChat, setShowChat] = useState(false)
  const [showParticipants, setShowParticipants] = useState(false)
  const [chatMessage, setChatMessage] = useState('')
  
  const localVideoRef = useRef<HTMLVideoElement>(null)
  
  const [participants] = useState<Participant[]>([
    {
      id: '1',
      name: 'Sarah Chen',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face',
      isVideoOn: true,
      isAudioOn: true,
      isScreenSharing: false,
      isHost: true
    },
    {
      id: '2',
      name: 'Alex Rodriguez',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face',
      isVideoOn: false,
      isAudioOn: true,
      isScreenSharing: false,
      isHost: false
    },
    {
      id: '3',
      name: 'Maria Garcia',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face',
      isVideoOn: true,
      isAudioOn: false,
      isScreenSharing: true,
      isHost: false
    }
  ])

  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      userId: '1',
      userName: 'Sarah Chen',
      message: 'Thanks everyone for joining the code review session!',
      timestamp: new Date(Date.now() - 5 * 60 * 1000)
    },
    {
      id: '2',
      userId: '2',
      userName: 'Alex Rodriguez',
      message: 'Happy to help! The new authentication flow looks great.',
      timestamp: new Date(Date.now() - 3 * 60 * 1000)
    }
  ])

  useEffect(() => {
    const videoElement = localVideoRef.current
    
    // Initialize local video stream
    const initializeVideo = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: true, 
          audio: true 
        })
        if (videoElement) {
          videoElement.srcObject = stream
        }
      } catch (error) {
        console.error('Error accessing media devices:', error)
      }
    }

    initializeVideo()

    return () => {
      // Cleanup video stream
      if (videoElement?.srcObject) {
        const stream = videoElement.srcObject as MediaStream
        stream.getTracks().forEach(track => track.stop())
      }
    }
  }, [])

  const toggleVideo = () => {
    setIsVideoOn(!isVideoOn)
    // In a real app, this would control the actual video stream
  }

  const toggleAudio = () => {
    setIsAudioOn(!isAudioOn)
    // In a real app, this would control the actual audio stream
  }

  const toggleScreenShare = () => {
    setIsScreenSharing(!isScreenSharing)
    // In a real app, this would start/stop screen sharing
  }

  const endCall = () => {
    // In a real app, this would end the call and redirect
    console.log('Ending call...')
  }

  const sendMessage = () => {
    if (!chatMessage.trim()) return

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      userId: 'current-user',
      userName: 'You',
      message: chatMessage,
      timestamp: new Date()
    }

    setChatMessages(prev => [...prev, newMessage])
    setChatMessage('')
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <div className="h-screen bg-gray-900 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gray-800 text-white">
        <div className="flex items-center gap-3">
          <h2 className="font-semibold">Code Review Session</h2>
          <Badge variant="destructive" className="animate-pulse">
            LIVE
          </Badge>
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-300">
            {participants.length + 1} participants
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowParticipants(!showParticipants)}
            className="text-white hover:bg-gray-700"
          >
            <Users className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex">
        {/* Video Grid */}
        <div className="flex-1 p-4">
          <div className="grid grid-cols-2 gap-4 h-full">
            {/* Local Video */}
            <div className="relative bg-gray-800 rounded-lg overflow-hidden">
              {isVideoOn ? (
                <video
                  ref={localVideoRef}
                  autoPlay
                  muted
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center bg-gray-700">
                  <Avatar className="w-20 h-20">
                    <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" />
                    <AvatarFallback>You</AvatarFallback>
                  </Avatar>
                </div>
              )}
              <div className="absolute bottom-2 left-2 flex items-center gap-2">
                <Badge variant="secondary" className="text-xs">
                  You {isScreenSharing && '(Sharing)'}
                </Badge>
                {!isAudioOn && (
                  <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                    <MicOff className="w-3 h-3 text-white" />
                  </div>
                )}
              </div>
            </div>

            {/* Remote Participants */}
            {participants.slice(0, 3).map((participant) => (
              <div key={participant.id} className="relative bg-gray-800 rounded-lg overflow-hidden">
                {participant.isVideoOn ? (
                  <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={participant.avatar} />
                      <AvatarFallback>{participant.name[0]}</AvatarFallback>
                    </Avatar>
                  </div>
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-700">
                    <Avatar className="w-20 h-20">
                      <AvatarImage src={participant.avatar} />
                      <AvatarFallback>{participant.name[0]}</AvatarFallback>
                    </Avatar>
                  </div>
                )}
                <div className="absolute bottom-2 left-2 flex items-center gap-2">
                  <Badge variant="secondary" className="text-xs">
                    {participant.name} 
                    {participant.isHost && ' (Host)'}
                    {participant.isScreenSharing && ' (Sharing)'}
                  </Badge>
                  {!participant.isAudioOn && (
                    <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
                      <MicOff className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Sidebar */}
        {showChat && (
          <div className="w-80 bg-white border-l flex flex-col">
            <div className="p-4 border-b">
              <h3 className="font-semibold">Meeting Chat</h3>
            </div>
            
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className="flex gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarFallback>{msg.userName[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{msg.userName}</span>
                        <span className="text-xs text-muted-foreground">
                          {formatTime(msg.timestamp)}
                        </span>
                      </div>
                      <p className="text-sm mt-1">{msg.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Textarea
                  value={chatMessage}
                  onChange={(e) => setChatMessage(e.target.value)}
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

        {/* Participants Sidebar */}
        {showParticipants && (
          <div className="w-64 bg-white border-l">
            <div className="p-4 border-b">
              <h3 className="font-semibold">Participants ({participants.length + 1})</h3>
            </div>
            <div className="p-4 space-y-3">
              {/* Current User */}
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face" />
                  <AvatarFallback>You</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-medium text-sm">You</p>
                  <div className="flex items-center gap-1">
                    {isVideoOn ? (
                      <Video className="w-3 h-3 text-green-500" />
                    ) : (
                      <VideoOff className="w-3 h-3 text-red-500" />
                    )}
                    {isAudioOn ? (
                      <Mic className="w-3 h-3 text-green-500" />
                    ) : (
                      <MicOff className="w-3 h-3 text-red-500" />
                    )}
                  </div>
                </div>
              </div>

              {/* Other Participants */}
              {participants.map((participant) => (
                <div key={participant.id} className="flex items-center gap-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={participant.avatar} />
                    <AvatarFallback>{participant.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-medium text-sm">
                      {participant.name}
                      {participant.isHost && (
                        <Badge variant="secondary" className="ml-2 text-xs">
                          Host
                        </Badge>
                      )}
                    </p>
                    <div className="flex items-center gap-1">
                      {participant.isVideoOn ? (
                        <Video className="w-3 h-3 text-green-500" />
                      ) : (
                        <VideoOff className="w-3 h-3 text-red-500" />
                      )}
                      {participant.isAudioOn ? (
                        <Mic className="w-3 h-3 text-green-500" />
                      ) : (
                        <MicOff className="w-3 h-3 text-red-500" />
                      )}
                      {participant.isScreenSharing && (
                        <Monitor className="w-3 h-3 text-blue-500" />
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="p-4 bg-gray-800 flex items-center justify-center gap-4">
        <Button
          variant={isAudioOn ? "secondary" : "destructive"}
          size="lg"
          onClick={toggleAudio}
          className="rounded-full w-12 h-12"
        >
          {isAudioOn ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
        </Button>
        
        <Button
          variant={isVideoOn ? "secondary" : "destructive"}
          size="lg"
          onClick={toggleVideo}
          className="rounded-full w-12 h-12"
        >
          {isVideoOn ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
        </Button>
        
        <Button
          variant={isScreenSharing ? "default" : "secondary"}
          size="lg"
          onClick={toggleScreenShare}
          className="rounded-full w-12 h-12"
        >
          <Monitor className="w-5 h-5" />
        </Button>
        
        <Button
          variant={showChat ? "default" : "secondary"}
          size="lg"
          onClick={() => setShowChat(!showChat)}
          className="rounded-full w-12 h-12"
        >
          <MessageSquare className="w-5 h-5" />
        </Button>
        
        <Button
          variant="destructive"
          size="lg"
          onClick={endCall}
          className="rounded-full w-12 h-12"
        >
          <PhoneOff className="w-5 h-5" />
        </Button>
        
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="secondary" size="lg" className="rounded-full w-12 h-12">
              <MoreVertical className="w-5 h-5" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-48">
            <div className="space-y-2">
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </Button>
              <Button variant="ghost" size="sm" className="w-full justify-start">
                <Users className="w-4 h-4 mr-2" />
                Invite Others
              </Button>
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}