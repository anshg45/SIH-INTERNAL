import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from './components/layout/Sidebar';
import Navbar from './components/layout/Navbar';
import DashboardView from './components/views/DashboardView';
import StudyDetailView from './components/views/StudyDetailView';
import PharmacovigilanceView from './components/views/PharmacovigilanceView';
import EthicsView from './components/views/EthicsView';
import PatientsView from './components/views/PatientsView';
import AuditBlockchainView from './components/views/AuditBlockchainView';
import FhirView from './components/views/FhirView';
import CdiscView from './components/views/CdiscView';
import RegulatorView from './components/views/RegulatorView';
import LoginView from './components/views/LoginView';
import DataQueriesView from './components/views/DataQueriesView';
import ComplianceView from './components/views/ComplianceView';
import AeSummaryView from './components/views/AeSummaryView';
import DsmbFeedView from './components/views/DsmbFeedView';
import AdminSettingsView from './components/views/AdminSettingsView';
import StudyCreationView from './components/views/StudyCreationView';
import PatientPortalView from './components/views/PatientPortalView';

import NotificationDrawer from './components/common/NotificationDrawer';
import GlobalSearchModal from './components/common/GlobalSearchModal';
import PatientScreeningModal from './components/modals/PatientScreeningModal';
import ReportSaeModal from './components/modals/ReportSaeModal';
import NewStudyModal from './components/modals/NewStudyModal';

import { CLINICAL_TRIALS, PATIENTS_REGISTRY, PHARMACOVIGILANCE_EVENTS, ROLES } from './data/mockData';
import { canAccessView, ROLE_NAV_ITEMS } from './data/roleDashboardConfig';
import { createStudy, getCurrentUser, getPortfolio, getStoredToken, getStudies, logout as clearSession } from './api';
import { getLanguage } from './i18n';

const FRONTEND_ROLE_BY_BACKEND_ROLE = {
  pi: 'pi',
  coordinator: 'crc',
  monitor: 'cra',
  ethics_committee: 'iec',
  pharmacovigilance: 'pv',
  admin: 'admin',
  regulator: 'regulator',
};

const toUiStudy = (study) => ({
  ...study,
  code: study.title,
  shortTitle: study.title,
  statusVariant: study.status === 'active' ? 'recruiting' : 'locked',
  ctriNumber: study.ctri_registration_number || 'Pending CTRI Verification',
  currentEnrollment: study.enrolled_count,
  targetEnrollment: study.enrollment_target,
  completionRate: study.enrollment_percent,
  startDate: study.start_date,
  targetEndDate: study.end_date,
  site: study.site_id || 'AIIA Hospital, New Delhi',
});

export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentRole, setCurrentRole] = useState("admin");
  const [currentUserName, setCurrentUserName] = useState(null);
  const [currentUserEmail, setCurrentUserEmail] = useState(null);
  const [currentPatient, setCurrentPatient] = useState(null);
  const [language, setLanguage] = useState(getLanguage());
  const [activeView, setActiveView] = useState("dashboard");
  const [selectedTrialId, setSelectedTrialId] = useState(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  // Modals & Drawers state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isScreeningModalOpen, setIsScreeningModalOpen] = useState(false);
  const [isSaeModalOpen, setIsSaeModalOpen] = useState(false);
  const [isNewStudyModalOpen, setIsNewStudyModalOpen] = useState(false);
  const [modalTrialContext, setModalTrialContext] = useState("AYU-CVD-001");

  // Dynamic clinical trial lists
  const [trialsList, setTrialsList] = useState(CLINICAL_TRIALS);
  const [registeredProtocols, setRegisteredProtocols] = useState([]);
  const [protocolWorkflowStatuses, setProtocolWorkflowStatuses] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('ctms_protocol_workflow_statuses') || '{}');
    } catch {
      return {};
    }
  });
  const [livePortfolio, setLivePortfolio] = useState(null);
  const [patientsList, setPatientsList] = useState(PATIENTS_REGISTRY);
  const [safetyList, setSafetyList] = useState(PHARMACOVIGILANCE_EVENTS);

  // Toast feedback state
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!getStoredToken()) return;

    Promise.all([getCurrentUser(), getStudies(), getPortfolio()])
      .then(([user, studies, portfolio]) => {
        setCurrentRole(FRONTEND_ROLE_BY_BACKEND_ROLE[user.role] || 'admin');
        setCurrentUserName(user.name);
        setCurrentUserEmail(user.email);
        setTrialsList(studies.map(toUiStudy));
        setLivePortfolio(portfolio);
        setIsAuthenticated(true);
      })
      .catch(() => clearSession());
  }, []);

  useEffect(() => {
    localStorage.setItem('ctms_protocol_workflow_statuses', JSON.stringify(protocolWorkflowStatuses));
  }, [protocolWorkflowStatuses]);

  useEffect(() => {
    if (!canAccessView(currentRole, activeView)) {
      setActiveView(ROLE_NAV_ITEMS[currentRole]?.[0] || 'dashboard');
    }
  }, [currentRole, activeView]);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  };

  // Keyboard shortcut for universal search (Ctrl/Cmd + K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handlers
    const handleLogin = (roleId, userName, userEmail, patientRecord = null) => {
      const frontendRole = FRONTEND_ROLE_BY_BACKEND_ROLE[roleId] || roleId;
      setCurrentRole(frontendRole);
    setCurrentUserName(userName || null);
    setCurrentUserEmail(userEmail || null);
    setCurrentPatient(patientRecord);
    setIsAuthenticated(true);
    setActiveView('dashboard');
    getPortfolio().then(setLivePortfolio).catch(() => setLivePortfolio(null));
    const roleObj = ROLES.find(r => r.id === frontendRole);
    showToast(`Logged in as ${roleObj?.name} (${userName || roleObj?.holder})`, "info");
  };

  const handleLogout = () => {
    clearSession();
    setIsAuthenticated(false);
    setCurrentPatient(null);
    showToast("Signed out from AIIA CTMS Portal", "info");
  };

    const handleSwitchRole = (newRoleId) => {
    setCurrentRole(newRoleId);
    setCurrentUserName(null);
    setCurrentUserEmail(null);
    setActiveView('dashboard');
    const roleObj = ROLES.find(r => r.id === newRoleId);
    showToast(`Role switched to ${roleObj?.name} (${roleObj?.holder})`, "info");
  };

  const handleNavigate = (view, trialId = null) => {
    if (!canAccessView(currentRole, view)) {
      return;
    }
    setActiveView(view);
    if (trialId) {
      setSelectedTrialId(trialId);
    }
  };

  const handleEnrollPatient = (newPatient) => {
    setPatientsList(prev => [newPatient, ...prev]);
    // update trial enrollment count
    setTrialsList(prev => prev.map(t => {
      if (t.id === newPatient.trialId) {
        return {
          ...t,
          currentEnrollment: t.currentEnrollment + 1,
          completionRate: Math.round(((t.currentEnrollment + 1) / t.targetEnrollment) * 100)
        };
      }
      return t;
    }));
    showToast(`Participant ${newPatient.id} (${newPatient.name}) enrolled in ${newPatient.trialCode}. eCRF initiated.`);
  };

  const handleSubmitSae = (newSae) => {
    setSafetyList(prev => [newSae, ...prev]);
    showToast(`Expedited ${newSae.type} (${newSae.id}) logged. 3-Day CDSCO Statutory Countdown Initiated!`, "warning");
  };

  const handleCreateStudy = async (studyForm) => {
    const createdStudy = await createStudy({
      title: studyForm.title,
      phase: studyForm.phase,
      sponsor: studyForm.sponsor || null,
      ctri_registration_number: studyForm.isCtriPending ? null : studyForm.ctriNumber || null,
      enrollment_target: Number(studyForm.targetEnrollment),
      site_id: studyForm.site || null,
      start_date: new Date().toISOString().split('T')[0],
    });
    setTrialsList(prev => [toUiStudy(createdStudy), ...prev]);
    setRegisteredProtocols(prev => [{
      ...studyForm,
      id: createdStudy.id,
      registeredAt: new Date().toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short' }),
      status: studyForm.isCtriPending ? 'CTRI verification pending' : 'CTRI verified',
    }, ...prev]);
    setProtocolWorkflowStatuses(prev => ({ ...prev, [createdStudy.id]: 'pending_iec' }));
    showToast(`Trial protocol ${studyForm.code} onboarded successfully.`);
  };

  const handleAdvanceProtocol = (protocolId, nextStatus) => {
    setProtocolWorkflowStatuses(prev => ({ ...prev, [protocolId]: nextStatus }));
    setRegisteredProtocols(prev => prev.map(protocol => protocol.id === protocolId
      ? { ...protocol, workflowStatus: nextStatus, status: nextStatus === 'site_activation' ? 'IEC approved' : protocol.status }
      : protocol));
  };

  // If unauthenticated, show Login Portal
  if (!isAuthenticated) {
    return <LoginView onLogin={handleLogin} />;
  }

  if (currentRole === 'patient') {
    return <PatientPortalView patient={currentPatient} onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col antialiased">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in fade-in slide-in-from-bottom-5 duration-200">
          <div className={`p-4 rounded-xl shadow-xl border text-xs font-semibold flex items-center gap-2.5 ${
            toast.type === "warning"
              ? "bg-amber-900 text-amber-100 border-amber-700"
              : toast.type === "info"
              ? "bg-slate-900 text-slate-100 border-slate-700"
              : "bg-emerald-950 text-emerald-100 border-emerald-700"
          }`}>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>{toast.message}</span>
          </div>
        </div>
      )}

      {/* Sidebar */}
           <Sidebar
        activeView={activeView}
            onSelectView={handleNavigate}
        currentRole={currentRole}
        currentUserName={currentUserName}
        currentUserEmail={currentUserEmail}
        isCollapsed={isSidebarCollapsed}
        onToggleCollapse={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
        onLogout={handleLogout}
        urgentSaeCount={1}
        pendingIecCount={2}
        language={language}
      />

      {/* Main Container Area with dynamic left margin for Sidebar */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          isSidebarCollapsed ? 'ml-20' : 'ml-72'
        }`}
      >
        {/* Navbar */}
        <Navbar
          activeView={activeView}
          selectedTrialId={selectedTrialId}
          onSelectTrial={setSelectedTrialId}
          currentRole={currentRole}
          onSwitchRole={handleSwitchRole}
          onOpenSearch={() => setIsSearchOpen(true)}
          onOpenNotifications={() => setIsNotificationsOpen(true)}
          unreadAlertCount={4}
          language={language}
          onLanguageChange={setLanguage}
        />

        {/* Dynamic Main Workspace Views */}
        <main className="flex-1 pb-16">
          {activeView === 'dashboard' && (
            <DashboardView
              onSelectTrial={(id) => {
                setSelectedTrialId(id);
                handleNavigate('studies', id);
              }}
              onNavigate={handleNavigate}
                            onOpenNewStudyModal={() => setIsNewStudyModalOpen(true)}
                            trials={trialsList}
              currentRole={currentRole}
              currentUserName={currentUserName}
              currentUserEmail={currentUserEmail}
              livePortfolio={livePortfolio}
              registeredProtocols={registeredProtocols}
              onAdvanceProtocol={handleAdvanceProtocol}
              language={language}
            />
          )}

          {activeView === 'studies' && (
            <StudyDetailView
              selectedTrialId={selectedTrialId || "AYU-CVD-001"}
              onSelectTrial={setSelectedTrialId}
              onOpenScreeningModal={(trialId) => {
                setModalTrialContext(trialId);
                setIsScreeningModalOpen(true);
              }}
              onOpenSaeModal={(trialId) => {
                setModalTrialContext(trialId);
                setIsSaeModalOpen(true);
              }}
              currentRole={currentRole}
              currentUserName={currentUserName}
              currentUserEmail={currentUserEmail}
            />
          )}

          {activeView === 'pv' && (
            <PharmacovigilanceView
              selectedTrialId={selectedTrialId}
              onOpenSaeModal={(trialId) => {
                setModalTrialContext(trialId || "AYU-NEURO-004");
                setIsSaeModalOpen(true);
              }}
              currentRole={currentRole}
              currentUserName={currentUserName}
              currentUserEmail={currentUserEmail}
            />
          )}

          {activeView === 'ethics' && (
            <EthicsView currentRole={currentRole} registeredProtocols={registeredProtocols} onAdvanceProtocol={handleAdvanceProtocol} />
          )}

          {activeView === 'patients' && (
            <PatientsView
              selectedTrialId={selectedTrialId}
              onOpenScreeningModal={(trialId) => {
                setModalTrialContext(trialId || "AYU-CVD-001");
                setIsScreeningModalOpen(true);
              }}
              currentRole={currentRole}
            />
          )}

          {activeView === 'audit' && (
            <AuditBlockchainView currentRole={currentRole} />
          )}

          {activeView === 'fhir' && (
            <FhirView />
          )}

          {activeView === 'cdisc' && (
            <CdiscView />
          )}

          {activeView === 'regulator' && (
            <RegulatorView onNavigate={handleNavigate} />
          )}

          {activeView === 'data-queries' && <DataQueriesView currentRole={currentRole} />}
          {activeView === 'compliance' && <ComplianceView currentRole={currentRole} />}
          {activeView === 'ae-summary' && <AeSummaryView currentRole={currentRole} />}
          {activeView === 'dsmb-feed' && <DsmbFeedView currentRole={currentRole} />}
          {activeView === 'admin-settings' && <AdminSettingsView currentRole={currentRole} registeredProtocols={registeredProtocols} studies={trialsList} workflowStatuses={protocolWorkflowStatuses} onAdvanceProtocol={handleAdvanceProtocol} />}
          {activeView === 'study-create' && <StudyCreationView onOpenNewStudyModal={() => setIsNewStudyModalOpen(true)} />}
          {activeView === 'reports' && <SimpleWorkspace title="Reports & Downloads" description="Role-scoped clinical reports and approved downloads." />}
          {activeView === 'documents' && <SimpleWorkspace title="Documents" description="Role-scoped protocol and study documents." />}
        </main>
      </div>

      {/* Global Modals & Drawers */}
      <GlobalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        onNavigate={handleNavigate}
      />

      <NotificationDrawer
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
        onNavigate={handleNavigate}
      />

      <PatientScreeningModal
        isOpen={isScreeningModalOpen}
        onClose={() => setIsScreeningModalOpen(false)}
        onEnrollPatient={handleEnrollPatient}
        defaultTrialId={modalTrialContext}
      />

      <ReportSaeModal
        isOpen={isSaeModalOpen}
        onClose={() => setIsSaeModalOpen(false)}
        onSubmitSae={handleSubmitSae}
        defaultTrialId={modalTrialContext}
      />

      <NewStudyModal
        isOpen={isNewStudyModalOpen}
        onClose={() => setIsNewStudyModalOpen(false)}
        onCreateStudy={handleCreateStudy}
      />
    </div>
  );
}

function SimpleWorkspace({ title, description }) {
  return <div className="p-6 max-w-5xl mx-auto"><div className="bg-white border border-slate-200 rounded-2xl p-8"><h1 className="text-xl font-bold text-slate-900">{title}</h1><p className="text-sm text-slate-500 mt-2">{description}</p><div className="mt-6 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs font-semibold text-slate-600">Only records assigned to the active role are available here.</div></div></div>;
}