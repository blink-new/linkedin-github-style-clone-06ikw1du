import { useState, useEffect } from 'react'
import { Header } from '@/components/layout/Header'
import { Feed } from '@/components/pages/Feed'
import { Profile } from '@/components/pages/Profile'
import { Repositories } from '@/components/pages/Repositories'
import Network from '@/components/pages/Network'
import Messages from '@/components/pages/Messages'
import Jobs from '@/components/pages/Jobs'
import CodeEditor from '@/components/collaboration/CodeEditor'
import VideoCall from '@/components/video/VideoCall'
import { blink } from '@/blink/client'

function App() {
  const [activeTab, setActiveTab] = useState('feed')
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = blink.auth.onAuthStateChanged((state) => {
      setUser(state.user)
      setLoading(state.isLoading)
    })
    return unsubscribe
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading LinkedGit...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          <div className="flex items-center justify-center space-x-2 mb-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-white">LG</span>
            </div>
            <h1 className="text-2xl font-bold">LinkedGit</h1>
          </div>
          <h2 className="text-xl font-semibold mb-2">Welcome to LinkedGit</h2>
          <p className="text-muted-foreground mb-6">
            The professional network for developers. Connect, share code, and grow your career.
          </p>
          <button
            onClick={() => blink.auth.login()}
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md font-medium transition-colors"
          >
            Sign In to Continue
          </button>
        </div>
      </div>
    )
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'feed':
        return <Feed />
      case 'profile':
        return <Profile />
      case 'repositories':
        return <Repositories />
      case 'network':
        return <Network />
      case 'jobs':
        return <Jobs />
      case 'messages':
        return <Messages />
      case 'code-editor':
        return <CodeEditor />
      case 'video-call':
        return <VideoCall />
      default:
        return <Feed />
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <Header activeTab={activeTab} onTabChange={setActiveTab} />
      <main className="pb-6">
        {renderContent()}
      </main>
    </div>
  )
}

export default App