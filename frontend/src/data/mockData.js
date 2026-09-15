/**
 * All India Institute of Ayurveda (AIIA), New Delhi
 * Clinical Trials Management System (CTMS) - Comprehensive Institutional Datasets
 * Aligned with GCP-ICH E6(R2), New Drugs and Clinical Trials Rules 2019, CTRI, and PvPI
 */

export const INSTITUTION_INFO = {
  name: "All India Institute of Ayurveda (AIIA)",
  hindiName: "अखिल भारतीय आयुर्वेद संस्थान",
  location: "Gautampuri, Sarita Vihar, Mathura Road, New Delhi - 110076",
  ministry: "Ministry of Ayush, Government of India",
  accreditations: ["NABH Accredited Hospital", "NABL Accredited Central Research Lab", "CDSCO Registered Ethics Committee"],
  iecRegistration: "ECR/1254/Inst/DL/2019/RR-24",
  blockchainNetwork: "Polygon Amoy Testnet (Proof of Audit Integrity)",
  contractAddress: "0x8a92F7c808B692019b88b488F77b47b4d137A206",
  currentMerkleRoot: "0x7f4a289b52cc89345091a27e8d531bb3429810de08e9c9027814b7852a348b9c",
  blockHeight: 124589,
};

export const ROLES = [
  {
    id: "admin",
    name: "System Administrator",
    holder: "Rajesh Mehra",
    qualification: "B.Tech (CSE), CISA, ISO 27001 LA",
    designation: "Chief Information & Security Officer",
    department: "Health Informatics & Blockchain Infrastructure",
    badge: "System Admin",
    avatar: "RM",
    color: "slate",
    description: "User provisioning, CTRI hard gate configuration, cryptographic anchor logs, system health."
  },
  {
    id: "pi",
    name: "Principal Investigator (PI)",
    holder: "Prof. Dr. Anand Sharma",
    qualification: "MD (Ayurveda), PhD (Kayachikitsa)",
    designation: "Professor & Head, Dept. of Kayachikitsa",
    department: "Clinical Research & Kayachikitsa",
    badge: "Clinical Lead",
    avatar: "AS",
    color: "emerald",
    description: "Full clinical investigator authority, protocol amendments, eCRF validation, and safety sign-off."
  },
  {
    id: "crc",
    name: "Study Coordinator (CRC)",
    holder: "Dr. Priya Nair",
    qualification: "BAMS, MSc (Clinical Research)",
    designation: "Senior Clinical Research Coordinator",
    department: "Clinical Research Operations",
    badge: "Operations",
    avatar: "PN",
    color: "teal",
    description: "Patient screening, visit scheduling, eCRF data entry, participant follow-up & ICF management."
  },
  {
    id: "cra",
    name: "Clinical Research Associate (Monitor)",
    holder: "Vikramaditya Rao",
    qualification: "M.Pharm, GCP Certified Lead Auditor",
    designation: "Senior Clinical Quality & Monitor",
    department: "Quality Assurance & GCP Auditing",
    badge: "GCP Auditor",
    avatar: "VR",
    color: "cyan",
    description: "Source data verification (SDV), protocol deviation oversight, investigational product accountability."
  },
  {
    id: "iec",
    name: "Ethics Committee Member (IEC)",
    holder: "Dr. S. K. Mahapatra",
    qualification: "MD, DNB (Pharmacology), Bioethics Fellow",
    designation: "Chairperson, Institutional Ethics Committee",
    department: "AIIA Institutional Ethics Committee",
    badge: "Ethics Governance",
    avatar: "SM",
    color: "indigo",
    description: "Protocol clearance, risk-benefit evaluations, ICF approvals, participant vulnerability safeguards."
  },
  {
    id: "pv",
    name: "Pharmacovigilance Lead (PvPI)",
    holder: "Dr. Sunita Kulkarni",
    qualification: "MD (Ayurveda - Dravyaguna), PGD-PV",
    designation: "Head, Peripheral Pharmacovigilance Center",
    department: "Pharmacovigilance Programme of India (Ayush)",
    badge: "Safety Surveillance",
    avatar: "SK",
    color: "amber",
    description: "Adverse event triage, Naranjo causality scoring, 3-day CDSCO/PvPI statutory deadline tracking."
  },
  {
    id: "regulator",
    name: "Regulatory Inspector (CDSCO / MoA)",
    holder: "Inspector R. C. Verma",
    qualification: "M.Pharm, Drug Control Administration",
    designation: "Joint Inspection Officer, CDSCO (Ayush Cell)",
    department: "Central Drugs Standard Control Organisation",
    badge: "Regulatory Inspector",
    avatar: "RV",
    color: "rose",
    description: "Official statutory oversight. STRICT READ-ONLY MODE with regulatory dossier export and audit proof inspection."
  }
];

export const CLINICAL_TRIALS = [
  {
    id: "AYU-CVD-001",
    code: "AYU-CVD-001",
    title: "Efficacy and Safety of Arjuna (Terminalia arjuna) & Pushkarmool (Inula racemosa) Polyherbal Extract in Mild-to-Moderate Essential Hypertension",
    shortTitle: "Arjuna & Pushkarmool in Hypertension (HRIDA-Trial)",
    phase: "Phase II",
    domain: "Cardiovascular & Polyherbal",
    domainBadge: "Polyherbal",
    status: "Recruiting",
    statusVariant: "recruiting",
    ctriNumber: "CTRI/2025/08/071234",
    ctriStatus: "Verified & Registered",
    ctriLocked: false,
    iecClearance: "AIIA-IEC-2025-042",
    iecApprovalDate: "2025-04-14",
    pi: "Prof. Dr. Anand Sharma",
    piId: "pi",
    crc: "Dr. Priya Nair",
    site: "AIIA Hospital, New Delhi (Site 01) & NIA Jaipur (Site 02)",
    targetEnrollment: 180,
    currentEnrollment: 142,
    screeningCount: 198,
    completionRate: 78.8,
    startDate: "2025-05-01",
    targetEndDate: "2026-11-30",
    formulation: "Terminalia arjuna bark extract (500mg) + Inula racemosa root extract (250mg) aqueous extract capsule, BD with warm water",
    primaryEndpoint: "Mean reduction in 24-hour ambulatory systolic blood pressure (SBP) at Week 12 compared to baseline",
    secondaryEndpoints: [
      "Improvement in lipid profile (LDL-C, Triglycerides)",
      "Assessment of Ayurvedic Hridya Guna & Mano-Vega stabilization",
      "Incidence of treatment-emergent adverse events (TEAEs)"
    ],
    visitsCount: 6,
    openDeviations: 1,
    safetyEventsCount: 3,
    lastAuditBlock: 124580,
    sdtmReady: true,
    description: "A randomized, double-blind, placebo-controlled multi-center clinical study evaluating the cardioprotective and antihypertensive potency of classical Ayurvedic botanicals."
  },
  {
    id: "AYU-NEURO-004",
    code: "AYU-NEURO-004",
    title: "Double-Blind Placebo-Controlled Trial of Standardized Withania somnifera (Ashwagandha 500mg BD) in Chronic Cognitive Fatigue & Generalized Anxiety Disorder",
    shortTitle: "Ashwagandha Extract in Cognitive Fatigue (MEDHYA-Trial)",
    phase: "Phase III",
    domain: "Neurobiology & Rasayana",
    domainBadge: "Rasayana",
    status: "Recruiting",
    statusVariant: "recruiting",
    ctriNumber: "CTRI/2024/11/068901",
    ctriStatus: "Verified & Registered",
    ctriLocked: false,
    iecClearance: "AIIA-IEC-2024-118",
    iecApprovalDate: "2024-10-22",
    pi: "Prof. Dr. Anand Sharma",
    piId: "pi",
    crc: "Dr. Priya Nair",
    site: "AIIA New Delhi - Dept. of Manovigyan & Kayachikitsa",
    targetEnrollment: 320,
    currentEnrollment: 286,
    screeningCount: 360,
    completionRate: 89.3,
    startDate: "2024-12-01",
    targetEndDate: "2026-12-31",
    formulation: "KSM-66 Standardized Ashwagandha root extract 500mg capsule, twice daily with milk after meals",
    primaryEndpoint: "Change in Hamilton Anxiety Rating Scale (HAM-A) and Fatigue Severity Scale (FSS) at Week 16",
    secondaryEndpoints: [
      "Serum Cortisol levels at 0, 8, and 16 weeks",
      "Executive function testing using Wisconsin Card Sorting Test",
      "Ayurvedic Medhya & Smriti grading scales"
    ],
    visitsCount: 8,
    openDeviations: 0,
    safetyEventsCount: 5,
    lastAuditBlock: 124584,
    criticalSaeAlert: true,
    criticalSaeDeadlineHours: 18,
    sdtmReady: true,
    description: "Phase III multi-arm evaluation of standardized Withania somnifera root extract for neurocognitive enhancement, stress resilience, and sleep architecture."
  },
  {
    id: "AYU-MET-007",
    code: "AYU-MET-007",
    title: "Clinical Evaluation of Classical Virechana Panchakarma Regimen in Non-Alcoholic Fatty Liver Disease (NAFLD) & Metabolic Syndrome",
    shortTitle: "Virechana Panchakarma in NAFLD & Metabolic Syndrome",
    phase: "Phase II",
    domain: "Panchakarma & Metabolic Disorders",
    domainBadge: "Panchakarma",
    status: "Enrollment Locked",
    statusVariant: "locked",
    ctriNumber: "CTRI/REF/2026/02/099411",
    ctriStatus: "Pending CTRI Verification",
    ctriLocked: true,
    ctriLockReason: "Statutory hard gate active: CTRI registration verification pending from ICMR-NIMS registry. Patient enrollment is legally prohibited under Rule 75 of New Drugs and Clinical Trials Rules, 2019.",
    iecClearance: "AIIA-IEC-2026-015",
    iecApprovalDate: "2026-01-20",
    pi: "Dr. Alok Srivastava",
    piId: "pi",
    crc: "Dr. Priya Nair",
    site: "AIIA Panchakarma Center of Excellence, New Delhi",
    targetEnrollment: 120,
    currentEnrollment: 0,
    screeningCount: 42,
    completionRate: 0.0,
    startDate: "Pending CTRI",
    targetEndDate: "2027-06-30",
    formulation: "Snehapana with Mahatiktaka Ghrita followed by Virechana with Trivrit Avaleha (40g) and Aragvadhadi Kashaya",
    primaryEndpoint: "Reduction in Controlled Attenuation Parameter (CAP score) via FibroScan at Day 90 post-Virechana",
    secondaryEndpoints: [
      "HOMA-IR insulin resistance index",
      "Serum ALT, AST, and GGT liver transaminases",
      "Agni Deepti & Koshta Shuddhi clinical assessment"
    ],
    visitsCount: 5,
    openDeviations: 0,
    safetyEventsCount: 0,
    lastAuditBlock: 124572,
    sdtmReady: false,
    description: "Investigating the biological mechanisms of therapeutic purgation (Virechana) on hepatic steatosis, lipid homeostasis, and inflammatory cytokines in NAFLD."
  },
  {
    id: "AYU-IMM-002",
    code: "AYU-IMM-002",
    title: "Tinospora cordifolia (Guduchi) + Piper longum (Pippali) Rasayana Formulation in Post-Viral Immune Restoration & Cellular Senescence",
    shortTitle: "Guduchi-Pippali Rasayana in Immune Recovery",
    phase: "Phase III",
    domain: "Rasayana & Immunology",
    domainBadge: "Rasayana",
    status: "Active - Follow-up",
    statusVariant: "active",
    ctriNumber: "CTRI/2024/06/054321",
    ctriStatus: "Verified & Registered",
    ctriLocked: false,
    iecClearance: "AIIA-IEC-2024-033",
    iecApprovalDate: "2024-03-10",
    iecRenewalAlert: true,
    iecRenewalDeadline: "14 days overdue",
    pi: "Dr. Meenakshi Sahoo",
    piId: "pi",
    crc: "Dr. Priya Nair",
    site: "AIIA New Delhi - Dept. of Dravyaguna & Clinical Immunology",
    targetEnrollment: 250,
    currentEnrollment: 248,
    screeningCount: 290,
    completionRate: 99.2,
    startDate: "2024-07-01",
    targetEndDate: "2026-09-30",
    formulation: "Hydroalcoholic extract of Tinospora cordifolia (300mg) + Piper longum fruit powder (50mg) tablet, BD with honey",
    primaryEndpoint: "Restoration of CD4+/CD8+ T-cell ratio and natural killer (NK) cell cytotoxicity at Day 60",
    secondaryEndpoints: [
      "Serum IL-6, TNF-alpha, and hs-CRP reduction",
      "Bala (immune vitality) score using classical validated questionnaire"
    ],
    visitsCount: 7,
    openDeviations: 2,
    safetyEventsCount: 2,
    lastAuditBlock: 124586,
    sdtmReady: true,
    description: "Evaluates the Rasayana immunomodulatory cascade of Guduchi and bioavailability-enhancing Pippali on cellular senescence and post-viral recovery."
  },
  {
    id: "AYU-OST-011",
    code: "AYU-OST-011",
    title: "Standardized Boswellia serrata (Shallaki) & Curcuma longa (Haridra) vs Celecoxib in Knee Osteoarthritis (Sandhigata Vata): Non-Inferiority Study",
    shortTitle: "Shallaki & Haridra in Knee Osteoarthritis",
    phase: "Phase IV",
    domain: "Musculoskeletal & Shalya Tantra",
    domainBadge: "Integrative",
    status: "Database Lock",
    statusVariant: "locked-db",
    ctriNumber: "CTRI/2023/10/041122",
    ctriStatus: "Verified & Registered",
    ctriLocked: false,
    iecClearance: "AIIA-IEC-2023-091",
    iecApprovalDate: "2023-09-15",
    pi: "Prof. Dr. Anand Sharma",
    piId: "pi",
    crc: "Dr. Priya Nair",
    site: "AIIA Orthopedic & Shalya OPD, New Delhi",
    targetEnrollment: 200,
    currentEnrollment: 200,
    screeningCount: 244,
    completionRate: 100.0,
    startDate: "2023-11-01",
    targetEndDate: "2026-05-15",
    formulation: "Boswellia serrata extract (Shallaki 400mg, 65% boswellic acids) + Curcuma longa extract (Haridra 250mg, 95% curcuminoids) vs Celecoxib 100mg BD",
    primaryEndpoint: "WOMAC Osteoarthritis Index (Pain, Stiffness, Physical Function) non-inferiority margin delta = 5 at Week 24",
    secondaryEndpoints: [
      "Joint space width (JSW) by standardized plain radiography",
      "Gastrointestinal tolerability profile and safety indices"
    ],
    visitsCount: 9,
    openDeviations: 0,
    safetyEventsCount: 4,
    lastAuditBlock: 124588,
    sdtmReady: true,
    description: "Pivotal non-inferiority multi-center trial establishing Ayurvedic herbal synergy against standard NSAIDs with enhanced gastrointestinal safety."
  },
  {
    id: "AYU-PREV-015",
    code: "AYU-PREV-015",
    title: "Dinacharya-Based Integrative Circadian Lifestyle & Dietary Protocol in Impaired Fasting Glucose (Pre-Diabetes): A Community Pragmatic Trial",
    shortTitle: "Dinacharya Protocol in Pre-Diabetes Prevention",
    phase: "Phase I/II",
    domain: "Swasthavritta & Preventive Medicine",
    domainBadge: "Lifestyle",
    status: "Site Activated",
    statusVariant: "activated",
    ctriNumber: "CTRI/2025/12/083419",
    ctriStatus: "Verified & Registered",
    ctriLocked: false,
    iecClearance: "AIIA-IEC-2025-088",
    iecApprovalDate: "2025-11-28",
    pi: "Dr. Hemant Gupta",
    piId: "pi",
    crc: "Dr. Priya Nair",
    site: "AIIA Swasthavritta & Community Health Division",
    targetEnrollment: 150,
    currentEnrollment: 18,
    screeningCount: 30,
    completionRate: 12.0,
    startDate: "2026-01-15",
    targetEndDate: "2027-12-31",
    formulation: "Structured Dinacharya protocol: Brahma Muhurta wakefulness, Ushapana (copper vessel water), Yogic Pranayama, and Phalatrikadi Kwatha (30ml morning)",
    primaryEndpoint: "Progression rate to Type 2 Diabetes (HbA1c >= 6.5%) at 12 months",
    secondaryEndpoints: [
      "Circadian cortisol and melatonin rhythmicity",
      "Body mass index and visceral adiposity index"
    ],
    visitsCount: 6,
    openDeviations: 0,
    safetyEventsCount: 0,
    lastAuditBlock: 124578,
    sdtmReady: false,
    description: "TranslationalSwasthavritta protocol linking ancient Ayurvedic circadian timing with molecular chronobiology in metabolic syndrome prevention."
  }
];

export const PHARMACOVIGILANCE_EVENTS = [
  {
    id: "SAE-2026-0904",
    trialId: "AYU-NEURO-004",
    trialCode: "AYU-NEURO-004",
    participantId: "PT-1082",
    participantAge: 42,
    participantSex: "Female",
    eventTerm: "Severe Maculopapular Rash with Periorbital Angioedema",
    medDraTerm: "Angioedema (MedDRA 10002424)",
    severity: "Severe (Grade 3)",
    type: "SAE",
    suspectDrug: "Ashwagandha (Withania somnifera) Extract Capsule 500mg BD",
    batchNumber: "WS-EXT-2025-B04",
    onsetDate: "2026-09-02 08:30 IST",
    reportedDate: "2026-09-02 14:15 IST",
    statutoryDeadline: "2026-09-05 14:15 IST",
    deadlineHoursRemaining: 18,
    urgencyLevel: "CRITICAL",
    naranjoScore: 6,
    naranjoCausality: "Probable Causality",
    ayushSpecificCausality: "Asatmya (Hypersensitivity / Idiosyncratic)",
    outcome: "Hospitalized, Condition Stabilized with Antihistamines & Corticosteroids",
    cdscoReportStatus: "Draft Ready - Pending PI Digital Sign-off",
    dsmbReviewStatus: "Urgent Review Convened",
    investigatorNotes: "Subject developed generalized pruritic erythematous macules followed by periorbital edema 14 days after starting investigational product. Investigational product was immediately withheld. Re-challenge not recommended.",
    pvLead: "Dr. Sunita Kulkarni",
    actionRequired: "CDSCO Form 44 expedited notification submission required within 3-day statutory window."
  },
  {
    id: "AE-2026-0819",
    trialId: "AYU-CVD-001",
    trialCode: "AYU-CVD-001",
    participantId: "PT-1033",
    participantAge: 56,
    participantSex: "Male",
    eventTerm: "Mild Epigastric Burning Sensation (Amlapitta)",
    medDraTerm: "Dyspepsia (MedDRA 10013946)",
    severity: "Mild (Grade 1)",
    type: "AE",
    suspectDrug: "Arjuna & Pushkarmool Polyherbal Extract Capsule",
    batchNumber: "AP-CAP-2025-01",
    onsetDate: "2026-08-18",
    reportedDate: "2026-08-19",
    statutoryDeadline: "Non-expedited (Monthly log)",
    deadlineHoursRemaining: 360,
    urgencyLevel: "LOW",
    naranjoScore: 3,
    naranjoCausality: "Possible Causality",
    ayushSpecificCausality: "Pitta Prakopa (Exacerbated by empty stomach intake)",
    outcome: "Resolved with instruction to take medicine with warm cow's milk post-meals",
    cdscoReportStatus: "Logged in CTMS Safety Repository",
    dsmbReviewStatus: "Routine Quarterly Review",
    investigatorNotes: "Mild burning sensation occurred when subject consumed capsule prior to breakfast. Advised ingestion 20 minutes post-breakfast with lukewarm milk. Symptoms resolved completely within 48 hours.",
    pvLead: "Dr. Sunita Kulkarni",
    actionRequired: "Routine safety monitoring at next study visit."
  },
  {
    id: "AE-2026-0744",
    trialId: "AYU-IMM-002",
    trialCode: "AYU-IMM-002",
    participantId: "PT-1065",
    participantAge: 38,
    participantSex: "Female",
    eventTerm: "Transient Loose Stools (Atisara Lakshana)",
    medDraTerm: "Diarrhoea (MedDRA 10012735)",
    severity: "Moderate (Grade 2)",
    type: "AE",
    suspectDrug: "Guduchi + Pippali Rasayana Tablet",
    batchNumber: "GP-TAB-2024-08",
    onsetDate: "2026-07-28",
    reportedDate: "2026-07-29",
    statutoryDeadline: "Non-expedited",
    deadlineHoursRemaining: 210,
    urgencyLevel: "MEDIUM",
    naranjoScore: 4,
    naranjoCausality: "Possible Causality",
    ayushSpecificCausality: "Tikshna Ushna Veerya effect of Pippali",
    outcome: "Dose reduced by 50% for 3 days; resolved; re-escalated without recurrence",
    cdscoReportStatus: "Logged in CTMS Safety Repository",
    dsmbReviewStatus: "Noted in DSMB Monthly Digest",
    investigatorNotes: "Subject reported 4 episodes of loose stools on Day 4 of treatment. Bilva churna given as supportive therapy. Resolved in 24 hours.",
    pvLead: "Dr. Sunita Kulkarni",
    actionRequired: "Dose titration documentation filed in eCRF."
  },
  {
    id: "AE-2026-0511",
    trialId: "AYU-OST-011",
    trialCode: "AYU-OST-011",
    participantId: "PT-1019",
    participantAge: 64,
    participantSex: "Male",
    eventTerm: "Elevated Serum Creatinine (Grade 1)",
    medDraTerm: "Blood Creatinine Increased (MedDRA 10005483)",
    severity: "Mild (Grade 1)",
    type: "AE",
    suspectDrug: "Celecoxib Control Arm (100mg BD)",
    batchNumber: "CX-CTRL-2024",
    onsetDate: "2026-05-10",
    reportedDate: "2026-05-11",
    statutoryDeadline: "Non-expedited",
    deadlineHoursRemaining: 480,
    urgencyLevel: "LOW",
    naranjoScore: 5,
    naranjoCausality: "Probable Causality (NSAID related)",
    ayushSpecificCausality: "Not Applicable (Control Pharmaceutical)",
    outcome: "Creatinine returned to baseline upon temporary cessation and hydration",
    cdscoReportStatus: "Logged in Safety Repository",
    dsmbReviewStatus: "Closed",
    investigatorNotes: "Creatinine rose from 1.0 mg/dL to 1.35 mg/dL. Subject unblinded by emergency DSMB safety committee to reveal Celecoxib arm.",
    pvLead: "Dr. Sunita Kulkarni",
    actionRequired: "Archived in trial master file."
  }
];

export const IEC_SUBMISSIONS = [
  {
    id: "IEC-SUB-2026-004",
    trialId: "AYU-MET-007",
    trialTitle: "Clinical Evaluation of Classical Virechana Panchakarma Regimen in NAFLD",
    submissionType: "Initial Protocol Clearance",
    submissionDate: "2026-01-08",
    reviewDate: "2026-01-20",
    status: "Approved with Stipulations",
    decision: "APPROVED",
    riskCategory: "Low to Moderate Risk (Panchakarma Shodhana)",
    chairperson: "Dr. S. K. Mahapatra",
    stipulations: "Subject must be hospitalized for 48 hours post-Virechana. Intensive electrolyte and hydration monitoring mandatory.",
    icfVersion: "ICF-Hindi-English-v2.1",
    nextAnnualReportDue: "2027-01-20"
  },
  {
    id: "IEC-SUB-2026-018",
    trialId: "AYU-NEURO-004",
    trialTitle: "Double-Blind Placebo-Controlled Trial of Standardized Ashwagandha Extract",
    submissionType: "Urgent SAE Safety Notification (SAE-2026-0904)",
    submissionDate: "2026-09-02",
    reviewDate: "2026-09-03",
    status: "Under Expedited Review",
    decision: "PENDING_MEETING",
    riskCategory: "High Urgency Safety Signal",
    chairperson: "Dr. S. K. Mahapatra",
    stipulations: "Quorum review meeting scheduled. Safety review committee recommending temporary pause of Batch WS-EXT-2025-B04.",
    icfVersion: "ICF-v3.0",
    nextAnnualReportDue: "2026-10-22"
  },
  {
    id: "IEC-SUB-2026-012",
    trialId: "AYU-IMM-002",
    trialTitle: "Guduchi + Pippali Rasayana Formulation in Post-Viral Immune Restoration",
    submissionType: "Annual Ethical Clearance Renewal",
    submissionDate: "2026-08-15",
    reviewDate: "2026-09-01",
    status: "Revision Required",
    decision: "REVISION_REQUIRED",
    riskCategory: "Minimal Risk",
    chairperson: "Dr. S. K. Mahapatra",
    stipulations: "Submit complete cumulative safety table and updated investigator brochure reflecting post-marketing surveillance data.",
    icfVersion: "ICF-v2.0",
    nextAnnualReportDue: "Overdue"
  },
  {
    id: "IEC-SUB-2025-088",
    trialId: "AYU-PREV-015",
    trialTitle: "Dinacharya-Based Integrative Circadian Lifestyle Protocol in Pre-Diabetes",
    submissionType: "Initial Protocol Review",
    submissionDate: "2025-11-10",
    reviewDate: "2025-11-28",
    status: "Approved Unconditionally",
    decision: "APPROVED",
    riskCategory: "Minimal Risk (Lifestyle Intervention)",
    chairperson: "Dr. S. K. Mahapatra",
    stipulations: "Annual safety report submission at 12 months.",
    icfVersion: "ICF-v1.0",
    nextAnnualReportDue: "2026-11-28"
  }
];

export const PATIENTS_REGISTRY = [
  {
    id: "PT-1001",
    trialId: "AYU-CVD-001",
    trialCode: "AYU-CVD-001",
    name: "Rajeshwar Prasad",
    age: 52,
    sex: "Male",
    screeningDate: "2025-05-12",
    enrollmentDate: "2025-05-15",
    status: "Active (Visit 4)",
    prakriti: "Pitta-Kapha",
    vataPercent: 20,
    pittaPercent: 55,
    kaphaPercent: 25,
    agniType: "Tikshnagni",
    kostha: "Mrudu",
    baselineSbp: 148,
    currentSbp: 132,
    eCrfCompletion: 85,
    complianceScore: 98,
    adverseEventsCount: 0,
    lastVisitDate: "2026-08-12",
    nextVisitDate: "2026-09-14"
  },
  {
    id: "PT-1008",
    trialId: "AYU-CVD-001",
    trialCode: "AYU-CVD-001",
    name: "Sunita Devi Sharma",
    age: 48,
    sex: "Female",
    screeningDate: "2025-05-20",
    enrollmentDate: "2025-05-25",
    status: "Active (Visit 4)",
    prakriti: "Vata-Pitta",
    vataPercent: 45,
    pittaPercent: 40,
    kaphaPercent: 15,
    agniType: "Vishamagni",
    kostha: "Madhyama",
    baselineSbp: 152,
    currentSbp: 136,
    eCrfCompletion: 85,
    complianceScore: 94,
    adverseEventsCount: 0,
    lastVisitDate: "2026-08-19",
    nextVisitDate: "2026-09-21"
  },
  {
    id: "PT-1033",
    trialId: "AYU-CVD-001",
    trialCode: "AYU-CVD-001",
    name: "Virendra Mohan",
    age: 56,
    sex: "Male",
    screeningDate: "2025-08-01",
    enrollmentDate: "2025-08-04",
    status: "Active (Visit 3)",
    prakriti: "Pitta-Vata",
    vataPercent: 35,
    pittaPercent: 50,
    kaphaPercent: 15,
    agniType: "Tikshnagni",
    kostha: "Mrudu",
    baselineSbp: 146,
    currentSbp: 138,
    eCrfCompletion: 70,
    complianceScore: 91,
    adverseEventsCount: 1,
    lastVisitDate: "2026-08-19",
    nextVisitDate: "2026-09-18"
  },
  {
    id: "PT-1082",
    trialId: "AYU-NEURO-004",
    trialCode: "AYU-NEURO-004",
    name: "Ananya Mukherjee",
    age: 42,
    sex: "Female",
    screeningDate: "2026-08-10",
    enrollmentDate: "2026-08-15",
    status: "Safety Hold (SAE Under Investigation)",
    prakriti: "Pitta-Kapha",
    vataPercent: 25,
    pittaPercent: 60,
    kaphaPercent: 15,
    agniType: "Tikshnagni",
    kostha: "Mrudu",
    baselineHamA: 28,
    currentHamA: 24,
    eCrfCompletion: 45,
    complianceScore: 96,
    adverseEventsCount: 1,
    lastVisitDate: "2026-09-02",
    nextVisitDate: "Under Safety Hold"
  },
  {
    id: "PT-1049",
    trialId: "AYU-NEURO-004",
    trialCode: "AYU-NEURO-004",
    name: "Gopal Krishna Rao",
    age: 39,
    sex: "Male",
    screeningDate: "2025-02-14",
    enrollmentDate: "2025-02-18",
    status: "Completed Follow-up",
    prakriti: "Vata-Kapha",
    vataPercent: 50,
    pittaPercent: 15,
    kaphaPercent: 35,
    agniType: "Vishamagni",
    kostha: "Krura",
    baselineHamA: 26,
    currentHamA: 11,
    eCrfCompletion: 100,
    complianceScore: 99,
    adverseEventsCount: 0,
    lastVisitDate: "2026-06-18",
    nextVisitDate: "Study Completed"
  },
  {
    id: "PT-1065",
    trialId: "AYU-IMM-002",
    trialCode: "AYU-IMM-002",
    name: "Deepali Joshi",
    age: 38,
    sex: "Female",
    screeningDate: "2024-09-12",
    enrollmentDate: "2024-09-16",
    status: "Active (Visit 6)",
    prakriti: "Pitta-Vata",
    vataPercent: 30,
    pittaPercent: 50,
    kaphaPercent: 20,
    agniType: "Tikshnagni",
    kostha: "Mrudu",
    baselineSbp: 118,
    currentSbp: 116,
    eCrfCompletion: 92,
    complianceScore: 95,
    adverseEventsCount: 1,
    lastVisitDate: "2026-07-29",
    nextVisitDate: "2026-09-28"
  },
  {
    id: "PT-1019",
    trialId: "AYU-OST-011",
    trialCode: "AYU-OST-011",
    name: "Harish Chandra Verma",
    age: 64,
    sex: "Male",
    screeningDate: "2024-01-10",
    enrollmentDate: "2024-01-14",
    status: "Completed (Study Closed)",
    prakriti: "Vata-Kapha",
    vataPercent: 55,
    pittaPercent: 15,
    kaphaPercent: 30,
    agniType: "Mandagni",
    kostha: "Krura",
    baselineWomac: 68,
    currentWomac: 24,
    eCrfCompletion: 100,
    complianceScore: 97,
    adverseEventsCount: 1,
    lastVisitDate: "2026-05-10",
    nextVisitDate: "Trial Completed"
  },
  {
    id: "PT-2004",
    trialId: "AYU-PREV-015",
    trialCode: "AYU-PREV-015",
    name: "Kavita Singhal",
    age: 44,
    sex: "Female",
    screeningDate: "2026-02-02",
    enrollmentDate: "2026-02-05",
    status: "Active (Visit 2)",
    prakriti: "Kapha-Pitta",
    vataPercent: 15,
    pittaPercent: 35,
    kaphaPercent: 50,
    agniType: "Mandagni",
    kostha: "Madhyama",
    baselineHba1c: 6.1,
    currentHba1c: 5.8,
    eCrfCompletion: 30,
    complianceScore: 92,
    adverseEventsCount: 0,
    lastVisitDate: "2026-05-05",
    nextVisitDate: "2026-09-10"
  }
];

export const BLOCKCHAIN_AUDIT_LOG = [
  {
    id: 85,
    blockNumber: 124589,
    timestamp: "2026-09-02 14:15:22 IST",
    event: "CRITICAL_SAE_LOGGED",
    entity: "AdverseEvent",
    entityId: "SAE-2026-0904",
    studyId: "AYU-NEURO-004",
    user: "Dr. Sunita Kulkarni (pv)",
    role: "Pharmacovigilance Lead",
    previousHash: "0x3e8a49c2d1b7a6f98014e7a32b901f4c5689da213456789abcdef0123456789a",
    currentHash: "0x892a014fb56ce914d238a7c189ef04d2a1b947c56312a04879d1468205ec9b10",
    merkleIndex: 84,
    status: "ON_CHAIN_ANCHORED",
    polygonTx: "0x8a7f9328401b9ca4e7311d9f8021a64b97120e3a4792c01829f048d28a11394c",
    tampered: false,
    details: "Expedited Grade 3 SAE (Angioedema) registered for PT-1082. Naranjo causality score 6. 3-day CDSCO notification clock initiated."
  },
  {
    id: 84,
    blockNumber: 124588,
    timestamp: "2026-09-01 11:32:04 IST",
    event: "PATIENT_VISIT_CRF_COMPLETED",
    entity: "VisitCRF",
    entityId: "CRF-VISIT-4-PT1001",
    studyId: "AYU-CVD-001",
    user: "Dr. Priya Nair (crc)",
    role: "Study Coordinator",
    previousHash: "0x91d4e78c0245a98213f568a12e4b3c98701469a8b23c10457689de023415789a",
    currentHash: "0x3e8a49c2d1b7a6f98014e7a32b901f4c5689da213456789abcdef0123456789a",
    merkleIndex: 83,
    status: "ON_CHAIN_ANCHORED",
    polygonTx: "0x51c90a42871f3018e244b7910928374829a1b029487c9182305719382049281a",
    tampered: false,
    details: "Visit 4 ambulatory SBP, DBP, and Prakriti Agni state recorded for participant PT-1001. Source data locked."
  },
  {
    id: 83,
    blockNumber: 124587,
    timestamp: "2026-08-30 16:45:10 IST",
    event: "IEC_PROTOCOL_STIPULATION_FILED",
    entity: "EthicsClearance",
    entityId: "IEC-SUB-2026-004",
    studyId: "AYU-MET-007",
    user: "Dr. S. K. Mahapatra (iec)",
    role: "IEC Chairperson",
    previousHash: "0x401829a34b7c8912e56012489a7f34c901235678abcdef0123456789abcdef01",
    currentHash: "0x91d4e78c0245a98213f568a12e4b3c98701469a8b23c10457689de023415789a",
    merkleIndex: 82,
    status: "ON_CHAIN_ANCHORED",
    polygonTx: "0x20394817a98234710bcae8291048293847561029384756102938475610293847",
    tampered: false,
    details: "Institutional Ethics Committee approved Protocol AYU-MET-007 with inpatient hospitalization stipulations. Signed with e-ID."
  },
  {
    id: 82,
    blockNumber: 124586,
    timestamp: "2026-08-25 10:14:38 IST",
    event: "SOURCE_DATA_VERIFICATION_PASS",
    entity: "MonitoringLog",
    entityId: "MON-2026-Q3-01",
    studyId: "AYU-IMM-002",
    user: "Vikramaditya Rao (cra)",
    role: "Clinical Research Associate",
    previousHash: "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef",
    currentHash: "0x401829a34b7c8912e56012489a7f34c901235678abcdef0123456789abcdef01",
    merkleIndex: 81,
    status: "ON_CHAIN_ANCHORED",
    polygonTx: "0x9482710394857102938475610293847561029384756102938475610293847561",
    tampered: false,
    details: "100% SDV completed for Cohort A (PT-1050 to PT-1070). Zero critical protocol deviations observed."
  }
];

export const FHIR_R4_RESOURCES = {
  ResearchStudy: {
    resourceType: "ResearchStudy",
    id: "AYU-CVD-001",
    meta: {
      versionId: "3",
      lastUpdated: "2026-09-02T10:00:00Z",
      profile: [
        "http://hl7.org/fhir/uv/clinicaltrials/StructureDefinition/ResearchStudy",
        "http://aiia.gov.in/fhir/StructureDefinition/ayush-clinical-trial"
      ]
    },
    identifier: [
      {
        system: "http://ctri.nic.in",
        value: "CTRI/2025/08/071234"
      },
      {
        system: "http://aiia.gov.in/protocols",
        value: "AYU-CVD-001"
      }
    ],
    title: "Efficacy and Safety of Arjuna & Pushkarmool Polyherbal Extract in Mild-to-Moderate Essential Hypertension",
    status: "active",
    phase: {
      coding: [
        {
          system: "http://terminology.hl7.org/CodeSystem/research-study-phase",
          code: "phase-2",
          display: "Phase II"
        }
      ]
    },
    category: [
      {
        coding: [
          {
            system: "http://aiia.gov.in/codes/ayush-domain",
            code: "polyherbal-formulation",
            display: "Polyherbal Ayurvedic Formulation"
          }
        ]
      }
    ],
    sponsor: {
      reference: "Organization/aiia-new-delhi",
      display: "All India Institute of Ayurveda, New Delhi"
    },
    principalInvestigator: {
      reference: "Practitioner/dr-anand-sharma",
      display: "Prof. Dr. Anand Sharma, MD (Ayurveda), PhD"
    },
    enrollment: [
      {
        reference: "Group/cohort-hypertension-mild-mod",
        display: "Target 180 Participants (AIIA & NIA multi-center)"
      }
    ],
    extension: [
      {
        url: "http://aiia.gov.in/fhir/StructureDefinition/ctri-status",
        valueString: "VERIFIED_REGISTERED"
      },
      {
        url: "http://aiia.gov.in/fhir/StructureDefinition/blockchain-anchor",
        valueString: "POLYGON_AMOY_BLOCK_124589"
      }
    ]
  },
  AdverseEvent: {
    resourceType: "AdverseEvent",
    id: "SAE-2026-0904",
    meta: {
      versionId: "1",
      lastUpdated: "2026-09-02T14:15:22Z"
    },
    actuality: "actual",
    category: [
      {
        coding: [
          {
            system: "http://terminology.hl7.org/CodeSystem/adverse-event-category",
            code: "product-use-error",
            display: "Product Idiosyncratic Hypersensitivity"
          }
        ]
      }
    ],
    event: {
      coding: [
        {
          system: "https://www.meddra.org",
          code: "10002424",
          display: "Angioedema"
        },
        {
          system: "http://aiia.gov.in/codes/ayush-symptom",
          code: "ASATMYA-SHOPHA",
          display: "Asatmya Janya Shopha (Allergic Edema)"
        }
      ],
      text: "Severe Maculopapular Rash with Periorbital Angioedema"
    },
    subject: {
      reference: "Patient/PT-1082",
      display: "PT-1082 (Ananya Mukherjee, 42y Female)"
    },
    date: "2026-09-02T08:30:00+05:30",
    seriousness: {
      coding: [
        {
          system: "http://terminology.hl7.org/CodeSystem/adverse-event-seriousness",
          code: "hospitalization",
          display: "Requires Inpatient Hospitalization"
        }
      ]
    },
    severity: {
      coding: [
        {
          system: "http://terminology.hl7.org/CodeSystem/adverse-event-severity",
          code: "severe",
          display: "Grade 3 Severe"
        }
      ]
    },
    suspectEntity: [
      {
        instance: {
          reference: "Medication/ashwagandha-extract-500mg",
          display: "Standardized Withania somnifera 500mg (Batch WS-EXT-2025-B04)"
        },
        causality: [
          {
            assessment: {
              coding: [
                {
                  system: "http://terminology.hl7.org/CodeSystem/adverse-event-causality-assess",
                  code: "probable",
                  display: "Probable (Naranjo Score 6)"
                }
              ]
            }
          }
        ]
      }
    ],
    recorder: {
      reference: "Practitioner/dr-sunita-kulkarni",
      display: "Dr. Sunita Kulkarni (PvPI Officer)"
    }
  },
  Patient: {
    resourceType: "Patient",
    id: "PT-1001",
    meta: {
      versionId: "4",
      lastUpdated: "2026-09-01T11:32:04Z",
      profile: [
        "http://hl7.org/fhir/StructureDefinition/Patient",
        "http://aiia.gov.in/fhir/StructureDefinition/ayush-prakriti-profile"
      ]
    },
    identifier: [
      {
        use: "official",
        system: "http://aiia.gov.in/patient-mrn",
        value: "MRN-AIIA-2025-99812"
      },
      {
        use: "secondary",
        system: "http://aiia.gov.in/trials/AYU-CVD-001/subjects",
        value: "PT-1001"
      }
    ],
    active: true,
    name: [
      {
        use: "official",
        text: "Rajeshwar Prasad",
        family: "Prasad",
        given: ["Rajeshwar"]
      }
    ],
    gender: "male",
    birthDate: "1974-03-18",
    extension: [
      {
        url: "http://aiia.gov.in/fhir/StructureDefinition/ayurvedic-prakriti",
        extension: [
          { url: "primaryDosha", valueString: "Pitta" },
          { url: "secondaryDosha", valueString: "Kapha" },
          { url: "vataPercent", valueDecimal: 20 },
          { url: "pittaPercent", valueDecimal: 55 },
          { url: "kaphaPercent", valueDecimal: 25 },
          { url: "agni", valueString: "Tikshnagni" },
          { url: "kostha", valueString: "Mrudu" }
        ]
      }
    ]
  },
  Observation: {
    resourceType: "Observation",
    id: "OBS-PT1001-VISIT4-BP",
    status: "final",
    category: [
      {
        coding: [
          {
            system: "http://terminology.hl7.org/CodeSystem/observation-category",
            code: "vital-signs",
            display: "Vital Signs"
          }
        ]
      }
    ],
    code: {
      coding: [
        {
          system: "http://loinc.org",
          code: "85354-9",
          display: "Blood pressure panel with all children optional"
        }
      ],
      text: "Ambulatory Blood Pressure Measurement (Visit 4)"
    },
    subject: {
      reference: "Patient/PT-1001",
      display: "PT-1001"
    },
    effectiveDateTime: "2026-08-12T09:45:00+05:30",
    component: [
      {
        code: {
          coding: [{ system: "http://loinc.org", code: "8480-6", display: "Systolic blood pressure" }]
        },
        valueQuantity: { value: 132, unit: "mmHg", system: "http://unitsofmeasure.org", code: "mm[Hg]" }
      },
      {
        code: {
          coding: [{ system: "http://loinc.org", code: "8462-4", display: "Diastolic blood pressure" }]
        },
        valueQuantity: { value: 84, unit: "mmHg", system: "http://unitsofmeasure.org", code: "mm[Hg]" }
      }
    ]
  }
};

export const CDISC_SDTM_DATASETS = {
  DM: {
    domain: "DM",
    description: "Demographics Dataset (CDISC SDTM v3.3)",
    columns: ["STUDYID", "DOMAIN", "USUBJID", "SUBJID", "RFSTDTC", "AGE", "AGEU", "SEX", "RACE", "ETHNIC", "ARMCD", "ARM", "PRAKRITI"],
    rows: [
      {
        STUDYID: "AYU-CVD-001",
        DOMAIN: "DM",
        USUBJID: "AIIA-001-PT1001",
        SUBJID: "PT-1001",
        RFSTDTC: "2025-05-15",
        AGE: 52,
        AGEU: "YEARS",
        SEX: "M",
        RACE: "ASIAN",
        ETHNIC: "INDIAN",
        ARMCD: "ARJ-PUSH-1",
        ARM: "Arjuna-Pushkarmool Capsule BD",
        PRAKRITI: "Pitta-Kapha"
      },
      {
        STUDYID: "AYU-CVD-001",
        DOMAIN: "DM",
        USUBJID: "AIIA-001-PT1008",
        SUBJID: "PT-1008",
        RFSTDTC: "2025-05-25",
        AGE: 48,
        AGEU: "YEARS",
        SEX: "F",
        RACE: "ASIAN",
        ETHNIC: "INDIAN",
        ARMCD: "ARJ-PUSH-1",
        ARM: "Arjuna-Pushkarmool Capsule BD",
        PRAKRITI: "Vata-Pitta"
      },
      {
        STUDYID: "AYU-CVD-001",
        DOMAIN: "DM",
        USUBJID: "AIIA-001-PT1033",
        SUBJID: "PT-1033",
        RFSTDTC: "2025-08-04",
        AGE: 56,
        AGEU: "YEARS",
        SEX: "M",
        RACE: "ASIAN",
        ETHNIC: "INDIAN",
        ARMCD: "PLACEBO",
        ARM: "Matching Placebo Capsule BD",
        PRAKRITI: "Pitta-Vata"
      },
      {
        STUDYID: "AYU-NEURO-004",
        DOMAIN: "DM",
        USUBJID: "AIIA-004-PT1082",
        SUBJID: "PT-1082",
        RFSTDTC: "2026-08-15",
        AGE: 42,
        AGEU: "YEARS",
        SEX: "F",
        RACE: "ASIAN",
        ETHNIC: "INDIAN",
        ARMCD: "ASHWA-500",
        ARM: "Ashwagandha Extract 500mg BD",
        PRAKRITI: "Pitta-Kapha"
      }
    ]
  },
  AE: {
    domain: "AE",
    description: "Adverse Events Dataset (CDISC SDTM v3.3)",
    columns: ["STUDYID", "DOMAIN", "USUBJID", "AETERM", "AEDECOD", "AEBODSYS", "AESTDTC", "AESER", "AESEV", "AEREL", "AEOUT"],
    rows: [
      {
        STUDYID: "AYU-NEURO-004",
        DOMAIN: "AE",
        USUBJID: "AIIA-004-PT1082",
        AETERM: "Severe Maculopapular Rash with Angioedema",
        AEDECOD: "Angioedema",
        AEBODSYS: "Immune system disorders",
        AESTDTC: "2026-09-02",
        AESER: "Y",
        AESEV: "SEVERE",
        AEREL: "PROBABLE",
        AEOUT: "RECOVERING"
      },
      {
        STUDYID: "AYU-CVD-001",
        DOMAIN: "AE",
        USUBJID: "AIIA-001-PT1033",
        AETERM: "Epigastric Burning Sensation",
        AEDECOD: "Dyspepsia",
        AEBODSYS: "Gastrointestinal disorders",
        AESTDTC: "2026-08-18",
        AESER: "N",
        AESEV: "MILD",
        AEREL: "POSSIBLE",
        AEOUT: "RECOVERED"
      }
    ]
  },
  EX: {
    domain: "EX",
    description: "Exposure Dataset (CDISC SDTM v3.3)",
    columns: ["STUDYID", "DOMAIN", "USUBJID", "EXTRT", "EXDOSE", "EXDOSU", "EXDOSFRM", "EXROUTE", "EXSTDTC"],
    rows: [
      {
        STUDYID: "AYU-CVD-001",
        DOMAIN: "EX",
        USUBJID: "AIIA-001-PT1001",
        EXTRT: "Arjuna & Pushkarmool Aqueous Extract",
        EXDOSE: "750",
        EXDOSU: "mg",
        EXDOSFRM: "CAPSULE",
        EXROUTE: "ORAL",
        EXSTDTC: "2025-05-15"
      },
      {
        STUDYID: "AYU-NEURO-004",
        DOMAIN: "EX",
        USUBJID: "AIIA-004-PT1082",
        EXTRT: "Withania somnifera Root Extract",
        EXDOSE: "500",
        EXDOSU: "mg",
        EXDOSFRM: "CAPSULE",
        EXROUTE: "ORAL",
        EXSTDTC: "2026-08-15"
      }
    ]
  },
  DefineXml: `<?xml version="1.0" encoding="UTF-8"?>
<MetaDataVersion OID="MDV.AIIA.CTMS.2026"
                 Name="AIIA Clinical Trials Study Data Specification"
                 Description="Define-XML v2.0 for CDISC SDTM Submissions - All India Institute of Ayurveda"
                 DefineVersion="2.0.0"
                 StandardName="SDTM"
                 StandardVersion="3.3">
  <Standards>
    <Standard OID="STD.SDTM" Name="SDTM" Version="3.3" Status="Final" Type="IG" />
    <Standard OID="STD.CDASH" Name="CDASH" Version="2.1" Status="Final" Type="IG" />
  </Standards>
  <ItemGroupDef OID="IG.DM" Name="DM" Repeating="No" IsReferenceData="No" Purpose="Tabulation" Domain="DM">
    <Description><TranslatedText xml:lang="en">Demographics</TranslatedText></Description>
    <ItemRef ItemOID="IT.STUDYID" OrderNumber="1" Mandatory="Yes" KeySequence="1" />
    <ItemRef ItemOID="IT.DOMAIN" OrderNumber="2" Mandatory="Yes" />
    <ItemRef ItemOID="IT.USUBJID" OrderNumber="3" Mandatory="Yes" KeySequence="2" />
    <ItemRef ItemOID="IT.PRAKRITI" OrderNumber="13" Mandatory="No" />
  </ItemGroupDef>
  <ItemGroupDef OID="IG.AE" Name="AE" Repeating="Yes" IsReferenceData="No" Purpose="Tabulation" Domain="AE">
    <Description><TranslatedText xml:lang="en">Adverse Events</TranslatedText></Description>
    <ItemRef ItemOID="IT.STUDYID" OrderNumber="1" Mandatory="Yes" KeySequence="1" />
    <ItemRef ItemOID="IT.USUBJID" OrderNumber="2" Mandatory="Yes" KeySequence="2" />
    <ItemRef ItemOID="IT.AETERM" OrderNumber="3" Mandatory="Yes" />
    <ItemRef ItemOID="IT.AESER" OrderNumber="4" Mandatory="Yes" />
  </ItemGroupDef>
</MetaDataVersion>`
};

export const REVENUE_AND_ENROLLMENT_CHART_DATA = [
  { month: "Oct 2025", target: 500, enrolled: 480, screened: 590 },
  { month: "Nov 2025", target: 560, enrolled: 535, screened: 660 },
  { month: "Dec 2025", target: 620, enrolled: 610, screened: 750 },
  { month: "Jan 2026", target: 680, enrolled: 665, screened: 810 },
  { month: "Feb 2026", target: 730, enrolled: 712, screened: 880 },
  { month: "Mar 2026", target: 780, enrolled: 742, screened: 940 }
];

export const LIFECYCLE_FUNNEL_DATA = [
  { stage: "Protocol Submitted", count: 18, color: "#065f46" },
  { stage: "IEC Approved", count: 14, color: "#047857" },
  { stage: "CTRI Registered", count: 11, color: "#0d9488" },
  { stage: "Site Activated", count: 9, color: "#0284c7" },
  { stage: "Actively Recruiting", count: 6, color: "#16a34a" },
  { stage: "Database Lock", count: 2, color: "#d97706" },
  { stage: "Closeout & Published", count: 5, color: "#4f46e5" }
];
