import React, { useState } from 'react';
import { X, Calendar, Clock, Type, FileText } from 'lucide-react';
import { EVENT_TYPES } from '../constants';
import { formatDateForInput } from '../utils';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (event: {
    title: string;
    description: string;
    date: string;
    type: string;
    time: string;
  }) => void;
  selectedDate?: Date;
}

export default function EventModal({ isOpen, onClose, onSave, selectedDate }: EventModalProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    date: selectedDate ? formatDateForInput(selectedDate) : '',
    type: 'guild',
    time: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  React.useEffect(() => {
    if (selectedDate) {
      setFormData(prev => ({
        ...prev,
        date: formatDateForInput(selectedDate)
      }));
    }
  }, [selectedDate]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Title is required';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    if (!formData.type) {
      newErrors.type = 'Event type is required';
    }

    // Validate time format if provided
    if (formData.time && !/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(formData.time)) {
      newErrors.time = 'Time must be in HH:MM format';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSave(formData);
      setFormData({ title: '', description: '', date: '', type: 'guild', time: '' });
      setErrors({});
      onClose();
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="sabbath-card w-full max-w-md m-4 pointer-events-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-sabbath-steel">
          <h2 className="text-xl font-metal font-bold text-sabbath-chrome">Summon New Event</h2>
          <button
            onClick={onClose}
            className="text-sabbath-silver hover:text-sabbath-chrome transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-metal font-semibold text-sabbath-chrome mb-2">
              <Type className="inline h-4 w-4 mr-2 text-sabbath-violet" />
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className={`metal-input w-full ${
                errors.title ? 'border-sabbath-crimson' : ''
              }`}
              placeholder="Enter event title..."
            />
            {errors.title && <p className="text-sabbath-blood text-sm mt-1 font-metal">{errors.title}</p>}
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-metal font-semibold text-sabbath-chrome mb-2">
              <FileText className="inline h-4 w-4 mr-2 text-sabbath-violet" />
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              className="metal-input w-full"
              rows={3}
              placeholder="Enter event description..."
            />
          </div>

          {/* Date */}
          <div>
            <label className="block text-sm font-metal font-semibold text-sabbath-chrome mb-2">
              <Calendar className="inline h-4 w-4 mr-2 text-sabbath-violet" />
              Date *
            </label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => handleInputChange('date', e.target.value)}
              className={`metal-input w-full ${
                errors.date ? 'border-sabbath-crimson' : ''
              }`}
            />
            {errors.date && <p className="text-sabbath-blood text-sm mt-1 font-metal">{errors.date}</p>}
          </div>

          {/* Time */}
          <div>
            <label className="block text-sm font-metal font-semibold text-sabbath-chrome mb-2">
              <Clock className="inline h-4 w-4 mr-2 text-sabbath-violet" />
              Time (optional)
            </label>
            <input
              type="time"
              value={formData.time}
              onChange={(e) => handleInputChange('time', e.target.value)}
              className={`metal-input w-full ${
                errors.time ? 'border-sabbath-crimson' : ''
              }`}
            />
            {errors.time && <p className="text-sabbath-blood text-sm mt-1 font-metal">{errors.time}</p>}
          </div>

          {/* Event Type */}
          <div>
            <label className="block text-sm font-metal font-semibold text-sabbath-chrome mb-2">
              Event Type *
            </label>
            <select
              value={formData.type}
              onChange={(e) => handleInputChange('type', e.target.value)}
              className={`metal-input w-full ${
                errors.type ? 'border-sabbath-crimson' : ''
              }`}
            >
              {EVENT_TYPES.map((type) => (
                <option key={type.id} value={type.id} className="bg-sabbath-coal text-sabbath-chrome">
                  {type.label}
                </option>
              ))}
            </select>
            {errors.type && <p className="text-sabbath-blood text-sm mt-1 font-metal">{errors.type}</p>}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary flex-1"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary flex-1"
            >
              Summon Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
