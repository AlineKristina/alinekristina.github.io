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
      className="sabbath-card w-80 text-sabbath-chrome"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-sabbath-steel">
        <h2 className="text-lg font-metal font-bold text-sabbath-chrome">Dark Details</h2>
        <button
          onClick={onClose}
          className="text-sabbath-silver hover:text-sabbath-chrome transition-colors"
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
          <label className="block text-xs font-metal font-semibold text-sabbath-silver mb-1">
            <Type className="inline h-3 w-3 mr-1 text-sabbath-violet" />
            Title
          </label>
          <h3 className="text-base font-metal font-bold text-sabbath-chrome">{event.title}</h3>
        </div>

        {/* Description */}
        {event.description && (
          <div>
            <label className="block text-xs font-metal font-semibold text-sabbath-silver mb-1">
              <FileText className="inline h-3 w-3 mr-1 text-sabbath-violet" />
              Description
            </label>
            <p className="text-sabbath-chrome bg-sabbath-coal p-2 rounded-md text-sm border border-sabbath-steel">
              {event.description}
            </p>
          </div>
        )}

        {/* Date */}
        <div>
          <label className="block text-xs font-metal font-semibold text-sabbath-silver mb-1">
            <Calendar className="inline h-3 w-3 mr-1 text-sabbath-violet" />
            Date
          </label>
          <p className="text-sabbath-chrome text-sm font-metal">{formatDate(eventDate)}</p>
        </div>

        {/* Time */}
        {event.time && (
          <div>
            <label className="block text-xs font-metal font-semibold text-sabbath-silver mb-1">
              <Clock className="inline h-3 w-3 mr-1 text-sabbath-violet" />
              Time
            </label>
            <p className="text-sabbath-chrome text-sm font-metal">{event.time}</p>
          </div>
        )}

        {/* Created/Updated Info */}
        <div className="pt-3 border-t border-sabbath-steel">
          <div className="text-xs text-sabbath-silver space-y-1 font-metal">
            <p>Summoned: {new Date(event.createdAt).toLocaleString()}</p>
            {event.updatedAt !== event.createdAt && (
              <p>Altered: {new Date(event.updatedAt).toLocaleString()}</p>
            )}
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-2 p-4 border-t border-sabbath-steel">
        <button
          onClick={onClose}
          className="btn-secondary flex-1"
        >
          Close
        </button>
        {onEdit && (
          <button
            onClick={onEdit}
            className="flex items-center justify-center px-3 py-2 bg-sabbath-violet hover:bg-sabbath-purple text-sabbath-chrome hover:text-sabbath-blood rounded-md transition-colors text-sm font-metal font-semibold border border-sabbath-steel"
          >
            <Edit className="h-3 w-3 mr-1" />
            Edit
          </button>
        )}
        {onDelete && (
          <button
            onClick={onDelete}
            className="btn-primary flex items-center justify-center"
          >
            <Trash2 className="h-3 w-3 mr-1" />
            Banish
          </button>
        )}
      </div>
    </div>
  ) : (
    // Fallback to fixed position if no position provided
    <div className="fixed inset-0 flex items-start justify-start p-4 z-50 pointer-events-none">
      <div className="sabbath-card w-full max-w-sm mt-16 text-sabbath-chrome pointer-events-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-sabbath-steel">
          <h2 className="text-lg font-metal font-bold text-sabbath-chrome">Dark Details</h2>
          <button
            onClick={onClose}
            className="text-sabbath-silver hover:text-sabbath-chrome transition-colors"
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
            <label className="block text-xs font-metal font-semibold text-sabbath-silver mb-1">
              <Type className="inline h-3 w-3 mr-1 text-sabbath-violet" />
              Title
            </label>
            <h3 className="text-base font-metal font-bold text-sabbath-chrome">{event.title}</h3>
          </div>

          {/* Description */}
          {event.description && (
            <div>
              <label className="block text-xs font-metal font-semibold text-sabbath-silver mb-1">
                <FileText className="inline h-3 w-3 mr-1 text-sabbath-violet" />
                Description
              </label>
              <p className="text-sabbath-chrome bg-sabbath-coal p-2 rounded-md text-sm border border-sabbath-steel">
                {event.description}
              </p>
            </div>
          )}

          {/* Date */}
          <div>
            <label className="block text-xs font-metal font-semibold text-sabbath-silver mb-1">
              <Calendar className="inline h-3 w-3 mr-1 text-sabbath-violet" />
              Date
            </label>
            <p className="text-sabbath-chrome text-sm font-metal">{formatDate(eventDate)}</p>
          </div>

          {/* Time */}
          {event.time && (
            <div>
              <label className="block text-xs font-metal font-semibold text-sabbath-silver mb-1">
                <Clock className="inline h-3 w-3 mr-1 text-sabbath-violet" />
                Time
              </label>
              <p className="text-sabbath-chrome text-sm font-metal">{event.time}</p>
            </div>
          )}

          {/* Created/Updated Info */}
          <div className="pt-3 border-t border-sabbath-steel">
            <div className="text-xs text-sabbath-silver space-y-1 font-metal">
              <p>Summoned: {new Date(event.createdAt).toLocaleString()}</p>
              {event.updatedAt !== event.createdAt && (
                <p>Altered: {new Date(event.updatedAt).toLocaleString()}</p>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 p-4 border-t border-sabbath-steel">
          <button
            onClick={onClose}
            className="btn-secondary flex-1"
          >
            Close
          </button>
          {onEdit && (
            <button
              onClick={onEdit}
              className="flex items-center justify-center px-3 py-2 bg-sabbath-violet hover:bg-sabbath-purple text-sabbath-chrome hover:text-sabbath-blood rounded-md transition-colors text-sm font-metal font-semibold border border-sabbath-steel"
            >
              <Edit className="h-3 w-3 mr-1" />
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={onDelete}
              className="btn-primary flex items-center justify-center"
            >
              <Trash2 className="h-3 w-3 mr-1" />
              Banish
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
