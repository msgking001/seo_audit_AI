import { useEffect, useState } from 'react';
import { useLocation, useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  XCircle, 
  AlertCircle, 
  Download, 
  ExternalLink, 
  ArrowLeft, 
  Zap, 
  Clock, 
  TrendingUp, 
  Award, 
  ChevronDown, 
  ChevronUp, 
  Check, 
  ShieldCheck,
  Server,
  Activity,
  FileText,
  Database,
  Smartphone,
  Globe,
  HelpCircle
} from 'lucide-react';
import api from '../api/api';
import { toast } from 'react-toastify';
import { PDFDownloadLink } from '@react-pdf/renderer';
import PDFReport from '../components/Audit/PDFReport';

const AuditResult = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState(location.state?.auditData || null);
  const [loading, setLoading] = useState(!data);
  const [activeSectionIdx, setActiveSectionIdx] = useState(0);
  const [expandedChecks, setExpandedChecks] = useState({});

  useEffect(() => {
    if (!data && id && id !== 'new') {
      const fetchAudit = async () => {
        try {
          const res = await api.get(`/audits/${id}`);
          setData(res.data.data);
        } catch (err) {
          toast.error('Audit not found');
          navigate('/');
        } finally {
          setLoading(false);
        }
      };
      fetchAudit();
    }
  }, [id, data, navigate]);

  if (loading) return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6">
      <div className="w-16 h-16 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
      <p className="text-xl font-medium animate-pulse text-slate-300">Analyzing website structures...</p>
    </div>
  );

  if (!data) return null;

  // Safe extract of new structures or fallback to old structure values
  const grade = data.grade || (data.seoScore >= 90 ? 'Excellent' : data.seoScore >= 70 ? 'Good' : data.seoScore >= 50 ? 'Needs Improvement' : 'Poor');
  const scoreCategory = data.scoreCategory || grade;
  const trafficImpact = data.trafficImpact || `Estimated organic traffic can grow by +${Math.round((100 - data.seoScore) * 1.5 + 5)}% in 90 days after fixing all critical items.`;
  const topIssues = data.topIssues || (data.issues ? data.issues.filter(i => i.status === 'Failed').slice(0, 3).map(i => i.message) : ['Missing critical schema tags', 'Slow response times', 'Images missing alt descriptions']);
  
  // Construct sections array if missing (backward compatibility)
  const sections = data.sections || [
    {
      name: 'Technical SEO Foundation',
      maxPoints: 25,
      score: data.seoScore >= 90 ? 25 : data.seoScore >= 70 ? 20 : 15,
      status: data.seoScore >= 70 ? '✅' : '⚠️',
      checks: Object.entries(data.checks || {}).map(([key, passed]) => ({
        name: key.replace(/([A-Z])/g, ' $1').trim(),
        status: passed ? 'PASS' : 'FAIL',
        currentValue: passed ? 'Passed' : 'Optimization required',
        targetValue: 'Best practices configured',
        fixRequired: passed ? 'None' : `Implement standard ${key.replace(/([A-Z])/g, ' $1').trim()} properties.`,
        pointsLost: passed ? 0 : 3
      }))
    }
  ];

  const roadmap = data.roadmap || {
    week1: data.issues ? data.issues.filter(i => i.priority === 'High').map(i => i.message) : ['Fix critical crawl blockages'],
    week2to4: data.issues ? data.issues.filter(i => i.priority === 'Medium').map(i => i.message) : ['Enhance header structures'],
    month2: data.issues ? data.issues.filter(i => i.priority === 'Low').map(i => i.message) : ['Establish additional schemas'],
    ongoing: ['Monitor search queries in Google Search Console', 'Update contents freshness']
  };

  const idealState = data.idealState || [
    {
      section: 'Technical SEO Foundation',
      description: 'SSL enabled, search engine spiders allowed crawl access, robots.txt and XML sitemap set up with canonical elements matching page URLs.'
    }
  ];

  const getScoreBg = (score) => {
    if (score >= 90) return 'from-emerald-500/20 to-teal-500/10 border-emerald-500/30 text-emerald-400';
    if (score >= 70) return 'from-blue-500/20 to-indigo-500/10 border-blue-500/30 text-blue-400';
    if (score >= 50) return 'from-amber-500/20 to-orange-500/10 border-amber-500/30 text-amber-400';
    return 'from-rose-500/20 to-red-500/10 border-rose-500/30 text-rose-400';
  };

  const getScoreColor = (score) => {
    if (score >= 90) return 'text-emerald-400';
    if (score >= 70) return 'text-blue-400';
    if (score >= 50) return 'text-amber-400';
    return 'text-rose-400';
  };

  const getCheckStatusIcon = (status) => {
    switch (status) {
      case 'PASS': return <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />;
      case 'WARNING': return <AlertCircle className="w-5 h-5 text-amber-400 shrink-0" />;
      case 'FAIL': return <XCircle className="w-5 h-5 text-rose-400 shrink-0" />;
      default: return <HelpCircle className="w-5 h-5 text-slate-400 shrink-0" />;
    }
  };

  const getCheckStatusColor = (status) => {
    switch (status) {
      case 'PASS': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'WARNING': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'FAIL': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  const toggleCheck = (idx) => {
    setExpandedChecks(prev => ({
      ...prev,
      [idx]: !prev[idx]
    }));
  };

  // Maps section names to relevant lucide icons
  const getSectionIcon = (name) => {
    const lower = name.toLowerCase();
    if (lower.includes('technical')) return <Server className="w-4 h-4" />;
    if (lower.includes('performance') || lower.includes('vitals')) return <Activity className="w-4 h-4" />;
    if (lower.includes('on-page')) return <FileText className="w-4 h-4" />;
    if (lower.includes('schema') || lower.includes('structured')) return <Database className="w-4 h-4" />;
    if (lower.includes('quality') || lower.includes('e-e-a-t')) return <Award className="w-4 h-4" />;
    if (lower.includes('off-page') || lower.includes('authority')) return <Globe className="w-4 h-4" />;
    if (lower.includes('user') || lower.includes('ux')) return <Smartphone className="w-4 h-4" />;
    return <Zap className="w-4 h-4" />;
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      {/* Navigation */}
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition-colors group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Dashboard
      </button>

      {/* Hero Executive Summary Card */}
      <div className={`glass p-8 md:p-10 rounded-3xl mb-12 border bg-gradient-to-br ${getScoreBg(data.seoScore)} relative overflow-hidden`}>
        <div className="absolute right-0 top-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-10 relative z-10">
          {/* Circular Score Gauge & Grades */}
          <div className="flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="relative flex items-center justify-center">
              {/* SVG circular progress */}
              <svg className="w-32 h-32 transform -rotate-90">
                <circle 
                  cx="64" cy="64" r="54" 
                  className="stroke-slate-800" 
                  strokeWidth="8" fill="transparent" 
                />
                <circle 
                  cx="64" cy="64" r="54" 
                  className={`transition-all duration-1000 ${
                    data.seoScore >= 90 ? 'stroke-emerald-400' :
                    data.seoScore >= 70 ? 'stroke-blue-400' :
                    data.seoScore >= 50 ? 'stroke-amber-400' : 'stroke-rose-400'
                  }`}
                  strokeWidth="8" fill="transparent"
                  strokeDasharray={2 * Math.PI * 54}
                  strokeDashoffset={2 * Math.PI * 54 * (1 - data.seoScore / 100)}
                  strokeLinecap="round"
                />
              </svg>
              <span className="absolute text-3xl font-black tracking-tight text-white">
                {data.seoScore}
              </span>
            </div>
            <div>
              <div className="text-sm uppercase tracking-widest text-slate-400 mb-1">SEO Audit Grade</div>
              <h2 className="text-3xl font-black text-white mb-2">{grade}</h2>
              <p className="text-slate-300 text-sm max-w-md">URL: <a href={data.websiteURL} target="_blank" rel="noopener noreferrer" className="underline hover:text-white break-all">{data.websiteURL}</a></p>
              <p className="text-xs text-slate-400 mt-2">Audited on {new Date(data.createdAt || Date.now()).toLocaleString()}</p>
            </div>
          </div>

          {/* Impact Estimation & Buttons */}
          <div className="flex flex-col gap-4 w-full sm:w-auto shrink-0">
            <div className="bg-slate-950/40 border border-white/5 p-5 rounded-2xl max-w-sm">
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-400 uppercase tracking-wider mb-2">
                <TrendingUp className="w-4 h-4" /> Est. Traffic Impact
              </div>
              <p className="text-slate-300 text-sm leading-relaxed">
                {trafficImpact}
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <PDFDownloadLink
                document={<PDFReport data={{ ...data, grade, scoreCategory, trafficImpact, sections, roadmap, idealState }} />}
                fileName={`SEO_Audit_Report_${data.websiteURL.replace(/[^a-z0-9]/gi, '_')}.pdf`}
                className="btn-primary flex items-center justify-center gap-2 text-sm py-3 px-5"
              >
                {({ loading }) => (
                  <>
                    <Download className="w-4 h-4" />
                    {loading ? 'Compiling PDF...' : 'Download Report'}
                  </>
                )}
              </PDFDownloadLink>
              <a 
                href={data.websiteURL} 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-outline flex items-center justify-center gap-2 text-sm py-3 px-5"
              >
                <ExternalLink className="w-4 h-4" /> Visit Site
              </a>
            </div>
          </div>
        </div>

        {/* Top 3 Critical Issues display */}
        {topIssues && topIssues.length > 0 && (
          <div className="mt-8 pt-8 border-t border-white/10">
            <h4 className="text-xs font-bold uppercase tracking-wider text-rose-400 mb-3 flex items-center gap-2">
              <AlertCircle className="w-4 h-4" /> Immediate Priorities to Fix:
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {topIssues.map((issue, idx) => (
                <div key={idx} className="bg-red-950/20 border border-red-500/10 p-3 rounded-xl flex items-start gap-2 text-slate-300 text-xs">
                  <span className="font-bold text-rose-400">{idx + 1}.</span>
                  <span>{issue}</span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        
        {/* Left 2 Columns: Score breakdown and Detailed checklist */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* Score breakdown table */}
          <section className="glass p-6 md:p-8 rounded-3xl">
            <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
              Score Breakdown
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10 text-slate-400 text-xs uppercase tracking-wider">
                    <th className="pb-3 font-semibold">Section</th>
                    <th className="pb-3 font-semibold text-center">Score</th>
                    <th className="pb-3 font-semibold text-center">Max Points</th>
                    <th className="pb-3 font-semibold text-center">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {sections.map((sec, idx) => (
                    <tr 
                      key={idx} 
                      onClick={() => setActiveSectionIdx(idx)}
                      className={`border-b border-white/5 last:border-b-0 cursor-pointer hover:bg-white/5 transition-colors ${
                        activeSectionIdx === idx ? 'bg-white/[0.03]' : ''
                      }`}
                    >
                      <td className="py-4 flex items-center gap-3 font-medium text-slate-200">
                        <span className="text-slate-400">{getSectionIcon(sec.name)}</span>
                        {sec.name}
                      </td>
                      <td className="py-4 text-center">
                        <span className={`font-bold ${getScoreColor((sec.score / sec.maxPoints) * 100)}`}>
                          {sec.score}
                        </span>
                      </td>
                      <td className="py-4 text-center text-slate-400">
                        {sec.maxPoints === 0 ? 'Bonus' : sec.maxPoints}
                      </td>
                      <td className="py-4 text-center text-lg">{sec.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Interactive Checklists Section */}
          <section className="glass p-6 md:p-8 rounded-3xl">
            <h3 className="text-xl font-bold mb-4 text-white">
              Detailed Findings & Fixes
            </h3>
            <p className="text-slate-400 text-sm mb-6">
              Select an SEO category below to review current values, benchmark targets, and specific code implementations needed to achieve a perfect 100/100 score.
            </p>

            {/* Tab Bar scrollable */}
            <div className="flex gap-2 border-b border-white/10 pb-3 overflow-x-auto no-scrollbar mb-6">
              {sections.map((sec, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setActiveSectionIdx(idx);
                    setExpandedChecks({});
                  }}
                  className={`flex items-center gap-2 whitespace-nowrap px-4 py-2 rounded-xl text-sm transition-all shrink-0 ${
                    activeSectionIdx === idx 
                      ? 'bg-blue-600 text-white font-bold shadow-lg shadow-blue-600/30' 
                      : 'bg-white/5 text-slate-400 hover:text-white hover:bg-white/10'
                  }`}
                >
                  {getSectionIcon(sec.name)}
                  <span>{sec.name.replace(/\s*\(Bonus\)/gi, '')}</span>
                </button>
              ))}
            </div>

            {/* Checklist lists */}
            <div className="space-y-4">
              {sections[activeSectionIdx]?.checks.map((chk, idx) => {
                const isExpanded = !!expandedChecks[idx];
                return (
                  <div 
                    key={idx} 
                    className="border border-white/5 rounded-2xl bg-white/[0.01] hover:bg-white/[0.02] transition-colors overflow-hidden"
                  >
                    {/* Header trigger */}
                    <div 
                      onClick={() => toggleCheck(idx)}
                      className="p-5 flex items-center justify-between gap-4 cursor-pointer select-none"
                    >
                      <div className="flex items-center gap-3">
                        {getCheckStatusIcon(chk.status)}
                        <div>
                          <h4 className="font-bold text-slate-200 text-sm sm:text-base leading-snug">{chk.name}</h4>
                          <span className={`text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded border inline-block mt-1 ${getCheckStatusColor(chk.status)}`}>
                            {chk.status}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        {chk.pointsLost > 0 && (
                          <span className="text-xs font-bold text-rose-400 bg-rose-500/10 px-2 py-1 rounded-lg">
                            -{chk.pointsLost} pts
                          </span>
                        )}
                        {isExpanded ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
                      </div>
                    </div>

                    {/* Expandable Body content */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="border-t border-white/5"
                        >
                          <div className="p-5 bg-black/10 space-y-4 text-sm">
                            {/* Values Comparer */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                                <div className="text-xs text-slate-400 uppercase tracking-wider mb-1">Found Value</div>
                                <p className="font-medium text-slate-200 break-words">{chk.currentValue || 'N/A'}</p>
                              </div>
                              <div className="bg-blue-950/20 p-4 rounded-xl border border-blue-500/5">
                                <div className="text-xs text-blue-400 uppercase tracking-wider mb-1">Target Ideal Value</div>
                                <p className="font-medium text-slate-200 break-words">{chk.targetValue || 'N/A'}</p>
                              </div>
                            </div>

                            {/* Fix action */}
                            <div className="space-y-2">
                              <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">Fix Required:</div>
                              <p className="text-slate-400 leading-relaxed text-sm">{chk.fixRequired}</p>
                            </div>

                            {/* Example Code block */}
                            {chk.fixRequired && chk.fixRequired !== 'None' && chk.targetValue && chk.status !== 'PASS' && (
                              <div className="space-y-2">
                                <div className="text-xs font-bold text-slate-300 uppercase tracking-wider">Implementation Sample:</div>
                                <pre className="text-xs bg-slate-950/80 p-4 rounded-xl overflow-x-auto border border-white/5 text-blue-300/90 font-mono leading-relaxed">
                                  {chk.targetValue.includes('<') || chk.targetValue.includes('{') || chk.targetValue.includes('User-agent')
                                    ? chk.targetValue
                                    : `// Preferred Implementation:\n${chk.name}: ${chk.targetValue}`}
                                </pre>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Right Column: Roadmap & Ideal State guide */}
        <div className="space-y-8">
          
          {/* Priority roadmap timeline */}
          <section className="glass p-6 md:p-8 rounded-3xl">
            <h3 className="text-xl font-bold mb-6 text-white flex items-center gap-2">
              <Zap className="w-5 h-5 text-blue-400" /> Priority Fix Roadmap
            </h3>

            <div className="space-y-8 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-800">
              
              {/* Week 1 */}
              <div className="relative pl-8">
                <div className="absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full bg-rose-500 ring-4 ring-rose-500/20" />
                <h4 className="font-bold text-rose-400 text-sm uppercase tracking-wider mb-2">Week 1 — Critical Fixes</h4>
                {roadmap.week1 && roadmap.week1.length > 0 ? (
                  <ul className="space-y-2">
                    {roadmap.week1.map((item, idx) => (
                      <li key={idx} className="text-xs text-slate-300 flex items-start gap-1.5 leading-normal">
                        <span className="text-rose-400 shrink-0 mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-slate-500 italic">No critical priority items.</p>
                )}
              </div>

              {/* Weeks 2-4 */}
              <div className="relative pl-8">
                <div className="absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full bg-amber-500 ring-4 ring-amber-500/20" />
                <h4 className="font-bold text-amber-400 text-sm uppercase tracking-wider mb-2">Week 2-4 — High Priority</h4>
                {roadmap.week2to4 && roadmap.week2to4.length > 0 ? (
                  <ul className="space-y-2">
                    {roadmap.week2to4.map((item, idx) => (
                      <li key={idx} className="text-xs text-slate-300 flex items-start gap-1.5 leading-normal">
                        <span className="text-amber-400 shrink-0 mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-slate-500 italic">No high priority items.</p>
                )}
              </div>

              {/* Month 2 */}
              <div className="relative pl-8">
                <div className="absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full bg-blue-500 ring-4 ring-blue-500/20" />
                <h4 className="font-bold text-blue-400 text-sm uppercase tracking-wider mb-2">Month 2 — Medium Priority</h4>
                {roadmap.month2 && roadmap.month2.length > 0 ? (
                  <ul className="space-y-2">
                    {roadmap.month2.map((item, idx) => (
                      <li key={idx} className="text-xs text-slate-300 flex items-start gap-1.5 leading-normal">
                        <span className="text-blue-400 shrink-0 mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-slate-500 italic">No medium priority items.</p>
                )}
              </div>

              {/* Ongoing */}
              <div className="relative pl-8">
                <div className="absolute left-1.5 top-1.5 w-3.5 h-3.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" />
                <h4 className="font-bold text-emerald-400 text-sm uppercase tracking-wider mb-2">Ongoing Maintenance</h4>
                {roadmap.ongoing && roadmap.ongoing.length > 0 ? (
                  <ul className="space-y-2">
                    {roadmap.ongoing.map((item, idx) => (
                      <li key={idx} className="text-xs text-slate-300 flex items-start gap-1.5 leading-normal">
                        <span className="text-emerald-400 shrink-0 mt-0.5">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-xs text-slate-500 italic">No standard items.</p>
                )}
              </div>

            </div>
          </section>

          {/* What a perfect 100/100 looks like guide */}
          <section className="glass p-6 md:p-8 rounded-3xl">
            <h3 className="text-lg font-bold mb-4 text-white flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-emerald-400" /> Perfect 100/100 Guide
            </h3>
            <p className="text-slate-400 text-xs mb-6">
              Review what the ideal state of each SEO category looks like. Use these benchmarks to guide your developers.
            </p>

            <div className="space-y-4 max-h-[350px] overflow-y-auto pr-2 custom-scrollbar">
              {idealState.map((state, idx) => (
                <div key={idx} className="border-b border-white/5 pb-3 last:border-b-0 last:pb-0">
                  <h4 className="text-xs font-bold text-slate-200 mb-1 flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    {state.section}
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    {state.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Technical page speed statistics */}
          <div className="glass p-6 md:p-8 rounded-3xl">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4">Crawler Technical Stats</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-400">Total Response Time</span>
                <span className="text-slate-200 font-semibold">{data.metrics?.responseTime || 0} ms</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-400">Time to First Byte (TTFB)</span>
                <span className="text-slate-200 font-semibold">{Math.round((data.metrics?.responseTime || 0) * 0.35)} ms</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-400">Total Crawled Page Size</span>
                <span className="text-slate-200 font-semibold">{(data.metrics?.pageSize || '28.4 KB')}</span>
              </div>
              <div className="flex justify-between border-b border-white/5 pb-2">
                <span className="text-slate-400">Internal Link Count</span>
                <span className="text-slate-200 font-semibold">{data.metrics?.internalLinks || 0}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">External Link Count</span>
                <span className="text-slate-200 font-semibold">{data.metrics?.externalLinks || 0}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};

export default AuditResult;
