import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Search, History, LogOut, User, BarChart2 } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="sticky top-0 z-50 glass px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
            <BarChart2 className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight">
            SEO Audit <span className="text-blue-500">AI</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="hover:text-blue-400 transition-colors">Analyzer</Link>
          <Link to="/#features" className="hover:text-blue-400 transition-colors">Features</Link>
          {user && (
            <Link to="/dashboard" className="hover:text-blue-400 transition-colors flex items-center gap-2">
              <History className="w-4 h-4" /> History
            </Link>
          )}
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline-block text-sm text-slate-400">Hi, {user.name}</span>
              <button 
                onClick={handleLogout}
                className="p-2 hover:bg-white/10 rounded-full transition-colors text-slate-400 hover:text-white"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-sm font-medium hover:text-blue-400">Login</Link>
              <Link to="/register" className="btn-primary text-sm !py-2">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
