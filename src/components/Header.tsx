import { Shield, Swords, Users } from 'lucide-react'
import { useUserTracking } from '../hooks/useUserTracking'

const Header = () => {
  const { activeUsers, isTracking } = useUserTracking();

  return (
    <header className="bg-void-gradient border-b border-sabbath-steel py-6 shadow-2xl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Shield className="w-10 h-10 text-sabbath-crimson animate-glow" />
            <div>
              <h1 className="text-3xl font-metal font-bold metal-text animate-glow">
                BlackSheeps Guild
              </h1>
              <p className="text-sabbath-silver text-sm font-metal tracking-wider">
                Ragnarok Online • Masters of Darkness
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-3 text-sabbath-chrome bg-steel-gradient px-4 py-2 rounded-lg border border-sabbath-iron shadow-lg">
              <Users className="w-5 h-5 text-sabbath-violet" />
              <span className="text-sm font-metal font-semibold">
                {activeUsers} Soul{activeUsers !== 1 ? 's' : ''} Online
                {!isTracking && (
                  <span className="text-sabbath-iron ml-2">(dormant)</span>
                )}
              </span>
            </div>
            <div className="flex items-center space-x-3 text-sabbath-chrome bg-steel-gradient px-4 py-2 rounded-lg border border-sabbath-iron shadow-lg">
              <Swords className="w-5 h-5 text-sabbath-crimson" />
              <span className="text-sm font-metal font-semibold">Darkness Level 50</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
