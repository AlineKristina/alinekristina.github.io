import { useState } from 'react'
import { MessageSquare, Plus, ThumbsUp, Clock } from 'lucide-react'
import { useLocalStorage } from '../hooks'
import { STORAGE_KEYS, FORUM_CONSTANTS } from '../constants'
import { getTimeAgo, sanitizeInput } from '../utils'

interface ForumPost {
  id: number
  title: string
  author: string
  content: string
  timestamp: string
  likes: number
  replies: number
  category: string
  createdAt: Date
}

const Forum = () => {
  const [posts, setPosts] = useLocalStorage<ForumPost[]>(STORAGE_KEYS.FORUM_POSTS, [
    {
      id: 1,
      title: "WoE Strategy Discussion",
      author: "GuildMaster",
      content: "Let's discuss our strategy for the upcoming War of Emperium. We need to coordinate our approach...",
      timestamp: "2 hours ago",
      likes: 12,
      replies: 8,
      category: FORUM_CONSTANTS.CATEGORIES.STRATEGY,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000)
    },
    {
      id: 2,
      title: "New Member Introductions",
      author: "Officer1",
      content: "Welcome all new members! Please introduce yourselves here and tell us about your characters...",
      timestamp: "1 day ago",
      likes: 5,
      replies: 15,
      category: FORUM_CONSTANTS.CATEGORIES.GENERAL,
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000)
    },
    {
      id: 3,
      title: "Equipment Trading Post",
      author: "Merchant123",
      content: "Trading post for guild members. Please list items you want to trade or sell...",
      timestamp: "2 days ago",
      likes: 8,
      replies: 23,
      category: FORUM_CONSTANTS.CATEGORIES.TRADING,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000)
    }
  ])

  const [newPost, setNewPost] = useState({ 
    title: '', 
    content: '', 
    category: 'general' as string 
  })
  const [showNewPost, setShowNewPost] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('all')

  const handleCreatePost = () => {
    if (newPost.title.trim() && newPost.content.trim()) {
      const post: ForumPost = {
        id: Date.now(),
        title: sanitizeInput(newPost.title),
        author: "You",
        content: sanitizeInput(newPost.content),
        timestamp: "Just now",
        likes: 0,
        replies: 0,
        category: newPost.category,
        createdAt: new Date()
      }
      setPosts([post, ...posts])
      setNewPost({ title: '', content: '', category: 'general' })
      setShowNewPost(false)
    }
  }

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => 
      post.id === postId ? { ...post, likes: post.likes + 1 } : post
    ))
  }

  const filteredPosts = posts.filter(post => 
    selectedCategory === 'all' || post.category === selectedCategory
  )

  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: FORUM_CONSTANTS.CATEGORIES.GENERAL, label: 'General' },
    { value: FORUM_CONSTANTS.CATEGORIES.STRATEGY, label: 'Strategy' },
    { value: FORUM_CONSTANTS.CATEGORIES.RULES, label: 'Rules' },
    { value: FORUM_CONSTANTS.CATEGORIES.EVENTS, label: 'Events' },
    { value: FORUM_CONSTANTS.CATEGORIES.TRADING, label: 'Trading' }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Guild Forum</h1>
        <button
          onClick={() => setShowNewPost(!showNewPost)}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Post</span>
        </button>
      </div>

      {/* Category Filter */}
      <div className="flex items-center space-x-4">
        <label className="text-gray-300 text-sm font-medium">Filter by category:</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="bg-gray-700 text-white px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          {categories.map(category => (
            <option key={category.value} value={category.value}>
              {category.label}
            </option>
          ))}
        </select>
      </div>

      {showNewPost && (
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-bold text-white mb-4">Create New Post</h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                placeholder="Post title..."
                value={newPost.title}
                onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                maxLength={FORUM_CONSTANTS.MAX_TITLE_LENGTH}
                className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <select
                value={newPost.category}
                onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                className="bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                {categories.slice(1).map(category => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
            <textarea
              placeholder="Write your post content..."
              value={newPost.content}
              onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
              rows={4}
              maxLength={FORUM_CONSTANTS.MAX_POST_LENGTH}
              className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <div className="flex justify-between items-center">
              <span className="text-gray-400 text-sm">
                {newPost.content.length}/{FORUM_CONSTANTS.MAX_POST_LENGTH}
              </span>
              <div className="flex space-x-3">
                <button
                  onClick={handleCreatePost}
                  disabled={!newPost.title.trim() || !newPost.content.trim()}
                  className="bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg"
                >
                  Post
                </button>
                <button
                  onClick={() => setShowNewPost(false)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {filteredPosts.map((post) => (
          <div key={post.id} className="bg-gray-800 rounded-lg p-6">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h3 className="text-xl font-semibold text-white">{post.title}</h3>
                  <span className="text-gray-400 text-sm">by {post.author}</span>
                  <span className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs">
                    {categories.find(c => c.value === post.category)?.label || post.category}
                  </span>
                </div>
                <p className="text-gray-300 mb-4">{post.content}</p>
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400 text-sm">
                      {post.createdAt ? getTimeAgo(post.createdAt) : post.timestamp}
                    </span>
                  </div>
                  <button
                    onClick={() => handleLike(post.id)}
                    className="flex items-center space-x-2 hover:text-red-400 transition-colors"
                  >
                    <ThumbsUp className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400 text-sm">{post.likes}</span>
                  </button>
                  <div className="flex items-center space-x-2">
                    <MessageSquare className="w-4 h-4 text-gray-400" />
                    <span className="text-gray-400 text-sm">{post.replies} replies</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
        
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <MessageSquare className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">No posts found in this category</p>
            <p className="text-gray-500 text-sm">Be the first to create a post!</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Forum
