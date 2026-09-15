import React, { useState } from 'react';
import {
  X,
  FileCheck2,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  FileText,
  Shield,
  Clock
} from 'lucide-react';

export default function ProtocolReviewModal({
  isOpen,
  submission,
  onClose,
  onSubmitDecision
}) {
  const [decision, setDecision] = useState("Approved Unconditionally");
  const [stipulations, setStipulations] = useState(submission?.stipulations || "");
  const [remarks, setRemarks] = useState("Protocol thoroughly reviewed by ethics committee quorum. Participant safety, vulnerable group safeguards, and herbal drug toxicity standards satisfy GCP guidelines.");

  if (!isOpen || !submission) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitDecision({
      submissionId: submission.id,
      decision,
      stipulations: decision.includes("Stipulations") ? stipulations : "",
      remarks,
      reviewDate: new Date().toISOString().split('T')[0],
      signatory: "Dr. S. K. Mahapatra (IEC Chairperson)"
    });
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
        <div className="p-5 border-b border-slate-200 bg-indigo-50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-100 text-indigo-800 border border-indigo-200">
              <FileCheck2 className="w-5 h-5 text-indigo-700" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Institutional Ethics Committee (IEC) Formal Review
              </h3>
              <p className="text-xs text-indigo-700 font-medium">
                Registration: ECR/1254/Inst/DL/2019/RR-24 • ICMR Bioethics Code
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

        {/* Submission Details */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-mono font-bold text-slate-700">{submission.id}</span>
              <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-indigo-100 text-indigo-800">
                {submission.submissionType}
              </span>
            </div>
            <p className="text-sm font-bold text-slate-900">{submission.trialTitle}</p>
            <div className="flex items-center gap-4 text-slate-500 pt-1">
              <span>Risk Tier: <strong className="text-slate-800">{submission.riskCategory}</strong></span>
              <span>ICF Version: <strong className="text-slate-800">{submission.icfVersion}</strong></span>
              <span>Chairperson: <strong className="text-slate-800">{submission.chairperson}</strong></span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Ethics Committee Decision
            </label>
            <div className="grid grid-cols-2 gap-2 text-xs">
              {[
                { label: "Approved Unconditionally", desc: "Full ethical clearance issued", color: "border-emerald-300 bg-emerald-50 text-emerald-900" },
                { label: "Approved with Stipulations", desc: "Clearance with mandatory monitoring rules", color: "border-teal-300 bg-teal-50 text-teal-900" },
                { label: "Revision Required", desc: "Requires updated ICF or safety logs", color: "border-amber-300 bg-amber-50 text-amber-900" },
                { label: "Rejected / Suspended", desc: "Risk outweighs potential clinical benefit", color: "border-rose-300 bg-rose-50 text-rose-900" }
              ].map((opt) => (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => setDecision(opt.label)}
                  className={`p-3 rounded-xl border text-left transition-all ${
                    decision === opt.label
                      ? `${opt.color} ring-2 ring-indigo-500 font-bold shadow-xs`
                      : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  <p className="font-semibold">{opt.label}</p>
                  <p className="text-[11px] text-slate-500 font-normal mt-0.5">{opt.desc}</p>
                </button>
              ))}
            </div>
          </div>

          {decision.includes("Stipulations") && (
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Mandatory Ethical Stipulations
              </label>
              <textarea
                rows="2"
                required
                value={stipulations}
                onChange={(e) => setStipulations(e.target.value)}
                placeholder="e.g. 48-hour inpatient monitoring required post-administration..."
                className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
              />
            </div>
          )}

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Committee Review Minutes & Ethical Justification
            </label>
            <textarea
              rows="3"
              required
              value={remarks}
              onChange={(e) => setRemarks(e.target.value)}
              className="w-full text-xs bg-slate-50 border border-slate-300 rounded-lg px-3 py-2 text-slate-800"
            />
          </div>

          <div className="p-3 bg-indigo-50/70 rounded-lg border border-indigo-200 flex items-center justify-between text-xs text-indigo-900">
            <span className="flex items-center gap-1.5 font-medium">
              <Shield className="w-4 h-4 text-indigo-700" />
              Digital Cryptographic Sign-Off: Dr. S. K. Mahapatra
            </span>
            <span className="font-mono text-[11px]">{new Date().toISOString().split('T')[0]}</span>
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
              className="px-5 py-2 rounded-xl bg-indigo-700 hover:bg-indigo-800 text-white text-xs font-bold flex items-center gap-1.5 shadow-md"
            >
              <CheckCircle2 className="w-4 h-4" /> Save Ethics Decision & Issue Clearance
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
