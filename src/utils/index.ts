// Date formatting utilities
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
}

export const formatDateTime = (date: Date): string => {
  return `${formatDate(date)} ${formatTime(date)}`
}

export const getTimeAgo = (date: Date): string => {
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  const diffHours = Math.floor(diffMins / 60)
  const diffDays = Math.floor(diffHours / 24)

  if (diffMins < 1) return 'Just now'
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? 's' : ''} ago`
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`
  return formatDate(date)
}

// Local storage utilities
export const saveToStorage = <T>(key: string, data: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(data))
  } catch (error) {
    console.error('Error saving to localStorage:', error)
  }
}

export const loadFromStorage = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key)
    return item ? JSON.parse(item) : defaultValue
  } catch (error) {
    console.error('Error loading from localStorage:', error)
    return defaultValue
  }
}

// Ragnarok Online specific utilities
export const calculateHP = (level: number, vit: number, jobMultiplier: number = 1): number => {
  return Math.floor((level * 100 + vit * 5) * jobMultiplier)
}

export const calculateSP = (level: number, int: number, jobMultiplier: number = 1): number => {
  return Math.floor((level * 10 + int * 2) * jobMultiplier)
}

export const calculateASPD = (agi: number, dex: number, baseASPD: number = 150): number => {
  return Math.min(190, baseASPD + Math.floor((agi + dex) / 4))
}

export const calculateDamage = (atk: number, def: number, elementModifier: number = 1): number => {
  const baseDamage = Math.max(1, atk - def)
  return Math.floor(baseDamage * elementModifier)
}

// Validation utilities
export const isValidLevel = (level: number): boolean => {
  return level >= 1 && level <= 999
}

export const isValidStat = (stat: number): boolean => {
  return stat >= 1 && stat <= 999
}

export const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>]/g, '')
}

// Color utilities for different elements/types
export const getElementColor = (element: string): string => {
  const colors: Record<string, string> = {
    neutral: '#6b7280',
    water: '#3b82f6',
    earth: '#a3a3a3',
    fire: '#ef4444',
    wind: '#22c55e',
    poison: '#8b5cf6',
    holy: '#fbbf24',
    shadow: '#1f2937',
    ghost: '#d1d5db',
    undead: '#374151'
  }
  return colors[element.toLowerCase()] || colors.neutral
}

export const getJobColor = (job: string): string => {
  const colors: Record<string, string> = {
    swordsman: '#dc2626',
    mage: '#3b82f6',
    archer: '#22c55e',
    merchant: '#f59e0b',
    thief: '#8b5cf6',
    acolyte: '#fbbf24',
    knight: '#991b1b',
    wizard: '#1e40af',
    hunter: '#166534',
    blacksmith: '#d97706',
    assassin: '#6b21a8',
    priest: '#eab308'
  }
  return colors[job.toLowerCase()] || '#6b7280'
}
