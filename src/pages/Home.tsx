import { Calendar, Crown, Trophy, AlertCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import About from '../components/About'

const Home = () => {
  return (
    <div className="space-y-6">
      {/* Guild Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Guild Level</p>
              <p className="text-2xl font-bold text-white">50</p>
            </div>
            <Crown className="w-8 h-8 text-yellow-500" />
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">Total Members</p>
              <p className="text-2xl font-bold text-white">87</p>
            </div>
            <Trophy className="w-8 h-8 text-green-500" />
          </div>
        </div>
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-400 text-sm">WoE Wins</p>
              <p className="text-2xl font-bold text-white">23</p>
            </div>
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-gray-800 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Recent Activity</h2>
          <Link 
            to="/calendar" 
            className="text-red-400 hover:text-red-300 text-sm font-medium"
          >
            View Calendar →
          </Link>
        </div>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-white">WoE scheduled for Saturday 8 PM</p>
              <p className="text-gray-400 text-sm">Posted by GuildMaster - 2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Trophy className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-white">Player123 reached level 99!</p>
              <p className="text-gray-400 text-sm">5 hours ago</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-gray-400" />
            <div>
              <p className="text-white">New guild member: SwordMaster</p>
              <p className="text-gray-400 text-sm">1 day ago</p>
            </div>
          </div>
        </div>
      </div>

      {/* Announcements */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h2 className="text-xl font-bold text-white mb-4">Guild Announcements</h2>
        <div className="space-y-4">
          <div className="border-l-4 border-red-500 pl-4">
            <h3 className="text-white font-semibold">War of Emperium - This Saturday!</h3>
            <p className="text-gray-300 text-sm mt-1">
              Don't forget about our WoE this Saturday at 8 PM. Make sure to be online and ready!
              We'll be targeting Prontera Castle this time.
            </p>
            <p className="text-gray-400 text-xs mt-2">By GuildMaster - 1 day ago</p>
          </div>
          <div className="border-l-4 border-blue-500 pl-4">
            <h3 className="text-white font-semibold">New Guild Rules</h3>
            <p className="text-gray-300 text-sm mt-1">
              Please check the updated guild rules in the Wiki section. New attendance requirements
              and contribution guidelines are now in effect.
            </p>
            <p className="text-gray-400 text-xs mt-2">By Officer1 - 3 days ago</p>
          </div>
        </div>
      </div>

      {/* About Section */}
      <About />
    </div>
  )
}

export default Home
