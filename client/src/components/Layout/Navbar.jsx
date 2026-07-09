import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Search, History, LogOut, User, BarChart2 } from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Hide global navbar on dashboard and audit results pages to allow custom sidebar workspace layouts
  const isWorkspace = location.pathname === '/dashboard' || location.pathname.startsWith('/audit');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (isWorkspace) return null;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center shadow-sm">
            <BarChart2 className="text-white w-6 h-6" />
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-900">
            SEO Audit <span className="text-slate-500 font-medium">AI</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          <Link to="/" className="text-slate-600 hover:text-slate-900 transition-colors font-medium">Analyzer</Link>
          <a href="#features" className="text-slate-600 hover:text-slate-900 transition-colors font-medium">Features</a>
          {user && (
            <Link to="/dashboard" className="text-slate-600 hover:text-slate-900 transition-colors flex items-center gap-2 font-medium">
              <History className="w-4 h-4" /> Workspace
            </Link>
          )}
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-4">
              <span className="hidden sm:inline-block text-sm text-slate-500 font-medium">Hi, {user.name}</span>
              <button 
                onClick={handleLogout}
                className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500 hover:text-slate-950"
                title="Logout"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition-colors">Login</Link>
              <Link to="/register" className="btn-primary text-sm !py-2 px-4">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
