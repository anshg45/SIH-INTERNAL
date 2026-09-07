import React, { useState } from 'react';
import {
  Download,
  CheckCircle2,
  Table,
  FileCode2,
  Sparkles
} from 'lucide-react';
import KpiCard from '../common/KpiCard';
import { CDISC_SDTM_DATASETS } from '../../data/mockData';

export default function CdiscView() {
  const [activeTab, setActiveTab] = useState("DM");
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = (format) => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert(`CDISC Submission Package (${format}) compiled successfully. Standard: SDTM v3.3 / Define-XML v2.0.`);
    }, 800);
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-linear-to-r from-blue-950 via-[#1e3a8a] to-slate-900 p-6 rounded-2xl text-white shadow-md border border-blue-900/40">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-blue-800 text-blue-200 border border-blue-600/40">
              CDISC SDTM v3.3 & Define-XML v2.0
            </span>
            <span className="text-xs text-blue-300 font-medium">
              Global Regulatory Submission Ready
            </span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white font-sans">
            CDISC Submission Studio & SDTM Tabulation
          </h1>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Automatic translation of Ayurvedic eCRF clinical trial records into standardized CDISC domains (Demographics, Adverse Events, Exposure) and Define-XML for regulatory submissions to CDSCO, US FDA, and EMA.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => handleExport("SAS Transport XPT & Define-XML")}
            disabled={isExporting}
            className="px-4 py-2.5 rounded-xl bg-blue-500 hover:bg-blue-400 text-blue-950 font-bold text-xs flex items-center gap-2 shadow-sm transition-all"
          >
            <Download className="w-4 h-4" />
            <span>{isExporting ? "Compiling Dossier..." : "Export CDISC Package (ZIP)"}</span>
          </button>
        </div>
      </div>

      {/* 4 CDISC Metric Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard
          title="SDTM Domains"
          value="3 Ready"
          subvalue="DM, AE, EX"
          trend="CDISC 3.3"
          trendPositive={true}
          icon={Table}
          iconBg="bg-blue-50 text-blue-700"
          sparklineData={[1, 2, 2, 3, 3, 3]}
          sparklineColor="#2563eb"
        />
        <KpiCard
          title="Conformance Score"
          value="100% Pass"
          subvalue="Pinnacle 21 Validated"
          trend="Zero Errors"
          trendPositive={true}
          icon={CheckCircle2}
          iconBg="bg-emerald-50 text-emerald-700"
          sparklineData={[96, 98, 100, 100, 100, 100]}
          sparklineColor="#059669"
        />
        <KpiCard
          title="Define-XML Spec"
          value="Version 2.0"
          subvalue="Metadata Dictionary"
          trend="eCTD Aligned"
          trendPositive={true}
          icon={FileCode2}
          iconBg="bg-indigo-50 text-indigo-700"
          sparklineData={[2, 2, 2, 2, 2, 2]}
          sparklineColor="#4f46e5"
        />
        <KpiCard
          title="Ayush Extension"
          value="PRAKRITI Field"
          subvalue="Supplemental Qualifier"
          trend="SUPPDM Domain"
          trendPositive={true}
          icon={Sparkles}
          iconBg="bg-amber-50 text-amber-700"
          sparklineData={[1, 1, 1, 1, 1, 1]}
          sparklineColor="#d97706"
        />
      </div>

      {/* Dataset Explorer Tabs */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {[
              { id: "DM", label: "Demographics (DM)" },
              { id: "AE", label: "Adverse Events (AE)" },
              { id: "EX", label: "Intervention Exposure (EX)" },
              { id: "DefineXml", label: "Define-XML v2.0" }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-800 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-200 border border-slate-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            onClick={() => handleExport(activeTab)}
            className="px-3 py-1.5 rounded-lg bg-white border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Table (.CSV)</span>
          </button>
        </div>

        {/* Dataset Content */}
        {activeTab !== "DefineXml" ? (
          <div className="overflow-x-auto p-4">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100 text-slate-700 font-mono text-[11px]">
                  {CDISC_SDTM_DATASETS[activeTab].columns.map((col) => (
                    <th key={col} className="py-2.5 px-3 border border-slate-200">{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {CDISC_SDTM_DATASETS[activeTab].rows.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    {CDISC_SDTM_DATASETS[activeTab].columns.map((col) => (
                      <td key={col} className="py-2.5 px-3 border border-slate-200 text-slate-800">
                        {row[col] !== undefined ? String(row[col]) : "-"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-4 bg-slate-950 overflow-x-auto">
            <pre className="text-blue-300 font-mono text-xs leading-relaxed max-h-[460px]">
              {CDISC_SDTM_DATASETS.DefineXml}
            </pre>
          </div>
        )}

        {/* Footer */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-blue-800 font-medium">
            <CheckCircle2 className="w-4 h-4 text-blue-600" />
            Standard Data Tabulation Model (SDTM) IG 3.3 Compliant
          </span>
          <span>Sponsor: All India Institute of Ayurveda (AIIA)</span>
        </div>
      </div>
    </div>
  );
}
