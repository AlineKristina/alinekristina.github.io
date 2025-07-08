import { useState, useEffect } from 'react'
import { Calendar as CalendarIcon, Plus, Clock, Users, Swords, Star, AlertCircle } from 'lucide-react'
import { EVENT_TYPES } from '../constants'
import { formatDate } from '../utils'
import { api } from '../utils/api'
import type { ApiEvent, CreateEventRequest } from '../utils/api'
import EventModal from '../components/EventModal'
import EventDetailsModal from '../components/EventDetailsModal'

const Calendar = () => {
  const [events, setEvents] = useState<ApiEvent[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<ApiEvent | null>(null)
  const [modalPosition, setModalPosition] = useState<{ x: number; y: number } | undefined>(undefined)
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())
  const [modalSelectedDate, setModalSelectedDate] = useState<Date | undefined>(undefined)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [viewMode, setViewMode] = useState<'calendar' | 'list'>('calendar')

  // Load events from API
  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = async () => {
    try {
      setLoading(true)
      setError(null)
      const eventsData = await api.events.getAll()
      setEvents(eventsData)
    } catch (err) {
      console.error('Error loading events:', err)
      setError('Failed to load events. Please try again later.')
    } finally {
      setLoading(false)
    }
  }

  const showToast = (message: string, type: 'success' | 'error') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleCreateEvent = async (eventData: {
    title: string;
    description: string;
    date: string;
    type: string;
    time: string;
  }) => {
    try {
      const createRequest: CreateEventRequest = {
        title: eventData.title,
        description: eventData.description,
        date: new Date(`${eventData.date}T${eventData.time || '00:00'}`).toISOString(),
        type: eventData.type,
        time: eventData.time || undefined,
      }

      const newEvent = await api.events.create(createRequest)
      setEvents(prevEvents => [...prevEvents, newEvent])
      showToast('Event created successfully!', 'success')
    } catch (err) {
      console.error('Error creating event:', err)
      showToast('Failed to create event. Please try again.', 'error')
    }
  }

  const handleCellClick = (date: Date) => {
    setModalSelectedDate(date)
    setIsModalOpen(true)
  }

  const handleEventClick = (event: ApiEvent, e: React.MouseEvent) => {
    e.stopPropagation() // Prevent cell click when clicking on event
    
    // Get the position of the clicked event
    const rect = (e.target as HTMLElement).getBoundingClientRect()
    setModalPosition({
      x: rect.left,
      y: rect.bottom
    })
    
    setSelectedEvent(event)
    setIsDetailsModalOpen(true)
  }

  const handleDeleteEvent = async () => {
    if (!selectedEvent) return
    
    try {
      await api.events.delete(selectedEvent._id)
      setEvents(prevEvents => prevEvents.filter(event => event._id !== selectedEvent._id))
      showToast('Event deleted successfully!', 'success')
      setIsDetailsModalOpen(false)
      setSelectedEvent(null)
    } catch (err) {
      console.error('Error deleting event:', err)
      showToast('Failed to delete event. Please try again.', 'error')
    }
  }

  const getEventsForDate = (date: Date) => {
    return events.filter(event => {
      const eventDate = new Date(event.date)
      return eventDate.toDateString() === date.toDateString()
    })
  }

  const upcomingEvents = events
    .filter(event => new Date(event.date) >= new Date())
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 5)

  const getCurrentMonthDays = () => {
    const year = selectedDate.getFullYear()
    const month = selectedDate.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }
    
    return days
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setSelectedDate(prev => {
      const newDate = new Date(prev)
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const getEventTypeInfo = (type: string) => {
    const eventType = EVENT_TYPES.find(t => t.id === type)
    if (!eventType) return { label: 'Other', color: 'bg-gray-600', icon: CalendarIcon }
    
    let icon = CalendarIcon
    if (type === 'pvp') icon = Swords
    else if (type === 'raid') icon = Star
    else if (type === 'meeting') icon = Users
    
    return { ...eventType, icon }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-white">Loading events...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Toast */}
      {toast && (
        <div className={`fixed top-4 right-4 p-4 rounded-lg text-white z-50 ${
          toast.type === 'success' ? 'bg-green-600' : 'bg-red-600'
        }`}>
          {toast.message}
        </div>
      )}

      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Guild Calendar</h1>
        <div className="flex items-center space-x-3">
          <div className="flex bg-gray-700 rounded-lg p-1">
            <button
              onClick={() => setViewMode('calendar')}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                viewMode === 'calendar' 
                  ? 'bg-red-600 text-white' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Calendar
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`px-3 py-1 rounded text-sm transition-colors ${
                viewMode === 'list' 
                  ? 'bg-red-600 text-white' 
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              List
            </button>
          </div>
          <button
            onClick={() => {
              setModalSelectedDate(undefined)
              setIsModalOpen(true)
            }}
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2"
          >
            <Plus className="w-4 h-4" />
            <span>New Event</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-600/20 border border-red-600 rounded-lg p-4">
          <div className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-red-400" />
            <span className="text-red-400">{error}</span>
            <button
              onClick={loadEvents}
              className="ml-auto bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {viewMode === 'calendar' ? (
        <div className="bg-gray-800 rounded-lg p-6">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">
              {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h2>
            <div className="flex space-x-2">
              <button
                onClick={() => navigateMonth('prev')}
                className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded"
              >
                ←
              </button>
              <button
                onClick={() => navigateMonth('next')}
                className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded"
              >
                →
              </button>
            </div>
          </div>

          {/* Calendar Grid */}
          <div className="grid grid-cols-7 gap-1">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="p-2 text-center text-gray-400 font-semibold">
                {day}
              </div>
            ))}
            {getCurrentMonthDays().map((day, index) => {
              const dayEvents = day ? getEventsForDate(day) : []
              const isToday = day && day.toDateString() === new Date().toDateString()
              
              return (
                <div
                  key={index}
                  onClick={() => day && handleCellClick(day)}
                  className={`min-h-[80px] p-1 border border-gray-700 cursor-pointer transition-colors ${
                    day ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-900'
                  } ${isToday ? 'ring-2 ring-red-500' : ''}`}
                >
                  {day && (
                    <>
                      <div className={`text-sm ${isToday ? 'text-red-400 font-bold' : 'text-gray-300'}`}>
                        {day.getDate()}
                      </div>
                      <div className="space-y-1">
                        {dayEvents.slice(0, 2).map(event => {
                          const eventType = getEventTypeInfo(event.type)
                          return (
                            <div
                              key={event._id}
                              onClick={(e) => handleEventClick(event, e)}
                              className={`text-xs p-1 rounded text-white truncate cursor-pointer hover:opacity-80 transition-opacity ${eventType.color}`}
                              title={`${event.title} - Click for details`}
                            >
                              {event.title}
                            </div>
                          )
                        })}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-gray-400">
                            +{dayEvents.length - 2} more
                          </div>
                        )}
                      </div>
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-xl font-bold text-white">Upcoming Events</h2>
          {upcomingEvents.map(event => {
            const eventType = getEventTypeInfo(event.type)
            const Icon = eventType.icon

            return (
              <div 
                key={event._id} 
                className="bg-gray-800 rounded-lg p-6 cursor-pointer hover:bg-gray-750 transition-colors"
                onClick={(e) => {
                  const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
                  setModalPosition({
                    x: rect.left + rect.width / 2,
                    y: rect.top
                  })
                  setSelectedEvent(event)
                  setIsDetailsModalOpen(true)
                }}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <div className={`p-2 rounded-lg ${eventType.color}`}>
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-white">{event.title}</h3>
                        <p className="text-gray-400 text-sm">
                          {formatDate(new Date(event.date))}
                          {event.time && ` at ${event.time}`}
                        </p>
                      </div>
                    </div>
                    {event.description && (
                      <p className="text-gray-300 mb-4">{event.description}</p>
                    )}
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span className="text-gray-400 text-sm">
                          {eventType.label}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
          
          {upcomingEvents.length === 0 && (
            <div className="text-center py-12">
              <CalendarIcon className="w-16 h-16 text-gray-600 mx-auto mb-4" />
              <p className="text-gray-400 text-lg">No upcoming events</p>
              <p className="text-gray-500 text-sm">Create your first guild event!</p>
            </div>
          )}
        </div>
      )}

      {/* Event Modal */}
      <EventModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false)
          setModalSelectedDate(undefined)
        }}
        onSave={handleCreateEvent}
        selectedDate={modalSelectedDate}
      />

      {/* Event Details Modal */}
      <EventDetailsModal
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false)
          setSelectedEvent(null)
          setModalPosition(undefined)
        }}
        event={selectedEvent}
        onDelete={handleDeleteEvent}
        position={modalPosition}
      />
    </div>
  )
}

export default Calendar
