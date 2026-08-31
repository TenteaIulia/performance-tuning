export const translations = {
  EN: {
    common: {
      home: "Home",
      dashboard: "Dashboard",
      login: "Log in",
      register: "Create account",
      newOrder: "New tuning order",
      language: "Language",
    },

    navigation: {
      howItWorks: "How it works",
      about: "About us",
      benefits: "Benefits",
      faq: "FAQ",
      contact: "Contact",
      orders: "Orders",
      vehicles: "Vehicles",
      files: "Files",
      payments: "Payments",
      support: "Support",
      settings: "Settings",
    },

    home: {
      badge: "Professional ECU file service",

      heroTitle: "Upload your ECU file.",
      heroHighlight: "We handle the rest.",

      heroDescription:
        "A secure platform for uploading, paying, tracking and receiving professionally modified automotive files from anywhere in the world.",

      uploadFile: "Upload your file",
      seeHowItWorks: "See how it works",

      secureUploads: "Secure uploads",
      eurPayments: "Payments in EUR",
      worldwideAccess: "Worldwide access",
      languages: "RO / EN",

      howItWorksTitle:
        "From original file to finished order in four clear steps.",

      aboutLabel: "About Performance Tuning",

      aboutTitle:
        "Built for a faster, safer and more professional ECU file workflow.",

      aboutDescription:
        "Performance Tuning brings vehicle details, ECU files, payments and order updates into one secure platform.",

      benefitsLabel: "Built for trust",

      benefitsTitle:
        "Everything in one secure workspace.",

      ctaTitle: "Ready to submit your first file?",

      ctaDescription:
        "Create your account, add the vehicle details and follow the order from upload to final download.",

      createAccount: "Create an account",
      createNewOrder: "Create new order",
    },
  },

  RO: {
    common: {
      home: "Acasă",
      dashboard: "Panou",
      login: "Autentificare",
      register: "Creează cont",
      newOrder: "Comandă nouă",
      language: "Limbă",
    },

    navigation: {
      howItWorks: "Cum funcționează",
      about: "Despre noi",
      benefits: "Beneficii",
      faq: "Întrebări frecvente",
      contact: "Contact",
      orders: "Comenzi",
      vehicles: "Vehicule",
      files: "Fișiere",
      payments: "Plăți",
      support: "Suport",
      settings: "Setări",
    },

    home: {
      badge: "Serviciu profesional pentru fișiere ECU",

      heroTitle: "Încarcă fișierul ECU.",
      heroHighlight: "Noi ne ocupăm de restul.",

      heroDescription:
        "O platformă sigură pentru încărcarea, plata, urmărirea și primirea fișierelor auto modificate profesional, de oriunde din lume.",

      uploadFile: "Încarcă fișierul",
      seeHowItWorks: "Vezi cum funcționează",

      secureUploads: "Încărcări securizate",
      eurPayments: "Plăți în EUR",
      worldwideAccess: "Acces internațional",
      languages: "RO / EN",

      howItWorksTitle:
        "De la fișierul original la comanda finalizată în patru pași simpli.",

      aboutLabel: "Despre Performance Tuning",

      aboutTitle:
        "Creat pentru un flux ECU mai rapid, mai sigur și mai profesionist.",

      aboutDescription:
        "Performance Tuning reunește datele vehiculului, fișierele ECU, plățile și actualizările comenzilor într-o singură platformă securizată.",

      benefitsLabel: "Creat pentru încredere",

      benefitsTitle:
        "Totul într-un singur spațiu de lucru securizat.",

      ctaTitle: "Ești gata să trimiți primul fișier?",

      ctaDescription:
        "Creează contul, adaugă datele vehiculului și urmărește comanda de la încărcare până la descărcarea finală.",

      createAccount: "Creează cont",
      createNewOrder: "Creează comandă nouă",
    },
  },
} as const;

export type Language = keyof typeof translations;