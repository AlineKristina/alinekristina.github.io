import { useState } from 'react'
import { Search, Edit, BookOpen, Plus } from 'lucide-react'

interface WikiPage {
  id: number
  title: string
  content: string
  category: string
  lastModified: string
  author: string
}

const Wiki = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [pages] = useState<WikiPage[]>([
    {
      id: 1,
      title: "Guild Rules and Regulations",
      content: "1. Respect all guild members\n2. Attend WoE when possible\n3. Contribute to guild activities...",
      category: "rules",
      lastModified: "2 days ago",
      author: "GuildMaster"
    },
    {
      id: 2,
      title: "WoE Strategy Guide",
      content: "War of Emperium strategies and tactics for our guild...",
      category: "strategy",
      lastModified: "1 week ago",
      author: "Officer1"
    },
    {
      id: 3,
      title: "Leveling Spots Guide",
      content: "Best places to level up for different character levels...",
      category: "guides",
      lastModified: "3 days ago",
      author: "ExpertPlayer"
    },
    {
      id: 4,
      title: "Equipment Enhancement Guide",
      content: "How to safely enhance your equipment and where to get materials...",
      category: "guides",
      lastModified: "1 week ago",
      author: "CraftMaster"
    },
    {
      id: 5,
      title: "Guild Event Calendar",
      content: "Upcoming guild events and activities...",
      category: "events",
      lastModified: "1 day ago",
      author: "EventCoordinator"
    }
  ])

  const [selectedPage, setSelectedPage] = useState<WikiPage | null>(null)

  const categories = [
    { id: 'all', name: 'All Categories' },
    { id: 'rules', name: 'Rules' },
    { id: 'strategy', name: 'Strategy' },
    { id: 'guides', name: 'Guides' },
    { id: 'events', name: 'Events' }
  ]

  const filteredPages = pages.filter(page => {
    const matchesSearch = page.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         page.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || page.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="flex h-[600px] space-x-4">
      {/* Sidebar */}
      <div className="w-80 bg-gray-800 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-white">Wiki Pages</h2>
          <button className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-lg">
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-4">
          <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search pages..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>

        {/* Categories */}
        <div className="mb-4">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>

        {/* Page List */}
        <div className="space-y-2 overflow-y-auto max-h-96">
          {filteredPages.map(page => (
            <div
              key={page.id}
              onClick={() => setSelectedPage(page)}
              className={`p-3 rounded-lg cursor-pointer transition-colors ${
                selectedPage?.id === page.id
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
              }`}
            >
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-sm">{page.title}</h3>
                <BookOpen className="w-4 h-4" />
              </div>
              <p className="text-xs mt-1 opacity-75">
                By {page.author} • {page.lastModified}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-800 rounded-lg">
        {selectedPage ? (
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-white">{selectedPage.title}</h1>
                <p className="text-gray-400 text-sm mt-1">
                  Last modified {selectedPage.lastModified} by {selectedPage.author}
                </p>
              </div>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
                <Edit className="w-4 h-4" />
                <span>Edit</span>
              </button>
            </div>
            
            <div className="prose prose-invert max-w-none">
              <div className="bg-gray-900 rounded-lg p-6">
                <pre className="text-gray-300 whitespace-pre-wrap">{selectedPage.content}</pre>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full">
            <div className="text-center">
              <BookOpen className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">Select a page to view its content</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Wiki
