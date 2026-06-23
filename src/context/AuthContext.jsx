import { useState, useEffect } from 'react';
// Crucial: Explicitly append .js here!
import { AuthContext } from './context.js';
import API from '../services/api.js';
import axios from 'axios';

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  useEffect(() => {
    const checkUserSession = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const { data } = await API.get('/auth/me');
          setUser(data);
        } catch (err) {
          console.error("Session verification fallback triggered:", err);
          logout();
        }
      }
      setLoading(false);
    };
    checkUserSession();
  }, []);

  const login = async (email, password) => {
    const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
    
    if (response.data.success) {
      localStorage.setItem('token', response.data.token);
      setUser({
        _id: response.data._id,
        name: response.data.name,
        email: response.data.email
      });
    }
    return response.data;
  };

  const register = async (name, email, password) => {
    const { data } = await API.post('/auth/register', { name, email, password });
    return data;
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};