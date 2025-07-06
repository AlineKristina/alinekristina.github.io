# Black Sheep Guild Management System

A comprehensive Single Page Application (SPA) for managing a Ragnarok Online guild, built with React, TypeScript, and Tailwind CSS.

## Features

### 🏠 Home Dashboard
- Guild statistics and level information
- Recent activity feed
- Guild announcements
- Member online status

### 💬 Forum System
- Create and manage forum posts
- Category-based organization
- Like and reply functionality
- Member engagement tracking

### 🗨️ Real-time Chat
- Guild chat interface
- Online member list
- Message history
- User status indicators

### 📚 Wiki System
- Comprehensive knowledge base
- Category-based page organization
- Search functionality
- Collaborative editing

### 🔢 RO Calculators
- **Stat Calculator**: Calculate final character stats including base stats, job bonuses, and equipment
- **Damage Calculator**: Estimate damage output based on attack power and target defense
- **EXP Calculator**: Calculate experience needed to level up and time estimates

## Technology Stack

- **Frontend**: React 19 with TypeScript
- **Styling**: Tailwind CSS for modern, responsive design
- **Routing**: React Router for navigation
- **Icons**: Lucide React for consistent iconography
- **Build Tool**: Vite for fast development and building

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── Header.tsx      # Guild header with branding
│   ├── Layout.tsx      # Main layout wrapper
│   ├── Navigation.tsx  # Main navigation menu
│   └── ui/             # Common UI components
├── pages/              # Main application pages
│   ├── Home.tsx        # Dashboard and overview
│   ├── Forum.tsx       # Forum system
│   ├── Chat.tsx        # Real-time chat
│   ├── Wiki.tsx        # Knowledge base
│   └── Calculator.tsx  # RO calculators
├── types/              # TypeScript type definitions
│   └── index.ts        # Shared interfaces
├── App.tsx             # Main application component
└── main.tsx            # Application entry point
```

## Features in Detail

### Guild Management
- Member roster with status tracking
- Role-based permissions
- Activity monitoring
- Contribution tracking

### Communication Tools
- Forum for discussions and announcements
- Real-time chat for quick communication
- Wiki for documentation and guides
- Member directory

### Ragnarok Online Tools
- Character stat calculator with equipment support
- Damage calculation for PvP/PvE planning
- Experience calculator for leveling planning
- Equipment enhancement guides

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Ragnarok Online for the inspiration
- The React and TypeScript communities
- Tailwind CSS for the styling framework
