import React, { useState } from 'react';
import { Database, Search } from 'lucide-react';
import { ROLE_TAB_CONFIG } from '../../data/roleDashboardConfig';

const QUERIES = [
  { id: 'DQ-1042', study: 'AYU-CVD-001', subject: 'PT-1008', field: 'Visit 3 blood pressure', status: 'Open', owner: 'CRC' },
  { id: 'DQ-1041', study: 'AYU-IMM-002', subject: 'PT-1041', field: 'Concomitant medication date', status: 'Open', owner: 'CRA' },
  { id: 'DQ-1038', study: 'AYU-NEURO-004', subject: 'PT-1082', field: 'SAE onset timeline', status: 'Resolved', owner: 'CRA' },
];

export default function DataQueriesView({ currentRole }) {
  const tabs = ROLE_TAB_CONFIG['data-queries']?.[currentRole] || ['inbox'];
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [query, setQuery] = useState('');
  const visible = QUERIES.filter((item) => `${item.id} ${item.study} ${item.field}`.toLowerCase().includes(query.toLowerCase()));

  return <Workspace title="Data Query Workspace" subtitle="Resolve or raise traceable data queries for assigned studies." icon={Database}>
    <div className="flex gap-2 border-b border-slate-200 pb-2">{tabs.map((tab) => <button key={tab} onClick={() => setActiveTab(tab)} className={`px-3 py-2 text-xs font-bold rounded-lg ${activeTab === tab ? 'bg-emerald-700 text-white' : 'text-slate-600 hover:bg-slate-100'}`}>{tab.replace('-', ' ')}</button>)}</div>
    <div className="flex items-center gap-2 max-w-sm"><Search className="w-4 h-4 text-slate-400" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search query, study, field" className="w-full border border-slate-300 rounded-lg px-3 py-2 text-xs" /></div>
    <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">{visible.map((item) => <div key={item.id} className="p-4 flex items-center justify-between gap-4"><div><p className="text-xs font-mono font-bold text-emerald-800">{item.id} · {item.study}</p><p className="text-sm font-bold text-slate-900 mt-1">{item.field}</p><p className="text-xs text-slate-500">{item.subject} · Owner: {item.owner}</p></div><div className="flex items-center gap-2"><span className={`px-2 py-1 rounded-full text-[10px] font-bold ${item.status === 'Open' ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>{item.status}</span>{item.status === 'Open' && <button className="px-3 py-2 text-xs font-bold rounded-lg bg-slate-900 text-white">{activeTab === 'raise' ? 'Raise' : 'Resolve'}</button>}</div></div>)}</div>
  </Workspace>;
}

function Workspace({ title, subtitle, icon: Icon, children }) { return <div className="p-6 space-y-5 max-w-5xl mx-auto"><div className="bg-walnut-900 text-white rounded-2xl p-6"><div className="flex items-center gap-3"><Icon className="w-6 h-6 text-copper-300" /><div><h1 className="text-xl font-bold">{title}</h1><p className="text-xs text-stone-300 mt-1">{subtitle}</p></div></div></div><div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-5">{children}</div></div>;
}
