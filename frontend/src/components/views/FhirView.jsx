import React, { useState } from 'react';
import {
  FileCode2,
  CheckCircle2,
  Copy,
  Check,
  ExternalLink,
  Search,
  Layers,
  Sparkles,
  ArrowRight,
  Database,
  Globe
} from 'lucide-react';
import KpiCard from '../common/KpiCard';
import { FHIR_R4_RESOURCES } from '../../data/mockData';

export default function FhirView() {
  const [selectedResource, setSelectedResource] = useState("ResearchStudy");
  const [copied, setCopied] = useState(false);

  const resourceData = FHIR_R4_RESOURCES[selectedResource] || FHIR_R4_RESOURCES.ResearchStudy;

  const handleCopy = () => {
    navigator.clipboard.writeText(JSON.stringify(resourceData, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const endpoints = {
    ResearchStudy: "GET /fhir/R4/ResearchStudy/AYU-CVD-001",
    AdverseEvent: "GET /fhir/R4/AdverseEvent/SAE-2026-0904",
    Patient: "GET /fhir/R4/Patient/PT-1001?$include=PrakritiExtension",
    Observation: "GET /fhir/R4/Observation/OBS-PT1001-VISIT4-BP"
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-linear-to-r from-emerald-950 via-[#064e3b] to-slate-900 p-6 rounded-2xl text-white shadow-md border border-emerald-900/40">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-800 text-emerald-200 border border-emerald-600/40">
              HL7 FHIR Release 4 (R4)
            </span>
            <span className="text-xs text-emerald-300 font-medium">
              Ayush Interoperability Core Extensions
            </span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white font-sans">
            Ayush-FHIR R4 Interoperability Station
          </h1>
          <p className="text-xs text-slate-300 max-w-2xl leading-relaxed">
            Standardized healthcare data exchange representing Ayurvedic Prakriti dosha profiles, standardized botanical interventions, MedDRA coded adverse reactions, and trial protocols.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-300 text-xs font-semibold">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>FHIR R4 API Live (Port 8443)</span>
          </div>
        </div>
      </div>

      {/* 4 FHIR Status Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard
          title="FHIR Conformance"
          value="100% Valid"
          subvalue="HL7 FHIR R4 Schema"
          trend="ABDM Aligned"
          trendPositive={true}
          icon={CheckCircle2}
          iconBg="bg-emerald-50 text-emerald-700"
          sparklineData={[100, 100, 100, 100, 100, 100]}
          sparklineColor="#059669"
        />
        <KpiCard
          title="Ayush Extensions"
          value="4 Profiles"
          subvalue="Prakriti, Agni, Dhatu"
          trend="Ministry of Ayush"
          trendPositive={true}
          icon={Sparkles}
          iconBg="bg-teal-50 text-teal-700"
          sparklineData={[2, 3, 3, 4, 4, 4]}
          sparklineColor="#0d9488"
        />
        <KpiCard
          title="REST API Latency"
          value="18 ms"
          subvalue="JSON Serialization"
          trend="Gzip Cached"
          trendPositive={true}
          icon={Globe}
          iconBg="bg-cyan-50 text-cyan-700"
          sparklineData={[24, 22, 19, 18, 17, 18]}
          sparklineColor="#0284c7"
        />
        <KpiCard
          title="Interoperable Nodes"
          value="3 Hospitals"
          subvalue="AIIA, NIA, CCRAS"
          trend="Federated Exchange"
          trendPositive={true}
          icon={Database}
          iconBg="bg-indigo-50 text-indigo-700"
          sparklineData={[1, 2, 2, 3, 3, 3]}
          sparklineColor="#4f46e5"
        />
      </div>

      {/* Resource Explorer & Code Viewer */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        {/* Resource Selector Tabs & REST Simulator Bar */}
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {["ResearchStudy", "AdverseEvent", "Patient", "Observation"].map((res) => (
              <button
                key={res}
                onClick={() => setSelectedResource(res)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all whitespace-nowrap ${
                  selectedResource === res
                    ? 'bg-emerald-800 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:bg-slate-200/70 border border-slate-200'
                }`}
              >
                {res}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-mono text-[11px] font-bold">
              200 OK
            </span>
            <span className="font-mono text-xs text-slate-500 bg-slate-200/80 px-2.5 py-1 rounded-lg">
              {endpoints[selectedResource]}
            </span>
            <button
              onClick={handleCopy}
              className="p-2 rounded-lg bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 transition-colors"
              title="Copy JSON to clipboard"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* JSON Code Viewer */}
        <div className="p-5 bg-slate-950 overflow-x-auto">
          <pre className="text-emerald-400 font-mono text-xs leading-relaxed max-h-[500px]">
            {JSON.stringify(resourceData, null, 2)}
          </pre>
        </div>

        {/* Footer Conformance Note */}
        <div className="p-3 bg-slate-50 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
          <span className="flex items-center gap-1.5 text-emerald-800 font-medium">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            HL7 FHIR R4 & Ayush Core Profile v1.0 Validated
          </span>
          <span>Content-Type: application/fhir+json; charset=utf-8</span>
        </div>
      </div>
    </div>
  );
}
