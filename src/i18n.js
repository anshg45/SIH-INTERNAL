export const SUPPORTED_LANGUAGES = [
  { id: 'en', label: 'EN' },
  { id: 'hi', label: 'हिं' },
  { id: 'ta', label: 'தமிழ்' },
];

export const UI_TRANSLATIONS = {
  en: {
    dashboard: 'Dashboard', studies: 'Study Drill-down', patients: 'Patient Workspace',
    ethics: 'Pending Review Queue', pv: 'AE/SAE Inbox', audit: 'Audit Trail',
    fhir: 'FHIR R4 Interoperability', regulator: 'CTRI & Regulatory Portal',
    adminSettings: 'Admin Settings', studyCreate: 'Study Creation',
    dataQueries: 'Data Query Inbox', compliance: 'Compliance Workspace',
    notifications: 'Notifications', search: 'Search trials, CTRI, SAEs...',
    live: 'Live', signOut: 'Sign out', language: 'Language',
    workspace: 'WORKSPACE', administration: 'ADMINISTRATION',
    govMode: 'CDSCO & MINISTRY OF AYUSH JOINT INSPECTION MODE', access: 'ACCESS',
    openWorkflow: 'Open Workflow', actionRequired: 'Action required', priorityQueue: 'Priority queue',
    items: 'items', notifications: 'Notifications', recentUpdates: 'Recent updates',
    liveFromDatabase: 'Live from PostgreSQL',
    roleTitles: { admin: 'Portfolio Administration and Compliance Dashboard', regulator: 'Regulatory Inspection and CTRI Compliance Dashboard' },
  },
  hi: {
    dashboard: 'डैशबोर्ड', studies: 'अध्ययन विवरण', patients: 'रोगी कार्यक्षेत्र',
    ethics: 'लंबित समीक्षा कतार', pv: 'AE/SAE इनबॉक्स', audit: 'ऑडिट ट्रेल',
    fhir: 'FHIR R4 इंटरऑपरेबिलिटी', regulator: 'CTRI और नियामक पोर्टल',
    adminSettings: 'एडमिन सेटिंग्स', studyCreate: 'अध्ययन निर्माण',
    dataQueries: 'डेटा क्वेरी इनबॉक्स', compliance: 'अनुपालन कार्यक्षेत्र',
    notifications: 'सूचनाएं', search: 'परीक्षण, CTRI, SAE खोजें...',
    live: 'लाइव', signOut: 'साइन आउट', language: 'भाषा',
    workspace: 'कार्यस्थल', administration: 'प्रशासन',
    govMode: 'CDSCO और आयुष मंत्रालय संयुक्त निरीक्षण मोड', access: 'पहुंच',
    openWorkflow: 'वर्कफ़्लो खोलें', actionRequired: 'आवश्यक कार्रवाई', priorityQueue: 'प्राथमिकता कतार',
    items: 'आइटम', notifications: 'सूचनाएं', recentUpdates: 'हाल के अपडेट',
    liveFromDatabase: 'PostgreSQL से लाइव',
    roleTitles: { admin: 'पोर्टफोलियो प्रशासन और अनुपालन डैशबोर्ड', regulator: 'नियामक निरीक्षण और CTRI अनुपालन डैशबोर्ड' },
  },
  ta: {
    dashboard: 'டாஷ்போர்டு', studies: 'ஆய்வு விவரங்கள்', patients: 'நோயாளர் பணியிடம்',
    ethics: 'நிலுவை மதிப்பாய்வு வரிசை', pv: 'AE/SAE இன்பாக்ஸ்', audit: 'தணிக்கை தடம்',
    fhir: 'FHIR R4 ஒருங்கிணைப்பு', regulator: 'CTRI மற்றும் ஒழுங்குமுறை தளம்',
    adminSettings: 'நிர்வாக அமைப்புகள்', studyCreate: 'ஆய்வு உருவாக்கம்',
    dataQueries: 'தரவு வினா இன்பாக்ஸ்', compliance: 'இணக்க பணியிடம்',
    notifications: 'அறிவிப்புகள்', search: 'ஆய்வுகள், CTRI, SAE தேடுக...',
    live: 'நேரலை', signOut: 'வெளியேறு', language: 'மொழி',
    workspace: 'பணியிடம்', administration: 'நிர்வாகம்',
    govMode: 'CDSCO மற்றும் ஆயுஷ் அமைச்சக கூட்டு ஆய்வு முறை', access: 'அணுகல்',
    openWorkflow: 'பணிப்பாய்வைத் திற', actionRequired: 'தேவையான நடவடிக்கை', priorityQueue: 'முன்னுரிமை வரிசை',
    items: 'உருப்படிகள்', notifications: 'அறிவிப்புகள்', recentUpdates: 'சமீபத்திய புதுப்பிப்புகள்',
    liveFromDatabase: 'PostgreSQL நேரலை',
    roleTitles: { admin: 'தொகுப்பு நிர்வாகம் மற்றும் இணக்க டாஷ்போர்டு', regulator: 'ஒழுங்குமுறை ஆய்வு மற்றும் CTRI இணக்க டாஷ்போர்டு' },
  },
};

export const getLanguage = () => localStorage.getItem('ctms_language') || 'en';
export const setLanguage = (language) => localStorage.setItem('ctms_language', language);
export const getTranslations = (language = getLanguage()) => UI_TRANSLATIONS[language] || UI_TRANSLATIONS.en;
