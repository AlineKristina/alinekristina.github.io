// Ragnarok Online constants
export const RO_CONSTANTS = {
  MAX_LEVEL: 999,
  MAX_BASE_STAT: 99,
  MAX_TOTAL_STAT: 999,
  MAX_ASPD: 190,
  MIN_ASPD: 100,
  
  // Job classes
  JOBS: {
    NOVICE: 'Novice',
    SWORDSMAN: 'Swordsman',
    MAGE: 'Mage',
    ARCHER: 'Archer',
    MERCHANT: 'Merchant',
    THIEF: 'Thief',
    ACOLYTE: 'Acolyte',
    KNIGHT: 'Knight',
    WIZARD: 'Wizard',
    HUNTER: 'Hunter',
    BLACKSMITH: 'Blacksmith',
    ASSASSIN: 'Assassin',
    PRIEST: 'Priest'
  },
  
  // Elements
  ELEMENTS: {
    NEUTRAL: 'neutral',
    WATER: 'water',
    EARTH: 'earth',
    FIRE: 'fire',
    WIND: 'wind',
    POISON: 'poison',
    HOLY: 'holy',
    SHADOW: 'shadow',
    GHOST: 'ghost',
    UNDEAD: 'undead'
  },
  
  // Monster sizes
  SIZES: {
    SMALL: 'small',
    MEDIUM: 'medium',
    LARGE: 'large'
  },
  
  // Monster races
  RACES: {
    DEMI_HUMAN: 'demiHuman',
    BEAST: 'beast',
    PLANT: 'plant',
    INSECT: 'insect',
    FISH: 'fish',
    DEMON: 'demon',
    ANGEL: 'angel',
    DRAGON: 'dragon',
    FORMLESS: 'formless',
    UNDEAD: 'undead'
  }
} as const

// Guild constants
export const GUILD_CONSTANTS = {
  MAX_MEMBERS: 50,
  MAX_GUILD_LEVEL: 50,
  ROLES: {
    MASTER: 'master',
    OFFICER: 'officer',
    MEMBER: 'member'
  }
} as const

// Forum constants
export const FORUM_CONSTANTS = {
  MAX_POST_LENGTH: 10000,
  MAX_TITLE_LENGTH: 100,
  CATEGORIES: {
    GENERAL: 'general',
    STRATEGY: 'strategy',
    RULES: 'rules',
    EVENTS: 'events',
    TRADING: 'trading'
  }
} as const

// Storage keys
export const STORAGE_KEYS = {
  FORUM_POSTS: 'guild_forum_posts',
  CHAT_MESSAGES: 'guild_chat_messages',
  WIKI_PAGES: 'guild_wiki_pages',
  USER_SETTINGS: 'user_settings',
  CALCULATOR_HISTORY: 'calculator_history'
} as const

// Application constants
export const APP_CONSTANTS = {
  GUILD_NAME: 'Black Sheep Guild',
  APP_VERSION: '1.0.0',
  REFRESH_INTERVAL: 30000, // 30 seconds
  CHAT_MESSAGE_LIMIT: 100,
  FORUM_POSTS_PER_PAGE: 10
} as const
