import React, { useState } from 'react';
import {
  X,
  ShieldAlert,
  Clock,
  AlertOctagon,
  Calculator,
  CheckCircle2,
  AlertTriangle,
  FileCheck
} from 'lucide-react';
import { CLINICAL_TRIALS } from '../../data/mockData';

export default function ReportSaeModal({
  isOpen,
  onClose,
  onSubmitSae,
  defaultTrialId
}) {
  const [selectedTrialId, setSelectedTrialId] = useState(defaultTrialId || "AYU-NEURO-004");
  const [formData, setFormData] = useState({
    participantId: "PT-1082",
    eventTerm: "Acute Generalized Urticaria & Angioedema",
    medDraTerm: "Angioedema (MedDRA 10002424)",
    severity: "Severe (Grade 3)",
    type: "SAE",
    suspectDrug: "Ashwagandha (Withania somnifera) 500mg BD",
    batchNumber: "WS-EXT-2025-B04",
    onsetDate: new Date().toISOString().slice(0, 16),
    seriousnessCriteria: "Requires Inpatient Hospitalization",
    naranjoScore: 6,
    ayushCausality: "Asatmya (Allergic / Idiosyncratic Hypersensitivity)",
    investigatorNotes: "Subject developed acute symptoms within 14 days of investigational drug intake. Antihistamines administered.",
    statutoryWindowHours: 72
  });

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();

    const newSae = {
      id: `SAE-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      trialId: selectedTrialId,
      trialCode: selectedTrialId,
      participantId: formData.participantId,
      participantAge: 44,
      participantSex: "Female",
      eventTerm: formData.eventTerm,
      medDraTerm: formData.medDraTerm,
      severity: formData.severity,
      type: formData.type,
      suspectDrug: formData.suspectDrug,
      batchNumber: formData.batchNumber,
      onsetDate: formData.onsetDate,
      reportedDate: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }) + " IST",
      statutoryDeadline: "3-Day Statutory Window Active",
      deadlineHoursRemaining: formData.statutoryWindowHours,
      urgencyLevel: formData.severity.includes("Grade 3") || formData.severity.includes("Grade 4") ? "CRITICAL" : "HIGH",
      naranjoScore: Number(formData.naranjoScore),
      naranjoCausality: formData.naranjoScore >= 9 ? "Definite Causality" : formData.naranjoScore >= 5 ? "Probable Causality" : "Possible Causality",
      ayushSpecificCausality: formData.ayushCausality,
      outcome: "Hospitalized - Under Active Management",
      cdscoReportStatus: "Expedited Notification Pending CDSCO Form 44",
      dsmbReviewStatus: "Urgent Review Convened",
      investigatorNotes: formData.investigatorNotes,
      pvLead: "Dr. Sunita Kulkarni",
      actionRequired: "Mandatory statutory notification to CDSCO & Licensing Authority within 72 hours."
    };

    onSubmitSae(newSae);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto p-4 sm:p-6 md:p-12 flex justify-center items-center">
      <div 
        className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity" 
        onClick={onClose} 
      />

      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transform transition-all">
        {/* Header */}
        <div className="p-5 border-b border-slate-200 bg-rose-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-rose-100 text-rose-800 border border-rose-200">
              <AlertOctagon className="w-5 h-5 text-rose-600 animate-pulse" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Urgent Expedited AE / SAE Safety Report
              </h3>
              <p className="text-xs text-rose-700 font-medium">
                PvPI-Ayush & CDSCO Rule 75 Statutory Surveillance
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {/* Statutory Alert Notice */}
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-300 text-amber-900 text-xs flex items-start gap-2.5">
            <Clock className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <strong>Statutory Notification Clock:</strong> In accordance with the New Drugs and Clinical Trials Rules 2019, any Serious Adverse Event (SAE) occurring during a clinical trial must be reported to the Licensing Authority (CDSCO) and the Ethics Committee within <strong>24 hours (immediate notification)</strong> and detailed Form 44 within <strong>3 working days (72 hours)</strong>.
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Trial Protocol</label>
              <select
                value={selectedTrialId}
                onChange={(e) => setSelectedTrialId(e.target.value)}
                className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
              >
                {CLINICAL_TRIALS.map(t => (
                  <option key={t.id} value={t.id}>{t.code} - {t.shortTitle}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Participant Subject ID</label>
              <input
                type="text"
                required
                value={formData.participantId}
                onChange={(e) => setFormData({...formData, participantId: e.target.value})}
                className="w-full text-xs font-mono bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Clinical Adverse Event Term</label>
              <input
                type="text"
                required
                value={formData.eventTerm}
                onChange={(e) => setFormData({...formData, eventTerm: e.target.value})}
                placeholder="e.g. Acute Erythematous Macules"
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Standardized MedDRA Coding</label>
              <input
                type="text"
                required
                value={formData.medDraTerm}
                onChange={(e) => setFormData({...formData, medDraTerm: e.target.value})}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 font-mono"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Event Severity</label>
              <select
                value={formData.severity}
                onChange={(e) => setFormData({...formData, severity: e.target.value})}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
              >
                <option value="Mild (Grade 1)">Mild (Grade 1)</option>
                <option value="Moderate (Grade 2)">Moderate (Grade 2)</option>
                <option value="Severe (Grade 3)">Severe (Grade 3)</option>
                <option value="Life Threatening (Grade 4)">Life Threatening (Grade 4)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Classification</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({...formData, type: e.target.value})}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 font-semibold"
              >
                <option value="SAE">SAE (Serious Adverse Event)</option>
                <option value="AE">AE (Non-Serious Adverse Event)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Seriousness Criteria</label>
              <select
                value={formData.seriousnessCriteria}
                onChange={(e) => setFormData({...formData, seriousnessCriteria: e.target.value})}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-2 text-slate-800"
              >
                <option value="Requires Inpatient Hospitalization">Inpatient Hospitalization</option>
                <option value="Life Threatening">Life Threatening</option>
                <option value="Persistent Disability">Persistent Disability</option>
                <option value="Medically Significant">Medically Significant</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Suspect Ayurvedic Drug</label>
              <input
                type="text"
                value={formData.suspectDrug}
                onChange={(e) => setFormData({...formData, suspectDrug: e.target.value})}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Investigational Batch No.</label>
              <input
                type="text"
                value={formData.batchNumber}
                onChange={(e) => setFormData({...formData, batchNumber: e.target.value})}
                className="w-full text-xs font-mono bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
              />
            </div>
          </div>

          {/* Causality Assessment Section */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 font-bold text-xs text-slate-800">
                <Calculator className="w-4 h-4 text-emerald-600" />
                <span>Naranjo Algorithm Causality Rating: Score {formData.naranjoScore}</span>
              </div>
              <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                formData.naranjoScore >= 9 ? 'bg-red-100 text-red-800' :
                formData.naranjoScore >= 5 ? 'bg-amber-100 text-amber-800' : 'bg-slate-200 text-slate-700'
              }`}>
                {formData.naranjoScore >= 9 ? "Definite" : formData.naranjoScore >= 5 ? "Probable" : "Possible"}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Naranjo Score (0 - 10)</label>
                <input
                  type="number"
                  min="0"
                  max="10"
                  value={formData.naranjoScore}
                  onChange={(e) => setFormData({...formData, naranjoScore: Number(e.target.value)})}
                  className="w-full text-xs bg-white border border-slate-300 rounded px-2.5 py-1.5 text-slate-800"
                />
              </div>
              <div>
                <label className="block text-[11px] font-semibold text-slate-600 mb-1">Ayush Specific Causality</label>
                <select
                  value={formData.ayushCausality}
                  onChange={(e) => setFormData({...formData, ayushCausality: e.target.value})}
                  className="w-full text-xs bg-white border border-slate-300 rounded px-2.5 py-1.5 text-slate-800"
                >
                  <option value="Asatmya (Allergic / Idiosyncratic Hypersensitivity)">Asatmya (Hypersensitivity)</option>
                  <option value="Dosha Prakopa (Veerya Exacerbation)">Dosha Prakopa (Veerya Effect)</option>
                  <option value="Mithya Ahara-Vihara (Dietary Incompatibility)">Mithya Ahara (Dietary Incompat)</option>
                  <option value="Unrelated (Incidental Background Disease)">Unrelated (Incidental Disease)</option>
                </select>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Investigator Clinical Synopsis & Actions Taken</label>
            <textarea
              rows="2"
              value={formData.investigatorNotes}
              onChange={(e) => setFormData({...formData, investigatorNotes: e.target.value})}
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-rose-500"
            />
          </div>

          {/* Footer Buttons */}
          <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold flex items-center gap-2 shadow-md shadow-rose-200"
            >
              <AlertOctagon className="w-4 h-4" />
              Submit to PvPI & Initiate 3-Day Clock
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
