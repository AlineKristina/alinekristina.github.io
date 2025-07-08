import { Link, useLocation } from 'react-router-dom'
import { Home, MessageSquare, Users, BookOpen, Calculator, Calendar } from 'lucide-react'

const Navigation = () => {
  const location = useLocation()

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/forum', icon: MessageSquare, label: 'Forum' },
    { path: '/chat', icon: Users, label: 'Chat' },
    { path: '/wiki', icon: BookOpen, label: 'Wiki' },
    { path: '/calendar', icon: Calendar, label: 'Calendar' },
    { path: '/calculator', icon: Calculator, label: 'Calculator' },
  ]

  return (
    <nav className="bg-gray-800 border-b border-gray-700">
      <div className="container mx-auto px-4">
        <div className="flex space-x-8">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            const Icon = item.icon
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-2 px-3 py-4 text-sm font-medium transition-colors ${
                  isActive
                    ? 'text-red-400 border-b-2 border-red-400'
                    : 'text-gray-300 hover:text-white hover:bg-gray-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

export default Navigation
