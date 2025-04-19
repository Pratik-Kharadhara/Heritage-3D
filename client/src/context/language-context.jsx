import { createContext, useContext, useState, useEffect } from 'react';

// Define available languages
export const languages = {
  en: {
    code: 'en',
    name: 'English',
    direction: 'ltr',
  },
  hi: {
    code: 'hi',
    name: 'हिन्दी', // Hindi
    direction: 'ltr',
  },
  ta: {
    code: 'ta', 
    name: 'தமிழ்', // Tamil
    direction: 'ltr',
  },
  bn: {
    code: 'bn',
    name: 'বাংলা', // Bengali
    direction: 'ltr',
  },
};

// Define translations for each language
export const translations = {
  en: {
    // Common
    appName: 'Heritage3D',
    loading: 'Loading...',
    error: 'An error occurred',
    submit: 'Submit',
    cancel: 'Cancel',
    search: 'Search',
    
    // Navigation
    home: 'Home',
    models: '3D Models',
    tours: 'Tours',
    assistant: 'Assistant',
    convert: 'Text to 3D',
    signIn: 'Sign In',
    signUp: 'Sign Up',
    signOut: 'Sign Out',
    profile: 'Profile',
    
    // Home Page
    heroTitle: 'Explore Indian Heritage in 3D',
    heroSubtitle: 'Immerse yourself in the rich cultural history of India through interactive 3D models and virtual tours',
    exploreButton: 'Explore Models',
    learnMore: 'Learn More',
    
    // Models Page
    modelsTitle: '3D Models Collection',
    modelsSubtitle: 'Explore detailed 3D models of iconic Indian monuments',
    viewDetails: 'View Details',
    
    // Assistant Page
    assistantTitle: 'Heritage Monument Assistant',
    assistantSubtitle: 'Explore the rich history of Indian monuments with our AI assistant',
    askPlaceholder: 'Ask about a heritage monument...',
    thinking: 'Thinking...',
    send: 'Send',
    welcomeMessage: 'Welcome to the Heritage Monument Assistant! I can provide information about various Indian heritage sites. What monument would you like to learn about?',
    
    // Converter Page
    converterTitle: 'Text to 3D Conversion',
    converterSubtitle: 'Generate 3D models from textual descriptions',
    descriptionPlaceholder: 'Describe the monument or structure...',
    generate: 'Generate Model',
    
    // Footer
    footerText: 'All rights reserved.',
    about: 'About',
    privacy: 'Privacy',
    terms: 'Terms',
    contact: 'Contact',
  },
  
  hi: {
    // Common
    appName: 'हेरिटेज3डी',
    loading: 'लोड हो रहा है...',
    error: 'एक त्रुटि हुई',
    submit: 'जमा करें',
    cancel: 'रद्द करें',
    search: 'खोज',
    
    // Navigation
    home: 'होम',
    models: '3डी मॉडल',
    tours: 'टूर',
    assistant: 'सहायक',
    convert: 'टेक्स्ट से 3डी',
    signIn: 'साइन इन',
    signUp: 'साइन अप',
    signOut: 'साइन आउट',
    profile: 'प्रोफाइल',
    
    // Home Page
    heroTitle: '3डी में भारतीय विरासत का अन्वेषण करें',
    heroSubtitle: 'इंटरैक्टिव 3डी मॉडल और वर्चुअल टूर के माध्यम से भारत के समृद्ध सांस्कृतिक इतिहास में खुद को डुबोएं',
    exploreButton: 'मॉडल देखें',
    learnMore: 'और जानें',
    
    // Models Page
    modelsTitle: '3डी मॉडल संग्रह',
    modelsSubtitle: 'प्रतिष्ठित भारतीय स्मारकों के विस्तृत 3डी मॉडल का अन्वेषण करें',
    viewDetails: 'विवरण देखें',
    
    // Assistant Page
    assistantTitle: 'विरासत स्मारक सहायक',
    assistantSubtitle: 'हमारे एआई सहायक के साथ भारतीय स्मारकों के समृद्ध इतिहास का अन्वेषण करें',
    askPlaceholder: 'किसी विरासत स्मारक के बारे में पूछें...',
    thinking: 'विचार कर रहा हूँ...',
    send: 'भेजें',
    welcomeMessage: 'विरासत स्मारक सहायक में आपका स्वागत है! मैं विभिन्न भारतीय विरासत स्थलों के बारे में जानकारी प्रदान कर सकता हूं। आप किस स्मारक के बारे में जानना चाहेंगे?',
    
    // Converter Page
    converterTitle: 'टेक्स्ट से 3डी रूपांतरण',
    converterSubtitle: 'टेक्स्ट विवरण से 3डी मॉडल बनाएं',
    descriptionPlaceholder: 'स्मारक या संरचना का वर्णन करें...',
    generate: 'मॉडल बनाएं',
    
    // Footer
    footerText: 'सर्वाधिकार सुरक्षित।',
    about: 'हमारे बारे में',
    privacy: 'गोपनीयता',
    terms: 'नियम और शर्तें',
    contact: 'संपर्क',
  },
  
  ta: {
    // Common
    appName: 'ஹெரிடேஜ்3டி',
    loading: 'ஏற்றுகிறது...',
    error: 'பிழை ஏற்பட்டது',
    submit: 'சமர்ப்பி',
    cancel: 'ரத்து செய்',
    search: 'தேடு',
    
    // Navigation
    home: 'முகப்பு',
    models: '3டி மாடல்கள்',
    tours: 'சுற்றுலாக்கள்',
    assistant: 'உதவியாளர்',
    convert: 'உரையிலிருந்து 3டி',
    signIn: 'உள்நுழைக',
    signUp: 'பதிவு செய்க',
    signOut: 'வெளியேறு',
    profile: 'சுயவிவரம்',
    
    // Home Page
    heroTitle: 'இந்திய பாரம்பரியத்தை 3டியில் ஆராயுங்கள்',
    heroSubtitle: 'ஊடாடும் 3டி மாடல்கள் மற்றும் மெய்நிகர் சுற்றுலாக்கள் மூலம் இந்தியாவின் வளமான கலாச்சார வரலாற்றில் மூழ்குங்கள்',
    exploreButton: 'மாடல்களை ஆராய்க',
    learnMore: 'மேலும் அறிக',
    
    // Models Page
    modelsTitle: '3டி மாடல் சேகரிப்பு',
    modelsSubtitle: 'புகழ்பெற்ற இந்திய நினைவுச்சின்னங்களின் விரிவான 3டி மாடல்களை ஆராயுங்கள்',
    viewDetails: 'விவரங்களைக் காண்க',
    
    // Assistant Page
    assistantTitle: 'பாரம்பரிய நினைவுச்சின்ன உதவியாளர்',
    assistantSubtitle: 'எங்கள் AI உதவியாளருடன் இந்திய நினைவுச்சின்னங்களின் வளமான வரலாற்றை ஆராயுங்கள்',
    askPlaceholder: 'ஒரு பாரம்பரிய நினைவுச்சின்னத்தைப் பற்றி கேளுங்கள்...',
    thinking: 'சிந்திக்கிறேன்...',
    send: 'அனுப்பு',
    welcomeMessage: 'பாரம்பரிய நினைவுச்சின்ன உதவியாளருக்கு வரவேற்கிறோம்! பல்வேறு இந்திய பாரம்பரிய தளங்களைப் பற்றிய தகவல்களை நான் வழங்க முடியும். நீங்கள் எந்த நினைவுச்சின்னத்தைப் பற்றி அறிய விரும்புகிறீர்கள்?',
    
    // Converter Page
    converterTitle: 'உரையிலிருந்து 3டி மாற்றம்',
    converterSubtitle: 'உரை விவரங்களிலிருந்து 3டி மாடல்களை உருவாக்குங்கள்',
    descriptionPlaceholder: 'நினைவுச்சின்னம் அல்லது கட்டமைப்பை விவரிக்கவும்...',
    generate: 'மாடல் உருவாக்கு',
    
    // Footer
    footerText: 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
    about: 'எங்களைப் பற்றி',
    privacy: 'தனியுரிமை',
    terms: 'விதிமுறைகள்',
    contact: 'தொடர்பு',
  },
  
  bn: {
    // Common
    appName: 'হেরিটেজ3ডি',
    loading: 'লোড হচ্ছে...',
    error: 'একটি ত্রুটি ঘটেছে',
    submit: 'জমা দিন',
    cancel: 'বাতিল',
    search: 'খুঁজুন',
    
    // Navigation
    home: 'হোম',
    models: '3ডি মডেল',
    tours: 'ভ্রমণ',
    assistant: 'সহকারী',
    convert: 'টেক্সট থেকে 3ডি',
    signIn: 'সাইন ইন',
    signUp: 'সাইন আপ',
    signOut: 'সাইন আউট',
    profile: 'প্রোফাইল',
    
    // Home Page
    heroTitle: '3ডিতে ভারতীয় ঐতিহ্য অন্বেষণ করুন',
    heroSubtitle: 'ইন্টারেক্টিভ 3ডি মডেল এবং ভার্চুয়াল ট্যুরের মাধ্যমে ভারতের সমৃদ্ধ সাংস্কৃতিক ইতিহাসে নিজেকে নিমজ্জিত করুন',
    exploreButton: 'মডেল অন্বেষণ করুন',
    learnMore: 'আরও জানুন',
    
    // Models Page
    modelsTitle: '3ডি মডেল সংগ্রহ',
    modelsSubtitle: 'বিখ্যাত ভারতীয় স্মৃতিসৌধের বিস্তারিত 3ডি মডেল অন্বেষণ করুন',
    viewDetails: 'বিবরণ দেখুন',
    
    // Assistant Page
    assistantTitle: 'ঐতিহ্য স্মৃতিসৌধ সহকারী',
    assistantSubtitle: 'আমাদের এআই সহকারীর সাথে ভারতীয় স্মৃতিসৌধের সমৃদ্ধ ইতিহাস অন্বেষণ করুন',
    askPlaceholder: 'একটি ঐতিহ্য স্মৃতিসৌধ সম্পর্কে জিজ্ঞাসা করুন...',
    thinking: 'চিন্তা করছি...',
    send: 'পাঠান',
    welcomeMessage: 'ঐতিহ্য স্মৃতিসৌধ সহকারীতে আপনাকে স্বাগতম! আমি বিভিন্ন ভারতীয় ঐতিহ্য স্থান সম্পর্কে তথ্য প্রদান করতে পারি। আপনি কোন স্মৃতিসৌধ সম্পর্কে জানতে চান?',
    
    // Converter Page
    converterTitle: 'টেক্সট থেকে 3ডি রূপান্তর',
    converterSubtitle: 'টেক্সট বিবরণ থেকে 3ডি মডেল তৈরি করুন',
    descriptionPlaceholder: 'স্মৃতিসৌধ বা কাঠামো বর্ণনা করুন...',
    generate: 'মডেল তৈরি করুন',
    
    // Footer
    footerText: 'সর্বস্বত্ব সংরক্ষিত।',
    about: 'আমাদের সম্পর্কে',
    privacy: 'গোপনীয়তা',
    terms: 'শর্তাবলী',
    contact: 'যোগাযোগ',
  },
};

// Create the language context
const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  // Initialize with browser language or default to English
  const [currentLanguage, setCurrentLanguage] = useState(() => {
    // Check local storage first
    const savedLang = localStorage.getItem('preferredLanguage');
    if (savedLang && languages[savedLang]) {
      return savedLang;
    }
    
    // Check browser language
    const browserLang = navigator.language.split('-')[0];
    if (languages[browserLang]) {
      return browserLang;
    }
    
    // Default to English
    return 'en';
  });

  // Update language direction for the document
  useEffect(() => {
    document.documentElement.dir = languages[currentLanguage].direction;
    document.documentElement.lang = currentLanguage;
    // Save preference to local storage
    localStorage.setItem('preferredLanguage', currentLanguage);
  }, [currentLanguage]);

  // Function to change language
  const changeLanguage = (code) => {
    if (languages[code]) {
      setCurrentLanguage(code);
    }
  };

  // Get translation for a key
  const t = (key) => {
    return translations[currentLanguage][key] || translations.en[key] || key;
  };

  const value = {
    currentLanguage,
    languages,
    t,
    changeLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use the language context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}