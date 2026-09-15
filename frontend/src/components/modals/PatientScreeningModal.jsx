import React, { useState } from 'react';
import {
  X,
  UserPlus,
  ShieldCheck,
  Lock,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { CLINICAL_TRIALS } from '../../data/mockData';

export default function PatientScreeningModal({
  isOpen,
  onClose,
  onEnrollPatient,
  defaultTrialId
}) {
  const [step, setStep] = useState(1);
  const [selectedTrialId, setSelectedTrialId] = useState(defaultTrialId || "AYU-CVD-001");
  const [formData, setFormData] = useState({
    name: "",
    age: 45,
    sex: "Male",
    mrn: "MRN-AIIA-2026-99812",
    phone: "+91 98101 ",
    prakriti: "Pitta-Kapha",
    vataPercent: 25,
    pittaPercent: 50,
    kaphaPercent: 25,
    agniType: "Tikshnagni",
    kostha: "Mrudu",
    inclusionCriteria1: true,
    inclusionCriteria2: true,
    exclusionCriteria1: false,
    informedConsentSigned: true
  });

  if (!isOpen) return null;

  const activeTrial = CLINICAL_TRIALS.find(t => t.id === selectedTrialId) || CLINICAL_TRIALS[0];
  const isCtriLocked = activeTrial.ctriLocked;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isCtriLocked) return;

    const newPatient = {
      id: `PT-${Math.floor(1090 + Math.random() * 500)}`,
      trialId: activeTrial.id,
      trialCode: activeTrial.code,
      name: formData.name || "Participant " + Math.floor(Math.random() * 1000),
      age: Number(formData.age),
      sex: formData.sex,
      screeningDate: new Date().toISOString().split('T')[0],
      enrollmentDate: new Date().toISOString().split('T')[0],
      status: "Active (Visit 1)",
      prakriti: formData.prakriti,
      vataPercent: formData.vataPercent,
      pittaPercent: formData.pittaPercent,
      kaphaPercent: formData.kaphaPercent,
      agniType: formData.agniType,
      kostha: formData.kostha,
      baselineSbp: 142,
      currentSbp: 142,
      eCrfCompletion: 15,
      complianceScore: 100,
      adverseEventsCount: 0,
      lastVisitDate: new Date().toISOString().split('T')[0],
      nextVisitDate: "2026-09-18"
    };

    onEnrollPatient(newPatient);
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
              <UserPlus className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Participant Screening & eCRF Enrollment
              </h3>
              <p className="text-xs text-slate-500">
                GCP-ICH E6(R2) & Ayush Research Council Compliance
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

        {/* Step Indicator */}
        <div className="px-6 py-3 bg-emerald-50/50 border-b border-emerald-100 flex items-center justify-between text-xs">
          <span className={`font-semibold ${step === 1 ? 'text-emerald-800' : 'text-slate-500'}`}>
            1. Protocol & CTRI Check
          </span>
          <span className="text-slate-300">→</span>
          <span className={`font-semibold ${step === 2 ? 'text-emerald-800' : 'text-slate-500'}`}>
            2. Demographics & Prakriti
          </span>
          <span className="text-slate-300">→</span>
          <span className={`font-semibold ${step === 3 ? 'text-emerald-800' : 'text-slate-500'}`}>
            3. Eligibility & Consent
          </span>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* STEP 1: Study Selection & CTRI Hard Gate Verification */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wider mb-1.5">
                  Select Clinical Trial Protocol
                </label>
                <select
                  value={selectedTrialId}
                  onChange={(e) => setSelectedTrialId(e.target.value)}
                  className="w-full text-xs font-medium bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                >
                  {CLINICAL_TRIALS.map(t => (
                    <option key={t.id} value={t.id}>
                      {t.code}: {t.shortTitle} ({t.phase}) {t.ctriLocked ? "🔒 [CTRI LOCKED]" : "✓ [CTRI REGISTERED]"}
                    </option>
                  ))}
                </select>
              </div>

              {/* CTRI Hard Gate Warning Banner if Trial is Locked */}
              {isCtriLocked ? (
                <div className="p-4 rounded-xl bg-amber-50 border-2 border-amber-400 text-amber-900 space-y-2">
                  <div className="flex items-center gap-2 font-bold text-sm text-amber-950">
                    <Lock className="w-5 h-5 text-amber-700 animate-bounce" />
                    <span>🔒 ENROLLMENT HARD GATE ENFORCED: REGISTRATION REQUIRED</span>
                  </div>
                  <p className="text-xs leading-relaxed text-amber-900">
                    <strong>Rule 75 of New Drugs and Clinical Trials Rules (2019):</strong> No clinical trial participant may be enrolled or administered investigational drug until public verification on the Clinical Trials Registry - India (CTRI) is confirmed.
                  </p>
                  <div className="p-2.5 rounded-lg bg-amber-100/80 border border-amber-300 font-mono text-[11px] text-amber-950">
                    Active Ref: {activeTrial.ctriNumber} (Status: {activeTrial.ctriStatus})
                  </div>
                  <p className="text-xs font-semibold text-rose-700">
                    Participant enrollment is disabled for this trial until ICMR verification clears.
                  </p>
                </div>
              ) : (
                <div className="p-3.5 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 space-y-1">
                  <div className="flex items-center gap-2 font-bold text-xs text-emerald-950">
                    <ShieldCheck className="w-4 h-4 text-emerald-700" />
                    <span>CTRI Registration Verified & Active</span>
                  </div>
                  <p className="text-xs text-emerald-800">
                    CTRI Ref: <strong>{activeTrial.ctriNumber}</strong> • IEC Clearance: <strong>{activeTrial.iecClearance}</strong>. Participant enrollment legally permissible.
                  </p>
                </div>
              )}

              <div className="p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1">
                <p><strong>Principal Investigator:</strong> {activeTrial.pi}</p>
                <p><strong>Clinical Site:</strong> {activeTrial.site}</p>
                <p><strong>Recruitment Progress:</strong> {activeTrial.currentEnrollment} / {activeTrial.targetEnrollment} subjects enrolled</p>
              </div>
            </div>
          )}

          {/* STEP 2: Demographics & Ayurvedic Prakriti Assessment */}
          {step === 2 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Participant Full Name</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="e.g. Ramesh Chandra Sharma"
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Institutional MRN</label>
                  <input
                    type="text"
                    readOnly
                    value={formData.mrn}
                    className="w-full text-xs font-mono bg-slate-100 border border-slate-300 rounded-lg px-3 py-2 text-slate-600"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Age (Years)</label>
                  <input
                    type="number"
                    min="18"
                    max="80"
                    value={formData.age}
                    onChange={(e) => setFormData({...formData, age: e.target.value})}
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Biological Sex</label>
                  <select
                    value={formData.sex}
                    onChange={(e) => setFormData({...formData, sex: e.target.value})}
                    className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              {/* Ayurvedic Prakriti & Bio-markers Assessment */}
              <div className="p-3.5 rounded-xl bg-teal-50/60 border border-teal-200 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-teal-700" />
                    <span className="text-xs font-bold text-teal-950 uppercase tracking-wider">
                      Ayurvedic Prakriti Assessment (CCR-Ayush Validated)
                    </span>
                  </div>
                  <span className="text-xs font-bold text-teal-800 font-mono bg-teal-100 px-2 py-0.5 rounded">
                    {formData.prakriti}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-700">Vata: {formData.vataPercent}%</label>
                    <input
                      type="range"
                      min="10"
                      max="70"
                      value={formData.vataPercent}
                      onChange={(e) => setFormData({...formData, vataPercent: Number(e.target.value)})}
                      className="w-full accent-teal-600"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-700">Pitta: {formData.pittaPercent}%</label>
                    <input
                      type="range"
                      min="10"
                      max="70"
                      value={formData.pittaPercent}
                      onChange={(e) => setFormData({...formData, pittaPercent: Number(e.target.value)})}
                      className="w-full accent-emerald-600"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-semibold text-slate-700">Kapha: {formData.kaphaPercent}%</label>
                    <input
                      type="range"
                      min="10"
                      max="70"
                      value={formData.kaphaPercent}
                      onChange={(e) => setFormData({...formData, kaphaPercent: Number(e.target.value)})}
                      className="w-full accent-amber-600"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-1">
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Agni Status (Digestive Fire)</label>
                    <select
                      value={formData.agniType}
                      onChange={(e) => setFormData({...formData, agniType: e.target.value})}
                      className="w-full text-xs bg-white border border-teal-200 rounded px-2.5 py-1.5 text-slate-800"
                    >
                      <option value="Samagni">Samagni (Balanced Fire)</option>
                      <option value="Tikshnagni">Tikshnagni (Hyper-metabolic)</option>
                      <option value="Mandagni">Mandagni (Hypo-metabolic)</option>
                      <option value="Vishamagni">Vishamagni (Erratic Fire)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-700 mb-1">Kostha (Bowel Tendency)</label>
                    <select
                      value={formData.kostha}
                      onChange={(e) => setFormData({...formData, kostha: e.target.value})}
                      className="w-full text-xs bg-white border border-teal-200 rounded px-2.5 py-1.5 text-slate-800"
                    >
                      <option value="Mrudu">Mrudu (Soft / Sensitive)</option>
                      <option value="Madhyama">Madhyama (Moderate)</option>
                      <option value="Krura">Krura (Hard / Costive)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* STEP 3: Eligibility & Informed Consent */}
          {step === 3 && (
            <div className="space-y-3">
              <p className="text-xs font-semibold text-slate-700 uppercase tracking-wider">
                GCP Protocol Eligibility Checklist
              </p>

              <div className="space-y-2 text-xs">
                <label className="flex items-start gap-2.5 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.inclusionCriteria1}
                    onChange={(e) => setFormData({...formData, inclusionCriteria1: e.target.checked})}
                    className="rounded text-emerald-600 focus:ring-emerald-500 mt-0.5"
                  />
                  <div>
                    <span className="font-semibold text-slate-900">Inclusion Criterion 1:</span> Meets clinical disease diagnostic thresholds with confirmed baseline lab biomarkers.
                  </div>
                </label>

                <label className="flex items-start gap-2.5 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.inclusionCriteria2}
                    onChange={(e) => setFormData({...formData, inclusionCriteria2: e.target.checked})}
                    className="rounded text-emerald-600 focus:ring-emerald-500 mt-0.5"
                  />
                  <div>
                    <span className="font-semibold text-slate-900">Inclusion Criterion 2:</span> Age between 18-70 years, willing to comply with standardized Ayurvedic dietary and lifestyle restrictions.
                  </div>
                </label>

                <label className="flex items-start gap-2.5 p-2.5 rounded-lg border border-slate-200 hover:bg-slate-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.informedConsentSigned}
                    onChange={(e) => setFormData({...formData, informedConsentSigned: e.target.checked})}
                    className="rounded text-emerald-600 focus:ring-emerald-500 mt-0.5"
                  />
                  <div>
                    <span className="font-bold text-emerald-900">Informed Consent Document (ICF):</span> Duly signed in presence of independent witness (Hindi / English Version 2.1).
                  </div>
                </label>
              </div>

              <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-[11px] text-slate-600">
                Enrollment will create an immutable cryptographic event anchored to the SHA-256 Merkle tree on Polygon Amoy.
              </div>
            </div>
          )}

          {/* Footer Buttons */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" /> Back
              </button>
            ) : (
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-xs font-semibold text-slate-500 hover:text-slate-800"
              >
                Cancel
              </button>
            )}

            {step < 3 ? (
              <button
                type="button"
                disabled={isCtriLocked}
                onClick={() => setStep(step + 1)}
                className={`px-5 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm ${
                  isCtriLocked
                    ? 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                }`}
              >
                Proceed to Screening <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="submit"
                disabled={isCtriLocked || !formData.informedConsentSigned}
                className={`px-6 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md ${
                  isCtriLocked || !formData.informedConsentSigned
                    ? 'bg-slate-300 text-slate-500 cursor-not-allowed'
                    : 'bg-emerald-700 hover:bg-emerald-800 text-white'
                }`}
              >
                <CheckCircle2 className="w-4 h-4" /> Complete Enrollment & Lock eCRF
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
