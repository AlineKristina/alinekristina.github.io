const API_BASE_URL = 'http://localhost:3001/api';

// Event interface matching the backend
export interface ApiEvent {
  _id: string;
  title: string;
  description: string;
  date: string; // ISO string
  type: string;
  time: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEventRequest {
  title: string;
  description?: string;
  date: string; // ISO string
  type: string;
  time?: string;
}

export interface UpdateEventRequest extends Partial<CreateEventRequest> {}

class ApiError extends Error {
  status?: number;
  data?: any;

  constructor(
    message: string,
    status?: number,
    data?: any
  ) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

async function request<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ApiError(
        errorData.error || `HTTP ${response.status}: ${response.statusText}`,
        response.status,
        errorData
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    
    // Network or parsing error
    throw new ApiError(
      error instanceof Error ? error.message : 'Unknown error occurred'
    );
  }
}

export const api = {
  // Health check
  health: () => request<{ status: string; database: string; timestamp: string }>('/health'),

  // Events
  events: {
    // Get all events
    getAll: () => request<ApiEvent[]>('/events'),

    // Get events by date range
    getByRange: (start: string, end: string) =>
      request<ApiEvent[]>(`/events/range?start=${encodeURIComponent(start)}&end=${encodeURIComponent(end)}`),

    // Create new event
    create: (data: CreateEventRequest) =>
      request<ApiEvent>('/events', {
        method: 'POST',
        body: JSON.stringify(data),
      }),

    // Update event
    update: (id: string, data: UpdateEventRequest) =>
      request<ApiEvent>(`/events/${id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      }),

    // Delete event
    delete: (id: string) =>
      request<{ message: string }>(`/events/${id}`, {
        method: 'DELETE',
      }),
  },
};

export { ApiError };
