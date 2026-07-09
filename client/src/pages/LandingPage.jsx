import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Search, Zap, Shield, BarChart, Globe, Cpu, FileText, CheckCircle } from 'lucide-react';
import api from '../api/api';
import { toast } from 'react-toastify';

const LandingPage = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAudit = async (e) => {
    e.preventDefault();
    if (!url) return toast.error('Please enter a website URL');
    
    setLoading(true);
    try {
      const res = await api.post('/audits', { url });
      navigate(`/audit/new`, { state: { auditData: res.data.data } });
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to run audit');
    } finally {
      setLoading(false);
    }
  };

  const features = [
    { icon: <BarChart className="w-6 h-6 text-blue-400" />, title: 'SEO Score Analysis', desc: 'Real-time calculation of your website\'s health score out of 100.' },
    { icon: <Shield className="w-6 h-6 text-green-400" />, title: 'Security Audit', desc: 'Checks for HTTPS and SSRF protection to keep your site safe.' },
    { icon: <Cpu className="w-6 h-6 text-purple-400" />, title: 'AI Recommendations', desc: 'Powered by Gemini, receive specific fixes for every SEO issue.' },
    { icon: <Globe className="w-6 h-6 text-yellow-400" />, title: 'Social & Metadata', desc: 'Analyzes Title, Meta tags, and Open Graph for social platforms.' },
    { icon: <FileText className="w-6 h-6 text-pink-400" />, title: 'Sitemap & Robots', desc: 'Validates presence of essential crawlability files.' },
    { icon: <Zap className="w-6 h-6 text-cyan-400" />, title: 'Page Metrics', desc: 'Monitors response times and internal/external link structures.' },
  ];

  return (
    <div className="pb-24">
      {/* Hero Section */}
      <section className="relative pt-24 pb-32 px-6 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-slate-200/50 blur-[120px] rounded-full -z-10" />
        
        <div className="max-w-5xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-extrabold mb-8 leading-tight tracking-tight text-slate-900"
          >
            Analyze Your Website <br />
            <span className="text-slate-800">SEO in Seconds</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-slate-500 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Get a complete SEO audit, discover issues affecting rankings, and receive AI-powered recommendations to improve your website visibility.
          </motion.p>

          <motion.form 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleAudit}
            className="relative max-w-2xl mx-auto mb-16"
          >
            <div className="flex items-center glass p-2 rounded-2xl border border-slate-200 shadow-lg shadow-slate-100/50">
              <input
                type="text"
                placeholder="https://yourwebsite.com"
                className="flex-grow bg-transparent border-none focus:ring-0 focus:outline-none px-6 py-4 text-lg text-slate-800 placeholder-slate-400 font-medium"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
              <button 
                type="submit"
                disabled={loading}
                className="btn-primary flex items-center gap-2 cursor-pointer shadow-md py-4 px-6"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Search className="w-5 h-5" /> Start Free Audit
                  </>
                )}
              </button>
            </div>
          </motion.form>

          <div className="flex flex-wrap justify-center gap-8 text-slate-400 text-sm font-semibold">
            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-slate-700" /> No credit card required</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-slate-700" /> AI-Powered fixes</span>
            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-slate-700" /> PDF Reports</span>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="px-6 py-24 bg-slate-50 border-y border-slate-200/50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-center text-slate-900 mb-16 tracking-tight">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[ 
              { step: '01', title: 'Enter URL', desc: 'Provide your website address to start scanning.' },
              { step: '02', title: 'Run Audit', desc: 'Our engine crawls and analyzes top SEO factors.' },
              { step: '03', title: 'Review Report', desc: 'Get a detailed score and issue list.' },
              { step: '04', title: 'Fix Issues', desc: 'Follow AI suggestions to improve ranking.' }
            ].map((s, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl font-black text-slate-200 mb-4">{s.step}</div>
                <h3 className="text-xl font-bold mb-2 text-slate-900 tracking-tight">{s.title}</h3>
                <p className="text-slate-500 font-medium">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-black text-center text-slate-900 mb-16 tracking-tight">Professional SEO Analysis Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="glass p-8 rounded-2xl border border-slate-200/60 shadow-sm"
              >
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6">
                  {f.icon}
                </div>
                <h3 className="text-xl font-bold mb-4 text-slate-900 tracking-tight">{f.title}</h3>
                <p className="text-slate-500 leading-relaxed font-medium">
                  {f.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
