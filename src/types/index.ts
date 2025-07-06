export interface GuildMember {
  id: string
  name: string
  level: number
  job: string
  joinDate: string
  lastLogin: string
  status: 'online' | 'offline' | 'away'
  contribution: number
  role: 'master' | 'officer' | 'member'
}

export interface ForumPost {
  id: number
  title: string
  author: string
  content: string
  timestamp: string
  likes: number
  replies: number
  category: string
  isPinned?: boolean
}

export interface ChatMessage {
  id: number
  author: string
  message: string
  timestamp: string
  isOnline: boolean
  type?: 'system' | 'user'
}

export interface WikiPage {
  id: number
  title: string
  content: string
  category: string
  lastModified: string
  author: string
  tags: string[]
  isPublished: boolean
}

export interface StatCalculation {
  level: number
  baseStats: Stats
  jobBonus: Stats
  equipment: Stats
}

export interface Stats {
  str: number
  agi: number
  vit: number
  int: number
  dex: number
  luk: number
}

export interface GuildEvent {
  id: string
  title: string
  description: string
  date: string
  type: 'woe' | 'raid' | 'meeting' | 'other'
  participants: string[]
  isRecurring: boolean
}
