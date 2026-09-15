import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  AlertOctagon,
  Lock,
  ArrowRight,
  CheckCircle2,
  Search,
  Plus,
  ChevronRight,
  Microscope,
  Award,
  ShieldCheck
} from 'lucide-react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import KpiCard from '../common/KpiCard';
import SpotlightCard from '../common/SpotlightCard';
import {
  CLINICAL_TRIALS,
  REVENUE_AND_ENROLLMENT_CHART_DATA,
  LIFECYCLE_FUNNEL_DATA,
  BLOCKCHAIN_AUDIT_LOG,
  INSTITUTION_INFO
} from '../../data/mockData';
import { getPersonalizedDashboard } from '../../data/roleDashboardConfig';
import { getTranslations } from '../../i18n';

export default function DashboardView({
  onSelectTrial,
  onNavigate,
  onOpenNewStudyModal,
  currentRole,
  currentUserName,
  currentUserEmail,
  trials = CLINICAL_TRIALS,
  livePortfolio,
  registeredProtocols = [],
  onAdvanceProtocol,
  language = 'en'
}) {
  const [phaseFilter, setPhaseFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeLabTab, setActiveLabTab] = useState("curcumin");
  const [copiedRoot, setCopiedRoot] = useState(false);
  const isRegulator = currentRole === 'regulator';
  const roleConfig = getPersonalizedDashboard(currentRole, currentUserName, currentUserEmail);
  const t = getTranslations(language);
  const roleTitle = t.roleTitles?.[currentRole] || roleConfig.title;

  const assignedCodes = new Set((roleConfig.assignedTrials || []).map((trial) => trial.code));
  const isScopedRole = currentRole === 'crc' || currentRole === 'cra';
  const filteredTrials = trials.filter(t => {
    const matchesAssignment = !isScopedRole || assignedCodes.has(t.code);
    const matchesPhase = phaseFilter === "ALL" || t.phase.includes(phaseFilter);
    const matchesQuery = t.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         t.shortTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         t.pi.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         t.ctriNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesAssignment && matchesPhase && matchesQuery;
  });
  const liveKpis = livePortfolio?.kpis;
  const liveAlerts = livePortfolio?.alerts || [];

  const handleCopyMerkleRoot = () => {
    navigator.clipboard.writeText(INSTITUTION_INFO.currentMerkleRoot);
    setCopiedRoot(true);
    setTimeout(() => setCopiedRoot(false), 2000);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">

      {/* ===================================================================
          HEADER — institution identity, role context, primary action.
          No hero photography or glow — an institutional letterhead band.
          =================================================================== */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl bg-walnut-900 border border-walnut-800 relative overflow-hidden"
      >
        {/* subtle geometric motif — a single restrained line, not a pattern field */}
        <div className="absolute inset-y-0 right-0 w-64 opacity-[0.06] pointer-events-none hidden md:block" aria-hidden="true">
          <svg width="100%" height="100%" viewBox="0 0 200 200" preserveAspectRatio="xMidYMid slice">
            <circle cx="140" cy="60" r="90" fill="none" stroke="#B08D57" strokeWidth="1.5" />
            <circle cx="140" cy="60" r="60" fill="none" stroke="#B08D57" strokeWidth="1.5" />
          </svg>
        </div>

        <div className="relative z-10 p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest bg-copper-800/60 text-copper-200 border border-copper-600/40">
                {roleConfig.badge}
              </span>
              <span className="px-2.5 py-1 rounded-md text-[10px] font-semibold uppercase tracking-wider bg-walnut-800 text-stone-300 border border-walnut-700">
                {currentRole.toUpperCase()} {t.access}
              </span>
              <span className="hidden sm:inline-flex items-center gap-1.5 text-xs text-stone-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-sage-400 animate-status-breathe" />
                {roleConfig.highlight || 'AIIA CTMS live'}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-tight">
              {roleConfig.welcomeName.split(' ').slice(0, 2).join(' ')} — <span className="text-gold-300">{roleTitle}</span>
            </h1>

            <p className="text-sm text-stone-300 leading-relaxed max-w-xl">
              {currentRole === 'admin' && language === 'hi'
                ? 'आप पूरे संस्थान के क्लिनिकल रिसर्च पोर्टफोलियो, सुरक्षा स्थिति, सिस्टम अखंडता और संचालन की निगरानी कर रहे हैं।'
                : currentRole === 'admin' && language === 'ta'
                  ? 'நிறுவனத்தின் மருத்துவ ஆராய்ச்சி தொகுப்பு, பாதுகாப்பு நிலை, அமைப்பு ஒருமைப்பாடு மற்றும் செயல்பாடுகளை நீங்கள் நிர்வகிக்கிறீர்கள்.'
                  : roleConfig.summary}
            </p>

            <div className="pt-1 flex items-center gap-2 flex-wrap text-[11px] text-stone-300">
              {roleConfig.highlights.map((item) => (
                <span key={item} className="px-2.5 py-1 rounded-md bg-walnut-800/70 border border-walnut-700 font-mono">
                  {item}
                </span>
              ))}
            </div>
          </div>

          {!isRegulator && (
            <button
              onClick={onOpenNewStudyModal}
              className="shrink-0 px-5 py-2.5 rounded-lg bg-copper-600 hover:bg-copper-500 text-white font-semibold text-xs flex items-center justify-center gap-2 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>{t.openWorkflow}</span>
            </button>
          )}
        </div>
      </motion.div>

      {currentRole === 'crc' && registeredProtocols.filter((protocol) => protocol.workflowStatus === 'site_activation').length > 0 && (
        <div className="rounded-2xl border-2 border-copper-200 bg-white overflow-hidden">
          <div className="p-5 border-b border-copper-200 bg-copper-50"><h3 className="text-base font-bold text-ink-900">Protocol Requests for Coordinator</h3><p className="text-xs text-ink-600 mt-1">Site activation is complete. Start patient screening and gated enrollment for the approved protocol.</p></div>
          <div className="divide-y divide-stone-100">{registeredProtocols.filter((protocol) => protocol.workflowStatus === 'site_activation').map((protocol) => <div key={protocol.id} className="p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"><div><span className="font-mono text-xs font-bold text-copper-800">{protocol.code}</span><h4 className="text-sm font-bold text-ink-900 mt-1">{protocol.title}</h4><p className="text-xs text-ink-500 mt-1">Status: site_activation · Ready for coordinator action</p></div><button onClick={() => onAdvanceProtocol(protocol.id, 'actively_enrolling')} className="px-4 py-2 rounded-lg bg-copper-700 hover:bg-copper-800 text-white text-xs font-bold shrink-0">Start enrollment</button></div>)}</div>
        </div>
      )}

      {liveKpis && (
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            [language === 'hi' ? 'सक्रिय अध्ययन' : language === 'ta' ? 'செயலில் உள்ள ஆய்வுகள்' : 'Active studies', liveKpis.active_studies],
            [language === 'hi' ? 'नामांकन' : language === 'ta' ? 'சேர்க்கை' : 'Enrollment', `${liveKpis.enrollment_percent}%`],
            ['CTRI ' + (language === 'hi' ? 'लंबित' : language === 'ta' ? 'நிலுவை' : 'pending'), liveKpis.ctri_pending],
            ['IEC ' + (language === 'hi' ? 'लंबित' : language === 'ta' ? 'நிலுவை' : 'pending'), liveKpis.iec_pending],
            [language === 'hi' ? 'ऑडिट इवेंट' : language === 'ta' ? 'தணிக்கை நிகழ்வுகள்' : 'Audit events', liveKpis.audit_events],
          ].map(([label, value]) => (
            <div key={label} className="rounded-xl border border-stone-200 bg-ivory-50 px-4 py-3">
              <p className="text-[10px] font-bold uppercase tracking-wider text-ink-400">{label}</p>
              <p className="mt-1 text-xl font-bold text-ink-900">{value}</p>
              <p className="text-[10px] text-sage-700">{t.liveFromDatabase}</p>
            </div>
          ))}
        </div>
      )}

      {/* ===================================================================
          ROLE-RELEVANT SUMMARY
          Keep only the context that matches this persona and remove the extra
          image-heavy, generic dashboard blocks.
          =================================================================== */}
      <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-6">
        <SpotlightCard>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-ink-400">{t.actionRequired}</p>
              <h3 className="text-base font-bold text-ink-900">{t.priorityQueue}</h3>
            </div>
            <span className="rounded-full bg-crimson-50 text-crimson-700 border border-crimson-200 px-2 py-1 text-[10px] font-bold">{liveAlerts.length || roleConfig.alerts.length} {t.items}</span>
          </div>
          <div className="space-y-3">
            {(liveAlerts.length ? liveAlerts.map((alert) => ({
              title: alert.type,
              detail: alert.message,
              severity: alert.severity,
              action: 'Open workflow',
              icon: alert.severity === 'high' ? AlertOctagon : ShieldCheck,
            })) : roleConfig.alerts).map((alert) => {
              const Icon = alert.icon;
              return (
                <div key={alert.title} className="flex gap-3 items-start rounded-xl border border-stone-200 bg-ivory-100 p-3">
                  <div className="p-2 rounded-lg bg-ivory-50 border border-stone-200 text-ink-700">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-sm font-bold text-ink-900">{alert.title}</h4>
                      <span className="text-[9px] font-bold uppercase px-2 py-0.5 rounded-full bg-amber-50 text-amber-700 border border-amber-200">{alert.severity}</span>
                    </div>
                    <p className="text-xs text-ink-600 mt-1">{alert.detail}</p>
                    <button className="mt-2 text-[11px] font-bold text-copper-700 hover:text-copper-800">{alert.action}</button>
                  </div>
                </div>
              );
            })}
          </div>
        </SpotlightCard>

        <SpotlightCard>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-ink-400">{t.notifications}</p>
              <h3 className="text-base font-bold text-ink-900">{t.recentUpdates}</h3>
            </div>
            <span className="rounded-full bg-sage-50 text-sage-700 border border-sage-200 px-2 py-1 text-[10px] font-bold">Live</span>
          </div>
          <div className="space-y-3">
            {roleConfig.notifications.map((notification) => (
              <div key={notification.title} className="flex items-start gap-3 rounded-xl border border-stone-200 bg-ivory-100 p-3">
                <span className={`mt-1 h-2.5 w-2.5 rounded-full shrink-0 ${notification.tone === 'warning' ? 'bg-amber-500' : notification.tone === 'success' ? 'bg-sage-500' : 'bg-copper-500'}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-ink-900">{notification.title}</p>
                  <p className="text-[11px] text-ink-400 mt-0.5">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>
        </SpotlightCard>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-[1.1fr_0.9fr] gap-6">
        <SpotlightCard>
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-ink-400">Tasks</p>
              <h3 className="text-base font-bold text-ink-900">Assigned worklist</h3>
            </div>
          </div>
          <div className="space-y-2.5">
            {roleConfig.tasks.map((task) => (
              <div key={task.title} className="flex items-start justify-between gap-3 rounded-xl border border-stone-200 bg-ivory-50 p-3">
                <div>
                  <h4 className="text-sm font-bold text-ink-900">{task.title}</h4>
                  <p className="text-xs text-ink-500 mt-0.5">{task.meta}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-[10px] uppercase tracking-wider text-amber-700 font-bold">{task.due}</p>
                  <p className="text-[11px] text-ink-600 mt-1">{task.action}</p>
                </div>
              </div>
            ))}
          </div>
        </SpotlightCard>

        <SpotlightCard>
          <div className="mb-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-ink-400">Overview</p>
            <h3 className="text-base font-bold text-ink-900">Operational snapshot</h3>
          </div>

          <div className="space-y-3">
            {roleConfig.assignedTrials.map((trial) => (
              <div key={trial.code} className="rounded-lg bg-ivory-100 border border-stone-200 p-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-bold text-ink-900 text-xs">{trial.code}</span>
                  <span className="text-[9px] uppercase px-1.5 py-0.5 rounded-full bg-sage-50 text-sage-700 border border-sage-200">{trial.status}</span>
                </div>
                <p className="text-[11px] text-ink-600 mt-1">{trial.title}</p>
                <p className="text-[10px] text-ink-400 mt-1">{trial.site} • {trial.phase}</p>
                <p className="text-[10px] text-ink-700 mt-1">{trial.nextMilestone}</p>
              </div>
            ))}
          </div>
        </SpotlightCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-ivory-50 rounded-2xl border border-stone-200 p-6 shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-ink-400">Trend</p>
              <h3 className="text-base font-bold text-ink-900">{roleConfig.chart.label}</h3>
            </div>
            <span className="rounded-full bg-sage-50 text-sage-700 border border-sage-200 px-2 py-1 text-[10px] font-bold">Live</span>
          </div>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={roleConfig.chart.data}>
                <defs>
                  <linearGradient id="roleGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#526B57" stopOpacity={0.35} />
                    <stop offset="95%" stopColor="#526B57" stopOpacity={0.04} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#EAE1D7" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#6F665F' }} />
                <YAxis tickLine={false} axisLine={false} tick={{ fontSize: 11, fill: '#6F665F' }} />
                <Tooltip contentStyle={{ borderRadius: 10, border: '1px solid #DDD5CA', fontSize: 12 }} />
                <Area type="monotone" dataKey="value" stroke="#526B57" strokeWidth={2} fill="url(#roleGradient)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-ivory-50 rounded-2xl border border-stone-200 p-6 shadow-[var(--shadow-card)]">
          <div className="mb-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-ink-400">Deadlines</p>
            <h3 className="text-base font-bold text-ink-900">Upcoming checks</h3>
          </div>
          <div className="space-y-3">
            {roleConfig.upcomingDeadlines.map((item) => (
              <div key={item.label} className="flex items-center justify-between gap-3 rounded-xl border border-stone-200 bg-ivory-100 p-3">
                <span className="text-xs text-ink-700">{item.label}</span>
                <span className="text-[10px] font-bold uppercase text-amber-700">{item.due}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end pb-2">
        <button
          onClick={() => onNavigate('dashboard')}
          className="px-4 py-2 rounded-lg bg-walnut-800 hover:bg-walnut-700 text-white text-xs font-semibold"
        >
          Refresh overview
        </button>
      </div>

      {/* ===================================================================
          CLINICAL TRIALS PORTFOLIO TABLE
          =================================================================== */}
      <div className="bg-ivory-50 rounded-2xl border border-stone-200 shadow-[var(--shadow-card)] overflow-hidden">
        <div className="p-6 border-b border-stone-200 bg-ivory-100/60 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-sm font-bold text-ink-900">AIIA Clinical Trial Protocols Portfolio</h2>
            <p className="text-xs text-ink-500">Comprehensive trial records, CTRI registration status, and recruitment progress</p>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-ink-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter trials..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 bg-ivory-50 border border-stone-300 rounded-lg text-xs text-ink-900 placeholder-ink-400 focus:outline-none focus:ring-2 focus:ring-copper-400 w-48"
              />
            </div>

            <div className="flex items-center bg-stone-100 p-1 rounded-lg text-xs font-semibold">
              {["ALL", "Phase I", "Phase II", "Phase III", "Phase IV"].map((ph) => (
                <button
                  key={ph}
                  onClick={() => setPhaseFilter(ph)}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    phaseFilter === ph ? 'bg-ivory-50 text-ink-900 shadow-[var(--shadow-card)]' : 'text-ink-500 hover:text-ink-900'
                  }`}
                >
                  {ph}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-ivory-100 border-b border-stone-200 text-[11px] font-bold uppercase tracking-wider text-ink-500">
                <th className="py-3.5 px-4">Protocol ID &amp; Title</th>
                <th className="py-3.5 px-4">Phase &amp; Domain</th>
                <th className="py-3.5 px-4">Principal Investigator</th>
                <th className="py-3.5 px-4">CTRI Registration Gate</th>
                <th className="py-3.5 px-4">IEC Approval</th>
                <th className="py-3.5 px-4">Enrollment Progress</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100">
              {filteredTrials.map((t) => {
                const percent = Math.round((t.currentEnrollment / t.targetEnrollment) * 100);
                return (
                  <tr
                    key={t.id}
                    className="hover:bg-copper-50/30 transition-colors group cursor-pointer"
                    onClick={() => onSelectTrial(t.id)}
                  >
                    <td className="py-3.5 px-4 max-w-xs">
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-copper-800 bg-copper-50 px-2.5 py-0.5 rounded-md border border-copper-200">
                          {t.code}
                        </span>
                        {t.criticalSaeAlert && (
                          <span className="w-2 h-2 rounded-full bg-crimson-500 animate-status-breathe" title="Critical SAE Pending" />
                        )}
                      </div>
                      <p className="font-semibold text-ink-900 mt-1 line-clamp-1 group-hover:text-copper-700 transition-colors">
                        {t.shortTitle}
                      </p>
                      <p className="text-[11px] text-ink-500 line-clamp-1 mt-0.5">{t.formulation}</p>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="font-bold text-ink-800">{t.phase}</span>
                      <p className="text-[11px] text-ink-500">{t.domainBadge}</p>
                    </td>

                    <td className="py-3.5 px-4">
                      <span className="font-semibold text-ink-800">{t.pi}</span>
                      <p className="text-[11px] text-ink-500">{t.site.split('&')[0]}</p>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      {t.ctriLocked ? (
                        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-800 border border-amber-200">
                          <Lock className="w-3 h-3" />
                          <span>ENROLLMENT LOCKED</span>
                        </div>
                      ) : (
                        <div>
                          <div className="flex items-center gap-1 text-sage-700 font-bold">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>Verified &amp; Active</span>
                          </div>
                          <p className="text-[10px] font-mono text-ink-400 mt-0.5">{t.ctriNumber}</p>
                        </div>
                      )}
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap">
                      <span className="font-mono text-ink-700 text-[11px]">{t.iecClearance}</span>
                      <p className="text-[10px] text-ink-400">{t.iecApprovalDate}</p>
                    </td>

                    <td className="py-3.5 px-4 whitespace-nowrap min-w-[130px]">
                      <div className="flex items-center justify-between text-[11px] font-medium mb-1">
                        <span className="text-ink-700">{t.currentEnrollment} / {t.targetEnrollment}</span>
                        <span className="text-ink-600 font-mono font-bold">{percent}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-stone-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full progress-fill ${t.ctriLocked ? 'bg-amber-400' : 'bg-sage-600'}`}
                          style={{ width: `${percent}%` }}
                        />
                      </div>
                    </td>

                    <td className="py-3.5 px-4 text-right whitespace-nowrap">
                      <button
                        onClick={(e) => { e.stopPropagation(); onSelectTrial(t.id); }}
                        className="px-3 py-1.5 rounded-lg bg-ivory-100 hover:bg-copper-600 hover:text-white text-ink-700 font-bold text-xs transition-colors inline-flex items-center gap-1"
                      >
                        <span>Workspace</span>
                        <ArrowRight className="w-3 h-3" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===================================================================
          AUDIT FEED + RESEARCH CLUSTERS
          =================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-ivory-50 rounded-2xl border border-stone-200 p-6 shadow-[var(--shadow-card)]">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-sage-500 animate-status-breathe" />
              <h2 className="text-sm font-bold text-ink-900">Live Audit Stream (Polygon Amoy Smart Contract Events)</h2>
            </div>
            <span className="text-[11px] font-mono text-sage-700 font-bold bg-sage-50 px-2.5 py-0.5 rounded-md border border-sage-200">
              Block #{INSTITUTION_INFO.blockHeight} Verified
            </span>
          </div>

          <div className="space-y-2.5">
            {BLOCKCHAIN_AUDIT_LOG.slice(0, 3).map((log) => (
              <div key={log.id} className="p-3.5 rounded-xl bg-ivory-100 border border-stone-200 text-xs flex items-start justify-between gap-3 hover:bg-ivory-50 transition-colors">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono font-bold text-ink-900 text-[11px]">{log.event}</span>
                    <span className="text-ink-600 font-semibold">• {log.studyId}</span>
                    <span className="font-mono text-[10px] text-ink-500 bg-ivory-50 px-1.5 py-0.2 rounded border border-stone-200">
                      Block #{log.blockNumber}
                    </span>
                  </div>
                  <p className="text-xs text-ink-600 mt-1 leading-relaxed">{log.details}</p>
                  <p className="text-[11px] text-sage-700 font-mono font-semibold mt-1">
                    SHA-256: {log.currentHash.slice(0, 24)}...
                  </p>
                </div>
                <span className="text-[11px] text-ink-500 font-medium whitespace-nowrap">{log.timestamp.split(' ')[1]}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-ivory-50 rounded-2xl border border-stone-200 p-6 shadow-[var(--shadow-card)] flex flex-col justify-between">
          <div>
            <h2 className="text-sm font-bold text-ink-900 mb-1">Ayurveda Clinical Specialties</h2>
            <p className="text-xs text-ink-500 mb-4">Research clusters across AIIA departments</p>

            <div className="space-y-2 text-xs">
              {[
                { name: 'Polyherbal Therapeutics', domain: 'Cardiovascular & Metabolic', count: 2 },
                { name: 'Rasayana & Neurobiology', domain: 'Cognitive & Immunity', count: 2 },
                { name: 'Panchakarma Shodhana', domain: 'Metabolic & NAFLD', count: 1 },
                { name: 'Swasthavritta Lifestyle', domain: 'Circadian Dinacharya', count: 1 }
              ].map((cluster) => (
                <div key={cluster.name} className="p-3 rounded-xl bg-ivory-100 border border-stone-200 flex items-center justify-between">
                  <div>
                    <p className="font-bold text-ink-900">{cluster.name}</p>
                    <p className="text-[11px] text-ink-500">{cluster.domain}</p>
                  </div>
                  <span className="text-xs font-bold font-mono text-copper-800 bg-copper-50 px-2 py-0.5 rounded-md border border-copper-200">
                    {cluster.count} Trial{cluster.count > 1 ? 's' : ''}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-stone-200 text-[11px] text-ink-600 flex items-center justify-between">
            <span>Ministry of Ayush Center of Excellence</span>
            <span className="text-sage-700 font-bold">NABH Accredited</span>
          </div>
        </div>
      </div>
    </div>
  );
}