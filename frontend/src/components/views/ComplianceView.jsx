import React, { useState } from 'react';
import { ClipboardCheck, CheckCircle2 } from 'lucide-react';
import { ROLE_TAB_CONFIG } from '../../data/roleDashboardConfig';

const rows = [
  ['Visit Compliance', 'AYU-CVD-001', '12 of 14 visits verified', 'On track'],
  ['Protocol Deviation Review', 'AYU-IMM-002', '1 deviation awaiting classification', 'Action needed'],
  ['Monitoring Visit Report', 'AYU-CVD-001', 'Report due within 48 hours', 'Due soon'],
];

export default function ComplianceView({ currentRole }) {
  const tabs = ROLE_TAB_CONFIG.compliance?.[currentRole] || [];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  return <div className="p-6 space-y-5 max-w-6xl mx-auto"><div className="bg-cyan-950 text-white rounded-2xl p-6"><div className="flex items-center gap-3"><ClipboardCheck className="w-6 h-6 text-cyan-300" /><div><h1 className="text-xl font-bold">Compliance Workspace</h1><p className="text-xs text-cyan-100/70 mt-1">Monitor assigned studies, deviations, and monitoring reports.</p></div></div></div><div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-5"><div className="flex gap-2 flex-wrap">{tabs.map((tab) => <button key={tab} onClick={() => setActiveTab(tab)} className={`px-3 py-2 rounded-lg text-xs font-bold ${activeTab === tab ? 'bg-cyan-700 text-white' : 'bg-slate-100 text-slate-600'}`}>{tab.replaceAll('-', ' ')}</button>)}</div><div className="space-y-3">{rows.filter((row) => row[0].toLowerCase().replaceAll(' ', '-') === activeTab).map((row) => <div key={row[0]} className="p-4 border border-slate-200 rounded-xl flex items-center justify-between"><div><p className="text-xs font-bold uppercase text-cyan-700">{row[1]}</p><h2 className="text-sm font-bold text-slate-900">{row[0]}</h2><p className="text-xs text-slate-500 mt-1">{row[2]}</p></div><span className="flex items-center gap-1 text-xs font-bold text-emerald-700"><CheckCircle2 className="w-4 h-4" />{row[3]}</span></div>)}</div></div></div>;
}
