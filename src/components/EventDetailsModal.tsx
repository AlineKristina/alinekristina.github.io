import { X, Calendar, Clock, Type, FileText, Edit, Trash2 } from 'lucide-react';
import { EVENT_TYPES } from '../constants';
import { formatDate } from '../utils';
import type { ApiEvent } from '../utils/api';

interface EventDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  event: ApiEvent | null;
  onEdit?: () => void;
  onDelete?: () => void;
  position?: { x: number; y: number };
}

export default function EventDetailsModal({ 
  isOpen, 
  onClose, 
  event, 
  onEdit, 
  onDelete,
  position 
}: EventDetailsModalProps) {
  if (!isOpen || !event) return null;

  const eventType = EVENT_TYPES.find(type => type.id === event.type);
  const eventDate = new Date(event.date);

  // Calculate modal position
  const modalStyle = position ? {
    position: 'fixed' as const,
    left: Math.min(position.x + 10, window.innerWidth - 350), // 350px is approximate modal width
    top: Math.min(position.y + 10, window.innerHeight - 400), // 400px is approximate modal height
    zIndex: 50
  } : undefined;

  return position ? (
    // Positioned modal relative to clicked event
    <div 
      style={modalStyle}
      className="bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-2xl w-80 text-white border border-gray-600"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h2 className="text-lg font-semibold text-white">Event Details</h2>
        <button
          onClick={onClose}
          className="text-gray-400 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>
      
      {/* Content */}
      <div className="p-4 space-y-3">
        {/* ...existing code... */}
        {/* Event Type Badge */}
        <div className="flex items-center space-x-2">
          <span 
            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white ${eventType?.color || 'bg-gray-600'}`}
          >
            {eventType?.label || 'Other'}
          </span>
        </div>

        {/* Title */}
        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">
            <Type className="inline h-3 w-3 mr-1" />
            Title
          </label>
          <h3 className="text-base font-semibold text-white">{event.title}</h3>
        </div>

        {/* Description */}
        {event.description && (
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">
              <FileText className="inline h-3 w-3 mr-1" />
              Description
            </label>
            <p className="text-gray-200 bg-gray-700 p-2 rounded-md text-sm">
              {event.description}
            </p>
          </div>
        )}

        {/* Date */}
        <div>
          <label className="block text-xs font-medium text-gray-300 mb-1">
            <Calendar className="inline h-3 w-3 mr-1" />
            Date
          </label>
          <p className="text-white text-sm">{formatDate(eventDate)}</p>
        </div>

        {/* Time */}
        {event.time && (
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">
              <Clock className="inline h-3 w-3 mr-1" />
              Time
            </label>
            <p className="text-white text-sm">{event.time}</p>
          </div>
        )}

        {/* Created/Updated Info */}
        <div className="pt-3 border-t border-gray-700">
          <div className="text-xs text-gray-400 space-y-1">
            <p>Created: {new Date(event.createdAt).toLocaleString()}</p>
            {event.updatedAt !== event.createdAt && (
              <p>Updated: {new Date(event.updatedAt).toLocaleString()}</p>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 p-4 border-t border-gray-700">
        <button
          onClick={onClose}
          className="flex-1 px-3 py-2 text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors text-sm"
        >
          Close
        </button>
        {onEdit && (
          <button
            onClick={onEdit}
            className="flex items-center justify-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors text-sm"
          >
            <Edit className="h-3 w-3 mr-1" />
            Edit
          </button>
        )}
        {onDelete && (
          <button
            onClick={onDelete}
            className="flex items-center justify-center px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors text-sm"
          >
            <Trash2 className="h-3 w-3 mr-1" />
            Delete
          </button>
        )}
      </div>
    </div>
  ) : (
    // Fallback to fixed position if no position provided
    <div className="fixed inset-0 flex items-start justify-start p-4 z-50 pointer-events-none">
      <div className="bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-2xl w-full max-w-sm mt-16 text-white border border-gray-600 pointer-events-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <h2 className="text-lg font-semibold text-white">Event Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-3">
          {/* Event Type Badge */}
          <div className="flex items-center space-x-2">
            <span 
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium text-white ${eventType?.color || 'bg-gray-600'}`}
            >
              {eventType?.label || 'Other'}
            </span>
          </div>

          {/* Title */}
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">
              <Type className="inline h-3 w-3 mr-1" />
              Title
            </label>
            <h3 className="text-base font-semibold text-white">{event.title}</h3>
          </div>

          {/* Description */}
          {event.description && (
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">
                <FileText className="inline h-3 w-3 mr-1" />
                Description
              </label>
              <p className="text-gray-200 bg-gray-700 p-2 rounded-md text-sm">
                {event.description}
              </p>
            </div>
          )}

          {/* Date */}
          <div>
            <label className="block text-xs font-medium text-gray-300 mb-1">
              <Calendar className="inline h-3 w-3 mr-1" />
              Date
            </label>
            <p className="text-white text-sm">{formatDate(eventDate)}</p>
          </div>

          {/* Time */}
          {event.time && (
            <div>
              <label className="block text-xs font-medium text-gray-300 mb-1">
                <Clock className="inline h-3 w-3 mr-1" />
                Time
              </label>
              <p className="text-white text-sm">{event.time}</p>
            </div>
          )}

          {/* Created/Updated Info */}
          <div className="pt-3 border-t border-gray-700">
            <div className="text-xs text-gray-400 space-y-1">
              <p>Created: {new Date(event.createdAt).toLocaleString()}</p>
              {event.updatedAt !== event.createdAt && (
                <p>Updated: {new Date(event.updatedAt).toLocaleString()}</p>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 p-4 border-t border-gray-700">
          <button
            onClick={onClose}
            className="flex-1 px-3 py-2 text-gray-300 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors text-sm"
          >
            Close
          </button>
          {onEdit && (
            <button
              onClick={onEdit}
              className="flex items-center justify-center px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors text-sm"
            >
              <Edit className="h-3 w-3 mr-1" />
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="flex items-center justify-center px-3 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition-colors text-sm"
            >
              <Trash2 className="h-3 w-3 mr-1" />
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
