import { useAuth } from '../hooks/useAuth.js';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-white border-b border-zinc-100 py-4 px-8 flex justify-between items-center sticky top-0 z-40">
      <Link to="/" className="text-md font-semibold tracking-tight text-zinc-900 flex items-center gap-2">
        <span className="h-5 w-5 rounded bg-indigo-600 flex items-center justify-center text-white text-xs font-black">P</span>
        PipelineHub
      </Link>
      <div className="flex items-center gap-6">
        {user ? (
          <>
            <div className="text-right hidden sm:block">
              <p className="text-xs font-medium text-zinc-800">{user.name}</p>
              <p className="text-[10px] text-zinc-400">{user.email}</p>
            </div>
            <button 
              onClick={logout} 
              className="border border-zinc-200 hover:bg-zinc-50 text-zinc-600 text-xs font-medium px-3.5 py-1.5 rounded transition-all"
            >
              Sign Out
            </button>
          </>
        ) : (
          <div className="flex items-center gap-4">
            <Link to="/login" className="text-xs font-medium text-zinc-600 hover:text-zinc-900 transition-colors">Sign In</Link>
            <Link to="/register" className="bg-zinc-900 hover:bg-zinc-800 text-white text-xs font-medium px-3.5 py-1.5 rounded transition-all">Get Started</Link>
          </div>
        )}
      </div>
    </nav>
  );
}