import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Sparkles,
  Search,
  Filter,
  CheckCircle2,
  Calendar,
  Activity,
  ArrowRight
} from 'lucide-react';
import KpiCard from '../common/KpiCard';
import { PATIENTS_REGISTRY, CLINICAL_TRIALS } from '../../data/mockData';
import { ROLE_TAB_CONFIG } from '../../data/roleDashboardConfig';

export default function PatientsView({
  onOpenScreeningModal,
  selectedTrialId,
  currentRole
}) {
  const [trialFilter, setTrialFilter] = useState(selectedTrialId || "ALL");
  const [prakritiFilter, setPrakritiFilter] = useState("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const allowedTabs = ROLE_TAB_CONFIG.patients?.[currentRole] || [];
  const [activeTab, setActiveTab] = useState(allowedTabs[0] || 'screening');

  const isRegulator = currentRole === 'regulator';

  const filteredPatients = PATIENTS_REGISTRY.filter(p => {
    const matchesTrial = trialFilter === "ALL" || p.trialId === trialFilter;
    const matchesPrakriti = prakritiFilter === "ALL" || p.prakriti.includes(prakritiFilter);
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.trialCode.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = activeTab === 'screening' ? p.status?.toLowerCase().includes('screen') || p.eCrfCompletion < 60 :
      activeTab === 'enrollment' ? p.eCrfCompletion >= 60 :
      activeTab === 'visits' ? p.nextVisit :
      activeTab === 'deviations' ? p.complianceScore < 95 :
      activeTab === 'safety' ? p.status?.toLowerCase().includes('adverse') : true;
    return matchesTrial && matchesPrakriti && matchesSearch && matchesTab;
  });

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-linear-to-r from-teal-950 via-[#064e3b] to-slate-900 p-6 rounded-2xl text-white shadow-md border border-teal-900/40">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-teal-800 text-teal-200 border border-teal-600/40">
              GCP-ICH E6(R2) Participant Registry
            </span>
            <span className="text-xs text-teal-300 font-medium">
              Ayurvedic Prakriti Phenotyping
            </span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white font-sans">
            Trial Participant Registry & Prakriti Profiles
          </h1>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Standardized tracking of clinical trial subjects, individual Tridosha constitution (Vata-Pitta-Kapha percentages), Agni digestive status, eCRF completion, and visit compliance.
          </p>
        </div>

        {!isRegulator && (
          <button
            onClick={() => onOpenScreeningModal(selectedTrialId)}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shadow-sm shrink-0 transition-all"
          >
            <UserPlus className="w-4 h-4" />
            <span>Screen & Enroll Patient</span>
          </button>
        )}
      </div>

      {/* 4 Patient Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard
          title="Active Participants"
          value="742 Enrolled"
          subvalue="Across 6 Protocols"
          trend="98.2% Retention"
          trendPositive={true}
          icon={Users}
          iconBg="bg-teal-50 text-teal-700"
          sparklineData={[500, 560, 620, 680, 712, 742]}
          sparklineColor="#0d9488"
        />
        <KpiCard
          title="Prakriti Phenotyped"
          value="100% Screened"
          subvalue="Validated CCR-Ayush Scale"
          trend="Tridoshic Scored"
          trendPositive={true}
          icon={Sparkles}
          iconBg="bg-amber-50 text-amber-700"
          sparklineData={[100, 100, 100, 100, 100, 100]}
          sparklineColor="#d97706"
        />
        <KpiCard
          title="Avg eCRF Completion"
          value="84.5%"
          subvalue="Real-Time Data Capture"
          trend="+3.1% this week"
          trendPositive={true}
          icon={Activity}
          iconBg="bg-emerald-50 text-emerald-700"
          sparklineData={[75, 78, 80, 82, 83, 84]}
          sparklineColor="#059669"
        />
        <KpiCard
          title="Visit Adherence"
          value="96.2%"
          subvalue="On-Time Attendance"
          trend="GCP Compliant"
          trendPositive={true}
          icon={Calendar}
          iconBg="bg-blue-50 text-blue-700"
          sparklineData={[92, 94, 95, 95, 96, 96]}
          sparklineColor="#2563eb"
        />
      </div>

      {/* Registry Table & Filters */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="px-4 pt-4 flex gap-2 flex-wrap">
          {allowedTabs.map((tab) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-3 py-2 rounded-lg text-xs font-bold capitalize ${activeTab === tab ? 'bg-teal-700 text-white' : 'bg-slate-100 text-slate-600'}`}>
              {tab.replace('-', ' ')}
            </button>
          ))}
        </div>
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 flex-wrap">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by ID, name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8 pr-3 py-1.5 bg-white border border-slate-300 rounded-xl text-xs text-slate-800 placeholder-slate-400 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 w-48"
              />
            </div>

            {/* Trial Select */}
            <select
              value={trialFilter}
              onChange={(e) => setTrialFilter(e.target.value)}
              className="text-xs font-semibold bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-slate-700 focus:outline-hidden"
            >
              <option value="ALL">All Protocols</option>
              {CLINICAL_TRIALS.map(t => (
                <option key={t.id} value={t.id}>{t.code}</option>
              ))}
            </select>

            {/* Prakriti Select */}
            <select
              value={prakritiFilter}
              onChange={(e) => setPrakritiFilter(e.target.value)}
              className="text-xs font-semibold bg-white border border-slate-300 rounded-xl px-3 py-1.5 text-slate-700 focus:outline-hidden"
            >
              <option value="ALL">All Prakriti Types</option>
              <option value="Pitta">Pitta Dominant</option>
              <option value="Vata">Vata Dominant</option>
              <option value="Kapha">Kapha Dominant</option>
            </select>
          </div>

          <span className="text-xs font-semibold text-slate-500">
            Showing {filteredPatients.length} Participants
          </span>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4">Participant ID</th>
                <th className="py-3 px-4">Name & Demographics</th>
                <th className="py-3 px-4">Trial Protocol</th>
                <th className="py-3 px-4">Ayurvedic Prakriti Constitution</th>
                <th className="py-3 px-4">Agni / Kostha</th>
                <th className="py-3 px-4">eCRF Status</th>
                <th className="py-3 px-4">Compliance</th>
                <th className="py-3 px-4">Next Visit</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPatients.map((pt) => (
                <tr key={pt.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-emerald-800">
                    {pt.id}
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-bold text-slate-900">{pt.name}</p>
                    <p className="text-[11px] text-slate-500">{pt.age}y • {pt.sex}</p>
                  </td>
                  <td className="py-3 px-4 font-mono font-semibold text-slate-700">
                    {pt.trialCode}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-1.5">
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-teal-50 text-teal-800 border border-teal-200">
                        {pt.prakriti}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono mt-0.5">
                      <span>V:{pt.vataPercent}%</span>
                      <span>P:{pt.pittaPercent}%</span>
                      <span>K:{pt.kaphaPercent}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-medium text-slate-800">{pt.agniType}</p>
                    <p className="text-[11px] text-slate-500">Kostha: {pt.kostha}</p>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-14 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-600 rounded-full"
                          style={{ width: `${pt.eCrfCompletion}%` }}
                        />
                      </div>
                      <span className="font-mono text-slate-700">{pt.eCrfCompletion}%</span>
                    </div>
                    <p className="text-[10px] text-slate-500 mt-0.5">{pt.status}</p>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-emerald-800">
                    {pt.complianceScore}%
                  </td>
                  <td className="py-3 px-4 text-slate-600 font-medium">
                    {pt.nextVisitDate}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
