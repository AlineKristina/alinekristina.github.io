import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import Forum from './pages/Forum'
import Chat from './pages/Chat'
import Wiki from './pages/Wiki'
import Calculator from './pages/Calculator'
import Calendar from './pages/Calendar'
import './App.css'

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/forum" element={<Forum />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/wiki" element={<Wiki />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/calendar" element={<Calendar />} />
        </Routes>
      </Layout>
    </Router>
  )
}

export default App
