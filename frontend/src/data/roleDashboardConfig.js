import {
  Activity,
  AlertTriangle,
  ArrowRight,
  BadgeAlert,
  Building2,
  CalendarClock,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Database,
  FileCheck2,
  FlaskConical,
  HeartPulse,
  Lock,
  Scale,
  ShieldCheck,
  Stethoscope,
  UserCog,
  Users,
} from 'lucide-react';
 
export const USER_ACCOUNTS = [
  {
    id: 'pi',
    name: 'Prof. Dr. Anand Sharma',
    email: 'anand.sharma@aiia.in',
    roleLabel: 'Principal Investigator',
    department: 'Clinical Research & Kayachikitsa',
    designation: 'Professor & Head',
  },
  {
    id: 'crc',
    name: 'Dr. Priya Nair',
    email: 'priya.nair@aiia.in',
    roleLabel: 'Research Coordinator',
    department: 'Clinical Research Operations',
    designation: 'Senior Clinical Research Coordinator',
  },
  {
    id: 'iec',
    name: 'Dr. S. K. Mahapatra',
    email: 'sk.mahapatra@aiia.in',
    roleLabel: 'Ethics Committee Member',
    department: 'Institutional Ethics Committee',
    designation: 'Chairperson',
  },
  {
    id: 'regulator',
    name: 'Inspector R. C. Verma',
    email: 'rc.verma@cdsco.gov.in',
    roleLabel: 'Regulatory Officer',
    department: 'CDSCO & AYUSH Regulatory Cell',
    designation: 'Joint Inspection Officer',
  },
  {
    id: 'pv',
    name: 'Dr. Sunita Kulkarni',
    email: 'sunita.kulkarni@aiia.in',
    roleLabel: 'Pharmacovigilance Officer',
    department: 'PvPI & Drug Safety',
    designation: 'Head, Pharmacovigilance Center',
  },
  {
    id: 'admin',
    name: 'Rajesh Mehra',
    email: 'rajesh.mehra@aiia.in',
    roleLabel: 'Administrator',
    department: 'Health Informatics & Security',
    designation: 'Chief Information & Security Officer',
  },
];
 
export const ROLE_DASHBOARD_CONFIG = {
  pi: {
    welcomeName: 'Prof. Dr. Anand Sharma',
    title: 'Clinical Trial Leadership Dashboard',
    summary:
      'You are leading the institution’s highest-priority interventional programs and maintaining investigative oversight across recruitment, approval, and safety readiness.',
    badge: 'Clinical Lead',
    highlights: ['3 active protocol portfolios', '2 sites in follow-up', '1 SAE under urgent review'],
    kpis: [
      { title: 'My Trials', value: '3', subvalue: 'Active portfolio', trend: '+1 this quarter', trendPositive: true, icon: FlaskConical, sparklineData: [3, 3, 4, 4, 4, 5], sparklineColor: '#059669' },
      { title: 'Enrollment', value: '510 / 650', subvalue: '78.5% target', trend: '+6.2% MoM', trendPositive: true, icon: Users, sparklineData: [340, 390, 430, 470, 510, 560], sparklineColor: '#0d9488' },
      { title: 'Site Performance', value: '92%', subvalue: 'Across 3 sites', trend: 'Above benchmark', trendPositive: true, icon: Building2, sparklineData: [80, 83, 85, 89, 90, 92], sparklineColor: '#3b82f6' },
      { title: 'Safety', value: '1 Critical', subvalue: '18h deadline', trend: 'Urgent action', trendPositive: false, icon: AlertTriangle, sparklineData: [1, 0, 1, 1, 2, 1], sparklineColor: '#ef4444' },
    ],
    alerts: [
      { title: 'SAE Escalation Required', detail: 'AYU-NEURO-004 requires PI sign-off for Form 44 before 18:00 today.', severity: 'Critical', action: 'Review safety packet', icon: BadgeAlert },
      { title: 'IEC Renewal Overdue', detail: 'AYU-IMM-002 annual ethics renewal needs corrective response by 09 Sep.', severity: 'High', action: 'Submit amendment', icon: FileCheck2 },
      { title: 'Site milestone review', detail: 'AIIA orthopedic cohort reached 100% enrollment and database lock readiness.', severity: 'Normal', action: 'Confirm close-out', icon: CheckCircle2 },
    ],
    tasks: [
      { title: 'Review SAE documentation', meta: 'AYU-NEURO-004 • PT-1082', due: 'Today', action: 'Signature pending' },
      { title: 'Approve screening backlog', meta: 'AYU-CVD-001 • 17 participants', due: 'Tomorrow', action: 'Operations review' },
      { title: 'Finalize protocol amendment', meta: 'AYU-IMM-002 • ethics response', due: '2 days', action: 'Prepare committee brief' },
    ],
    notifications: [
      { title: 'Monthly accrual report ready', time: '12 min ago', tone: 'info' },
      { title: 'Data lock clearance shared with site CRO', time: '1 hour ago', tone: 'success' },
      { title: 'IEC meeting agenda circulated', time: 'Yesterday', tone: 'warning' },
    ],
    recentActivity: [
      { label: 'Completed SDV for 12 subjects in AYU-IMM-002', time: '2h ago' },
      { label: 'Uploaded revised visit schedule for AYU-CVD-001', time: '5h ago' },
      { label: 'Site 02 screening threshold met for hypertension trial', time: '1d ago' },
    ],
    upcomingDeadlines: [
      { label: 'PI safety sign-off', due: 'Today, 18:00' },
      { label: 'Ethics corrective action', due: '09 Sep, 11:00' },
      { label: 'Interim DSMB review', due: '12 Sep, 15:30' },
    ],
    assignedTrials: [
      { code: 'AYU-CVD-001', title: 'Arjuna & Pushkarmool in Hypertension', site: 'AIIA & NIA Jaipur', phase: 'Phase II', status: 'Recruiting', nextMilestone: 'Interim review due in 7 days' },
      { code: 'AYU-NEURO-004', title: 'Ashwagandha in Cognitive Fatigue', site: 'AIIA New Delhi', phase: 'Phase III', status: 'Safety hold', nextMilestone: 'SAE response due today' },
      { code: 'AYU-IMM-002', title: 'Guduchi-Pippali Rasayana', site: 'AIIA Immunology Unit', phase: 'Phase III', status: 'Follow-up', nextMilestone: 'Annual ethics renewal pending' },
    ],
    chart: {
      label: 'Portfolio enrollment momentum',
      data: [
        { name: 'Jan', value: 110 },
        { name: 'Feb', value: 132 },
        { name: 'Mar', value: 168 },
        { name: 'Apr', value: 203 },
        { name: 'May', value: 246 },
        { name: 'Jun', value: 292 },
        { name: 'Jul', value: 356 },
        { name: 'Aug', value: 410 },
      ],
    },
  },
  crc: {
    welcomeName: 'Dr. Priya Nair',
    title: 'Operations and Participant Coordination Dashboard',
    summary:
      'You are orchestrating screening, follow-up scheduling, data completeness, and operational readiness across high-priority trials and study sites.',
    badge: 'Operations Lead',
    highlights: ['178 screening visits this month', '7 participant follow-ups pending', '2 protocol deviation logs under review'],
    kpis: [
      { title: 'Screening', value: '198', subvalue: 'Open queue', trend: '+24 this week', trendPositive: true, icon: ClipboardCheck, sparklineData: [80, 96, 112, 124, 148, 198], sparklineColor: '#10b981' },
      { title: 'Follow-ups', value: '37', subvalue: 'Due in 7 days', trend: '12 overdue', trendPositive: false, icon: CalendarClock, sparklineData: [28, 34, 30, 39, 42, 37], sparklineColor: '#f59e0b' },
      { title: 'Data Completion', value: '93.4%', subvalue: 'eCRF health', trend: '+3.1% week', trendPositive: true, icon: Database, sparklineData: [82, 84, 87, 90, 92, 93.4], sparklineColor: '#14b8a6' },
      { title: 'Protocol Deviations', value: '2', subvalue: 'Open reviews', trend: 'Within threshold', trendPositive: true, icon: Lock, sparklineData: [3, 2, 3, 2, 2, 2], sparklineColor: '#6366f1' },
    ],
    alerts: [
      { title: 'Pending participant reminders', detail: '12 eligible subjects need rescheduled visits for AYU-CVD-001 before the next monitoring window.', severity: 'High', action: 'Send reminders', icon: Clock3 },
      { title: 'Missed data entry', detail: '6 CRFs are incomplete in AYU-PREV-015 and need sponsor review.', severity: 'Medium', action: 'Escalate to site staff', icon: Database },
      { title: 'Visit logistics', detail: 'Two follow-up visits require transportation and investigator scheduling coordination.', severity: 'Normal', action: 'Coordinate site team', icon: Building2 },
    ],
    tasks: [
      { title: 'Call 17 eligible participants', meta: 'AYU-CVD-001', due: 'Today', action: 'Screening queue' },
      { title: 'Verify ICF signatures', meta: 'AYU-PREV-015', due: 'Tomorrow', action: 'Pending 8 forms' },
      { title: 'Review deviation log', meta: 'AYU-IMM-002', due: '2 days', action: 'Monitor response' },
    ],
    notifications: [
      { title: 'New participant enrollment batch uploaded', time: '15 min ago', tone: 'success' },
      { title: 'Principal investigator approved revised visit plan', time: '2 hours ago', tone: 'info' },
      { title: 'Sample logistics delay at Site 03', time: 'Yesterday', tone: 'warning' },
    ],
    recentActivity: [
      { label: 'Completed visit documentation for PT-1008', time: '45 min ago' },
      { label: 'Issued reminder for AYU-IMM-002 follow-ups', time: '3h ago' },
      { label: 'Updated temperature logs and kit inventory', time: '1d ago' },
    ],
    upcomingDeadlines: [
      { label: 'Follow-up contact window', due: 'Today, 17:00' },
      { label: 'Data review batch close', due: '10 Sep, 14:00' },
      { label: 'Consent verification review', due: '12 Sep, 10:30' },
    ],
    assignedTrials: [
      { code: 'AYU-CVD-001', title: 'Hypertension trial recruitment', site: 'AIIA New Delhi + NIA Jaipur', phase: 'Phase II', status: 'Recruiting', nextMilestone: '17 screening cases to review' },
      { code: 'AYU-NEURO-004', title: 'Cognitive fatigue follow-up', site: 'AIIA New Delhi', phase: 'Phase III', status: 'Safety hold', nextMilestone: 'SAE packet sign-off' },
      { code: 'AYU-PREV-015', title: 'Prediabetes lifestyle intervention', site: 'Swasthavritta center', phase: 'Phase I/II', status: 'Site activated', nextMilestone: 'Visit schedule to finalize' },
    ],
    chart: {
      label: 'Screening and visit completion',
      data: [
        { name: 'Jan', value: 52 },
        { name: 'Feb', value: 66 },
        { name: 'Mar', value: 84 },
        { name: 'Apr', value: 91 },
        { name: 'May', value: 104 },
        { name: 'Jun', value: 120 },
        { name: 'Jul', value: 136 },
        { name: 'Aug', value: 148 },
      ],
    },
  },
  iec: {
    welcomeName: 'Dr. S. K. Mahapatra',
    title: 'Ethics and Protocol Review Dashboard',
    summary:
      'You are reviewing protocol safety, informed consent adequacy, and annual submissions to ensure participant protection remains aligned with committee safeguards.',
    badge: 'Ethics Governance',
    highlights: ['3 submissions awaiting committee action', '1 SAE review in expedited queue', '1 annual renewal overdue'],
    kpis: [
      { title: 'Protocols Pending', value: '3', subvalue: 'Active queue', trend: '1 urgent', trendPositive: false, icon: FileCheck2, sparklineData: [2, 3, 3, 4, 4, 3], sparklineColor: '#4f46e5' },
      { title: 'Amendments', value: '2', subvalue: 'Under review', trend: '+1 this month', trendPositive: true, icon: Scale, sparklineData: [1, 1, 2, 2, 2, 2], sparklineColor: '#7c3aed' },
      { title: 'SAE Reviews', value: '1', subvalue: 'Expedited', trend: 'Within 24h target', trendPositive: true, icon: AlertTriangle, sparklineData: [0, 0, 1, 1, 1, 1], sparklineColor: '#f97316' },
      { title: 'Approvals Expiring', value: '2', subvalue: 'Due soon', trend: 'Review needed', trendPositive: false, icon: Clock3, sparklineData: [3, 2, 2, 1, 1, 2], sparklineColor: '#ef4444' },
    ],
    alerts: [
      { title: 'Urgent SAE response review', detail: 'AYU-NEURO-004 safety review requires expedited review before 14:00.', severity: 'Critical', action: 'Convene IEC safety meeting', icon: BadgeAlert },
      { title: 'Annual renewal revision required', detail: 'AYU-IMM-002 needs cumulative safety table and updated IB before approval.', severity: 'High', action: 'Request revision package', icon: FileCheck2 },
      { title: 'Protocol amendment to discuss', detail: 'AYU-MET-007 inpatient continuation plan needs committee approval.', severity: 'Medium', action: 'Place on agenda', icon: Scale },
    ],
    tasks: [
      { title: 'Chair expedited SAE review', meta: 'AYU-NEURO-004 • SAE-2026-0904', due: 'Today', action: 'Meeting scheduled' },
      { title: 'Review amendment packet', meta: 'AYU-MET-007', due: 'Tomorrow', action: 'Risk-benefit discussion' },
      { title: 'Assess annual renewal responses', meta: 'AYU-IMM-002', due: '2 days', action: 'Re-review required' },
    ],
    notifications: [
      { title: 'Committee agenda circulated for September review', time: '10 min ago', tone: 'info' },
      { title: 'Safety response memo received from PI', time: '2 hours ago', tone: 'success' },
      { title: 'Approval letter for AYU-PREV-015 renewed', time: 'Yesterday', tone: 'success' },
    ],
    recentActivity: [
      { label: 'Approved AYU-PREV-015 with unconditional ethics clearance', time: '1d ago' },
      { label: 'Requested clarifications from AYU-IMM-002 sponsor', time: '2d ago' },
      { label: 'Logged SAE review checklist for AYU-NEURO-004', time: '3d ago' },
    ],
    upcomingDeadlines: [
      { label: 'Expedited SAE committee meeting', due: 'Today, 14:00' },
      { label: 'Annual ethics follow-up review', due: '09 Sep, 16:00' },
      { label: 'Protocol amendment review summary', due: '12 Sep, 10:30' },
    ],
    assignedTrials: [
      { code: 'AYU-NEURO-004', title: 'Ashwagandha SAE review', site: 'AIIA New Delhi', phase: 'Phase III', status: 'Expedited review', nextMilestone: 'Safety committee review today' },
      { code: 'AYU-IMM-002', title: 'Annual renewal response', site: 'AIIA Immunology Unit', phase: 'Phase III', status: 'Revision required', nextMilestone: 'Correction package expected' },
      { code: 'AYU-MET-007', title: 'Panchakarma protocol stipulations', site: 'AIIA Panchakarma Center', phase: 'Phase II', status: 'Approved with stipulations', nextMilestone: 'Inpatient monitoring compliance check' },
    ],
    chart: {
      label: 'Review workload and approval cycle',
      data: [
        { name: 'Jan', value: 6 },
        { name: 'Feb', value: 7 },
        { name: 'Mar', value: 8 },
        { name: 'Apr', value: 10 },
        { name: 'May', value: 9 },
        { name: 'Jun', value: 11 },
        { name: 'Jul', value: 13 },
        { name: 'Aug', value: 12 },
      ],
    },
  },
  cra: {
    welcomeName: 'Vikramaditya Rao',
    title: 'Site Monitoring and GCP Compliance Dashboard',
    summary:
      'You are conducting source data verification, reviewing protocol deviations, and confirming investigational product accountability across your assigned sites.',
    badge: 'GCP Auditor',
    highlights: ['2 assigned studies under monitoring', '1 monitoring visit report due', '3 open data queries'],
    kpis: [
      { title: 'Assigned Studies', value: '2', subvalue: 'Active monitoring', trend: 'Stable', trendPositive: true, icon: FlaskConical, sparklineData: [2, 2, 2, 2, 2, 2], sparklineColor: '#0891b2' },
      { title: 'SDV Completion', value: '87%', subvalue: 'Source verified', trend: '+5% this cycle', trendPositive: true, icon: ClipboardCheck, sparklineData: [68, 72, 76, 80, 84, 87], sparklineColor: '#06b6d4' },
      { title: 'Protocol Deviations', value: '3', subvalue: 'Under review', trend: '1 new this week', trendPositive: false, icon: AlertTriangle, sparklineData: [1, 2, 2, 3, 2, 3], sparklineColor: '#f59e0b' },
      { title: 'Open Data Queries', value: '3', subvalue: 'Awaiting resolution', trend: '2 overdue', trendPositive: false, icon: Database, sparklineData: [5, 4, 4, 3, 4, 3], sparklineColor: '#6366f1' },
    ],
    alerts: [
      { title: 'Monitoring visit report due', detail: 'AYU-CVD-001 on-site visit report must be finalized within 48h of the last visit.', severity: 'High', action: 'Complete visit report', icon: Clock3 },
      { title: 'Protocol deviation needs review', detail: 'AYU-IMM-002 recorded a visit window deviation for PT-1041 pending classification.', severity: 'Medium', action: 'Review deviation log', icon: AlertTriangle },
      { title: 'Investigational product reconciliation', detail: 'Site 02 IP accountability log for AYU-CVD-001 is ready for cross-check.', severity: 'Normal', action: 'Verify IP logs', icon: ShieldCheck },
    ],
    tasks: [
      { title: 'Conduct SDV for recent visits', meta: 'AYU-CVD-001 • 9 subjects', due: 'Today', action: 'Source verification' },
      { title: 'Classify visit window deviation', meta: 'AYU-IMM-002 • PT-1041', due: 'Tomorrow', action: 'Deviation review' },
      { title: 'Resolve outstanding data queries', meta: '3 open queries', due: '2 days', action: 'Query resolution' },
    ],
    notifications: [
      { title: 'Site coordinator uploaded new eCRF batch', time: '25 min ago', tone: 'info' },
      { title: 'Monitoring visit confirmed for AYU-CVD-001', time: '2 hours ago', tone: 'success' },
      { title: 'Query response received from CRC', time: 'Yesterday', tone: 'success' },
    ],
    recentActivity: [
      { label: 'Completed SDV pass for 9 subjects in AYU-CVD-001', time: '1h ago' },
      { label: 'Logged protocol deviation review for AYU-IMM-002', time: '4h ago' },
      { label: 'Reconciled investigational product log at Site 02', time: '1d ago' },
    ],
    upcomingDeadlines: [
      { label: 'Monitoring visit report submission', due: 'Tomorrow, 17:00' },
      { label: 'Deviation classification review', due: '09 Sep, 12:00' },
      { label: 'Quarterly GCP audit checklist', due: '14 Sep, 10:00' },
    ],
    assignedTrials: [
      { code: 'AYU-CVD-001', title: 'Arjuna & Pushkarmool in Hypertension', site: 'AIIA & NIA Jaipur', phase: 'Phase II', status: 'Recruiting', nextMilestone: 'Monitoring visit report due tomorrow' },
      { code: 'AYU-IMM-002', title: 'Guduchi-Pippali Rasayana', site: 'AIIA Immunology Unit', phase: 'Phase III', status: 'Follow-up', nextMilestone: 'Deviation classification pending' },
    ],
    chart: {
      label: 'SDV completion and query resolution',
      data: [
        { name: 'Jan', value: 60 },
        { name: 'Feb', value: 65 },
        { name: 'Mar', value: 70 },
        { name: 'Apr', value: 74 },
        { name: 'May', value: 79 },
        { name: 'Jun', value: 82 },
        { name: 'Jul', value: 85 },
        { name: 'Aug', value: 87 },
      ],
    },
  },
  regulator: {
    welcomeName: 'Inspector R. C. Verma',
    title: 'Regulatory Inspection and CTRI Compliance Dashboard',
    summary:
      'You are monitoring statutory compliance, inspection readiness, and ongoing submission obligations across the institute’s regulatory portfolio.',
    badge: 'CDSCO / Ayush',
    highlights: ['2 dossier checks in active review', '1 submission ready for export', '1 enforcement watch item active'],
    kpis: [
      { title: 'CTRI Checks', value: '5', subvalue: 'Ready for review', trend: '2 pending sign-off', trendPositive: true, icon: ShieldCheck, sparklineData: [3, 4, 4, 5, 5, 5], sparklineColor: '#10b981' },
      { title: 'NDCT Compliance', value: '96%', subvalue: 'Across active trials', trend: 'Within statutory norms', trendPositive: true, icon: Scale, sparklineData: [88, 90, 91, 94, 95, 96], sparklineColor: '#0ea5e9' },
      { title: 'Document Review', value: '8', subvalue: 'Due ≤ 30 days', trend: '1 urgent', trendPositive: false, icon: FileCheck2, sparklineData: [7, 8, 9, 9, 8, 8], sparklineColor: '#f59e0b' },
      { title: 'Audit Readiness', value: '98%', subvalue: 'Inspection score', trend: 'No critical gaps', trendPositive: true, icon: Lock, sparklineData: [90, 92, 94, 95, 97, 98], sparklineColor: '#22c55e' },
    ],
    alerts: [
      { title: 'Expedited SAE dossier review', detail: 'AYU-NEURO-004 requires Form 44 SAR review and export verification before statutory deadline.', severity: 'Critical', action: 'Review export packet', icon: BadgeAlert },
      { title: 'CTRI Rule 75 gate', detail: 'AYU-MET-007 is still enrollment-locked awaiting formal registrar confirmation.', severity: 'High', action: 'Check registry status', icon: Lock },
      { title: 'Annual document review', detail: 'Two AP reports and one IEC annexure need document-control verification.', severity: 'Medium', action: 'Track document pack', icon: FileCheck2 },
    ],
    tasks: [
      { title: 'Validate SAE submission packet', meta: 'AYU-NEURO-004', due: 'Today', action: 'Export readiness check' },
      { title: 'Confirm CTRI status', meta: 'AYU-MET-007', due: 'Tomorrow', action: 'Hard gate review' },
      { title: 'Reconcile annual compliance logs', meta: 'AIIA portfolio', due: '2 days', action: 'Audit binder update' },
    ],
    notifications: [
      { title: 'Inspection calendar published', time: '1 hour ago', tone: 'info' },
      { title: 'Document package uploaded to secure registry', time: '3 hours ago', tone: 'success' },
      { title: 'Regulatory hotline response logged', time: 'Yesterday', tone: 'warning' },
    ],
    recentActivity: [
      { label: 'Reviewed CV risk-benefit annex for ANM ethics submission', time: '1h ago' },
      { label: 'Checked CTRI verification status for AYU-MET-007', time: '3h ago' },
      { label: 'Exported compliance packet for executive review', time: '1d ago' },
    ],
    upcomingDeadlines: [
      { label: 'Form 44 review due', due: 'Today, 18:00' },
      { label: 'CTRI verification follow-up', due: '09 Sep, 10:00' },
      { label: 'Annual compliance dossier', due: '12 Sep, 15:30' },
    ],
    assignedTrials: [
      { code: 'AYU-MET-007', title: 'CTRI enforcement monitoring', site: 'AIIA Panchakarma Center', phase: 'Phase II', status: 'Enrollment locked', nextMilestone: 'Registry verification pending' },
      { code: 'AYU-NEURO-004', title: 'Safety export review', site: 'AIIA New Delhi', phase: 'Phase III', status: 'Inspection watch', nextMilestone: 'Safety packet validation' },
      { code: 'AYU-CVD-001', title: 'Routine GCP dossier review', site: 'AIIA & NIA Jaipur', phase: 'Phase II', status: 'Compliant', nextMilestone: 'Quarterly audit verification' },
    ],
    chart: {
      label: 'Regulatory compliance readiness',
      data: [
        { name: 'Jan', value: 70 },
        { name: 'Feb', value: 74 },
        { name: 'Mar', value: 79 },
        { name: 'Apr', value: 83 },
        { name: 'May', value: 88 },
        { name: 'Jun', value: 92 },
        { name: 'Jul', value: 95 },
        { name: 'Aug', value: 96 },
      ],
    },
  },
  pv: {
    welcomeName: 'Dr. Sunita Kulkarni',
    title: 'Pharmacovigilance Command Dashboard',
    summary:
      'You are triaging reports, validating seriousness, and ensuring all SAE and safety signal workflows meet statutory deadlines with sponsor accountability.',
    badge: 'Safety Surveillance',
    highlights: ['4 active safety cases', '1 critical SAE in 18h window', '2 trends under active monitoring'],
    kpis: [
      { title: 'Open Cases', value: '4', subvalue: 'Safety tracking', trend: '+1 this week', trendPositive: true, icon: HeartPulse, sparklineData: [2, 3, 3, 4, 4, 4], sparklineColor: '#f97316' },
      { title: 'SAE Reports', value: '1', subvalue: 'Critical urgency', trend: '18h left', trendPositive: false, icon: BadgeAlert, sparklineData: [0, 0, 1, 1, 1, 1], sparklineColor: '#ef4444' },
      { title: 'Safety Signals', value: '2', subvalue: 'Trend review', trend: 'Monitoring active', trendPositive: true, icon: Activity, sparklineData: [1, 1, 2, 2, 2, 2], sparklineColor: '#8b5cf6' },
      { title: 'Expedited Follow-up', value: '3', subvalue: 'Due in 72h', trend: 'On target', trendPositive: true, icon: Clock3, sparklineData: [4, 3, 3, 2, 2, 3], sparklineColor: '#f59e0b' },
    ],
    alerts: [
      { title: 'Critical SAE in AYU-NEURO-004', detail: 'PT-1082 developed angioedema, with required CDSCO reporting due in 18h.', severity: 'Critical', action: 'Escalate to PI', icon: BadgeAlert },
      { title: 'Suspected signal review', detail: 'A second rash-related report in same batch requires case causality review.', severity: 'High', action: 'Assess batch trend', icon: HeartPulse },
      { title: 'Follow-up case ready', detail: 'One moderate AE in AYU-IMM-002 has completed recovery and may be closed.', severity: 'Normal', action: 'Confirm closure', icon: CheckCircle2 },
    ],
    tasks: [
      { title: 'Prepare Form 44 submission', meta: 'AYU-NEURO-004 • PT-1082', due: 'Today', action: 'PI sign-off pending' },
      { title: 'Review causality for rash report', meta: 'Batch WS-EXT-2025-B04', due: 'Today', action: 'Signal monitoring' },
      { title: 'Close resolved AE case', meta: 'AYU-IMM-002 • PT-1065', due: 'Tomorrow', action: 'Safety closure log' },
    ],
    notifications: [
      { title: 'Batch signal review meeting scheduled', time: '20 min ago', tone: 'info' },
      { title: 'New report received from site coordinator', time: '1 hour ago', tone: 'warning' },
      { title: 'Weekly PvPI digest uploaded', time: 'Yesterday', tone: 'success' },
    ],
    recentActivity: [
      { label: 'Logged new SAE for PT-1082 into safety repository', time: '30 min ago' },
      { label: 'Requested investigator clarification on rash timeline', time: '2h ago' },
      { label: 'Updated Naranjo assessment for AYU-IMM-002 AE', time: '1d ago' },
    ],
    upcomingDeadlines: [
      { label: 'Form 44 statutory response', due: 'Today, 18:00' },
      { label: 'Batch safety trend review', due: '09 Sep, 12:30' },
      { label: 'Quarterly signal report', due: '12 Sep, 17:00' },
    ],
    assignedTrials: [
      { code: 'AYU-NEURO-004', title: 'Ashwagandha safety cohort', site: 'AIIA New Delhi', phase: 'Phase III', status: 'Critical review', nextMilestone: 'Expedited report due today' },
      { code: 'AYU-CVD-001', title: 'Arjuna safety monitoring', site: 'AIIA & NIA Jaipur', phase: 'Phase II', status: 'Routine monitoring', nextMilestone: 'Monthly aggregate review' },
      { code: 'AYU-IMM-002', title: 'Rasayana AE follow-up', site: 'AIIA Immunology Unit', phase: 'Phase III', status: 'Trend monitoring', nextMilestone: 'Closure review pending' },
    ],
    chart: {
      label: 'Safety events and trends',
      data: [
        { name: 'Jan', value: 2 },
        { name: 'Feb', value: 2 },
        { name: 'Mar', value: 3 },
        { name: 'Apr', value: 2 },
        { name: 'May', value: 3 },
        { name: 'Jun', value: 4 },
        { name: 'Jul', value: 5 },
        { name: 'Aug', value: 4 },
      ],
    },
  },
  admin: {
    welcomeName: 'Rajesh Mehra',
    title: 'Portfolio Administration and Compliance Dashboard',
    summary:
      'You are managing the institution-wide clinical research portfolio, security posture, system integrity, and governance across all operational domains.',
    badge: 'System Admin',
    highlights: ['6 active trials under oversight', '742 participants tracked', '0 critical platform incidents'],
    kpis: [
      { title: 'Trials Portfolio', value: '6', subvalue: 'Across domains', trend: '+1 active', trendPositive: true, icon: FlaskConical, sparklineData: [4, 4, 5, 5, 6, 6], sparklineColor: '#10b981' },
      { title: 'Participants', value: '742', subvalue: 'Active registry', trend: '+54 this month', trendPositive: true, icon: Users, sparklineData: [500, 540, 610, 660, 690, 742], sparklineColor: '#0ea5e9' },
      { title: 'Compliance', value: '96%', subvalue: 'All functions', trend: 'Stable', trendPositive: true, icon: ShieldCheck, sparklineData: [89, 90, 92, 94, 95, 96], sparklineColor: '#16a34a' },
      { title: 'System Alerts', value: '3', subvalue: 'Action required', trend: 'One critical', trendPositive: false, icon: UserCog, sparklineData: [1, 2, 2, 3, 3, 3], sparklineColor: '#ef4444' },
    ],
    alerts: [
      { title: 'Critical SAE system escalation', detail: 'AYU-NEURO-004 safety packet needs routing to PI and regulator export queue.', severity: 'Critical', action: 'Escalate to workflow', icon: BadgeAlert },
      { title: 'Annual access review pending', detail: 'Three site-user permissions require recertification for security policy compliance.', severity: 'High', action: 'Trigger review cycle', icon: UserCog },
      { title: 'Blockchain anchor status', detail: 'All audit logs remain successfully anchored to Polygon Amoy with no anomalies.', severity: 'Normal', action: 'Finalize monthly report', icon: ShieldCheck },
    ],
    tasks: [
      { title: 'Review user access recertification', meta: 'Site & sponsor accounts', due: 'Today', action: 'Security compliance' },
      { title: 'Validate export archive', meta: 'Regulatory packet audit', due: 'Tomorrow', action: 'Evidence integrity check' },
      { title: 'Confirm monthly governance dashboard', meta: 'Institutional leadership report', due: '2 days', action: 'Board package prep' },
    ],
    notifications: [
      { title: 'System health sync completed successfully', time: '5 min ago', tone: 'success' },
      { title: 'New role access requests logged', time: '1 hour ago', tone: 'info' },
      { title: 'Audit trail checksum verification cleared', time: 'Yesterday', tone: 'success' },
    ],
    recentActivity: [
      { label: 'Completed access review for two site coordinators', time: '1h ago' },
      { label: 'Updated role-based navigation map for all users', time: '3h ago' },
      { label: 'Validated Polygon anchor record #124589', time: '1d ago' },
    ],
    upcomingDeadlines: [
      { label: 'Access review completion', due: 'Today, 17:00' },
      { label: 'System maintenance window', due: '10 Sep, 01:00' },
      { label: 'Monthly governance pack', due: '12 Sep, 09:30' },
    ],
    assignedTrials: [
      { code: 'AYU-CVD-001', title: 'Institution-wide recruitment portfolio', site: 'AIIA + NIA Jaipur', phase: 'Phase II', status: 'Operational', nextMilestone: 'Quarterly admin review' },
      { code: 'AYU-NEURO-004', title: 'Safety and data environment', site: 'AIIA New Delhi', phase: 'Phase III', status: 'Active', nextMilestone: 'Compliance check pending' },
      { code: 'AYU-IMM-002', title: 'System governance watchlist', site: 'AIIA Immunology Unit', phase: 'Phase III', status: 'Monitoring', nextMilestone: 'User recertification due' },
    ],
    chart: {
      label: 'Portfolio health and compliance',
      data: [
        { name: 'Jan', value: 81 },
        { name: 'Feb', value: 84 },
        { name: 'Mar', value: 87 },
        { name: 'Apr', value: 89 },
        { name: 'May', value: 92 },
        { name: 'Jun', value: 94 },
        { name: 'Jul', value: 96 },
        { name: 'Aug', value: 96 },
      ],
    },
  },
};

export const ROLE_NAV_ITEMS = {
  pi: ['dashboard', 'studies', 'pv', 'reports', 'documents'],
  crc: ['dashboard', 'patients', 'data-queries'],
  cra: ['dashboard', 'compliance', 'data-queries'],
  iec: ['ethics', 'pv'],
  pv: ['pv', 'ae-summary', 'dsmb-feed'],
  admin: ['dashboard', 'study-create', 'admin-settings', 'audit', 'fhir', 'regulator'],
  regulator: ['dashboard', 'studies', 'regulator', 'audit', 'fhir'],
};

export const ROLE_VIEW_ACCESS = ROLE_NAV_ITEMS;

export function canAccessView(roleId, viewId) {
  const allowed = ROLE_NAV_ITEMS[roleId] || ROLE_NAV_ITEMS.admin;
  return allowed.includes(viewId);
}

export const ROLE_TAB_CONFIG = {
  studies: {
    pi: ['overview', 'enrollment', 'visits', 'deviations', 'safety', 'milestones', 'documents', 'audit'],
    regulator: ['overview', 'enrollment', 'visits', 'deviations', 'safety', 'milestones', 'documents', 'audit'],
  },
  patients: {
    crc: ['screening', 'enrollment', 'visits', 'deviations', 'safety'],
  },
  pv: {
    pi: ['all', 'sae', 'ae'],
    iec: ['sae'],
    pv: ['detail', 'workflow', 'history'],
  },
  ethics: {
    iec: ['document-viewer', 'decision', 'milestones'],
  },
  compliance: {
    cra: ['visit-compliance', 'deviation-review', 'monitoring-report'],
  },
  'data-queries': {
    crc: ['inbox'],
    cra: ['raise', 'resolve'],
  },
};

 
// Lightweight per-user personalization layer.
// Multiple mock accounts share the same role (e.g. 5 PIs), so the base
// ROLE_DASHBOARD_CONFIG alone can't tell them apart. Rather than duplicating
// entire datasets per account, we deterministically re-derive small,
// internally-consistent variations (name, KPI magnitude, item ordering)
// from the logged-in user's email so each of the 35 mock accounts feels
// distinct while still sharing one config object per role.
function seedFromString(str) {
  let seed = 0;
  for (let i = 0; i < str.length; i++) seed = (seed * 31 + str.charCodeAt(i)) >>> 0;
  return seed;
}
 
function rotate(arr, offset) {
  if (!Array.isArray(arr) || arr.length < 2) return arr;
  const n = offset % arr.length;
  return [...arr.slice(n), ...arr.slice(0, n)];
}
 
function bumpValue(value, pct) {
  const match = String(value).match(/^(\d+(?:\.\d+)?)(.*)$/);
  if (!match) return value;
  const num = parseFloat(match[1]);
  const suffix = match[2] || '';
  const bumped = Math.max(0, Math.round((num + num * pct) * 10) / 10);
  return `${bumped}${suffix}`;
}
 
export function getPersonalizedDashboard(roleId, userName, userEmail) {
  const base = ROLE_DASHBOARD_CONFIG[roleId] || ROLE_DASHBOARD_CONFIG.pi;
  if (!userEmail) return base;
 
  const seed = seedFromString(userEmail);
  const variant = seed % 5; // up to 5 mock accounts per role
  const pct = (variant - 2) * 0.05; // -10% .. +10%, deterministic per account
 
  return {
    ...base,
    welcomeName: userName || base.welcomeName,
    kpis: base.kpis.map((k) => ({ ...k, value: bumpValue(k.value, pct) })),
    alerts: rotate(base.alerts, variant),
    tasks: rotate(base.tasks, variant),
    notifications: rotate(base.notifications, variant),
    recentActivity: rotate(base.recentActivity, variant),
    upcomingDeadlines: rotate(base.upcomingDeadlines, variant),
    assignedTrials: rotate(base.assignedTrials, variant),
  };
}
 
 








