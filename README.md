# BlackSheeps Guild - Ragnarok Online Guild Management System

A modern, responsive Single Page Application (SPA) built for managing Ragnarok Online guild activities. Features a comprehensive event calendar, real-time user tracking, and multiple guild management tools.

![Tech Stack](https://img.shields.io/badge/React-18.x-blue?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.x-purple?logo=vite)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.x-cyan?logo=tailwindcss)
![Node.js](https://img.shields.io/badge/Node.js-Express-green?logo=node.js)
![MongoDB](https://img.shields.io/badge/MongoDB-Optional-green?logo=mongodb)

## 🎮 Features

### 📅 Interactive Calendar System
- **Monthly View**: Navigate through months with intuitive controls
- **Event Management**: Create, view, edit, and delete guild events
- **Event Types**: Support for various event categories (Guild meetings, WoE, PvP, Social, Other)
- **Smart Modals**: 
  - Event details modal appears positioned relative to clicked events
  - Event creation modal centered without blocking background view
  - No dark overlays - calendar remains visible and interactive behind modals

### 👥 Real-Time User Tracking
- **Live User Count**: See how many members are currently online
- **Session Management**: Automatic user session tracking with unique session IDs
- **Smart Cleanup**: Inactive users automatically removed after 30 seconds
- **Page Visibility**: Pauses tracking when tab is inactive to save resources

### 🏛️ Guild Management Pages
- **Home**: Guild overview and quick access to features
- **Forum**: Discussion board for guild communications
- **Chat**: Real-time chat system for instant messaging
- **Wiki**: Knowledge base for game guides and guild information
- **Calculator**: Game-related calculators and tools
- **Calendar**: Full-featured event management system

### 🎨 Modern UI/UX
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile
- **Dark Theme**: Guild-themed dark interface with red accents
- **Smooth Animations**: Polished transitions and hover effects
- **Accessibility**: Keyboard navigation and screen reader support

## 🚀 Technology Stack

### Frontend
- **React 18** - Modern component-based UI framework
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **Lucide React** - Beautiful, customizable icons

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web application framework
- **MongoDB** - NoSQL database (optional, falls back to in-memory storage)
- **CORS** - Cross-origin resource sharing

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn
- MongoDB (optional - app works with mock data if not available)

### Quick Start

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd blacksheeps
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   ```bash
   # Create .env file in root directory
   echo "MONGODB_URI=mongodb://localhost:27017/blacksheeps" > .env
   echo "PORT=3001" >> .env
   ```

4. **Start the backend server**
   ```bash
   npm run server
   ```

5. **Start the frontend (in new terminal)**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

## 🛠️ Available Scripts

```bash
npm run dev          # Start development server (frontend)
npm run build        # Build for production
npm run preview      # Preview production build
npm run server       # Start backend API server
npm run lint         # Run ESLint
npm run start        # Start both frontend and backend (if configured)
```

## 🏗️ Project Structure

```
blacksheeps/
├── src/
│   ├── components/         # Reusable UI components
│   │   ├── EventModal.tsx         # Event creation modal
│   │   ├── EventDetailsModal.tsx  # Event details modal
│   │   ├── Header.tsx             # App header with user count
│   │   ├── Navigation.tsx         # Main navigation
│   │   └── Layout.tsx             # App layout wrapper
│   ├── pages/             # Page components
│   │   ├── Home.tsx
│   │   ├── Calendar.tsx
│   │   ├── Forum.tsx
│   │   ├── Chat.tsx
│   │   ├── Wiki.tsx
│   │   └── Calculator.tsx
│   ├── hooks/             # Custom React hooks
│   │   └── useUserTracking.ts     # Real-time user tracking
│   ├── utils/             # Utility functions
│   │   ├── api.ts                 # API client
│   │   └── index.ts               # Helper functions
│   ├── constants/         # App constants
│   │   └── index.ts               # Event types, etc.
│   └── main.tsx          # App entry point
├── server/
│   └── index.cjs         # Express backend server
├── public/               # Static assets
└── README.md
```

## 🔧 Configuration

### Environment Variables
```bash
MONGODB_URI=mongodb://localhost:27017/blacksheeps  # MongoDB connection string
PORT=3001                                          # Backend server port
```

### Event Types
The application supports these event types by default:
- **Guild** (Red) - Guild meetings, announcements
- **PvP** (Orange) - War of Emperium, PvP events
- **Social** (Green) - Guild parties, social gatherings
- **Meeting** (Blue) - Official meetings, planning sessions
- **Other** (Gray) - Miscellaneous events

## 🎯 API Endpoints

### Events
- `GET /api/events` - Fetch all events
- `POST /api/events` - Create new event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event

### User Tracking
- `GET /api/users/active` - Get active user count
- `POST /api/user/heartbeat` - Update user session

## 🔄 Real-Time Features

### User Session Tracking
- Each user gets a unique session ID stored in `sessionStorage`
- Heartbeat sent every 15 seconds while tab is active
- Inactive users cleaned up automatically
- Page visibility API integration for smart tracking

### Event Management
- Real-time event creation and updates
- Automatic UI refresh after event operations
- Error handling with user-friendly messages

## 🎨 UI Features

### Modal System
- **No Dark Overlays**: All modals allow background interaction
- **Smart Positioning**: Event details appear near clicked events
- **Keyboard Support**: ESC key closes modals
- **Click Outside**: Click outside modal to close

### Responsive Design
- Mobile-first approach
- Breakpoint-specific layouts
- Touch-friendly interactions
- Optimized for all screen sizes

## 🐛 Development

### Error Handling
- Graceful MongoDB connection failures
- Fallback to mock data when backend unavailable
- User-friendly error messages
- Console logging for debugging

### Type Safety
- Full TypeScript coverage
- Strict type checking
- API response typing
- Component prop validation

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy Frontend
The `dist/` folder can be deployed to any static hosting service:
- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront

### Deploy Backend
The Node.js server can be deployed to:
- Heroku
- Railway
- DigitalOcean
- AWS EC2

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🎮 About Ragnarok Online

This application is designed for guild management in Ragnarok Online, a classic MMORPG. Features are tailored specifically for guild activities like War of Emperium (WoE), guild meetings, and community events.

---

**Built with ❤️ for the BlackSheeps Guild**
