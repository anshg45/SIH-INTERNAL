import React, { useState } from 'react';
import {
  Scale,
  ShieldCheck,
  Download,
  CheckCircle2,
  FileCheck2,
  AlertOctagon,
  Building2,
  ExternalLink,
  Lock,
  FileText,
  AlertTriangle,
  Archive
} from 'lucide-react';
import KpiCard from '../common/KpiCard';
import { CLINICAL_TRIALS, INSTITUTION_INFO, PHARMACOVIGILANCE_EVENTS } from '../../data/mockData';

export default function RegulatorView({ onNavigate }) {
  const [isExporting, setIsExporting] = useState(false);

  const handleExportDossier = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert("AIIA_Regulatory_Compliance_Dossier_CDSCO_2026.zip generated with digital signature (SHA-256: 0x8a7f9...120e) and Polygon Amoy proof.");
    }, 900);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Official Government Inspection Header */}
      <div className="bg-linear-to-r from-amber-950 via-slate-900 to-amber-950 p-6 rounded-2xl text-white shadow-md border-2 border-amber-500/40 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-amber-950">
                Official Regulatory Oversight
              </span>
              <span className="text-xs text-amber-300 font-medium">
                Government of India • Ministry of Ayush & CDSCO
              </span>
            </div>
            <h1 className="text-2xl font-extrabold tracking-tight text-white font-sans flex items-center gap-2">
              <Scale className="w-6 h-6 text-amber-400" />
              CDSCO / Ayush Joint Regulatory Inspection Portal
            </h1>
            <p className="text-xs text-amber-100/80 max-w-2xl leading-relaxed">
              Statutory audit portal for drug regulatory officers and ethics compliance inspectors under the New Drugs and Clinical Trials Rules 2019 and Drugs & Cosmetics Act 1940.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleExportDossier}
              disabled={isExporting}
              className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-amber-950 font-bold text-xs flex items-center gap-2 shadow-sm transition-all"
            >
              <Archive className="w-4 h-4" />
              <span>{isExporting ? "Generating Dossier..." : "Export Full Regulatory Dossier (ZIP)"}</span>
            </button>
          </div>
        </div>

        {/* Read-Only Notice Pill */}
        <div className="p-3 bg-amber-950/80 rounded-xl border border-amber-500/40 text-xs text-amber-200 flex items-center justify-between">
          <span className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-400" />
            <strong>STRICT READ-ONLY ENFORCEMENT:</strong> All modification actions are disabled. Inspector session is anchored to Polygon Amoy block #124589.
          </span>
          <span className="font-mono text-[11px] text-amber-300 font-bold">Inspector ID: GOI-CDSCO-AYU-882</span>
        </div>
      </div>

      {/* 4 Regulatory Inspection KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard
          title="CTRI Compliance"
          value="100% Enforced"
          subvalue="1 Trial Legally Locked"
          trend="Rule 75 Active"
          trendPositive={true}
          icon={CheckCircle2}
          iconBg="bg-emerald-50 text-emerald-700"
          sparklineData={[100, 100, 100, 100, 100, 100]}
          sparklineColor="#059669"
        />
        <KpiCard
          title="SAE Timeliness"
          value="3-Day Rule Met"
          subvalue="1 Critical in 18h Window"
          trend="PvPI Linked"
          trendPositive={true}
          icon={AlertOctagon}
          iconBg="bg-rose-50 text-rose-700"
          sparklineData={[98, 99, 100, 100, 100, 100]}
          sparklineColor="#e11d48"
        />
        <KpiCard
          title="Ethics Clearances"
          value="ECR Registered"
          subvalue={INSTITUTION_INFO.iecRegistration}
          trend="CDSCO Verified"
          trendPositive={true}
          icon={FileCheck2}
          iconBg="bg-indigo-50 text-indigo-700"
          sparklineData={[1, 1, 1, 1, 1, 1]}
          sparklineColor="#4f46e5"
        />
        <KpiCard
          title="Audit Integrity"
          value="Zero Tamper"
          subvalue="Polygon Amoy Anchor"
          trend="124,589 Blocks"
          trendPositive={true}
          icon={ShieldCheck}
          iconBg="bg-teal-50 text-teal-700"
          sparklineData={[100, 100, 100, 100, 100, 100]}
          sparklineColor="#0d9488"
        />
      </div>

      {/* Statutory Inspection Checklist */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              National Clinical Trial Regulatory Inspection Checklist
            </h3>
            <p className="text-xs text-slate-500">
              Evaluated against Schedule Y, New Drugs & Clinical Trials Rules 2019, and Pharmacovigilance Guidelines
            </p>
          </div>
          <span className="px-3 py-1 bg-emerald-100 text-emerald-900 text-xs font-bold rounded-lg">
            ✓ ALL GATES PASS
          </span>
        </div>

        <div className="space-y-3 text-xs">
          {[
            {
              rule: "Rule 75 (CTRI Hard Gate Enforcement)",
              desc: "Participant recruitment legally locked until verified on Clinical Trials Registry - India (CTRI). Verified for AYU-MET-007 (Virechana).",
              status: "COMPLIANT",
              authority: "ICMR-NIMS / CDSCO"
            },
            {
              rule: "Rule 42 (Expedited SAE Reporting)",
              desc: "Mandatory 24-hour immediate alert and 3-day detailed Form 44 expedited report submission to CDSCO and Ethics Committee. Active alert: SAE-2026-0904.",
              status: "COMPLIANT",
              authority: "PvPI-Ayush / CDSCO"
            },
            {
              rule: "GCP-ICH E6(R2) Audit Trail Integrity",
              desc: "Immutable chronological event logs with SHA-256 cryptographic chaining anchored to Polygon Amoy testnet.",
              status: "COMPLIANT",
              authority: "Ministry of Ayush"
            },
            {
              rule: "Multilingual Informed Consent (ICF)",
              desc: "Dual Hindi and English consent forms with independent audio-video recording verification for vulnerable subjects.",
              status: "COMPLIANT",
              authority: "Institutional Ethics Committee"
            },
            {
              rule: "Ayush Botanical Batch Standardization",
              desc: "Investigational product certificates of analysis (CoA) verified for Withania somnifera, Terminalia arjuna, and Tinospora cordifolia.",
              status: "COMPLIANT",
              authority: "Pharmacopoeia Commission for Indian Medicine"
            }
          ].map((item, idx) => (
            <div key={idx} className="p-3.5 rounded-xl border border-slate-200 bg-slate-50/50 flex items-start justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span className="font-bold text-slate-900 text-xs">{item.rule}</span>
                  <span className="text-[10px] text-slate-400 font-mono">({item.authority})</span>
                </div>
                <p className="text-xs text-slate-600 pl-6">{item.desc}</p>
              </div>

              <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 shrink-0">
                {item.status}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Trial Master Portfolio Regulatory Snapshot */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-4">
        <h3 className="text-base font-bold text-slate-900">
          Supervised Clinical Trials Portfolio Under Joint Inspection
        </h3>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-2.5 px-3">Protocol</th>
                <th className="py-2.5 px-3">CTRI Number</th>
                <th className="py-2.5 px-3">IEC Approval</th>
                <th className="py-2.5 px-3">Principal Investigator</th>
                <th className="py-2.5 px-3">Accrual Status</th>
                <th className="py-2.5 px-3 text-right">Inspection Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {CLINICAL_TRIALS.map((t) => (
                <tr key={t.id} className="hover:bg-slate-50">
                  <td className="py-2.5 px-3 font-mono font-bold text-emerald-800">{t.code}</td>
                  <td className="py-2.5 px-3 font-mono">
                    {t.ctriLocked ? (
                      <span className="text-amber-800 font-bold flex items-center gap-1">
                        <Lock className="w-3 h-3 text-amber-600" /> Pending Verification
                      </span>
                    ) : (
                      <span className="text-slate-800">{t.ctriNumber}</span>
                    )}
                  </td>
                  <td className="py-2.5 px-3 font-mono text-slate-700">{t.iecClearance}</td>
                  <td className="py-2.5 px-3 font-medium text-slate-900">{t.pi}</td>
                  <td className="py-2.5 px-3">{t.currentEnrollment} / {t.targetEnrollment} Subjects</td>
                  <td className="py-2.5 px-3 text-right">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-50 text-emerald-800 border border-emerald-200">
                      PASSED AUDIT
                    </span>
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
