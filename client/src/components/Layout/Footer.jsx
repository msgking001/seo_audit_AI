import { useLocation } from 'react-router-dom';

const Footer = () => {
  const location = useLocation();
  const isWorkspace = location.pathname === '/dashboard' || location.pathname.startsWith('/audit');

  if (isWorkspace) return null;

  return (
    <footer className="border-t border-slate-200/80 bg-slate-50 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xl font-bold tracking-tight text-slate-900">
              SEO Audit <span className="text-slate-500 font-medium">AI</span>
            </span>
          </div>
          <p className="text-slate-500 max-w-sm mb-6 leading-relaxed">
            Empowering website owners with AI-driven insights to conquer search engines and grow their online presence.
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold text-slate-900 mb-4 font-medium">Product</h4>
          <ul className="space-y-2 text-slate-500">
            <li><a href="#" className="hover:text-slate-900 transition-colors">Audit Tool</a></li>
            <li><a href="#" className="hover:text-slate-900 transition-colors">AI Engine</a></li>
            <li><a href="#" className="hover:text-slate-900 transition-colors">Pricing</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-slate-900 mb-4 font-medium">Legal</h4>
          <ul className="space-y-2 text-slate-500">
            <li><a href="#" className="hover:text-slate-900 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-slate-900 transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-slate-900 transition-colors">Cookie Policy</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-slate-200/60 text-center text-slate-400 text-sm">
        © {new Date().getFullYear()} SEO Audit AI. Built with transparency and speed.
      </div>
    </footer>
  );
};

export default Footer;
