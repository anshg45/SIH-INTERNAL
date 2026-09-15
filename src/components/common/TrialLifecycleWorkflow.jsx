import React from 'react';
import { CheckCircle2, ChevronDown, LockKeyhole } from 'lucide-react';

const stages = [
  { id: 'pending_iec', number: 1, title: 'Protocol Registration', owner: 'Admin or PI', action: 'Submit for IEC review', roles: ['admin', 'pi'] },
  { id: 'iec_approved', number: 2, title: 'Institutional Ethics Committee (IEC)', owner: 'Ethics Committee Role', action: 'Approve ethics review', roles: ['iec'] },
  { id: 'site_activation', number: 3, title: 'CTRI Registration & Site Activation', owner: 'Admin or PI', action: 'Activate site and unlock gate', roles: ['admin', 'pi'] },
  { id: 'actively_enrolling', number: 4, title: 'Patient Screening & Gated Enrollment', owner: 'Study Coordinator', action: 'Start enrollment', roles: ['crc'] },
  { id: 'active_surveillance', number: 5, title: 'Active Trial Conduct & Surveillance', owner: 'Monitor / PvPI', action: 'Confirm active surveillance', roles: ['cra', 'pv'] },
  { id: 'completed', number: 6, title: 'Target Cohort & Audit Inspection', owner: 'Regulator or Admin', action: 'Complete and close trial', roles: ['regulator', 'admin'] },
];

export default function TrialLifecycleWorkflow({ status = 'pending_iec', currentRole, onAdvance }) {
  const currentIndex = Math.max(0, stages.findIndex((stage) => stage.id === status));
  return <div className="mt-5 rounded-xl border border-slate-200 bg-slate-950 p-4 text-white">
    <div className="flex items-center justify-between gap-3 mb-4"><div><p className="text-[10px] uppercase tracking-widest text-copper-300 font-bold">End-to-end trial lifecycle</p><h4 className="text-sm font-bold mt-1">Approval workflow</h4></div><span className="font-mono text-[10px] text-emerald-300">{status}</span></div>
    <div className="space-y-2">{stages.map((stage, index) => {
      const isComplete = index < currentIndex;
      const isCurrent = index === currentIndex;
      const canAdvance = isCurrent && stage.roles.includes(currentRole) && index < stages.length - 1;
      return <React.Fragment key={stage.id}>
        <div className={`rounded-lg border p-3 ${isCurrent ? 'border-copper-400 bg-walnut-800' : isComplete ? 'border-emerald-700/70 bg-emerald-950/40' : 'border-slate-700 bg-slate-900/70'}`}>
          <div className="flex items-start gap-3"><div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-xs font-bold ${isComplete ? 'bg-emerald-500 text-white' : isCurrent ? 'bg-copper-400 text-slate-950' : 'bg-slate-700 text-slate-300'}`}>{isComplete ? <CheckCircle2 className="w-4 h-4" /> : stage.number}</div><div className="min-w-0 flex-1"><p className="text-xs font-bold">{stage.title}</p><p className="text-[10px] text-slate-300 mt-1">{stage.owner} · {isComplete ? 'Approved / completed' : isCurrent ? 'Current stage' : 'Locked until previous approval'}</p>{canAdvance && <button onClick={() => onAdvance(stages[index + 1].id)} className="mt-2 px-3 py-1.5 rounded-md bg-emerald-600 hover:bg-emerald-500 text-white text-[10px] font-bold">{stage.action}</button>}{isCurrent && !canAdvance && index < stages.length - 1 && <p className="mt-2 text-[10px] text-amber-300 inline-flex items-center gap-1"><LockKeyhole className="w-3 h-3" />Waiting for: {stage.roles.join(' / ')}</p>}</div></div>
        </div>{index < stages.length - 1 && <div className="flex justify-center"><ChevronDown className="w-4 h-4 text-slate-600" /></div>}
      </React.Fragment>;
    })}</div>
  </div>;
}
