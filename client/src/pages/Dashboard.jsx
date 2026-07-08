import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BarChart2, Globe, Calendar, ChevronRight, Activity, Target } from 'lucide-react';
import api from '../api/api';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState({ totalAudits: 0, avgScore: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get('/audits/history');
        setHistory(res.data.data);
        setStats(res.data.stats);
      } catch (err) {
        toast.error('Failed to fetch history');
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, []);

  if (loading) return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="h-64 flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-bold mb-2">Workspace Dashboard</h1>
        <p className="text-slate-400">Track and manage your website performance history.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <div className="glass p-6 rounded-2xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
              <Activity className="text-blue-500 w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Total Audits</p>
              <h3 className="text-2xl font-bold">{stats.totalAudits}</h3>
            </div>
          </div>
        </div>

        <div className="glass p-6 rounded-2xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 bg-green-500/10 rounded-xl flex items-center justify-center">
              <Target className="text-green-500 w-6 h-6" />
            </div>
            <div>
              <p className="text-sm text-slate-400">Average SEO Score</p>
              <h3 className="text-2xl font-bold">{stats.avgScore}</h3>
            </div>
          </div>
        </div>
      </div>

      {/* History List */}
      <div className="glass rounded-3xl overflow-hidden">
        <div className="p-8 border-b border-white/5">
          <h2 className="text-xl font-bold">Audit History</h2>
        </div>
        
        {history.length === 0 ? (
          <div className="p-20 text-center">
            <BarChart2 className="w-16 h-16 text-slate-700 mx-auto mb-4" />
            <p className="text-slate-500 mb-8">No audits found. Start your first scan from the home page.</p>
            <Link to="/" className="btn-primary">Analyze a Website</Link>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {history.map((audit) => (
              <Link 
                key={audit._id} 
                to={`/audit/${audit._id}`}
                className="flex items-center justify-between p-6 hover:bg-white/5 transition-colors group"
              >
                <div className="flex items-center gap-6">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center font-bold text-lg
                    ${audit.seoScore >= 80 ? 'bg-green-500/10 text-green-500' : 'bg-yellow-500/10 text-yellow-500'}`}>
                    {audit.seoScore}
                  </div>
                  <div>
                    <h4 className="font-bold mb-1 group-hover:text-blue-400 transition-colors flex items-center gap-2">
                       <Globe className="w-4 h-4 text-slate-500" /> {audit.websiteURL}
                    </h4>
                    <p className="text-sm text-slate-500 flex items-center gap-2">
                      <Calendar className="w-3 h-3" /> {new Date(audit.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className={`hidden sm:inline-block text-xs px-3 py-1 rounded-full border border-white/10`}>
                    {audit.scoreCategory}
                  </span>
                  <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-white transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
