import React, { useState } from "react";
import { login } from "../../api";
import {
  ShieldCheck,
  Users,
  Activity,
  Database,
  FileCheck2,
  Lock,
  Mail,
  Eye,
  EyeOff,
  ArrowRight,
  Building2,
  FlaskConical,
  Scale,
  AlertCircle,
  Languages,
} from "lucide-react";
import { setLanguage } from "../../i18n";
import { PATIENT_ACCOUNTS } from "../../data/patientAccounts";

const mockUsers = [
  // Principal Investigator
  { name: "Dr. Ananya Sharma", email: "ananya.pi@demo.com", password: "PI@123", role: "Principal Investigator", roleId: "pi" },
  { name: "Dr. Vikram Rao", email: "vikram.pi@demo.com", password: "PI@234", role: "Principal Investigator", roleId: "pi" },

  // Study Coordinator
  { name: "Rahul Mehta", email: "rahul.crc@demo.com", password: "CRC@123", role: "Study Coordinator", roleId: "crc" },
  { name: "Sneha Patil", email: "sneha.crc@demo.com", password: "CRC@234", role: "Study Coordinator", roleId: "crc" },

  // Clinical Research Associate
  { name: "Priya Singh", email: "priya.cra@demo.com", password: "CRA@123", role: "Clinical Research Associate", roleId: "cra" },
  { name: "Anil Kumar", email: "anil.cra@demo.com", password: "CRA@234", role: "Clinical Research Associate", roleId: "cra" },

  // Ethics Committee
  { name: "Dr. Neha Kapoor", email: "neha.iec@demo.com", password: "IEC@123", role: "Ethics Committee", roleId: "iec" },
  { name: "Dr. Manoj Tiwari", email: "manoj.iec@demo.com", password: "IEC@234", role: "Ethics Committee", roleId: "iec" },

  // Pharmacovigilance
  { name: "Dr. Kavita Rao", email: "pharmacovigilance@demo.com", password: "PV@123", role: "Pharmacovigilance", roleId: "pv" },
  { name: "Rohan Das", email: "rohan.pv@demo.com", password: "PV@234", role: "Pharmacovigilance", roleId: "pv" },

  // Regulator
  { name: "Arjun Verma", email: "arjun.reg@demo.com", password: "REG@123", role: "Regulator", roleId: "regulator" },
  { name: "Farah Khan", email: "farah.reg@demo.com", password: "REG@234", role: "Regulator", roleId: "regulator" },

  // Administrator
  { name: "System Administrator", email: "admin@demo.com", password: "ADMIN@123", role: "Administrator", roleId: "admin" },
  { name: "IT Admin", email: "itadmin@demo.com", password: "ADMIN@234", role: "Administrator", roleId: "admin" },
];
const workflowIcons = [FlaskConical, Users, Scale, Activity];

const translations = {
  en: {
    langLabel: "EN",
    govLine1: "Government of India",
    govLine2: "Ministry of AYUSH",
    badge: "Secure Clinical Research Platform",
    heroLine1: "One Platform.",
    heroLine2: "Complete Trial Governance.",
    heroSub:
      "A centralized digital platform for managing Ayurveda clinical trials, participants, ethics, regulatory compliance, pharmacovigilance and interoperable clinical data.",
    workflow: [
      { title: "Studies", description: "Trial portfolio" },
      { title: "Participants", description: "Patient management" },
      { title: "Ethics", description: "IEC governance" },
      { title: "Safety", description: "Pharmacovigilance" },
    ],
    secureLogin: "Secure Login",
    welcomeBack: "Welcome back",
    officialEmail: "Official Email",
    password: "Password",
    rememberMe: "Remember me",
    forgotPassword: "Forgot password?",
    launchButton: "Launch Clinical Workspace",
    secureAccess: "Secure access • GCP-aligned governance",
    fhir: "FHIR R4",
    fhirSub: "Interoperable data",
    cdisc: "CDISC SDTM",
    cdiscSub: "Research standards",
    audit: "Audit Ready",
    auditSub: "Complete traceability",
    footerName: "AIIA Clinical Trial Management System",
    gcpCompliant: "GCP Compliant",
    invalidCreds:
      "Invalid email or password. Please check your credentials and try again.",
    emailPlaceholder: "name@aiia.gov.in",
    passwordPlaceholder: "Enter your password",
  },
  hi: {
    langLabel: "हिं",
    govLine1: "भारत सरकार",
    govLine2: "आयुष मंत्रालय",
    badge: "सुरक्षित नैदानिक अनुसंधान मंच",
    heroLine1: "एक मंच.",
    heroLine2: "संपूर्ण परीक्षण प्रशासन.",
    heroSub:
      "आयुर्वेद नैदानिक परीक्षणों, प्रतिभागियों, नैतिकता, नियामक अनुपालन, फार्माकोविजिलेंस और इंटरऑपरेबल क्लिनिकल डेटा के प्रबंधन के लिए एक केंद्रीकृत डिजिटल मंच।",
    workflow: [
      { title: "अध्ययन", description: "परीक्षण पोर्टफोलियो" },
      { title: "प्रतिभागी", description: "रोगी प्रबंधन" },
      { title: "नैतिकता", description: "आईईसी शासन" },
      { title: "सुरक्षा", description: "फार्माकोविजिलेंस" },
    ],
    secureLogin: "सुरक्षित लॉगिन",
    welcomeBack: "वापसी पर स्वागत है",
    officialEmail: "आधिकारिक ईमेल",
    password: "पासवर्ड",
    rememberMe: "मुझे याद रखें",
    forgotPassword: "पासवर्ड भूल गए?",
    launchButton: "क्लिनिकल वर्कस्पेस लॉन्च करें",
    secureAccess: "सुरक्षित पहुंच • जीसीपी-संरेखित शासन",
    fhir: "FHIR R4",
    fhirSub: "इंटरऑपरेबल डेटा",
    cdisc: "CDISC SDTM",
    cdiscSub: "अनुसंधान मानक",
    audit: "ऑडिट तैयार",
    auditSub: "पूर्ण अनुरेखणीयता",
    footerName: "एआईआईए नैदानिक परीक्षण प्रबंधन प्रणाली",
    gcpCompliant: "जीसीपी अनुपालित",
    invalidCreds:
      "अमान्य ईमेल या पासवर्ड। कृपया अपने क्रेडेंशियल जांचें और पुनः प्रयास करें।",
    emailPlaceholder: "name@aiia.gov.in",
    passwordPlaceholder: "अपना पासवर्ड दर्ज करें",
  },
  ta: {
    langLabel: "தமிழ்",
    govLine1: "இந்திய அரசு",
    govLine2: "ஆயுஷ் அமைச்சகம்",
    badge: "பாதுகாப்பான மருத்துவ ஆராய்ச்சி தளம்",
    heroLine1: "ஒரே தளம்.",
    heroLine2: "முழுமையான ஆய்வு நிர்வாகம்.",
    heroSub:
      "ஆயுர்வேத மருத்துவ ஆய்வுகள், பங்கேற்பாளர்கள், நெறிமுறைகள், ஒழுங்குமுறை இணக்கம், மருந்து பாதுகாப்பு மற்றும் மருத்துவத் தரவை நிர்வகிக்கும் ஒருங்கிணைந்த டிஜிட்டல் தளம்.",
    workflow: [
      { title: "ஆய்வுகள்", description: "ஆய்வு தொகுப்பு" },
      { title: "பங்கேற்பாளர்கள்", description: "நோயாளர் மேலாண்மை" },
      { title: "நெறிமுறைகள்", description: "IEC நிர்வாகம்" },
      { title: "பாதுகாப்பு", description: "மருந்து பாதுகாப்பு" },
    ],
    secureLogin: "பாதுகாப்பான உள்நுழைவு",
    welcomeBack: "மீண்டும் வரவேற்கிறோம்",
    officialEmail: "அதிகாரப்பூர்வ மின்னஞ்சல்",
    password: "கடவுச்சொல்",
    rememberMe: "என்னை நினைவில் வைத்திருங்கள்",
    forgotPassword: "கடவுச்சொல் மறந்துவிட்டதா?",
    launchButton: "மருத்துவ பணியிடத்தைத் தொடங்கு",
    secureAccess: "பாதுகாப்பான அணுகல் • GCP இணக்கமான நிர்வாகம்",
    fhir: "FHIR R4",
    fhirSub: "ஒருங்கிணைந்த தரவு",
    cdisc: "CDISC SDTM",
    cdiscSub: "ஆராய்ச்சி தரநிலைகள்",
    audit: "தணிக்கைக்குத் தயார்",
    auditSub: "முழுமையான தடமறிதல்",
    footerName: "AIIA மருத்துவ ஆய்வு மேலாண்மை அமைப்பு",
    gcpCompliant: "GCP இணக்கம்",
    invalidCreds:
      "மின்னஞ்சல் அல்லது கடவுச்சொல் தவறாக உள்ளது. உங்கள் விவரங்களைச் சரிபார்த்து மீண்டும் முயற்சிக்கவும்.",
    emailPlaceholder: "name@aiia.gov.in",
    passwordPlaceholder: "உங்கள் கடவுச்சொல்லை உள்ளிடவும்",
  },
};

export default function LoginView({ onLogin }) {
  const [lang, setLangState] = useState(() => localStorage.getItem("ctms_language") || "en");
  const setLang = (nextLanguage) => {
    setLangState(nextLanguage);
    setLanguage(nextLanguage);
  };
  const t = translations[lang];

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [loginMode, setLoginMode] = useState("staff");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (loginMode === "patient") {
      const patient = PATIENT_ACCOUNTS.find((account) => account.aadhaar === email.trim() && account.password === password);
      if (!patient) {
        setError("Invalid patient Aadhaar number or password. Use the demo credentials shown below.");
        return;
      }
      onLogin?.("patient", patient.name, `${patient.patientId}@patient.local`, patient);
      return;
    }
    try {
      const user = await login(email.trim(), password);
      setError("");
      if (onLogin) onLogin(user.role, user.name, user.email);
    } catch {
      setError(t.invalidCreds);
    }
  };

  return (
    <div className="login-portal min-h-screen bg-[#f5f7fa] text-[#102a43] overflow-hidden">
      <div className="h-1 w-full bg-gradient-to-r from-[#ff9933] via-white to-[#138808] bg-animated-flow" />
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#138808]/20 rounded-full blur-3xl animate-float" />
        <div className="absolute top-1/3 -right-40 w-96 h-96 bg-[#1d4ed8]/10 rounded-full blur-3xl animate-float-reverse" />
        <div className="absolute bottom-0 left-1/3 w-96 h-72 bg-[#ff9933]/10 rounded-full blur-3xl animate-float" />
        <div className="absolute inset-0 opacity-[0.04]">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)",
              backgroundSize: "50px 50px",
            }}
          />
        </div>
      </div>

      <div className="relative z-10 min-h-screen flex flex-col">
        <header className="login-portal-header px-6 sm:px-10 lg:px-14 py-5 border-b border-white/10 bg-[#12324e]/90 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto flex min-w-0 items-center justify-between gap-2">
            <div className="flex min-w-0 items-center gap-2 sm:gap-4">
              <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center p-1.5 shrink-0 overflow-hidden shadow-lg shadow-emerald-950/30 border border-white/70">
                <img
                  src="/images/ministry-of-ayush-logo.png"
                  alt="Ministry of Ayush, Government of India"
                  className="w-full h-full object-contain"
                />
              </div>
              <div className="min-w-0">
                <h1 className="text-base sm:text-2xl font-extrabold tracking-[0.12em] sm:tracking-[0.25em] text-gradient-emerald drop-shadow-sm animate-gradient-text animate-fade-in-up truncate">
                  AAYUR SAATHI
                </h1>
                <p className="text-blue-100/70 text-xs sm:text-sm">
                  Clinical Trial Management System
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-1.5 sm:gap-4">
              <div className="hidden sm:block text-right">
                <p className="text-xs text-blue-100/60">{t.govLine1}</p>
                <p className="text-sm font-medium text-white/90">{t.govLine2}</p>
              </div>
              <div className="hidden sm:flex w-10 h-10 rounded-lg bg-white/10 border border-white/10 items-center justify-center">
                <Building2 className="w-5 h-5 text-emerald-300" />
              </div>

              <div className="flex items-center gap-1.5 rounded-lg bg-white/5 border border-white/10 p-1">
                <Languages className="hidden sm:block w-3.5 h-3.5 text-white/40 ml-1.5" />
                <button
                  type="button"
                  onClick={() => setLang("en")}
                    className={`px-1.5 sm:px-2.5 py-1 rounded-md text-[10px] sm:text-xs font-semibold transition-colors ${
                    lang === "en"
                      ? "bg-[#138808] text-black"
                      : "text-black hover:text-black"
                  }`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setLang("hi")}
                    className={`px-1.5 sm:px-2.5 py-1 rounded-md text-[10px] sm:text-xs font-semibold transition-colors ${
                    lang === "hi"
                      ? "bg-[#138808] text-black"
                      : "text-black hover:text-black"
                  }`}
                >
                  हिं
                </button>
                <button
                  type="button"
                  onClick={() => setLang("ta")}
                    className={`px-1.5 sm:px-2.5 py-1 rounded-md text-[10px] sm:text-xs font-semibold transition-colors ${
                    lang === "ta"
                      ? "bg-[#138808] text-black"
                      : "text-black hover:text-black"
                  }`}
                >
                  தமிழ்
                </button>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 px-5 sm:px-8 lg:px-14 py-8 lg:py-12">
          <div className="max-w-7xl mx-auto">
            <div className="login-portal-intro text-center mb-10 animate-fade-in-up">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#138808]/10 border border-[#138808]/30 text-green-100 text-xs font-medium mb-5">
                <span className="w-2 h-2 rounded-full bg-[#ff9933] animate-pulse" />
                {t.badge}
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                {t.heroLine1}
                <span className="block bg-gradient-to-r from-[#ff9933] via-white to-[#7bd2a3] bg-clip-text text-transparent">
                  {t.heroLine2}
                </span>
              </h2>

              <p className="mt-4 max-w-2xl mx-auto text-sm sm:text-base text-emerald-50/60 leading-relaxed">
                {t.heroSub}
              </p>
            </div>

            <div className="login-portal-workflow grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-10">
              {t.workflow.map((item, i) => {
                const Icon = workflowIcons[i];
                return (
                  <div
                    key={item.title}
                    style={{ animationDelay: `${i * 0.08}s` }}
                    className="group rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.07] hover:border-emerald-300/20 hover:-translate-y-1 transition-all duration-300 p-4 animate-fade-in-up"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-300/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-emerald-500/20 transition-transform">
                        <Icon className="w-5 h-5 text-emerald-300" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">{item.title}</p>
                        <p className="text-xs text-white/40">{item.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center">
              <div className="w-full max-w-md">
                <section>
                  <div className="rounded-3xl border border-white/10 bg-white/[0.055] backdrop-blur-xl shadow-2xl shadow-black/20 overflow-hidden animate-shimmer">
                    <div className="p-6 sm:p-7 border-b border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#ff9933] to-[#1d4ed8] flex items-center justify-center shadow-lg">
                          <Lock className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-xs text-emerald-300/70 font-semibold uppercase tracking-wider">
                            {t.secureLogin}
                          </p>
                          <h3 className="text-xl font-bold mt-0.5">{t.welcomeBack}</h3>
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-1 mx-6 sm:mx-7 mt-5 p-1 rounded-xl bg-black/20 border border-white/10">
                      <button type="button" onClick={() => { setLoginMode("staff"); setEmail(""); setPassword(""); setError(""); }} className={`py-2 rounded-lg text-xs font-bold transition-colors ${loginMode === "staff" ? "bg-white text-slate-900" : "text-white/50 hover:text-white"}`}>Staff / Admin</button>
                      <button type="button" onClick={() => { setLoginMode("patient"); setEmail(""); setPassword(""); setError(""); }} className={`py-2 rounded-lg text-xs font-bold transition-colors ${loginMode === "patient" ? "bg-emerald-500 text-white" : "text-white/50 hover:text-white"}`}>Login as Patient</button>
                    </div>

                    <form onSubmit={handleSubmit} className="p-6 sm:p-7">
                      {error && (
                        <div className="mb-5 flex items-start gap-2.5 px-4 py-3 rounded-xl bg-rose-500/10 border border-rose-400/20">
                          <AlertCircle className="w-4 h-4 text-rose-300 mt-0.5 shrink-0" />
                          <p className="text-xs text-rose-200 leading-relaxed">{error}</p>
                        </div>
                      )}

                      <div className="mb-4">
                        <label className="block text-xs font-medium text-white/60 mb-2">
                          {loginMode === "patient" ? "Aadhaar number" : t.officialEmail}
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                          <input
                            type={loginMode === "patient" ? "text" : "email"}
                            inputMode={loginMode === "patient" ? "numeric" : "email"}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={loginMode === "patient" ? "12-digit demo Aadhaar number" : t.emailPlaceholder}
                            className="w-full h-12 rounded-xl bg-black/20 border border-white/10 pl-10 pr-4 text-sm text-white placeholder:text-white/25 outline-none focus:border-[#ff9933]/60 focus:ring-2 focus:ring-[#ff9933]/10 transition-all"
                          />
                        </div>
                      </div>

                      <div className="mb-4">
                        <label className="block text-xs font-medium text-white/60 mb-2">
                          {loginMode === "patient" ? "Patient password" : t.password}
                        </label>
                        <div className="relative">
                          <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                          <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder={loginMode === "patient" ? "Enter patient password" : t.passwordPlaceholder}
                            className="w-full h-12 rounded-xl bg-black/20 border border-white/10 pl-10 pr-12 text-sm text-white placeholder:text-white/25 outline-none focus:border-[#ff9933]/60 focus:ring-2 focus:ring-[#ff9933]/10 transition-all"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
                          >
                            {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-6">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={rememberMe}
                            onChange={(e) => setRememberMe(e.target.checked)}
                            className="w-4 h-4 rounded border-white/20 bg-white/5 accent-emerald-500"
                          />
                          <span className="text-xs text-white/45">{t.rememberMe}</span>
                        </label>
                        <button
                          type="button"
                          className="text-xs text-emerald-300 hover:text-emerald-200 transition-colors"
                        >
                          {t.forgotPassword}
                        </button>
                      </div>

                      <button
                        type="submit"
                        className="w-full h-12 rounded-xl bg-gradient-to-r from-[#ff9933] to-[#1d4ed8] hover:from-[#f28c22] hover:to-[#1e40af] text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-lg shadow-blue-950/30 transition-all duration-300 hover:scale-[1.01] active:scale-[0.99]"
                      >
                        {loginMode === "patient" ? "Open My Health Portal" : t.launchButton}
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <div className="flex items-center justify-center gap-2 mt-5">
                        <Lock className="w-3.5 h-3.5 text-emerald-300/70" />
                        <p className="text-[10px] text-white/30">{t.secureAccess}</p>
                      </div>
                      {loginMode === "patient" && <p className="mt-3 text-center text-[10px] text-emerald-200/60">Demo: Aadhaar `900000000001` to `900000000010` · Password: `Patient@123`</p>}
                    </form>
                  </div>
                </section>
              </div>
            </div>

            <div className="login-portal-features grid sm:grid-cols-3 gap-3 mt-8">
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.025] border border-white/5 hover:bg-white/[0.05] hover:border-emerald-300/20 transition-all duration-300">
                <Database className="w-5 h-5 text-emerald-300/70" />
                <div>
                  <p className="text-xs font-semibold text-white/70">{t.fhir}</p>
                  <p className="text-[10px] text-white/30">{t.fhirSub}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.025] border border-white/5 hover:bg-white/[0.05] hover:border-teal-300/20 transition-all duration-300">
                <FileCheck2 className="w-5 h-5 text-teal-300/70" />
                <div>
                  <p className="text-xs font-semibold text-white/70">{t.cdisc}</p>
                  <p className="text-[10px] text-white/30">{t.cdiscSub}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/[0.025] border border-white/5 hover:bg-white/[0.05] hover:border-amber-300/20 transition-all duration-300">
                <ShieldCheck className="w-5 h-5 text-amber-300/70" />
                <div>
                  <p className="text-xs font-semibold text-white/70">{t.audit}</p>
                  <p className="text-[10px] text-white/30">{t.auditSub}</p>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="px-6 sm:px-10 lg:px-14 py-5 border-t border-white/10">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
            <p className="text-[11px] text-white/30 text-center sm:text-left">{t.footerName}</p>
            <div className="flex items-center gap-4 text-[11px] text-white/30">
              <span>{t.gcpCompliant}</span>
              <span>•</span>
              <span>FHIR R4</span>
              <span>•</span>
              <span>CDISC</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}