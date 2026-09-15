import React, { useState } from 'react';
import {
  X,
  FlaskConical,
  ShieldCheck,
  Lock,
  Plus,
  FileText
} from 'lucide-react';

export default function NewStudyModal({
  isOpen,
  onClose,
  onCreateStudy
}) {
  const [formData, setFormData] = useState({
    code: `AYU-RES-${Math.floor(100 + Math.random() * 900)}`,
    title: "",
    shortTitle: "",
    phase: "Phase II",
    domain: "Polyherbal Formulations",
    pi: "Prof. Dr. Anand Sharma",
    site: "AIIA Hospital, New Delhi",
    targetEnrollment: 150,
    formulation: "",
    ctriNumber: "",
    isCtriPending: true,
    iecClearance: `AIIA-IEC-2026-${Math.floor(100 + Math.random() * 900)}`
  });

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();

    await onCreateStudy(formData);
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
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-800 border border-emerald-200">
              <FlaskConical className="w-5 h-5 text-emerald-700" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Register New Clinical Trial Protocol
              </h3>
              <p className="text-xs text-slate-500">
                AIIA Clinical Research Directorate & CTRI Onboarding
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
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Protocol Identifier</label>
              <input
                type="text"
                required
                value={formData.code}
                onChange={(e) => setFormData({...formData, code: e.target.value})}
                className="w-full text-xs font-mono font-bold bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Clinical Phase</label>
              <select
                value={formData.phase}
                onChange={(e) => setFormData({...formData, phase: e.target.value})}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 font-semibold"
              >
                <option value="Phase I">Phase I (Safety / Pharmacokinetics)</option>
                <option value="Phase II">Phase II (Efficacy & Dosing)</option>
                <option value="Phase III">Phase III (Pivotal Confirmatory)</option>
                <option value="Phase IV">Phase IV (Post-Marketing Surveillance)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Ayurveda Domain</label>
              <select
                value={formData.domain}
                onChange={(e) => setFormData({...formData, domain: e.target.value})}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
              >
                <option value="Polyherbal Formulations">Polyherbal Formulations</option>
                <option value="Panchakarma & Shodhana">Panchakarma & Shodhana</option>
                <option value="Rasayana & Immunomodulation">Rasayana & Immunomodulation</option>
                <option value="Swasthavritta & Circadian">Swasthavritta & Circadian</option>
                <option value="Integrative Medicine">Integrative Medicine</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Full Protocol Scientific Title</label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) => setFormData({...formData, title: e.target.value})}
              placeholder="e.g. Randomized Placebo-Controlled Study of Triphala Guggulu in Hyperlipidemia"
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Short Clinical Title (Display Name)</label>
            <input
              type="text"
              value={formData.shortTitle}
              onChange={(e) => setFormData({...formData, shortTitle: e.target.value})}
              placeholder="e.g. Triphala Guggulu in Hyperlipidemia"
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Principal Investigator</label>
              <input
                type="text"
                value={formData.pi}
                onChange={(e) => setFormData({...formData, pi: e.target.value})}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Target Participant Enrollment</label>
              <input
                type="number"
                min="10"
                max="1000"
                value={formData.targetEnrollment}
                onChange={(e) => setFormData({...formData, targetEnrollment: Number(e.target.value)})}
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Investigational Ayurvedic Formulation / Regimen</label>
            <input
              type="text"
              value={formData.formulation}
              onChange={(e) => setFormData({...formData, formulation: e.target.value})}
              placeholder="e.g. Standardized Hydroalcoholic extract 500mg capsule BD"
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
            />
          </div>

          {/* CTRI Registration & Hard Gate Toggle */}
          <div className="p-3.5 rounded-xl border border-amber-200 bg-amber-50/70 space-y-2">
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.isCtriPending}
                  onChange={(e) => setFormData({...formData, isCtriPending: e.target.checked})}
                  className="rounded text-amber-600 focus:ring-amber-500"
                />
                <span className="text-xs font-bold text-amber-950">
                  Enforce CTRI Hard Gate (Registration Verification Pending)
                </span>
              </label>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                formData.isCtriPending ? 'bg-amber-200 text-amber-900' : 'bg-emerald-200 text-emerald-900'
              }`}>
                {formData.isCtriPending ? "Hard Gate Active" : "Verified"}
              </span>
            </div>

            {!formData.isCtriPending && (
              <div>
                <label className="block text-[11px] font-semibold text-slate-700 mb-1">CTRI Verified Number</label>
                <input
                  type="text"
                  placeholder="CTRI/2026/02/099881"
                  value={formData.ctriNumber}
                  onChange={(e) => setFormData({...formData, ctriNumber: e.target.value})}
                  className="w-full text-xs font-mono bg-white border border-slate-300 rounded px-2.5 py-1.5"
                />
              </div>
            )}
            <p className="text-[11px] text-amber-900">
              When CTRI Hard Gate is active, the system automatically prevents any participant enrollment or visit creation in compliance with Rule 75 of New Drugs & Clinical Trials Rules 2019.
            </p>
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
              className="px-5 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-md"
            >
              <Plus className="w-4 h-4" /> Register Trial Protocol
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
