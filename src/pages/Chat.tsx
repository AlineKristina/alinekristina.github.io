import { useState } from 'react'
import { Send, Users } from 'lucide-react'

interface ChatMessage {
  id: number
  author: string
  message: string
  timestamp: string
  isOnline: boolean
}

const Chat = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 1,
      author: "GuildMaster",
      message: "Welcome everyone! Don't forget about WoE this Saturday",
      timestamp: "14:30",
      isOnline: true
    },
    {
      id: 2,
      author: "SwordMaster",
      message: "I'll be there! Just got my new weapon +10",
      timestamp: "14:32",
      isOnline: true
    },
    {
      id: 3,
      author: "HealerPro",
      message: "Need any support items? I have plenty of pots",
      timestamp: "14:33",
      isOnline: true
    },
    {
      id: 4,
      author: "ArcherLady",
      message: "Can someone help me with Thanatos Tower later?",
      timestamp: "14:35",
      isOnline: false
    }
  ])

  const [newMessage, setNewMessage] = useState('')
  const [onlineMembers] = useState([
    { name: "GuildMaster", status: "online" },
    { name: "SwordMaster", status: "online" },
    { name: "HealerPro", status: "online" },
    { name: "MageWizard", status: "online" },
    { name: "ThiefNinja", status: "online" },
    { name: "ArcherLady", status: "away" },
    { name: "KnightGuard", status: "away" }
  ])

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: messages.length + 1,
        author: "You",
        message: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOnline: true
      }
      setMessages([...messages, message])
      setNewMessage('')
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  return (
    <div className="h-[600px] flex">
      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-gray-800 rounded-lg mr-4">
        <div className="p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold text-white">Guild Chat</h2>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.map((msg) => (
            <div key={msg.id} className="flex items-start space-x-3">
              <div className={`w-2 h-2 rounded-full mt-2 ${msg.isOnline ? 'bg-green-500' : 'bg-gray-500'}`} />
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold text-white">{msg.author}</span>
                  <span className="text-gray-400 text-sm">{msg.timestamp}</span>
                </div>
                <p className="text-gray-300">{msg.message}</p>
              </div>
            </div>
          ))}
        </div>
        
        <div className="p-4 border-t border-gray-700">
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-gray-700 text-white px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              onClick={handleSendMessage}
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Online Members */}
      <div className="w-64 bg-gray-800 rounded-lg">
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center space-x-2">
            <Users className="w-5 h-5 text-gray-400" />
            <h3 className="font-semibold text-white">Online Members</h3>
          </div>
        </div>
        <div className="p-4 space-y-2">
          {onlineMembers.map((member) => (
            <div key={member.name} className="flex items-center space-x-3">
              <div className={`w-2 h-2 rounded-full ${
                member.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'
              }`} />
              <span className="text-gray-300">{member.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Chat
