import React, { useState } from 'react';
import {
  FileCheck2,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Shield,
  FileText,
  Building2,
  Users,
  AlertOctagon,
  ArrowRight
} from 'lucide-react';
import KpiCard from '../common/KpiCard';
import StatusBadge from '../common/StatusBadge';
import ProtocolReviewModal from '../modals/ProtocolReviewModal';
import { IEC_SUBMISSIONS, INSTITUTION_INFO } from '../../data/mockData';
import { ROLE_TAB_CONFIG } from '../../data/roleDashboardConfig';

export default function EthicsView({ currentRole }) {
  const [submissions, setSubmissions] = useState(IEC_SUBMISSIONS);
  const [selectedSubmission, setSelectedSubmission] = useState(null);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const allowedTabs = ROLE_TAB_CONFIG.ethics?.[currentRole] || ['document-viewer'];
  const [activeTab, setActiveTab] = useState(allowedTabs[0]);

  const isRegulator = currentRole === 'regulator';

  const handleOpenReview = (sub) => {
    setSelectedSubmission(sub);
    setIsReviewModalOpen(true);
  };

  const handleDecisionSubmit = ({ submissionId, decision, stipulations, remarks }) => {
    setSubmissions(prev => prev.map(s => {
      if (s.id === submissionId) {
        return {
          ...s,
          status: decision,
          decision: decision.includes("Approved") ? "APPROVED" : "REVISION_REQUIRED",
          stipulations: stipulations || s.stipulations
        };
      }
      return s;
    }));
  };

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-linear-to-r from-indigo-950 via-[#1e1b4b] to-slate-900 p-6 rounded-2xl text-white shadow-md border border-indigo-900/40">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-indigo-900/80 text-indigo-200 border border-indigo-500/40">
              CDSCO Bioethics Registration: {INSTITUTION_INFO.iecRegistration}
            </span>
            <span className="text-xs text-indigo-300 font-medium">
              ICMR Ethical Guidelines 2017
            </span>
          </div>
          <h1 className="text-2xl font-extrabold tracking-tight text-white font-sans">
            Institutional Ethics Committee (IEC) Governance
          </h1>
          <p className="text-xs text-indigo-100/80 max-w-2xl leading-relaxed">
            Statutory bioethical oversight of human clinical trials, participant vulnerability safeguards, informed consent verification (ICF Hindi/English), and annual clearance renewals.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="p-3 rounded-xl bg-white/10 border border-indigo-400/30 text-xs">
            <p className="font-bold text-indigo-200">Chairperson</p>
            <p className="text-white font-medium">Dr. S. K. Mahapatra, MD, DNB</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {allowedTabs.map((tab) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={`px-3 py-2 rounded-lg text-xs font-bold ${activeTab === tab ? 'bg-indigo-700 text-white' : 'bg-white border border-slate-200 text-slate-600'}`}>
            {tab.replace('-', ' ')}
          </button>
        ))}
      </div>

      {/* Summary KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KpiCard
          title="Active Protocols"
          value="4 Regulated"
          subvalue="Full Quorum Clearance"
          trend="NABH Compliant"
          trendPositive={true}
          icon={FileCheck2}
          iconBg="bg-indigo-50 text-indigo-700"
          sparklineData={[3, 4, 4, 4, 4, 4]}
          sparklineColor="#4f46e5"
        />
        <KpiCard
          title="Submissions in Queue"
          value={`${submissions.filter(s => s.decision.includes("PENDING") || s.decision.includes("REVISION")).length} Pending`}
          subvalue="Under Committee Review"
          trend="Next Meeting: 10 Sep"
          trendPositive={true}
          icon={Clock}
          iconBg="bg-amber-50 text-amber-700"
          sparklineData={[2, 3, 2, 3, 2, 2]}
          sparklineColor="#d97706"
        />
        <KpiCard
          title="Urgent Safety Signal"
          value="1 Expedited"
          subvalue="SAE-2026-0904 Review"
          trend="Quorum Convened"
          trendPositive={false}
          icon={AlertOctagon}
          iconBg="bg-rose-50 text-rose-700"
          alertPulsing={true}
          sparklineData={[0, 0, 0, 1, 1, 1]}
          sparklineColor="#e11d48"
        />
        <KpiCard
          title="Annual Renewals"
          value="1 Overdue"
          subvalue="AYU-IMM-002 (Guduchi)"
          trend="14 Days Past Due"
          trendPositive={false}
          icon={AlertTriangle}
          iconBg="bg-orange-50 text-orange-700"
          sparklineData={[0, 0, 1, 1, 1, 1]}
          sparklineColor="#ea580c"
        />
      </div>

      {/* Submissions Review Queue */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <div>
            <h3 className="text-base font-bold text-slate-900">
              Protocol Submissions & Ethical Decisions Queue
            </h3>
            <p className="text-xs text-slate-500">
              Review protocol synopsis, participant consent forms, risk classifications, and issue clearances
            </p>
          </div>
          <span className="text-xs font-mono font-bold bg-indigo-50 text-indigo-800 px-3 py-1 rounded-lg border border-indigo-200">
            Quorum: 9 Bioethics Members
          </span>
        </div>

        <div className="divide-y divide-slate-100">
          {submissions.filter((sub) => activeTab === 'document-viewer' || activeTab === 'milestones' ? true : sub.decision?.includes(activeTab === 'decision' ? 'PENDING' : 'REVISION')).map((sub) => (
            <div key={sub.id} className="p-5 hover:bg-slate-50/80 transition-colors space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-xs bg-indigo-100 text-indigo-900 px-2 py-0.5 rounded">
                    {sub.id}
                  </span>
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                    {sub.submissionType}
                  </span>
                  <span className="font-mono text-xs text-slate-500">• {sub.trialId}</span>
                </div>

                <div className="flex items-center gap-2">
                  <StatusBadge status={sub.status} size="md" />
                  {!isRegulator && (
                    <button
                      onClick={() => handleOpenReview(sub)}
                      className="px-3.5 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-all"
                    >
                      <span>Review & Vote</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>

              <h4 className="text-sm font-bold text-slate-900 leading-snug">
                {sub.trialTitle}
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-xs text-slate-600 bg-slate-50/70 p-3 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-500">Risk Assessment:</span> <strong className="text-slate-800">{sub.riskCategory}</strong>
                </div>
                <div>
                  <span className="text-slate-500">Informed Consent:</span> <strong className="text-slate-800 font-mono">{sub.icfVersion}</strong>
                </div>
                <div>
                  <span className="text-slate-500">Annual Report Due:</span> <strong className="text-slate-800 font-mono">{sub.nextAnnualReportDue}</strong>
                </div>
              </div>

              {sub.stipulations && (
                <div className="p-3 rounded-xl bg-teal-50 border border-teal-200 text-xs text-teal-950 flex items-start gap-2">
                  <Shield className="w-4 h-4 text-teal-700 shrink-0 mt-0.5" />
                  <div>
                    <strong>Mandatory IEC Stipulations:</strong> {sub.stipulations}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Protocol Review Modal */}
      {selectedSubmission && (
        <ProtocolReviewModal
          isOpen={isReviewModalOpen}
          submission={selectedSubmission}
          onClose={() => setIsReviewModalOpen(false)}
          onSubmitDecision={handleDecisionSubmit}
        />
      )}
    </div>
  );
}
