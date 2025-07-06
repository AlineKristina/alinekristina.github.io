import { Shield, Users, Swords, Heart } from 'lucide-react'

const About = () => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 space-y-6">
      <div className="text-center">
        <Shield className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">About Black Sheep Guild</h2>
        <p className="text-gray-300 max-w-2xl mx-auto">
          Welcome to the Black Sheep Guild management system! This comprehensive platform 
          helps guild members stay connected, share knowledge, and coordinate activities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="text-center">
          <Users className="w-12 h-12 text-blue-500 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-white mb-2">Community</h3>
          <p className="text-gray-300 text-sm">
            Connect with guild members through our forum and real-time chat system.
          </p>
        </div>

        <div className="text-center">
          <Swords className="w-12 h-12 text-green-500 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-white mb-2">Tools</h3>
          <p className="text-gray-300 text-sm">
            Access powerful Ragnarok Online calculators and planning tools.
          </p>
        </div>

        <div className="text-center">
          <Heart className="w-12 h-12 text-red-500 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-white mb-2">Support</h3>
          <p className="text-gray-300 text-sm">
            Get help from experienced players and contribute to our knowledge base.
          </p>
        </div>
      </div>

      <div className="border-t border-gray-700 pt-6">
        <h3 className="text-lg font-semibold text-white mb-4">Features</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h4 className="text-white font-medium">Communication</h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Guild Forum with categories</li>
              <li>• Real-time chat system</li>
              <li>• Announcements and updates</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="text-white font-medium">Tools & Resources</h4>
            <ul className="text-gray-300 text-sm space-y-1">
              <li>• Character stat calculator</li>
              <li>• Damage calculator</li>
              <li>• EXP calculator</li>
              <li>• Guild wiki system</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="text-center text-gray-400 text-sm">
        <p>Built with ❤️ for the Ragnarok Online community</p>
        <p>Version 1.0.0 | React + TypeScript + Tailwind CSS</p>
      </div>
    </div>
  )
}

export default About
