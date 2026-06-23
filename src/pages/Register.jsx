import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/api';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setMessage('');
    setIsSubmitting(true);

    try {
      const response = await API.post('/auth/register', {
        name,
        email,
        password
      });

      if (response.data.success) {
        // 1. Show the success confirmation message
        setMessage('User registered successfully! Redirecting to login...');
        
        // 2. Redirect to the login page after a brief 2-second delay
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      }
    } catch (err) {
      console.error("Registration component submission capture error:", err);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-md bg-white border border-zinc-200/80 p-8 rounded-xl shadow-sm transition-all duration-200">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold text-zinc-900 tracking-tight">Create an Account</h2>
          <p className="text-sm text-zinc-500 mt-1">Enter your details to register your workspace.</p>
        </div>

        {/* Success Alert */}
        {message && (
          <div className="bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium p-3 rounded-lg mb-4 flex items-center gap-2 animate-fadeIn">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-emerald-500 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <span>{message}</span>
          </div>
        )}

        {/* Error Notification Alert */}
        {error && (
          <div className="bg-rose-50 border border-rose-200 text-rose-700 text-xs font-medium p-3 rounded-lg mb-4 flex items-center gap-2 animate-fadeIn">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 text-rose-500 shrink-0">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">
              Full Name
            </label>
            <input
              type="text"
              required
              disabled={isSubmitting}
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-zinc-50/50 border border-zinc-200 focus:border-zinc-900 rounded-lg px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-950/5 text-sm transition-colors disabled:opacity-60"
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              required
              disabled={isSubmitting}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-zinc-50/50 border border-zinc-200 focus:border-zinc-900 rounded-lg px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-950/5 text-sm transition-colors disabled:opacity-60"
              placeholder="name@company.com"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-500 uppercase tracking-wider mb-1.5">
              Password
            </label>
            <input
              type="password"
              required
              disabled={isSubmitting}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-zinc-50/50 border border-zinc-200 focus:border-zinc-900 rounded-lg px-3 py-2 text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-1 focus:ring-zinc-950/5 text-sm transition-colors disabled:opacity-60"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-zinc-900 hover:bg-zinc-800 text-white font-medium py-2.5 rounded-lg transition-colors text-sm mt-2 flex items-center justify-center gap-2 disabled:opacity-70 disabled:hover:bg-zinc-900"
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Creating Account...</span>
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <div className="text-center text-xs text-zinc-500 mt-6 border-t border-zinc-100 pt-4">
          Already have an account?{' '}
          <Link to="/login" className="text-zinc-900 font-medium hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}