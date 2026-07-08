const Footer = () => {
  return (
    <footer className="border-t border-white/10 bg-slate-950 py-12 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xl font-bold tracking-tight">
              SEO Audit <span className="text-blue-500">AI</span>
            </span>
          </div>
          <p className="text-slate-400 max-w-sm mb-6">
            Empowering website owners with AI-driven insights to conquer search engines and grow their online presence.
          </p>
        </div>
        
        <div>
          <h4 className="font-semibold mb-4">Product</h4>
          <ul className="space-y-2 text-slate-400">
            <li><a href="#" className="hover:text-blue-400 transition-colors">Audit Tool</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">AI Engine</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Pricing</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-4">Legal</h4>
          <ul className="space-y-2 text-slate-400">
            <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
            <li><a href="#" className="hover:text-blue-400 transition-colors">Cookie Policy</a></li>
          </ul>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-white/5 text-center text-slate-500 text-sm">
        © {new Date().getFullYear()} SEO Audit AI. Built with transparency and speed.
      </div>
    </footer>
  );
};

export default Footer;
