import { Shield, Swords, Users } from 'lucide-react'
import { useUserTracking } from '../hooks/useUserTracking'

const Header = () => {
  const { activeUsers, isTracking } = useUserTracking();

  return (
    <header className="bg-gray-800 border-b border-gray-700 py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Shield className="w-8 h-8 text-red-500" />
            <div>
              <h1 className="text-2xl font-bold text-white">Black Sheep Guild</h1>
              <p className="text-gray-400 text-sm">Ragnarok Online Guild Management</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 text-gray-300">
              <Users className="w-5 h-5" />
              <span className="text-sm">
                {activeUsers} Member{activeUsers !== 1 ? 's' : ''} Online
                {!isTracking && (
                  <span className="text-gray-500 ml-1">(inactive)</span>
                )}
              </span>
            </div>
            <div className="flex items-center space-x-2 text-gray-300">
              <Swords className="w-5 h-5" />
              <span className="text-sm">Level 50</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
