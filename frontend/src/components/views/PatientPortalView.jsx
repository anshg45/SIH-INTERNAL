import React from 'react';
import { Activity, Download, LogOut, Pill, ShieldCheck } from 'lucide-react';

const downloadDocument = (record, type) => {
  const title = type === 'prescription' ? 'Patient Prescription' : 'Patient Health Report';
  const body = [
    title,
    'AAYUR SAATHI | FHIR R4 patient document',
    '',
    `Patient: ${record.name} (${record.patientId})`,
    `Hospital: ${record.hospital}`,
    `Condition: ${record.condition}`,
    `FHIR data last synced: ${record.lastSynced}`,
    '',
    ...(type === 'prescription'
      ? ['Prescription:', ...record.prescription.map((item) => `- ${item}`)]
      : ['Vitals:', ...record.vitals.map(([label, value]) => `- ${label}: ${value}`)]),
    '',
    'Generated from the hospital FHIR record. Verify with your treating clinician before acting on it.',
  ].join('\n');
  const url = URL.createObjectURL(new Blob([body], { type: 'text/plain;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = `${record.patientId}-${type}.txt`;
  link.click();
  URL.revokeObjectURL(url);
};

export default function PatientPortalView({ patient, onLogout }) {
  return (
    <div className="min-h-screen bg-[#f4f8f6] text-slate-800">
      <header className="bg-walnut-900 text-white border-b border-walnut-800 px-5 sm:px-8 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          <div><p className="text-[10px] uppercase tracking-[0.2em] text-copper-300 font-bold">AAYUR SAATHI</p><h1 className="text-lg font-bold">My Health Portal</h1></div>
          <button onClick={onLogout} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-bold text-stone-200 hover:bg-walnut-800"><LogOut className="w-4 h-4" />Sign out</button>
        </div>
      </header>
      <main className="max-w-5xl mx-auto p-5 sm:p-8 space-y-5">
        <div className="rounded-2xl bg-emerald-950 text-white p-6"><div className="flex items-start justify-between gap-4"><div><p className="text-xs text-emerald-300 font-semibold">Welcome, {patient.name}</p><h2 className="text-2xl font-bold mt-1">Your health record</h2><p className="text-xs text-emerald-100/70 mt-2">Private view of the latest record received from {patient.hospital}.</p></div><ShieldCheck className="w-7 h-7 text-emerald-300 shrink-0" /></div></div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5"><div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3"><div><p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">FHIR R4 record</p><h3 className="text-xl font-bold text-slate-950 mt-1">{patient.patientId}</h3><p className="text-xs text-slate-500 mt-1">{patient.age} years · {patient.sex} · {patient.hospital}</p></div><span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold"><Activity className="w-3.5 h-3.5" />Synced {patient.lastSynced}</span></div></div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">{patient.vitals.map(([label, value]) => <div key={label} className="bg-white border border-slate-200 rounded-xl p-4"><p className="text-[10px] font-bold uppercase text-slate-500">{label}</p><p className="text-lg font-bold text-slate-900 mt-1">{value}</p></div>)}</div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5"><p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Current health condition</p><p className="text-base font-bold text-slate-900 mt-1">{patient.condition}</p></div>
        <div className="bg-white border border-slate-200 rounded-2xl p-5"><div className="flex items-center gap-2"><Pill className="w-4 h-4 text-copper-700" /><h3 className="text-sm font-bold text-slate-900">Prescription</h3></div><ul className="mt-3 space-y-2">{patient.prescription.map((item) => <li key={item} className="text-xs text-slate-600 flex gap-2"><span className="text-emerald-600">•</span>{item}</li>)}</ul></div>
        <div className="flex flex-wrap gap-2"><button onClick={() => downloadDocument(patient, 'health-report')} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-900 text-white text-xs font-bold"><Download className="w-4 h-4" />Download health report</button><button onClick={() => downloadDocument(patient, 'prescription')} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-slate-300 text-slate-700 text-xs font-bold hover:bg-white"><Download className="w-4 h-4" />Download prescription</button></div>
        <p className="text-[11px] text-slate-500">This portal shows your hospital record only. For medical advice, contact your treating hospital.</p>
      </main>
    </div>
  );
}
