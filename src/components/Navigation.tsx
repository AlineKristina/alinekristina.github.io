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
    <nav className="bg-metal-gradient border-b border-sabbath-steel shadow-xl">
      <div className="container mx-auto px-4">
        <div className="flex space-x-2">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path
            const Icon = item.icon
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 px-6 py-4 text-sm font-metal font-semibold transition-all duration-300 relative group ${
                  isActive
                    ? 'text-sabbath-chrome bg-steel-gradient border-b-3 border-sabbath-violet shadow-lg'
                    : 'text-sabbath-silver hover:bg-steel-gradient hover:shadow-md'
                }`}
              >
                <Icon className={`w-5 h-5 transition-all duration-300 ${
                  isActive 
                    ? 'text-sabbath-violet animate-pulse-slow' 
                    : 'text-sabbath-crimson group-hover:text-sabbath-violet'
                }`} />
                <span className={`tracking-wider relative transition-colors duration-300 ${
                  isActive 
                    ? '' 
                    : 'group-hover:text-sabbath-blood'
                }`}>
                  {item.label}
                  {isActive && (
                    <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-sabbath-violet animate-glow"></div>
                  )}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}

export default Navigation
