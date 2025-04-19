import { createContext, useContext, useState, useEffect } from 'react';

// Define available languages with their translations
const defaultLanguages = {
  en: {
    code: 'en',
    name: 'English',
    translations: {
      // Navbar
      home: 'Home',
      models: '3D Models',
      assistant: 'Assistant',
      converter: 'Text to 3D',
      signIn: 'Sign in',
      signUp: 'Sign up',
      signOut: 'Sign out',
      
      // Homepage
      heroTitle: 'Explore Indian Heritage in 3D',
      heroSubtitle: 'Discover the rich history and architectural beauty of Indian monuments through immersive 3D experiences and AI-powered knowledge.',
      exploreButton: 'Explore 3D Models',
      learnMore: 'Learn more',
      featuredModels: 'Featured Monuments',
      viewAllModels: 'View All Models',
      viewDetails: 'View details',
      
      // Models page
      modelsTitle: 'Explore 3D Models',
      modelsSubtitle: 'Browse our collection of detailed 3D models of iconic Indian heritage monuments.',
      searchPlaceholder: 'Search monuments by name, location or category...',
      noModelsFound: 'No models found matching your search.',
      clearSearch: 'Clear Search',
      
      // Assistant page
      assistantTitle: 'Heritage Knowledge Assistant',
      assistantSubtitle: 'Ask anything about Indian heritage monuments and get detailed information powered by AI.',
      messagePlaceholder: 'Type your question about Indian monuments...',
      sendMessage: 'Send',
      
      // Common
      loading: 'Loading...',
      error: 'Something went wrong. Please try again.',
      close: 'Close',
    }
  },
  hi: {
    code: 'hi',
    name: 'हिंदी',
    translations: {
      // Navbar
      home: 'होम',
      models: '3D मॉडल',
      assistant: 'सहायक',
      converter: 'टेक्स्ट से 3D',
      signIn: 'साइन इन',
      signUp: 'साइन अप',
      signOut: 'साइन आउट',
      
      // Homepage
      heroTitle: 'भारतीय विरासत का 3D में अन्वेषण करें',
      heroSubtitle: 'इमर्सिव 3D अनुभवों और AI-संचालित ज्ञान के माध्यम से भारतीय स्मारकों के समृद्ध इतिहास और वास्तुकला सौंदर्य की खोज करें।',
      exploreButton: '3D मॉडल देखें',
      learnMore: 'अधिक जानें',
      featuredModels: 'विशेष स्मारक',
      viewAllModels: 'सभी मॉडल देखें',
      viewDetails: 'विवरण देखें',
      
      // Models page
      modelsTitle: '3D मॉडल एक्सप्लोर करें',
      modelsSubtitle: 'प्रतिष्ठित भारतीय विरासत स्मारकों के विस्तृत 3D मॉडल का हमारा संग्रह ब्राउज़ करें।',
      searchPlaceholder: 'नाम, स्थान या श्रेणी से स्मारकों को खोजें...',
      noModelsFound: 'आपकी खोज से मेल खाने वाला कोई मॉडल नहीं मिला।',
      clearSearch: 'खोज साफ़ करें',
      
      // Assistant page
      assistantTitle: 'विरासत ज्ञान सहायक',
      assistantSubtitle: 'भारतीय विरासत स्मारकों के बारे में कुछ भी पूछें और AI द्वारा संचालित विस्तृत जानकारी प्राप्त करें।',
      messagePlaceholder: 'भारतीय स्मारकों के बारे में अपना प्रश्न लिखें...',
      sendMessage: 'भेजें',
      
      // Common
      loading: 'लोड हो रहा है...',
      error: 'कुछ गलत हुआ। कृपया पुनः प्रयास करें।',
      close: 'बंद करें',
    }
  },
  ta: {
    code: 'ta',
    name: 'தமிழ்',
    translations: {
      // Navbar
      home: 'முகப்பு',
      models: '3D மாதிரிகள்',
      assistant: 'உதவியாளர்',
      converter: 'டெக்ஸ்ட் டு 3D',
      signIn: 'உள்நுழைக',
      signUp: 'பதிவு செய்க',
      signOut: 'வெளியேறு',
      
      // Homepage
      heroTitle: 'இந்திய பாரம்பரியத்தை 3D-இல் ஆராயுங்கள்',
      heroSubtitle: 'இமெர்சிவ் 3D அனுபவங்கள் மற்றும் AI-ஆல் இயக்கப்படும் அறிவு மூலம் இந்திய நினைவுச்சின்னங்களின் வளமான வரலாறு மற்றும் கட்டிடக்கலை அழகைக் கண்டறியுங்கள்.',
      exploreButton: '3D மாதிரிகளை ஆராயுங்கள்',
      learnMore: 'மேலும் அறிக',
      featuredModels: 'சிறப்பு நினைவுச்சின்னங்கள்',
      viewAllModels: 'அனைத்து மாதிரிகளையும் காண்க',
      viewDetails: 'விவரங்களைக் காண்க',
      
      // Models page
      modelsTitle: '3D மாதிரிகளை ஆராயுங்கள்',
      modelsSubtitle: 'புகழ்பெற்ற இந்திய பாரம்பரிய நினைவுச்சின்னங்களின் விரிவான 3D மாதிரிகளின் எங்கள் சேகரிப்பை உலாவுங்கள்.',
      searchPlaceholder: 'பெயர், இருப்பிடம் அல்லது வகை மூலம் நினைவுச்சின்னங்களைத் தேடுங்கள்...',
      noModelsFound: 'உங்கள் தேடலுடன் பொருந்தும் மாதிரிகள் எதுவும் இல்லை.',
      clearSearch: 'தேடலை அழிக்க',
      
      // Assistant page
      assistantTitle: 'பாரம்பரிய அறிவு உதவியாளர்',
      assistantSubtitle: 'இந்திய பாரம்பரிய நினைவுச்சின்னங்களைப் பற்றி எதையும் கேளுங்கள் மற்றும் AI ஆல் இயக்கப்படும் விரிவான தகவல்களைப் பெறுங்கள்.',
      messagePlaceholder: 'இந்திய நினைவுச்சின்னங்களைப் பற்றி உங்கள் கேள்வியைத் தட்டச்சு செய்யவும்...',
      sendMessage: 'அனுப்பு',
      
      // Common
      loading: 'ஏற்றுகிறது...',
      error: 'ஏதோ தவறு நடந்துவிட்டது. தயவுசெய்து மீண்டும் முயற்சிக்கவும்.',
      close: 'மூடு',
    }
  }
};

// Create language context
const LanguageContext = createContext();

// Language provider component
export function LanguageProvider({ children }) {
  // Get saved language from localStorage or use default
  const getSavedLanguage = () => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('language');
      return saved || 'en';
    }
    return 'en';
  };

  const [currentLanguage, setCurrentLanguage] = useState(getSavedLanguage);
  const [languages, setLanguages] = useState(defaultLanguages);

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem('language', currentLanguage);
  }, [currentLanguage]);

  // Function to change language
  const changeLanguage = (languageCode) => {
    if (languages[languageCode]) {
      setCurrentLanguage(languageCode);
    }
  };

  // Translation function
  const t = (key) => {
    const lang = languages[currentLanguage];
    if (!lang) return '';
    
    return lang.translations[key] || key;
  };

  // Context value
  const value = {
    currentLanguage,
    languages,
    changeLanguage,
    t,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use language context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}