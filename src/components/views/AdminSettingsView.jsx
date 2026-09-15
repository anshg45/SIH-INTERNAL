import React, { useState } from 'react';
import { Settings, Users, Link2, Building2, BellRing, FileHeart, Search, Download, ShieldCheck, Activity, Pill } from 'lucide-react';
import TrialLifecycleWorkflow from '../common/TrialLifecycleWorkflow';

const patientHealthRecords = [
	{
		aadhaarLastFour: '4821',
		patientId: 'PT-1001',
		name: 'Rajeshwar Prasad',
		age: 52,
		sex: 'Male',
		hospital: 'AIIA Hospital, New Delhi',
		lastSynced: '08 Sep 2026, 09:42 IST',
		condition: 'Essential hypertension, improving',
		vitals: [['Blood pressure', '132/84 mmHg'], ['Pulse', '76 bpm'], ['SpO2', '98%']],
		prescription: ['Arjuna extract 500 mg, twice daily after meals', 'Pushkarmool extract 250 mg, twice daily with warm water'],
	},
	{
		aadhaarLastFour: '7394',
		patientId: 'PT-1008',
		name: 'Sunita Devi Sharma',
		age: 48,
		sex: 'Female',
		hospital: 'NIA Hospital, Jaipur',
		lastSynced: '07 Sep 2026, 16:18 IST',
		condition: 'Essential hypertension, stable',
		vitals: [['Blood pressure', '136/86 mmHg'], ['Pulse', '80 bpm'], ['SpO2', '99%']],
		prescription: ['Arjuna extract 500 mg, twice daily after meals', 'Continue prescribed antihypertensive as directed'],
	},
];

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
		'This document is generated from the hospital FHIR record. Verify with the treating clinician before acting on it.',
	].join('\n');
	const blob = new Blob([body], { type: 'text/plain;charset=utf-8' });
	const url = URL.createObjectURL(blob);
	const link = document.createElement('a');
	link.href = url;
	link.download = `${record.patientId}-${type}.txt`;
	link.click();
	URL.revokeObjectURL(url);
};

const tabs = [{ id: 'users', label: 'User Management & Role Assignment', icon: Users }, { id: 'assignments', label: 'Assign Coordinators & Monitors to Studies', icon: Link2 }, { id: 'sites', label: 'Site Management', icon: Building2 }, { id: 'alerts', label: 'Alert Threshold Configuration', icon: BellRing }, { id: 'protocol-registry', label: 'Protocol Registry', icon: FileHeart }, { id: 'patient-health', label: 'Patient Health & Documents', icon: FileHeart }];

function ProtocolRegistry({ protocols, studies, currentRole, workflowStatuses, onAdvanceProtocol }) {
	const savedStudies = studies.filter((study) => !protocols.some((protocol) => protocol.id === study.id));
	const allProtocols = [...protocols, ...savedStudies.map((study) => ({ ...study, code: study.code || study.id, status: study.ctriNumber ? 'CTRI verified' : 'CTRI verification pending', isCtriPending: !study.ctriNumber, targetEnrollment: study.targetEnrollment, site: study.site }))];
	if (!allProtocols.length) return <div className="mt-6 rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center"><p className="text-sm font-bold text-slate-700">No registered protocols found</p><p className="text-xs text-slate-500 mt-1">Use Study Creation to register a protocol. It will appear here after submission.</p></div>;
	return <div className="mt-6 space-y-3">{allProtocols.map((protocol) => <article key={protocol.id || protocol.code} className="rounded-xl border border-slate-200 p-4"><div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3"><div><div className="flex items-center gap-2"><span className="font-mono text-xs font-bold text-emerald-800">{protocol.code}</span><span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${protocol.isCtriPending ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'}`}>{protocol.status}</span></div><h3 className="text-sm font-bold text-slate-900 mt-2">{protocol.title}</h3><p className="text-xs text-slate-500 mt-1">{protocol.shortTitle || 'No short title'} · {protocol.phase} · {protocol.domain || 'Ayurveda clinical research'}</p></div><span className="text-[10px] text-slate-400 shrink-0">{protocol.registeredAt ? `Registered ${protocol.registeredAt}` : 'Saved in backend'}</span></div><div className="mt-3 grid grid-cols-2 gap-2 text-xs text-slate-600"><span>PI: <strong>{protocol.pi || 'Assigned PI'}</strong></span><span>Target enrollment: <strong>{protocol.targetEnrollment}</strong></span><span>Site: <strong>{protocol.site || 'AIIA Hospital'}</strong></span><span>Gate: <strong>{protocol.isCtriPending ? 'Enrollment blocked' : 'Enrollment enabled'}</strong></span></div><TrialLifecycleWorkflow status={workflowStatuses[protocol.id] || (protocol.status === 'pending_iec' ? 'pending_iec' : 'pending_iec')} currentRole={currentRole} onAdvance={(nextStatus) => onAdvanceProtocol(protocol.id, nextStatus)} /></article>)}</div>;
}

function PatientHealthWorkspace() {
	const [aadhaar, setAadhaar] = useState('');
	const [record, setRecord] = useState(null);
	const [searched, setSearched] = useState(false);

	const handleSearch = (event) => {
		event.preventDefault();
		const lastFour = aadhaar.replace(/\D/g, '').slice(-4);
		setRecord(patientHealthRecords.find((item) => item.aadhaarLastFour === lastFour) || null);
		setSearched(true);
	};

	return <div className="space-y-5">
		<div className="rounded-xl border border-emerald-200 bg-emerald-50 p-4 flex gap-3">
			<ShieldCheck className="w-5 h-5 text-emerald-700 shrink-0" />
			<div><p className="text-sm font-bold text-emerald-950">Hospital FHIR patient record lookup</p><p className="text-xs text-emerald-800 mt-1">Find a patient using the Aadhaar number collected during hospital registration. Only the last four digits are used in this demo view.</p></div>
		</div>
		<form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-2">
			<label className="sr-only" htmlFor="aadhaar-lookup">Aadhaar number</label>
			<input id="aadhaar-lookup" value={aadhaar} onChange={(event) => setAadhaar(event.target.value)} inputMode="numeric" maxLength={12} placeholder="Enter Aadhaar number" className="flex-1 px-4 py-3 rounded-lg border border-slate-300 text-sm outline-none focus:border-emerald-600 focus:ring-2 focus:ring-emerald-100" />
			<button type="submit" className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-slate-900 text-white text-xs font-bold"><Search className="w-4 h-4" />Find patient record</button>
		</form>
		{searched && !record && <div className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-xs font-semibold text-amber-900">No hospital record found for this Aadhaar number. Confirm the registration details and try again.</div>}
		{record && <div className="space-y-4">
			<div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 border-b border-slate-200 pb-4"><div><p className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Verified FHIR Patient resource</p><h3 className="text-xl font-bold text-slate-950 mt-1">{record.name}</h3><p className="text-xs text-slate-500 mt-1">{record.patientId} · {record.age} years · {record.sex} · {record.hospital}</p></div><span className="inline-flex items-center gap-1.5 h-fit px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold"><Activity className="w-3.5 h-3.5" />Synced {record.lastSynced}</span></div>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-3">{record.vitals.map(([label, value]) => <div key={label} className="p-4 rounded-xl bg-slate-50 border border-slate-200"><p className="text-[10px] font-bold uppercase text-slate-500">{label}</p><p className="text-lg font-bold text-slate-900 mt-1">{value}</p></div>)}</div>
			<div className="rounded-xl border border-slate-200 p-4"><p className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Current health condition</p><p className="text-sm font-bold text-slate-900 mt-1">{record.condition}</p></div>
			<div className="rounded-xl border border-slate-200 p-4"><div className="flex items-center gap-2"><Pill className="w-4 h-4 text-copper-700" /><p className="text-sm font-bold text-slate-900">Active prescription</p></div><ul className="mt-3 space-y-2">{record.prescription.map((item) => <li key={item} className="text-xs text-slate-600 flex gap-2"><span className="text-emerald-600">•</span>{item}</li>)}</ul></div>
			<div className="flex flex-wrap gap-2 pt-1"><button onClick={() => downloadDocument(record, 'health-report')} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-900 text-white text-xs font-bold"><Download className="w-3.5 h-3.5" />Download health report</button><button onClick={() => downloadDocument(record, 'prescription')} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-slate-300 text-slate-700 text-xs font-bold hover:bg-slate-50"><Download className="w-3.5 h-3.5" />Download prescription</button></div>
		</div>}
	</div>;
}

export default function AdminSettingsView({ registeredProtocols = [], studies = [], currentRole, workflowStatuses = {}, onAdvanceProtocol }) { const [activeTab, setActiveTab] = useState('users'); const selected = tabs.find((tab) => tab.id === activeTab); const Icon = selected.icon; return <div className="p-6 space-y-5 max-w-6xl mx-auto"><div className="bg-slate-950 text-white rounded-2xl p-6"><div className="flex items-center gap-3"><Settings className="w-6 h-6 text-slate-300" /><div><h1 className="text-xl font-bold">Admin Settings Workspace</h1><p className="text-xs text-slate-300 mt-1">Institution-wide configuration and assignment controls.</p></div></div></div><div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-5"><nav className="bg-white border border-slate-200 rounded-2xl p-2 space-y-1">{tabs.map((tab) => { const TabIcon = tab.icon; return <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`w-full text-left flex items-center gap-2 p-3 rounded-lg text-xs font-bold ${activeTab === tab.id ? 'bg-slate-900 text-white' : 'text-slate-600 hover:bg-slate-100'}`}><TabIcon className="w-4 h-4" />{tab.label}</button>; })}</nav><section className="bg-white border border-slate-200 rounded-2xl p-6"><div className="flex items-center gap-3"><Icon className="w-5 h-5 text-slate-700" /><h2 className="text-base font-bold text-slate-900">{selected.label}</h2></div>{activeTab === 'patient-health' ? <div className="mt-6"><PatientHealthWorkspace /></div> : activeTab === 'protocol-registry' ? <ProtocolRegistry protocols={registeredProtocols} studies={studies} currentRole={currentRole} workflowStatuses={workflowStatuses} onAdvanceProtocol={onAdvanceProtocol} /> : <div className="mt-6 grid gap-3">{['Configuration record is active', 'Last change: 07 Sep 2026, 10:42 IST', 'All changes are recorded in the audit trail'].map((text) => <div key={text} className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-700">{text}</div>)}<button className="mt-2 w-fit px-4 py-2 rounded-lg bg-slate-900 text-white text-xs font-bold">Save configuration</button></div>}</section></div></div>; }
