import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  BarChart2, 
  Globe, 
  Calendar, 
  ChevronRight, 
  Activity, 
  Target, 
  Search, 
  Bell, 
  Settings, 
  Plus, 
  LogOut, 
  ArrowRight, 
  ShieldCheck, 
  Zap, 
  User, 
  ArrowUpRight,
  TrendingUp,
  Cpu,
  Clock
} from 'lucide-react';
import api from '../api/api';
import { useAuth } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Dashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [history, setHistory] = useState([]);
  const [stats, setStats] = useState({ totalAudits: 0, avgScore: 0 });
  const [loading, setLoading] = useState(true);
  const [scanUrl, setScanUrl] = useState('');
  const [scanning, setScanning] = useState(false);

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

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleQuickScan = async (e) => {
    e.preventDefault();
    if (!scanUrl) return toast.error('Please enter a website URL');
    setScanning(true);
    try {
      const res = await api.post('/audits', { url: scanUrl });
      navigate(`/audit/new`, { state: { auditData: res.data.data } });
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to run audit');
    } finally {
      setScanning(false);
    }
  };

  if (loading) return (
    <div className="min-h-screen bg-[#f4f6f8] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin" />
    </div>
  );

  // Fallback / mock trend data for the chart if history is empty
  const last7Audits = history.length > 0 ? history.slice(0, 7).reverse() : [
    { createdAt: new Date(Date.now() - 6 * 24 * 3600 * 1000), seoScore: 78, metrics: { responseTime: 250 } },
    { createdAt: new Date(Date.now() - 5 * 24 * 3600 * 1000), seoScore: 82, metrics: { responseTime: 200 } },
    { createdAt: new Date(Date.now() - 4 * 24 * 3600 * 1000), seoScore: 80, metrics: { responseTime: 310 } },
    { createdAt: new Date(Date.now() - 3 * 24 * 3600 * 1000), seoScore: 85, metrics: { responseTime: 180 } },
    { createdAt: new Date(Date.now() - 2 * 24 * 3600 * 1000), seoScore: 83, metrics: { responseTime: 210 } },
    { createdAt: new Date(Date.now() - 1 * 24 * 3600 * 1000), seoScore: 88, metrics: { responseTime: 190 } },
    { createdAt: new Date(), seoScore: 92, metrics: { responseTime: 140 } }
  ];

  // Configure chart datasets matching the reference UI (purple/green bars)
  const chartData = {
    labels: last7Audits.map(a => new Date(a.createdAt).toLocaleDateString('en-US', { weekday: 'short' })),
    datasets: [
      {
        label: 'SEO Score',
        data: last7Audits.map(a => a.seoScore),
        backgroundColor: '#c084fc', // Purple color
        borderRadius: 8,
        barThickness: 10,
      },
      {
        label: 'Crawl Speed (100ms)',
        data: last7Audits.map(a => Math.min(Math.round((a.metrics?.responseTime || 250) / 10), 100)),
        backgroundColor: '#86efac', // Light Green color
        borderRadius: 8,
        barThickness: 10,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: '#1e293b',
        titleColor: '#fff',
        bodyColor: '#fff',
        padding: 12,
        borderRadius: 8,
        boxPadding: 4,
      }
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: '#94a3b8',
          font: { size: 11, weight: '500' }
        }
      },
      y: {
        grid: {
          color: '#f1f5f9',
          drawTicks: false,
        },
        border: {
          display: false,
        },
        ticks: {
          color: '#94a3b8',
          font: { size: 11 },
          stepSize: 20,
        },
        min: 0,
        max: 100,
      }
    }
  };

  // Extra stats
  const passedCount = history.filter(a => a.seoScore >= 80).length;
  const passedRate = history.length > 0 ? Math.round((passedCount / history.length) * 100) : 85;

  return (
    <div className="min-h-screen bg-[#f4f6f8] text-slate-800 flex overflow-hidden font-sans">
      
      {/* 1. Left Sidebar Workspace */}
      <aside className="w-64 bg-white border-r border-slate-200/60 p-6 flex flex-col justify-between shrink-0 h-screen sticky top-0">
        <div className="space-y-8">
          {/* Logo Branding */}
          <Link to="/" className="flex items-center gap-3 px-2">
            <div className="w-9 h-9 bg-slate-900 rounded-xl flex items-center justify-center shadow-sm">
              <BarChart2 className="text-white w-5 h-5" />
            </div>
            <span className="text-lg font-black tracking-tight text-slate-950">
              SEO Audit <span className="text-slate-500 font-medium">AI</span>
            </span>
          </Link>

          {/* Nav Items */}
          <nav className="space-y-1.5">
            <Link 
              to="/dashboard" 
              className="flex items-center gap-3 px-4 py-3 rounded-2xl bg-[#d9f99d] text-slate-950 font-bold transition-all duration-300 shadow-sm"
            >
              <BarChart2 className="w-5 h-5 shrink-0" />
              <span>Dashboard</span>
            </Link>
            <Link 
              to="/" 
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-600 hover:bg-slate-50 hover:text-slate-950 font-semibold transition-all duration-300"
            >
              <Plus className="w-5 h-5 shrink-0" />
              <span>New Audit</span>
            </Link>
            <Link 
              to="/dashboard" 
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-600 hover:bg-slate-50 hover:text-slate-950 font-semibold transition-all duration-300"
            >
              <Globe className="w-5 h-5 shrink-0" />
              <span>My Domains</span>
            </Link>
            <Link 
              to="/dashboard" 
              className="flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-600 hover:bg-slate-50 hover:text-slate-950 font-semibold transition-all duration-300"
            >
              <Settings className="w-5 h-5 shrink-0" />
              <span>Settings</span>
            </Link>
          </nav>
        </div>

        {/* Sidebar Footer User Profile */}
        <div className="border-t border-slate-100 pt-6 space-y-4">
          <div className="flex items-center gap-3 px-2">
            <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700 font-bold text-sm">
              {user?.name ? user.name.split(' ').map(n => n[0]).join('') : 'U'}
            </div>
            <div className="min-w-0">
              <h4 className="font-bold text-slate-950 text-sm truncate leading-tight">{user?.name || 'User Name'}</h4>
              <p className="text-xs text-slate-400 truncate">SEO Specialist</p>
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-slate-500 hover:bg-slate-50 hover:text-rose-600 font-semibold transition-all duration-300 text-sm cursor-pointer"
          >
            <LogOut className="w-4 h-4 shrink-0" />
            <span>Log Out</span>
          </button>
        </div>
      </aside>

      {/* 2. Main Area */}
      <main className="flex-grow p-8 overflow-y-auto h-screen">
        
        {/* Workspace Header */}
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-950 tracking-tight mb-1">Dashboard</h1>
            <p className="text-sm font-semibold text-slate-400">
              {new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
            </p>
          </div>

          {/* Quick Actions & Search */}
          <div className="flex items-center gap-4">
            <form onSubmit={handleQuickScan} className="relative w-80">
              <div className="relative flex items-center">
                <input 
                  type="text"
                  placeholder="Scan new domain..."
                  value={scanUrl}
                  onChange={(e) => setScanUrl(e.target.value)}
                  className="w-full pl-10 pr-12 py-2.5 rounded-2xl bg-white border border-slate-200/60 shadow-sm text-sm focus:outline-none focus:border-slate-400 placeholder-slate-400 text-slate-800"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5" />
                <button 
                  type="submit"
                  disabled={scanning}
                  className="absolute right-1.5 p-1.5 rounded-xl bg-slate-900 text-white hover:bg-slate-800 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  {scanning ? (
                    <div className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </form>

            <button className="p-2.5 rounded-2xl bg-white border border-slate-200/60 shadow-sm hover:bg-slate-50 transition-colors text-slate-500 hover:text-slate-800 relative">
              <Bell className="w-5 h-5" />
              <span className="w-1.5 h-1.5 bg-rose-500 rounded-full absolute top-2.5 right-2.5" />
            </button>

            <div className="flex items-center gap-3 bg-white border border-slate-200/60 shadow-sm rounded-2xl px-4 py-2">
              <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-700 font-bold text-xs">
                {user?.name ? user.name.split(' ').map(n => n[0]).join('') : 'U'}
              </div>
              <div className="hidden lg:block text-left">
                <p className="text-xs font-bold text-slate-950 leading-tight">{user?.name || 'User'}</p>
                <p className="text-[10px] text-slate-400 leading-none">Admin</p>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          
          {/* Left / Center Content Column */}
          <div className="xl:col-span-9 space-y-8">
            
            {/* Stat Pastel Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Lavender stat card */}
              <div className="bg-[#ede9fe] rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between h-40">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold uppercase tracking-wider text-purple-700">Total Audits</span>
                  <div className="w-8 h-8 rounded-full bg-white/40 flex items-center justify-center text-purple-700">
                    <Activity className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-black text-purple-950 mb-1">{stats.totalAudits}</h3>
                  <p className="text-xs font-semibold text-purple-600">Across all workspaces</p>
                </div>
              </div>

              {/* Blue stat card */}
              <div className="bg-[#e0f2fe] rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between h-40">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-700">Average SEO Score</span>
                  <div className="w-8 h-8 rounded-full bg-white/40 flex items-center justify-center text-blue-700">
                    <Target className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-black text-blue-950 mb-1">{stats.avgScore}%</h3>
                  <p className="text-xs font-semibold text-blue-600">Overall properties health</p>
                </div>
              </div>

              {/* Green stat card */}
              <div className="bg-[#dcfce7] rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between h-40">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">Passed Checks Rate</span>
                  <div className="w-8 h-8 rounded-full bg-white/40 flex items-center justify-center text-emerald-700">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                </div>
                <div>
                  <h3 className="text-3xl font-black text-emerald-950 mb-1">{passedRate}%</h3>
                  <p className="text-xs font-semibold text-emerald-600">Optimizations achieved</p>
                </div>
              </div>
            </div>

            {/* Performance Charts & Analysis widgets */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
              
              {/* Regular Sell (Chart.js Bar Chart) */}
              <div className="md:col-span-7 bg-white rounded-3xl p-6 border border-slate-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.01)] flex flex-col justify-between">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-lg font-black text-slate-950 tracking-tight">Crawl & SEO Speed</h2>
                    <p className="text-xs font-semibold text-slate-400">Past scan metrics history</p>
                  </div>
                  <div className="flex items-center gap-4 text-xs font-bold">
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#c084fc]" /> SEO Score
                    </span>
                    <span className="flex items-center gap-1.5 text-slate-500">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#86efac]" /> Speed (ms)
                    </span>
                  </div>
                </div>

                <div className="h-56 relative">
                  <Bar data={chartData} options={chartOptions} />
                </div>
              </div>

              {/* More Analysis checklist */}
              <div className="md:col-span-5 bg-white rounded-3xl p-6 border border-slate-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.01)] flex flex-col justify-between">
                <div>
                  <h2 className="text-lg font-black text-slate-950 tracking-tight mb-1">Crawl Analytics</h2>
                  <p className="text-xs font-semibold text-slate-400 mb-6">Diagnose key SEO components</p>

                  <div className="space-y-3">
                    {[
                      { label: "SSL/HTTPS Status", value: "Fully secured", active: true },
                      { label: "Sitemaps Detected", value: "Verified presence", active: true },
                      { label: "Robots.txt Schema", value: "Compliant format", active: true },
                    ].map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center p-3 rounded-2xl bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors cursor-pointer group">
                        <span className="text-sm font-semibold text-slate-700 group-hover:text-slate-950 transition-colors">{item.label}</span>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-950 transition-colors" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-100 pt-4 flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-slate-900 flex items-center justify-center text-[10px] text-white font-bold">G</div>
                    <span className="text-xs font-bold text-slate-500">AI auditor ready</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Domain Table */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.01)]">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-lg font-black text-slate-950 tracking-tight">Recent Audited Websites</h2>
                  <p className="text-xs font-semibold text-slate-400">Track and review detailed audit configurations</p>
                </div>
                <Link to="/" className="text-xs font-bold px-3 py-1.5 rounded-xl bg-slate-50 border border-slate-200/60 hover:bg-slate-100 transition-colors text-slate-800 flex items-center gap-1">
                  New Audit <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {history.length === 0 ? (
                <div className="p-12 text-center border border-dashed border-slate-200 rounded-2xl">
                  <BarChart2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                  <p className="text-sm font-bold text-slate-500 mb-4">No audits found. Run your first website audit today!</p>
                  <Link to="/" className="btn-primary !py-2 px-4 text-sm font-bold">Start First Scan</Link>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-100 text-slate-400 text-xs font-bold tracking-wider">
                        <th className="pb-3 font-semibold">Website URL</th>
                        <th className="pb-3 font-semibold">Date Analyzed</th>
                        <th className="pb-3 font-semibold">Response Speed</th>
                        <th className="pb-3 font-semibold text-right">SEO Score</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50 text-sm">
                      {history.slice(0, 4).map((audit) => (
                        <tr key={audit._id} className="group hover:bg-slate-50/50 transition-colors">
                          <td className="py-4">
                            <Link to={`/audit/${audit._id}`} className="font-bold text-slate-800 hover:text-slate-950 flex items-center gap-2">
                              <Globe className="w-4 h-4 text-slate-400" />
                              <span className="truncate max-w-xs">{audit.websiteURL}</span>
                            </Link>
                          </td>
                          <td className="py-4 text-slate-500 font-semibold">
                            {new Date(audit.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                          </td>
                          <td className="py-4">
                            <span className="inline-flex items-center gap-1 text-slate-600 font-semibold">
                              <Clock className="w-3.5 h-3.5 text-slate-400" />
                              {audit.metrics?.responseTime || 220} ms
                            </span>
                          </td>
                          <td className="py-4 text-right">
                            <Link to={`/audit/${audit._id}`} className="inline-flex items-center gap-3">
                              <span className={`px-2.5 py-1 rounded-full text-xs font-bold border 
                                ${audit.seoScore >= 80 
                                  ? 'bg-emerald-50 text-emerald-700 border-emerald-100' 
                                  : 'bg-amber-50 text-amber-700 border-amber-100'}`}>
                                {audit.seoScore}
                              </span>
                              <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-slate-900 transition-colors" />
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>

          </div>

          {/* Right Sidebar Widgets Column */}
          <div className="xl:col-span-3 space-y-8">
            
            {/* Teal Upgrade banner */}
            <div className="bg-[#0e5c59] text-white rounded-3xl p-6 shadow-sm relative overflow-hidden flex flex-col justify-between h-72">
              <div className="absolute right-0 top-0 w-24 h-24 bg-white/5 rounded-full blur-xl pointer-events-none" />
              
              <div>
                <span className="text-[10px] font-bold tracking-widest uppercase text-[#86efac] mb-2 block">Premium Tier</span>
                <h3 className="text-2xl font-black mb-2 tracking-tight">Upgrade to Pro</h3>
                <p className="text-slate-200/90 text-xs font-medium leading-relaxed max-w-[200px]">
                  Access full developer schema reports, dynamic PDF updates, and raw crawling metrics.
                </p>
              </div>

              <div>
                <p className="text-xl font-black mb-4">$4.20<span className="text-xs font-semibold text-slate-200"> / month</span></p>
                <button className="w-full bg-[#bef264] hover:bg-[#bef264]/95 active:scale-95 text-slate-950 font-bold py-3 rounded-2xl text-xs transition-all duration-300 cursor-pointer shadow-sm shadow-[#bef264]/10">
                  Upgrade Now
                </button>
              </div>
            </div>

            {/* Daily SEO Recommendations list */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.01)]">
              <h3 className="text-base font-black text-slate-950 tracking-tight mb-4 flex items-center justify-between">
                <span>SEO Quick Fixes</span>
                <span className="px-2 py-0.5 rounded-full bg-slate-50 border border-slate-100 text-[10px] font-bold text-slate-500">3 Priority</span>
              </h3>

              <div className="space-y-4">
                {[
                  { title: "Fix missing alt tags", site: "My-Domain.com", category: "On-Page" },
                  { title: "Add description Schema", site: "eCommerce-Store.org", category: "Schema" },
                  { title: "Optimize index speed", site: "Service-Portal.io", category: "Technical" }
                ].map((item, idx) => (
                  <div key={idx} className="flex justify-between items-center p-3 rounded-2xl hover:bg-slate-50 border border-transparent hover:border-slate-100 transition-colors group cursor-pointer">
                    <div>
                      <h4 className="text-xs font-bold text-slate-800 leading-tight mb-0.5 group-hover:text-slate-950 transition-colors">{item.title}</h4>
                      <p className="text-[10px] text-slate-400 font-semibold">{item.site} • {item.category}</p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-slate-900 transition-colors shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            {/* Active team / domains monitor list */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/50 shadow-[0_8px_30px_rgb(0,0,0,0.01)]">
              <h3 className="text-base font-black text-slate-950 tracking-tight mb-4">Domains Monitored</h3>

              <div className="space-y-4">
                {history.length > 0 ? (
                  history.slice(0, 3).map((audit, idx) => (
                    <div key={idx} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-600 font-bold text-xs shrink-0">
                          {audit.websiteURL.replace(/https?:\/\/(www\.)?/, '').slice(0, 2).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-slate-850 truncate leading-tight">{audit.websiteURL.replace(/https?:\/\/(www\.)?/, '')}</h4>
                          <p className="text-[10px] text-slate-400 font-semibold truncate">SEO Audit Score: {audit.seoScore}/100</p>
                        </div>
                      </div>
                      <span className={`w-2 h-2 rounded-full shrink-0 ${audit.seoScore >= 80 ? 'bg-emerald-500' : 'bg-amber-500'}`} />
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 text-xs font-medium text-slate-400">
                    No active domains monitored.
                  </div>
                )}
                
                <Link to="/" className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl bg-blue-50 hover:bg-blue-100/80 text-blue-700 font-bold text-xs transition-all duration-300 mt-2">
                  <Plus className="w-4 h-4" /> Add new domain
                </Link>
              </div>
            </div>

          </div>

        </div>

      </main>

    </div>
  );
};

export default Dashboard;
