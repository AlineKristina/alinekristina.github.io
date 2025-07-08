import { useState, useEffect, useCallback } from 'react';

const API_BASE = 'http://localhost:3001/api';

// Generate a unique session ID for this browser session
const generateSessionId = (): string => {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Get or create session ID
const getSessionId = (): string => {
  let sessionId = sessionStorage.getItem('guild_session_id');
  if (!sessionId) {
    sessionId = generateSessionId();
    sessionStorage.setItem('guild_session_id', sessionId);
  }
  return sessionId;
};

export const useUserTracking = () => {
  const [userCount, setUserCount] = useState<number>(0);
  const [sessionId] = useState<string>(getSessionId());
  const [isActive, setIsActive] = useState<boolean>(true);

  // Send heartbeat to server
  const sendHeartbeat = useCallback(async () => {
    if (!isActive) return;
    
    try {
      const response = await fetch(`${API_BASE}/user/heartbeat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setUserCount(data.activeUsers || 0);
      }
    } catch (error) {
      console.error('Failed to send heartbeat:', error);
      // Fallback to getting count without updating heartbeat
      try {
        const response = await fetch(`${API_BASE}/users/active`);
        if (response.ok) {
          const data = await response.json();
          setUserCount(data.activeUsers || 0);
        }
      } catch (fallbackError) {
        console.error('Failed to get user count:', fallbackError);
      }
    }
  }, [sessionId, isActive]);

  // Get current active users count
  const getActiveUsers = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE}/users/active`);
      if (response.ok) {
        const data = await response.json();
        setUserCount(data.activeUsers || 0);
      }
    } catch (error) {
      console.error('Failed to get active users:', error);
    }
  }, []);

  // Handle page visibility changes
  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsActive(!document.hidden);
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Set up heartbeat interval
  useEffect(() => {
    // Send initial heartbeat
    sendHeartbeat();

    // Set up regular heartbeat (every 15 seconds)
    const heartbeatInterval = setInterval(sendHeartbeat, 15000);

    // Set up user count polling (every 30 seconds)
    const countInterval = setInterval(getActiveUsers, 30000);

    return () => {
      clearInterval(heartbeatInterval);
      clearInterval(countInterval);
    };
  }, [sendHeartbeat, getActiveUsers]);

  return {
    activeUsers: userCount,
    sessionId,
    isTracking: isActive
  };
};
