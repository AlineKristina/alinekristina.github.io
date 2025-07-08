/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // BlackSheeps inspired color palette
        'sabbath': {
          'void': '#000000',      // Pure black
          'shadow': '#0a0a0a',    // Very dark gray
          'coal': '#1a1a1a',     // Dark charcoal
          'steel': '#2a2a2a',    // Dark steel
          'iron': '#3a3a3a',     // Iron gray
          'silver': '#c0c0c0',   // Metallic silver
          'chrome': '#e5e5e5',   // Chrome
          'purple': '#4c1d95',   // Deep purple
          'violet': '#6b21a8',   // Dark violet
          'crimson': '#7f1d1d',  // Dark red
          'blood': '#991b1b',    // Blood red
        },
        // Keep legacy colors for compatibility
        'ro-red': '#991b1b',
        'ro-gold': '#d97706',
      },
      fontFamily: {
        'metal': ['Cinzel', 'Georgia', 'serif'],
        'gothic': ['Creepster', 'cursive'],
        'heavy': ['Black Ops One', 'cursive'],
        'dark': ['Nosifer', 'cursive'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        glow: {
          '0%': { 
            textShadow: '0 0 5px #c0c0c0, 0 0 10px #c0c0c0, 0 0 15px #c0c0c0',
            boxShadow: '0 0 5px #c0c0c0'
          },
          '100%': { 
            textShadow: '0 0 10px #e5e5e5, 0 0 20px #e5e5e5, 0 0 30px #e5e5e5',
            boxShadow: '0 0 10px #e5e5e5'
          }
        }
      },
      backgroundImage: {
        'metal-gradient': 'linear-gradient(145deg, #1a1a1a, #2a2a2a, #1a1a1a)',
        'steel-gradient': 'linear-gradient(145deg, #2a2a2a, #3a3a3a, #2a2a2a)',
        'void-gradient': 'linear-gradient(180deg, #000000, #0a0a0a, #1a1a1a)',
      }
    },
  },
  plugins: [],
}
