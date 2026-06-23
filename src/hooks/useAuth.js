import { useContext } from 'react';
import { AuthContext } from '../context/context.js';

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be safely nested within a structural AuthProvider hierarchy tree');
  }
  return context;
};