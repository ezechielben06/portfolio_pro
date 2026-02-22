/* eslint-disable no-unused-vars */

import jsPDF from "jspdf";
import html2pdf from "html2pdf.js";
import html2canvas from "html2canvas";
import { useState, useEffect, useMemo, useRef } from "react";
import {
  FaMoon,
  FaSun,
  FaBars,
  FaTimes,
  FaArrowUp,
  FaArrowRight,
  FaGithub,
  FaExternalLinkAlt,
  FaEnvelope,
  FaDownload,
  FaCode,
  FaServer,
  FaLinkedinIn,
  FaGraduationCap,
  FaBriefcase,
  FaTools,
  FaStar,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaPrint,
  FaUsers,
  FaComment,
  FaThumbsUp,
  FaShare,
  FaVideo,
  FaImages,
  FaUserFriends,
} from "react-icons/fa";
import { FaJava } from "react-icons/fa6";
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiGit,
  SiFigma,
  SiTailwindcss,
  SiPhp,
  SiExpress,
  SiMysql,
  SiTypescript,
  SiMongodb,
  SiFirebase,
  SiNextdotjs,
  SiRedux,
} from "react-icons/si";

import {
  SiPython,
  SiDjango,
  SiFastapi,
  SiFlask,
  SiPostgresql,
  SiSqlite,
  SiPytest,
  SiJupyter,
} from "react-icons/si";

// Styles CSS globaux pour l'impression
const cvPrintStyles = `
  @layer base {
    .print-mode {
      font-size: 12pt;
    }
    
    @media print {
      .no-print {
        display: none !important;
      }
      
      .print-break-avoid {
        page-break-inside: avoid;
      }
      
      .print-break-before {
        page-break-before: always;
      }
      
      body {
        -webkit-print-color-adjust: exact !important;
        print-color-adjust: exact !important;
      }
      
      a {
        text-decoration: none !important;
        color: inherit !important;
      }
    }
  }
`;

function App() {
  // 🎯 ÉTATS SIMPLIFIÉS
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem("portfolio-theme");
    return savedTheme ? JSON.parse(savedTheme) : false;
  });
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [isBackToTopVisible, setIsBackToTopVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [formStatus, setFormStatus] = useState({ type: "", message: "" });
  const [projectModal, setProjectModal] = useState({
    isOpen: false,
    project: null,
  });
  const [showCVModal, setShowCVModal] = useState(false);
  const [isPrintMode, setIsPrintMode] = useState(false);
  const [projectFilter, setProjectFilter] = useState("all");

  // 🎯 RÉFÉRENCES
  const observerRef = useRef(null);
  const cvRef = useRef(null);

  // 🎯 DONNÉES DES PROJETS DE LA BOUTIQUE + FACEBOOK CLONE
  const projects = [
    {
      id: 1,
      title: "Form-Builder Pro",
      shortTitle: "Form-Builder",
      description:
        "Générateur de formulaires interactif avec interface graphique intuitive et génération automatique de code HTML/CSS.",
      fullDescription:
        "FormBuilder est une application web complète qui permet aux utilisateurs de créer des formulaires personnalisés via une interface drag-and-drop avancée. L'outil génère automatiquement le code HTML et CSS optimisé pour la responsivité, l'accessibilité et la performance. Idéal pour les développeurs et designers qui veulent gagner du temps.",
      image: "/tools_images/image.png",
      previewImages: [
        "/tools_images/image.png",
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1545239351-1141bd94e3cd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ],
      tags: [
        "React",
        "Tailwind CSS",
        "Form Validation",
        "Code Generation",
        "Drag & Drop",
      ],
      category: "web",
      github: "https://github.com/ezechielben06/form-builder",
      demo: "https://formbuilder06.netlify.app/",
      features: [
        "Interface drag-and-drop intuitive",
        "Prévisualisation en temps réel",
        "Génération de code HTML/CSS",
        "Validation avancée des champs",
        "Export JSON/PDF des configurations",
        "Templates pré-définis",
        "Responsive design",
      ],
      technologies: [
        "React",
        "JavaScript",
        "Tailwind CSS",
        "Local Storage",
        "React DnD",
      ],
      year: 2025,
      status: "Live",
      projectType: "Outil de développement",
      rating: 4.8,
      downloads: "2.3k",
      color: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      title: "Tâche-Liste Pro",
      shortTitle: "Tâche-Liste",
      description:
        "Application de gestion de tâches avancée avec interface moderne et fonctionnalités de productivité.",
      fullDescription:
        "Tâche-Liste Pro est une application de productivité robuste offrant une gestion complète des tâches avec des fonctionnalités avancées comme les sous-tâches, les étiquettes, les échéances et les rappels. Interface épurée avec des animations fluides pour une expérience utilisateur optimale.",
      image: "/tools_images/image2.png",
      previewImages: [
        "/tools_images/image2.png",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ],
      tags: ["Task Management", "Productivity", "CRUD", "Responsive", "PWA"],
      category: "web",
      github: "https://github.com/ezechielben06/tache-liste",
      demo: "https://tacheliste.netlify.app/",
      features: [
        "Création, modification et suppression de tâches",
        "Sous-tâches et dépendances",
        "Échéances et rappels",
        "Catégorisation par étiquettes",
        "Recherche et filtrage avancé",
        "Mode hors ligne (PWA)",
        "Synchronisation multi-appareils",
      ],
      technologies: [
        "JavaScript",
        "HTML5",
        "CSS3",
        "Local Storage",
        "Service Workers",
      ],
      year: 2025,
      status: "Live",
      projectType: "Application Web",
      rating: 4.1,
      downloads: "2.8k",
      color: "from-emerald-500 to-green-500",
    },
    {
      id: 3,
      title: "CV-Builder Pro",
      shortTitle: "CV-Builder",
      description:
        "Outil professionnel pour créer facilement un CV moderne directement depuis une interface web intuitive.",
      fullDescription:
        "CV-Builder Pro offre une expérience complète pour générer un CV professionnel en quelques minutes. Avec plusieurs templates modernes, des suggestions de contenu et un éditeur WYSIWYG, il permet de créer un CV qui se démarque. Export en PDF avec préservation du design.",
      image: "/tools_images/image3.png",
      previewImages: [
        "/tools_images/image3.png",
        "https://images.unsplash.com/photo-1586281380349-632531db7ed4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ],
      tags: ["CV Generator", "PDF Export", "Professional Templates", "Career"],
      category: "web",
      github: "https://github.com/ezechielben06/cv-builder",
      demo: "https://cvbuilder06.netlify.app/",
      features: [
        "12+ templates professionnels",
        "Édition en temps réel WYSIWYG",
        "Export PDF haute qualité",
        "Suggestions de contenu IA",
        "Analyse ATS-friendly",
        "Partage en un clic",
        "Historique des versions",
      ],
      technologies: [
        "React",
        "jsPDF",
        "Tailwind CSS",
        "Context API",
        "HTML2Canvas",
      ],
      year: 2025,
      status: "Live",
      projectType: "Outil de carrière",
      rating: 4.9,
      downloads: "2.8k",
      color: "from-purple-500 to-pink-500",
    },
    {
      id: 4,
      title: "Unsplash Downloader Pro",
      shortTitle: "Unsplash Downloader",
      description:
        "Plateforme avancée pour découvrir et télécharger des images haute résolution avec filtres intelligents.",
      fullDescription:
        "Unsplash Pro Downloader est une interface sophistiquée intégrant l'API Unsplash avec des fonctionnalités avancées de recherche, de filtrage et de gestion de collections. Optimisé pour les designers et créateurs de contenu qui ont besoin d'images de qualité.",
      image: "/tools_images/image4.png",
      previewImages: [
        "/tools_images/image4.png",
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1542744095-fcf48d80b0fd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ],
      tags: [
        "Image Download",
        "API Integration",
        "Advanced Search",
        "High Quality",
      ],
      category: "web",
      github: "https://github.com/ezechielben06/unsplash-downloader",
      demo: "https://unsplashdownloader56.netlify.app/",
      features: [
        "Recherche avancée par mots-clés",
        "Filtrage par couleur, orientation, taille",
        "Collections personnalisées",
        "Téléchargement batch",
        "Historique des téléchargements",
        "Watermark automatique",
        "Compression intelligente",
      ],
      technologies: [
        "React",
        "Unsplash API",
        "Axios",
        "Tailwind CSS",
        "React Query",
      ],
      year: 2025,
      status: "Live",
      projectType: "Outil de design",
      rating: 4.9,
      downloads: "2.8k",
      color: "from-orange-500 to-red-500",
    },
    {
      id: 5,
      title: "Facebook Clone",
      shortTitle: "Chat io (facebook clone)",
      description:
        "Réplique fonctionnelle de Facebook avec interface moderne, posts en temps réel et interactions sociales.",
      fullDescription:
        "Ce clone de Facebook reproduit les principales fonctionnalités du réseau social avec une interface moderne et réactive. Il inclut la création de posts, les commentaires, les réactions, le système d'amis et une messagerie en temps réel. Un projet full-stack complet démontrant des compétences avancées.",
      image:
        "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      previewImages: [
        "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1579869847557-1f67382cc158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ],
      tags: [
        "Social Media",
        "Real-time",
        "Authentication",
        "Full Stack",
        "Responsive",
      ],
      category: "web",
      github: "https://github.com/ezechielben06/facebook-clone",
      demo: "https://chatintern.netlify.app/",
      features: [
        "Création et partage de posts",
        "Commentaires et réactions (like)",
        "Système d'amis et demandes",
        "Messagerie en temps réel",
        "Notifications push",
        "Profils personnalisables",
        "Feed algorithmique",
        "Upload d'images/vidéos",
      ],
      technologies: [
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "Socket.io",
        "Firebase",
        "Redux",
      ],
      year: 2026,
      status: "Démo",
      projectType: "Réseau Social",
      rating: 4.7,
      downloads: "1.5k",
      color: "from-blue-600 to-blue-800",
      specialBadge: "Nouveau",
    },
    {
      id: 6,
      title: "Django Blog API Pro",
      shortTitle: "Django Blog API",
      description:
        "API RESTful complète pour un système de blog avec Django REST Framework, authentification JWT et documentation Swagger.",
      fullDescription:
        "Plateforme backend robuste développée avec Django et Django REST Framework. Cette API offre une solution complète pour la gestion de contenu avec authentification sécurisée, permissions granulaires, système de commentaires, et documentation interactive automatique. Idéal pour alimenter des applications frontend modernes.",
      image:
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      previewImages: [
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ],
      tags: [
        "Django",
        "DRF",
        "API REST",
        "JWT",
        "PostgreSQL",
        "Swagger",
        "Authentication",
      ],
      category: "web",
      github: "https://github.com/ezechielben06/django-blog-api",
      demo: "https://django-blog-api-demo.herokuapp.com/api/docs",
      features: [
        "Authentification JWT complète",
        "CRUD complet pour articles et catégories",
        "Système de commentaires avec modération",
        "Permissions personnalisées (admin, auteur, lecteur)",
        "Recherche et filtrage avancés",
        "Pagination et versioning API",
        "Documentation Swagger/ReDoc interactive",
        "Tests unitaires avec Pytest",
      ],
      technologies: [
        "Python",
        "Django",
        "Django REST Framework",
        "PostgreSQL",
        "JWT",
        "Swagger",
        "Pytest",
        "Docker",
      ],
      year: 2024,
      status: "Live",
      projectType: "Backend API",
      rating: 4.9,
      downloads: "1.2k",
      color: "from-green-600 to-teal-600",
      specialBadge: "Nouveau",
    },
    {
      id: 7,
      title: "E-commerce Backend Django",
      shortTitle: "Django E-commerce",
      description:
        "Backend e-commerce complet avec gestion de produits, panier, commandes et paiements intégrés via Stripe.",
      fullDescription:
        "Solution backend complète pour une plateforme e-commerce développée avec Django. Cette API gère l'intégralité du cycle de vente : catalogue produits, gestion des stocks, panier d'achat, processus de commande, et intégration de paiement Stripe. Architecture modulaire et scalable prête pour la production.",
      image:
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      previewImages: [
        "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1556742111-a301076d9d18?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ],
      tags: [
        "Django",
        "E-commerce",
        "Stripe",
        "Payments",
        "Cart",
        "Orders",
        "Products",
      ],
      category: "web",
      github: "https://github.com/ezechielben06/django-ecommerce-backend",
      demo: "https://django-ecommerce-api.herokuapp.com/api",
      features: [
        "Gestion complète du catalogue produits",
        "Système de panier avec sessions",
        "Processus de commande et facturation",
        "Intégration Stripe pour paiements",
        "Gestion des stocks automatique",
        "Historique des commandes utilisateur",
        "Administration personnalisée",
        "Webhooks pour paiements",
      ],
      technologies: [
        "Python",
        "Django",
        "Django REST Framework",
        "PostgreSQL",
        "Stripe API",
        "Celery",
        "Redis",
        "Docker",
      ],
      year: 2024,
      status: "Développement",
      projectType: "Backend API",
      rating: 4.8,
      downloads: "856",
      color: "from-purple-600 to-pink-600",
    },
  ];

  // Filtrage des projets
  const filteredProjects = useMemo(() => {
    if (projectFilter === "all") return projects;
    if (projectFilter === "featured")
      return projects.filter((p) => p.rating >= 4.5);
    return projects.filter((p) => p.category === projectFilter);
  }, [projectFilter]);

  // 🎯 NAVIGATION
  const navItems = [
    { id: "home", label: "Accueil", icon: <FaCode /> },
    { id: "about", label: "À propos", icon: <FaGraduationCap /> },
    {
      id: "certifications",
      label: "Certifications",
      icon: <FaGraduationCap />,
    }, // Nouvelle ligne
    { id: "skills", label: "Compétences", icon: <FaTools /> },
    { id: "projects", label: "Projets", icon: <FaBriefcase /> },
    { id: "contact", label: "Contact", icon: <FaEnvelope /> },
  ];

  // 🎯 COMPÉTENCES
  const skills = [
    {
      name: "HTML5/CSS3",
      level: 95,
      gradientColor: "from-orange-500 to-orange-600",
      textColor: "text-orange-500",
      icon: <SiHtml5 />,
    },
    {
      name: "JavaScript",
      level: 90,
      gradientColor: "from-yellow-500 to-yellow-600",
      textColor: "text-yellow-500",
      icon: <SiJavascript />,
    },
    {
      name: "React.js",
      level: 85,
      gradientColor: "from-blue-400 to-cyan-500",
      textColor: "text-blue-400",
      icon: <SiReact />,
    },
    {
      name: "Tailwind CSS",
      level: 88,
      gradientColor: "from-blue-500 to-cyan-400",
      textColor: "text-blue-500",
      icon: <SiTailwindcss />,
    },
    // NOUVEAU : Python
    {
      name: "Python",
      level: 82,
      gradientColor: "from-blue-500 to-blue-600",
      textColor: "text-blue-500",
      icon: <SiPython />,
    },
    // NOUVEAU : Django
    {
      name: "Django & DRF",
      level: 78,
      gradientColor: "from-green-600 to-green-700",
      textColor: "text-green-600",
      icon: <SiDjango />,
    },
    {
      name: "Node.js",
      level: 80,
      gradientColor: "from-green-500 to-green-600",
      textColor: "text-green-500",
      icon: <SiNodedotjs />,
    },
    {
      name: "MongoDB",
      level: 75,
      gradientColor: "from-green-400 to-green-500",
      textColor: "text-green-400",
      icon: <SiMongodb />,
    },
  ];

  const technologies = [
    { icon: <SiHtml5 />, name: "HTML5", color: "text-orange-500" },
    { icon: <SiCss3 />, name: "CSS3", color: "text-blue-500" },
    { icon: <SiJavascript />, name: "JavaScript", color: "text-yellow-500" },
    { icon: <SiReact />, name: "React", color: "text-blue-400" },
    { icon: <SiTailwindcss />, name: "Tailwind", color: "text-blue-500" },
    {
      icon: <SiNextdotjs />,
      name: "Next.js",
      color: "text-gray-800 dark:text-white",
    },
    { icon: <SiNodedotjs />, name: "Node.js", color: "text-green-500" },
    { icon: <SiExpress />, name: "Express", color: "text-gray-400" },
    { icon: <SiMysql />, name: "MySQL", color: "text-blue-700" },
    { icon: <SiMongodb />, name: "MongoDB", color: "text-green-500" },
    { icon: <SiFirebase />, name: "Firebase", color: "text-yellow-500" },
    { icon: <SiRedux />, name: "Redux", color: "text-purple-500" },
    { icon: <SiGit />, name: "Git", color: "text-orange-600" },
    { icon: <SiFigma />, name: "Figma", color: "text-purple-500" },
    { icon: <SiPython />, name: "Python", color: "text-blue-500" },
    { icon: <SiDjango />, name: "Django", color: "text-green-700" },
    { icon: <SiFastapi />, name: "FastAPI", color: "text-teal-500" },
    { icon: <SiPostgresql />, name: "PostgreSQL", color: "text-blue-600" },
    { icon: <SiSqlite />, name: "SQLite", color: "text-blue-400" },
    { icon: <SiPytest />, name: "Pytest", color: "text-red-500" },
  ];

  // 🎯 EXPÉRIENCES
  const experiences = [
    {
      year: "2023 - 2026",
      role: "Étudiant en Développement Web",
      company: "Auto-formation et Projets Personnels",
      description: "Développement de projets full-stack et outils web avancés.",
      technologies: ["React", "Node.js", "MongoDB", "Tailwind CSS"],
      achievements: [
        "Développement de 5 projets web complets",
        "Maîtrise des architectures modernes",
        "Optimisation des performances",
        "Intégration d'APIs tierces",
      ],
    },
  ];

  // 🎯 LIENS SOCIAUX
  const socialLinks = [
    {
      icon: <FaGithub />,
      href: "https://github.com/ezechielben06",
      label: "GitHub",
    },
    {
      icon: <FaLinkedinIn />,
      href: "https://linkedin.com/in/ezechielhounkpe",
      label: "LinkedIn",
    },
  ];

  const toggleDarkMode = () => {
  setIsDarkMode(!isDarkMode);
};

  // 🎯 GESTION DU MODE SOMBRE/CLAIR
  useEffect(() => {
    localStorage.setItem("portfolio-theme", JSON.stringify(isDarkMode));
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    // Injecter les styles d'impression
    const styleElement = document.createElement("style");
    styleElement.innerHTML = cvPrintStyles;
    document.head.appendChild(styleElement);

    // Simuler chargement
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    // Gestion du scroll
    const handleScroll = () => {
      setIsBackToTopVisible(window.scrollY > 300);
    };

    // Observer pour sections actives
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 },
    );

    document.querySelectorAll("section[id]").forEach((section) => {
      observerRef.current.observe(section);
    });

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timer);
      observerRef.current?.disconnect();
      window.removeEventListener("scroll", handleScroll);
      document.head.removeChild(styleElement);
    };
  }, [isDarkMode]);

  // 🎯 FONCTIONS - CORRIGER LA FONCTION 
  


  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  const openProjectModal = (project) => {
    setProjectModal({ isOpen: true, project });
    document.body.style.overflow = "hidden";
  };

  const closeProjectModal = () => {
    setProjectModal({ isOpen: false, project: null });
    document.body.style.overflow = "auto";
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ type: "loading", message: "Envoi en cours..." });

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setFormStatus({
        type: "success",
        message: "Message envoyé avec succès !",
      });
      e.target.reset();
      setTimeout(() => setFormStatus({ type: "", message: "" }), 4000);
    } catch (error) {
      setFormStatus({
        type: "error",
        message: "Erreur lors de l'envoi.",
      });
    }
  };

  // 🎯 COMPOSANT LOADING
  const LoadingScreen = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-slate-900 z-50">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-300 font-semibold">
          Chargement du portfolio...
        </p>
      </div>
    </div>
  );

  // 🎯 COMPOSANT PROJECTS - AMÉLIORÉ
  const Projects = () => {
    const [activePreviewIndex, setActivePreviewIndex] = useState(0);
    const [previewAutoPlay, setPreviewAutoPlay] = useState(true);

    // Filtres de projet
    const projectFilters = [
      { id: "all", label: "Tous les projets", count: projects.length },
      {
        id: "featured",
        label: "Projets vedettes",
        count: projects.filter((p) => p.rating >= 4.5).length,
      },
      { id: "web", label: "Applications Web", count: projects.length },
    ];

    // Effet pour le carrousel automatique
    useEffect(() => {
      if (!previewAutoPlay || !projectModal.isOpen) return;

      const interval = setInterval(() => {
        setActivePreviewIndex((prev) =>
          prev < (projectModal.project?.previewImages?.length || 1) - 1
            ? prev + 1
            : 0,
        );
      }, 3000);

      return () => clearInterval(interval);
    }, [previewAutoPlay, projectModal.isOpen, projectModal.project]);

    return (
      <section
        id="projects"
        className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-slate-900 dark:to-slate-800 transition-colors duration-300"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm mb-4">
              <FaStar className="mr-2" />
              Portfolio de projets réels
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Mes Créations
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
              Applications web fonctionnelles que j'ai développées et qui sont
              disponibles en ligne
            </p>
          </div>

          {/* Filtres */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {projectFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setProjectFilter(filter.id)}
                className={`px-5 py-2.5 rounded-full transition-all duration-300 flex items-center space-x-2 ${
                  projectFilter === filter.id
                    ? "bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg"
                    : "bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700"
                }`}
              >
                <span>{filter.label}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs ${
                    projectFilter === filter.id
                      ? "bg-white/20"
                      : "bg-gray-100 dark:bg-slate-700"
                  }`}
                >
                  {filter.count}
                </span>
              </button>
            ))}
          </div>

          {/* Grille de projets améliorée */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredProjects.map((project) => (
              <div
                key={project.id}
                className="group relative bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 cursor-pointer"
                onClick={() => openProjectModal(project)}
              >
                {/* Badge spécial */}
                {project.specialBadge && (
                  <div className="absolute top-4 left-4 z-10">
                    <span className="px-3 py-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white text-xs font-bold rounded-full animate-pulse">
                      {project.specialBadge}
                    </span>
                  </div>
                )}

                {/* Image de prévisualisation avec effet */}
                <div className="relative h-64 overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-10`}
                  ></div>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center justify-between">
                        <span className="text-white text-sm font-medium bg-black/50 backdrop-blur-sm px-3 py-1 rounded-full">
                          Cliquez pour explorer
                        </span>
                        <div className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <FaExternalLinkAlt className="text-white w-4 h-4" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contenu de la carte */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {project.shortTitle}
                      </h3>
                      <div className="flex items-center mt-1">
                        <div className="flex items-center">
                          <FaStar className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                          <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                            {project.rating}
                          </span>
                        </div>
                        <span className="mx-2 text-gray-400">•</span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {project.downloads} téléchargements
                        </span>
                      </div>
                    </div>
                    <div className="px-3 py-1 bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold">
                      {project.year}
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
                    {project.description}
                  </p>

                  {/* Tags améliorés */}
                  <div className="flex flex-wrap gap-2 mb-5">
                    {project.tags.slice(0, 3).map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className="px-3 py-1.5 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Footer avec statistiques */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-slate-700">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <FaUsers className="w-4 h-4 mr-1" />
                        <span>Live</span>
                      </div>
                      <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                        <FaCode className="w-4 h-4 mr-1" />
                        <span>{project.technologies.length} techs</span>
                      </div>
                    </div>
                    <div className="flex items-center text-blue-600 dark:text-blue-400 font-semibold text-sm">
                      Voir détails
                      <FaArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Effet de bordure colorée */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                ></div>
              </div>
            ))}
          </div>
        </div>

        {/* Modal de projet amélioré */}
        {projectModal.isOpen && projectModal.project && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <div
              className="relative bg-white dark:bg-slate-800 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header du modal */}
              <div className="sticky top-0 bg-white dark:bg-slate-800 p-6 border-b border-gray-200 dark:border-slate-700 flex justify-between items-center z-10">
                <div>
                  <h3 className="text-2xl font-bold dark:text-white">
                    {projectModal.project.title}
                  </h3>
                  <div className="flex items-center mt-2 space-x-4">
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                      <FaStar className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                      <span className="font-semibold">
                        {projectModal.project.rating}
                      </span>
                      <span className="ml-1">
                        ({projectModal.project.downloads})
                      </span>
                    </div>
                    <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold">
                      {projectModal.project.status}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setPreviewAutoPlay(!previewAutoPlay)}
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                    title={
                      previewAutoPlay
                        ? "Arrêter le carrousel"
                        : "Démarrer le carrousel"
                    }
                  >
                    {previewAutoPlay ? "⏸️" : "▶️"}
                  </button>
                  <button
                    onClick={closeProjectModal}
                    className="w-10 h-10 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                  >
                    <FaTimes className="dark:text-gray-300" />
                  </button>
                </div>
              </div>

              {/* Contenu du modal */}
              <div className="p-6">
                {/* Carrousel de prévisualisation */}
                <div className="mb-8">
                  <div className="relative h-80 rounded-xl overflow-hidden">
                    <img
                      src={
                        projectModal.project.previewImages[activePreviewIndex]
                      }
                      alt={`Preview ${activePreviewIndex + 1}`}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {projectModal.project.previewImages.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            setActivePreviewIndex(index);
                            setPreviewAutoPlay(false);
                          }}
                          className={`w-3 h-3 rounded-full transition-all ${
                            index === activePreviewIndex
                              ? "bg-white w-8"
                              : "bg-white/50 hover:bg-white/80"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between mt-4">
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {activePreviewIndex + 1} /{" "}
                      {projectModal.project.previewImages.length}
                    </span>
                    <div className="flex space-x-2">
                      {projectModal.project.previewImages
                        .slice(0, 3)
                        .map((img, index) => (
                          <button
                            key={index}
                            onClick={() => setActivePreviewIndex(index)}
                            className={`w-16 h-12 rounded overflow-hidden border-2 transition-all ${
                              index === activePreviewIndex
                                ? "border-blue-500 dark:border-blue-400"
                                : "border-transparent hover:border-gray-300 dark:hover:border-slate-600"
                            }`}
                          >
                            <img
                              src={img}
                              alt={`Thumb ${index}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ))}
                    </div>
                  </div>
                </div>

                {/* Grille de contenu */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Colonne principale */}
                  <div className="lg:col-span-2 space-y-8">
                    {/* Description */}
                    <div>
                      <h4 className="text-xl font-semibold mb-4 dark:text-white flex items-center">
                        <FaCode className="mr-2 text-blue-500" />
                        Description détaillée
                      </h4>
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        {projectModal.project.fullDescription}
                      </p>
                    </div>

                    {/* Fonctionnalités */}
                    <div>
                      <h4 className="text-xl font-semibold mb-4 dark:text-white flex items-center">
                        <FaStar className="mr-2 text-blue-500" />
                        Fonctionnalités principales
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {projectModal.project.features.map((feature, index) => (
                          <div
                            key={index}
                            className="flex items-start space-x-3 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                          >
                            <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <div className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full"></div>
                            </div>
                            <span className="dark:text-gray-300">
                              {feature}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Colonne latérale */}
                  <div className="space-y-8">
                    {/* Technologies */}
                    <div>
                      <h4 className="text-xl font-semibold mb-4 dark:text-white flex items-center">
                        <FaTools className="mr-2 text-blue-500" />
                        Technologies utilisées
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {projectModal.project.technologies.map(
                          (tech, index) => (
                            <span
                              key={index}
                              className="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-slate-700 dark:to-slate-800 text-gray-800 dark:text-gray-300 rounded-lg font-medium hover:scale-105 transition-transform"
                            >
                              {tech}
                            </span>
                          ),
                        )}
                      </div>
                    </div>

                    {/* Statistiques */}
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-5">
                      <h4 className="font-semibold mb-4 dark:text-white">
                        Statistiques
                      </h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">
                            Note
                          </span>
                          <span className="font-bold text-blue-600 dark:text-blue-400">
                            {projectModal.project.rating}/5
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">
                            Téléchargements
                          </span>
                          <span className="font-bold text-blue-600 dark:text-blue-400">
                            {projectModal.project.downloads}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">
                            Année
                          </span>
                          <span className="font-bold text-blue-600 dark:text-blue-400">
                            {projectModal.project.year}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">
                            Type
                          </span>
                          <span className="font-bold text-blue-600 dark:text-blue-400">
                            {projectModal.project.projectType}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3">
                      <a
                        href={projectModal.project.demo}
                        className="w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg transition-all flex items-center justify-center"
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={closeProjectModal}
                      >
                        <FaExternalLinkAlt className="mr-2" />
                        Visiter l'application
                      </a>
                      <a
                        href={projectModal.project.github}
                        className="w-full py-3 bg-gray-100 dark:bg-slate-700 text-gray-800 dark:text-gray-300 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors flex items-center justify-center"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaGithub className="mr-2" />
                        Voir le code source
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </section>
    );
  };

  // 🎯 COMPOSANT HEADER (inchangé)
  const Header = () => (
    <header className="fixed w-full z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm shadow-md py-3 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <button
            onClick={() => scrollToSection("home")}
            className="flex items-center space-x-2"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
              <span className="text-white font-bold">EH</span>
            </div>
            <div className="text-xl font-bold text-blue-600 dark:text-blue-400">
              Portfolio
            </div>
          </button>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className={`px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors ${
                  activeSection === item.id
                    ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-slate-800"
                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"
                }`}
              >
                <span className="text-sm">{item.icon}</span>
                <span className="font-medium">{item.label}</span>
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {/* Bouton CV */}
            <button
              onClick={() => setShowCVModal(true)}
              className="hidden md:inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-medium transition-colors"
            >
              <FaDownload className="mr-2" />
              Mon CV
            </button>
            {/* Menu Mobile */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden w-10 h-10 rounded-lg bg-gray-100 dark:bg-slate-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Menu mobile"
            >
              {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Menu Mobile */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700">
            <div className="flex flex-col space-y-1 p-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeSection === item.id
                      ? "text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-slate-700"
                      : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700"
                  }`}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span className="font-medium flex-1 text-left">
                    {item.label}
                  </span>
                </button>
              ))}
              <button
                onClick={() => setShowCVModal(true)}
                className="flex items-center justify-center space-x-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium transition-colors"
              >
                <FaDownload />
                <span>Mon CV</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );

  // 🎯 COMPOSANT HERO (inchangé)
  const Hero = () => (
    <section
      id="home"
      className="min-h-screen flex items-center pt-16 pb-12 bg-gradient-to-br from-gray-50 to-white dark:from-slate-900 dark:to-slate-800 transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm mb-4">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Étudiant en Développement Web
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4 dark:text-white">
              Bonjour, je suis{" "}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Ezechiel HOUNKPE
              </span>
            </h1>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-4 text-gray-600 dark:text-gray-300">
              <span className="inline-flex items-center">
                <FaCode className="mr-3 text-blue-500" />
                Étudiant Développeur Full Stack
              </span>
            </h2>

            <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-xl text-lg">
              Passionné par le développement web et la création d'outils
              pratiques. J'ai développé plusieurs applications web utiles qui
              sont disponibles dans ma boutique DevTools Pro.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-10">
              <button
                onClick={() => setShowCVModal(true)}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-xl font-bold hover:shadow-xl transition-all duration-300 flex items-center justify-center"
              >
                <FaDownload className="mr-3" />
                Télécharger CV
              </button>

              <button
                onClick={() => scrollToSection("projects")}
                className="px-8 py-4 border-2 border-gray-300 dark:border-slate-600 rounded-xl font-bold hover:bg-gray-100 dark:hover:bg-slate-800 transition-all duration-300 flex items-center justify-center dark:text-gray-300"
              >
                Explorer mes projets
                <FaArrowRight className="ml-3" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-6 mb-8">
              {[
                {
                  value: `${projects.length}`,
                  label: "Projets Live",
                  icon: "🚀",
                },
                { value: "8+", label: "Technologies", icon: "💻" },
                { value: "100%", label: "Fonctionnels", icon: "✅" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-shadow"
                >
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-gray-600 dark:text-gray-400 text-sm">
                Stack principale :
              </span>
              <div className="flex space-x-2">
                {technologies.slice(0, 7).map((tech, index) => (
                  <div
                    key={index}
                    className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center hover:scale-110 transition-transform"
                    title={tech.name}
                  >
                    <div className={`text-xl ${tech.color}`}>{tech.icon}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 flex justify-center">
            <div className="relative">
              <div className="relative w-72 h-72 md:w-80 md:h-80 rounded-full overflow-hidden border-8 border-white dark:border-slate-800 shadow-2xl">
                <img
                  src="/profile.jpeg"
                  alt="Ezechiel"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute -bottom-4 -right-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-xl font-bold shadow-lg">
                {projects.length} projets live
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // 🎯 COMPOSANT SKILLS (inchangé)
  const Skills = () => (
    <section
      id="skills"
      className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Mes compétences
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            Technologies et outils que j'utilise pour développer mes projets
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="text-2xl font-semibold mb-6 dark:text-white">
              Compétences techniques
            </h3>

            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-slate-700 flex items-center justify-center">
                        <div className={skill.textColor}>{skill.icon}</div>
                      </div>
                      <div className="font-medium dark:text-white text-lg">
                        {skill.name}
                      </div>
                    </div>
                    <div className="font-bold text-blue-600 dark:text-blue-400 text-xl">
                      {skill.level}%
                    </div>
                  </div>

                  <div className="h-3 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${skill.gradientColor} rounded-full`}
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-semibold mb-6 dark:text-white">
              Technologies maîtrisées
            </h3>

            <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-4 gap-4">
              {technologies.map((tech, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-700 rounded-xl p-5 flex flex-col items-center justify-center border border-gray-200 dark:border-slate-600 hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  <div className={`text-4xl mb-3 ${tech.color}`}>
                    {tech.icon}
                  </div>
                  <div className="text-sm font-semibold dark:text-white text-center">
                    {tech.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // 🎯 COMPOSANT ABOUT (simplifié)
  const About = () => (
    <section
      id="about"
      className="py-16 bg-white dark:bg-slate-900 transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            À propos de moi
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
            Étudiant passionné par le développement d'outils web pratiques
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <div className="lg:w-2/5">
            <div className="w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full overflow-hidden border-8 border-gray-200 dark:border-slate-600 shadow-2xl mx-auto">
              <img
                src="/profile.jpeg"
                alt="Ezechiel"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:w-3/5">
            <h3 className="text-3xl font-bold mb-6 dark:text-white">
              Mon parcours étudiant
            </h3>

            <div className="mb-8">
              <p className="text-gray-700 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                En tant qu'étudiant autodidacte en développement web, je me suis
                concentré sur la création d'outils web utiles et accessibles.
                Mes projets sont conçus pour résoudre des problèmes concrets et
                améliorer la productivité des utilisateurs.
              </p>

              <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
                Chaque application de ma boutique a été développée avec soin, en
                privilégiant l'expérience utilisateur et la performance.
              </p>
            </div>

            <div className="mb-10">
              <h4 className="text-2xl font-semibold mb-6 dark:text-white flex items-center">
                <FaBriefcase className="mr-3 text-blue-500" />
                Mon approche
              </h4>

              <div className="space-y-6">
                {experiences.map((exp, index) => (
                  <div
                    key={index}
                    className="bg-gradient-to-r from-gray-50 to-white dark:from-slate-800 dark:to-slate-700 rounded-2xl p-6 border border-gray-200 dark:border-slate-700 hover:shadow-xl transition-shadow"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                      <div>
                        <div className="font-bold dark:text-white text-xl">
                          {exp.role}
                        </div>
                        <div className="text-blue-600 dark:text-blue-400 text-lg">
                          {exp.company}
                        </div>
                      </div>
                      <div className="mt-2 sm:mt-0 px-3 py-1.5 bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold">
                        {exp.year}
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 mb-4">
                      {exp.description}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-4 py-2 bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-300 rounded-lg font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => setShowCVModal(true)}
                className="px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-slate-800 dark:to-slate-700 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-slate-600 transition-all duration-300 flex items-center dark:text-gray-300"
              >
                <FaDownload className="mr-2" />
                Télécharger CV
              </button>

              <button
                onClick={() => scrollToSection("projects")}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-bold hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                Explorer mes outils
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  // 🎯 COMPOSANT CONTACT (inchangé)
  const Contact = () => {
    const [formData, setFormData] = useState({
      name: "",
      email: "",
      subject: "",
      message: "",
    });

    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
    };

    return (
      <section
        id="contact"
        className="py-16 bg-gradient-to-b from-gray-50 to-white dark:from-slate-800 dark:to-slate-900 transition-colors duration-300"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Contactez-moi
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
              Pour discuter de projets ou d'opportunités de collaboration
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-6 dark:text-white">
                Informations de contact
              </h3>

              <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
                Vous avez une question sur un de mes outils ? Une idée de projet
                ? N'hésitez pas à me contacter !
              </p>

              <div className="space-y-4 mb-8">
                <div className="bg-white dark:bg-slate-700 rounded-2xl p-6 border border-gray-200 dark:border-slate-600 hover:shadow-xl transition-shadow">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/30 flex items-center justify-center">
                      <FaEnvelope className="text-blue-600 dark:text-blue-300 text-xl" />
                    </div>
                    <div>
                      <div className="font-bold dark:text-white text-lg">
                        Email
                      </div>
                      <div className="text-gray-600 dark:text-gray-300">
                        ezechielben06@gmail.com
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-4 dark:text-white text-xl">
                  Me suivre
                </h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="w-12 h-12 rounded-xl bg-white dark:bg-slate-700 flex items-center justify-center hover:shadow-xl hover:-translate-y-1 transition-all"
                      aria-label={social.label}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="text-gray-700 dark:text-gray-300 text-xl">
                        {social.icon}
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <form
                onSubmit={handleContactSubmit}
                className="bg-white dark:bg-slate-700 rounded-2xl p-8 border border-gray-200 dark:border-slate-600"
              >
                {formStatus.message && (
                  <div
                    className={`mb-6 p-4 rounded-xl ${
                      formStatus.type === "success"
                        ? "bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/30 dark:to-green-800/30 text-green-700 dark:text-green-300"
                        : "bg-gradient-to-r from-red-50 to-red-100 dark:from-red-900/30 dark:to-red-800/30 text-red-700 dark:text-red-300"
                    }`}
                  >
                    {formStatus.message}
                  </div>
                )}

                <div className="mb-6">
                  <label
                    htmlFor="name"
                    className="block text-gray-700 dark:text-gray-300 font-semibold mb-3 text-lg"
                  >
                    Votre nom
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-5 py-3 bg-gray-50 dark:bg-slate-600 border border-gray-300 dark:border-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white text-lg"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 dark:text-gray-300 font-semibold mb-3 text-lg"
                  >
                    Adresse email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-5 py-3 bg-gray-50 dark:bg-slate-600 border border-gray-300 dark:border-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white text-lg"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="subject"
                    className="block text-gray-700 dark:text-gray-300 font-semibold mb-3 text-lg"
                  >
                    Sujet
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-5 py-3 bg-gray-50 dark:bg-slate-600 border border-gray-300 dark:border-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white text-lg"
                    required
                  />
                </div>

                <div className="mb-8">
                  <label
                    htmlFor="message"
                    className="block text-gray-700 dark:text-gray-300 font-semibold mb-3 text-lg"
                  >
                    Votre message
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-5 py-3 bg-gray-50 dark:bg-slate-600 border border-gray-300 dark:border-slate-500 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white text-lg resize-none"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={formStatus.type === "loading"}
                  className="w-full py-4 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-bold text-lg hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50"
                >
                  {formStatus.type === "loading"
                    ? "Envoi en cours..."
                    : "Envoyer le message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  };

  // 🎯 COMPOSANT FOOTER AMÉLIORÉ - Design Premium
  const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
      exploration: [
        {
          name: "Accueil",
          href: "#home",
          icon: <FaCode className="w-4 h-4" />,
        },
        {
          name: "À propos",
          href: "#about",
          icon: <FaGraduationCap className="w-4 h-4" />,
        },
        {
          name: "Certifications",
          href: "#certifications",
          icon: <FaStar className="w-4 h-4" />,
        },
        {
          name: "Compétences",
          href: "#skills",
          icon: <FaTools className="w-4 h-4" />,
        },
        {
          name: "Projets",
          href: "#projects",
          icon: <FaBriefcase className="w-4 h-4" />,
        },
        {
          name: "Contact",
          href: "#contact",
          icon: <FaEnvelope className="w-4 h-4" />,
        },
      ],
      projets: [
        { name: "Form-Builder Pro", href: "#projects", icon: "📝" },
        { name: "Django Blog API", href: "#projects", icon: "🔧" },
        { name: "E-commerce Backend", href: "#projects", icon: "🛍️" },
        { name: "Facebook Clone", href: "#projects", icon: "👥" },
        { name: "CV-Builder Pro", href: "#projects", icon: "📄" },
        { name: "Tous les projets", href: "#projects", icon: "🚀" },
      ],
      ressources: [
        {
          name: "Télécharger CV",
          href: "#",
          icon: <FaDownload className="w-4 h-4" />,
          onClick: () => setShowCVModal(true),
        },
        { name: "Boutique d'outils", href: "/utility-tools", icon: "🛠️" },
        { name: "Blog technique", href: "#", icon: "📝", disabled: true },
        { name: "Newsletter", href: "#", icon: "📧", disabled: true },
      ],
    };

    return (
      <footer className="relative bg-gradient-to-b from-slate-900 to-slate-950 dark:from-slate-950 dark:to-black text-white pt-16 pb-8 transition-colors duration-300 overflow-hidden">
        {/* Éléments décoratifs - Cercles flous */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full filter blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-br from-blue-600/5 to-purple-600/5"></div>

        <div className="container mx-auto px-4 relative z-10">
          {/* Grille principale du footer */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 mb-12">
            {/* Colonne 1 - Branding & Bio (plus large) */}
            <div className="lg:col-span-4 space-y-6">
              {/* Logo et nom */}
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                  <span className="text-white font-bold text-xl">EH</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Ezechiel HOUNKPE
                  </h3>
                  <p className="text-sm text-gray-400">
                    Développeur Full Stack & Créateur d'outils
                  </p>
                </div>
              </div>

              {/* Bio améliorée */}
              <div className="space-y-4">
                <p className="text-gray-300 leading-relaxed">
                  Passionné par le développement web et la création
                  d'applications innovantes. Je conçois des solutions modernes,
                  performantes et accessibles pour résoudre des problèmes
                  concrets.
                </p>

                {/* Badges de spécialités */}
                <div className="flex flex-wrap gap-2">
                  <span className="px-3 py-1.5 bg-blue-500/10 text-blue-400 rounded-lg text-sm border border-blue-500/20">
                    #React
                  </span>
                  <span className="px-3 py-1.5 bg-purple-500/10 text-purple-400 rounded-lg text-sm border border-purple-500/20">
                    #Python
                  </span>
                  <span className="px-3 py-1.5 bg-green-500/10 text-green-400 rounded-lg text-sm border border-green-500/20">
                    #Django
                  </span>
                  <span className="px-3 py-1.5 bg-yellow-500/10 text-yellow-400 rounded-lg text-sm border border-yellow-500/20">
                    #JavaScript
                  </span>
                  <span className="px-3 py-1.5 bg-pink-500/10 text-pink-400 rounded-lg text-sm border border-pink-500/20">
                    #FullStack
                  </span>
                </div>
              </div>

              {/* Statistiques améliorées */}
              <div className="grid grid-cols-2 gap-4 pt-2">
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-blue-500/30 transition-all group">
                  <div className="text-2xl font-bold text-blue-400 group-hover:scale-110 transition-transform inline-block">
                    {projects.length}+
                  </div>
                  <div className="text-sm text-gray-400">Projets réalisés</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Applications live
                  </div>
                </div>
                <div className="bg-white/5 backdrop-blur-sm rounded-xl p-4 border border-white/10 hover:border-purple-500/30 transition-all group">
                  <div className="text-2xl font-bold text-purple-400 group-hover:scale-110 transition-transform inline-block">
                    15+
                  </div>
                  <div className="text-sm text-gray-400">Technologies</div>
                  <div className="text-xs text-gray-500 mt-1">Maîtrisées</div>
                </div>
              </div>

              {/* Réseaux sociaux améliorés */}
              <div>
                <h4 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">
                  Suivez-moi
                </h4>
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="group relative"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></div>
                      <div className="relative w-11 h-11 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center group-hover:border-white/20 group-hover:scale-110 transition-all duration-300">
                        <div className="text-gray-300 group-hover:text-white text-lg group-hover:scale-110 transition-all">
                          {social.icon}
                        </div>
                      </div>
                    </a>
                  ))}
                  {/* Bouton Email supplémentaire */}
                  <a
                    href="mailto:ezechielben06@gmail.com"
                    className="group relative"
                    aria-label="Email"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md"></div>
                    <div className="relative w-11 h-11 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 flex items-center justify-center group-hover:border-white/20 group-hover:scale-110 transition-all duration-300">
                      <FaEnvelope className="text-gray-300 group-hover:text-white text-lg group-hover:scale-110 transition-all" />
                    </div>
                  </a>
                </div>
              </div>
            </div>

            {/* Colonne 2 - Liens rapides */}
            <div className="lg:col-span-2">
              <h4 className="text-lg font-bold text-white mb-5 flex items-center">
                <div className="w-1 h-5 bg-gradient-to-b from-blue-500 to-purple-600 rounded-full mr-3"></div>
                Exploration
              </h4>
              <ul className="space-y-3">
                {footerLinks.exploration.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(link.href.replace("#", ""));
                      }}
                      className="flex items-center text-gray-400 hover:text-white transition-colors group"
                    >
                      <span className="mr-3 text-blue-400/70 group-hover:text-blue-400 group-hover:translate-x-1 transition-all">
                        {link.icon}
                      </span>
                      <span className="group-hover:translate-x-1 transition-transform">
                        {link.name}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Colonne 3 - Projets populaires */}
            <div className="lg:col-span-3">
              <h4 className="text-lg font-bold text-white mb-5 flex items-center">
                <div className="w-1 h-5 bg-gradient-to-b from-purple-500 to-pink-600 rounded-full mr-3"></div>
                Projets à la une
              </h4>
              <ul className="space-y-3">
                {footerLinks.projets.map((project, index) => (
                  <li key={index}>
                    <a
                      href={project.href}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection("projects");
                      }}
                      className="flex items-center text-gray-400 hover:text-white transition-colors group"
                    >
                      <span className="mr-3 w-6 text-center group-hover:scale-110 transition-transform">
                        {project.icon}
                      </span>
                      <span className="group-hover:translate-x-1 transition-transform flex-1">
                        {project.name}
                      </span>
                      {project.name.includes("Blog") && (
                        <span className="ml-2 px-2 py-0.5 bg-green-500/10 text-green-400 rounded text-xs border border-green-500/20">
                          API
                        </span>
                      )}
                      {project.name.includes("E-commerce") && (
                        <span className="ml-2 px-2 py-0.5 bg-purple-500/10 text-purple-400 rounded text-xs border border-purple-500/20">
                          Django
                        </span>
                      )}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Colonne 4 - Contact & Newsletter */}
            <div className="lg:col-span-3">
              <h4 className="text-lg font-bold text-white mb-5 flex items-center">
                <div className="w-1 h-5 bg-gradient-to-b from-green-500 to-teal-600 rounded-full mr-3"></div>
                Restons connectés
              </h4>

              {/* Contact info avec design premium */}
              <div className="space-y-4 mb-6">
                <div className="flex items-start space-x-3 group">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-500/20 transition-colors">
                    <FaEnvelope className="text-blue-400 w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <a
                      href="mailto:ezechielben06@gmail.com"
                      className="text-gray-300 hover:text-white transition-colors break-all"
                    >
                      ezechielben06@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-3 group">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center flex-shrink-0 group-hover:bg-purple-500/20 transition-colors">
                    <FaMapMarkerAlt className="text-purple-400 w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Localisation</p>
                    <p className="text-gray-300">Cotonou, Bénin</p>
                  </div>
                </div>
              </div>

              {/* Bouton CV Premium */}
              <button
                onClick={() => setShowCVModal(true)}
                className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 p-[1px] hover:shadow-xl hover:shadow-blue-500/20 transition-all duration-300"
              >
                <div className="relative flex items-center justify-center space-x-3 rounded-xl bg-slate-900 px-6 py-4 transition-all duration-300 group-hover:bg-transparent">
                  <FaDownload className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                  <span className="font-semibold text-white">
                    Télécharger mon CV
                  </span>
                  <FaArrowRight className="w-4 h-4 text-white group-hover:translate-x-1 transition-transform" />
                </div>
              </button>

              {/* Disponibilité badge */}
              <div className="mt-6 flex items-center justify-between p-4 bg-gradient-to-r from-green-500/5 to-emerald-500/5 rounded-xl border border-green-500/10">
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div className="absolute top-0 left-0 w-3 h-3 bg-green-500 rounded-full animate-ping"></div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-green-400">
                      Disponible pour
                    </p>
                    <p className="text-xs text-gray-400">
                      Freelance & Collaborations
                    </p>
                  </div>
                </div>
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection("contact");
                  }}
                  className="text-xs text-blue-400 hover:text-blue-300 underline"
                >
                  Me contacter
                </a>
              </div>
            </div>
          </div>

          {/* Séparateur décoratif */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-slate-900 text-gray-400 text-sm">
                <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-semibold">
                  Code & Créativité
                </span>
              </span>
            </div>
          </div>

          {/* Barre du bas avec copyright et mentions légales */}
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <p>
                © {currentYear} Ezechiel HOUNKPE. Tous droits réservés. Cotonou
                BENIN
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors text-xs"
              >
                Mentions légales
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors text-xs"
              >
                Politique de confidentialité
              </a>
              <div className="flex items-center space-x-2">
                <span className="text-xs">Version</span>
                <span className="px-2 py-1 bg-white/5 rounded-md text-xs font-mono text-blue-400">
                  v2.0.0
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  };
  // 🎯 COMPOSANT CV MODAL - Design Élégant
  const CVModal = () => {
    const handlePrintCV = () => {
      setIsPrintMode(true);
      setTimeout(() => {
        window.print();
        setIsPrintMode(false);
      }, 100);
    };

    const handleDownloadPDF = () => {};

    const cvCertifications = [
      {
        title: "JavaScript Moderne ES6+",
        issuer: "FreeCodeCamp",
        date: "2023",
        description:
          "Formation approfondie sur les nouvelles fonctionnalités JavaScript",
        skills: ["ES6+", "Async/Await", "Modules", "Design Patterns"],
      },
      {
        title: "Git & GitHub Professionnel",
        issuer: "LinkedIn Learning",
        date: "2022",
        description:
          "Gestion de version avancée, workflows collaboratifs et intégration continue.",
        skills: ["Git", "GitHub", "CI/CD", "Branches", "Collaboration"],
      },
    ];

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
        <div
          className="relative bg-white dark:bg-slate-800 rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl print-mode scroll-smooth"
          // ref={cvRef}
          onClick={(e) => e.stopPropagation()}
        >
          {/* En-tête du modal - Design Premium */}
          <div className="sticky top-0 bg-white dark:bg-slate-800 p-6 border-b border-gray-200 dark:border-slate-700 flex justify-between items-center z-10 no-print backdrop-blur-sm bg-white/95 dark:bg-slate-800/95">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center">
                <FaGraduationCap className="text-white text-lg" />
              </div>
              <div>
                <h3 className="text-2xl font-bold dark:text-white">
                  Mon CV Professionnel
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Développeur Full Stack
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={handlePrintCV}
                className="px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg hover:scale-105 transition-all flex items-center shadow-md"
                title="Imprimer le CV"
              >
                <FaPrint className="mr-2" />
                <span className="hidden sm:inline">Imprimer</span>
              </button>
              <button
                onClick={handleDownloadPDF}
                className="px-4 py-2.5 bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-100 dark:hover:bg-slate-600 transition-all flex items-center border border-gray-200 dark:border-slate-600 shadow-sm"
                title="Télécharger en PDF"
              >
                <FaDownload className="mr-2" />
                <span className="hidden sm:inline">PDF</span>
              </button>
              <button
                onClick={() => setShowCVModal(false)}
                className="w-10 h-10 rounded-xl bg-gray-100 dark:bg-slate-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-slate-600 transition-all hover:scale-105"
              >
                <FaTimes className="dark:text-gray-300" />
              </button>
            </div>
          </div>

          {/* Contenu du CV - Design Élégant */}
          <div ref={cvRef} className="p-6 md:p-8 print-break-avoid">
            {/* En-tête du CV - Design Premium */}
            <div className="mb-10 print-break-avoid">
              <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 mb-8">
                {/* Photo de profil avec effet premium */}
                <div className="relative">
                  <div className="w-36 h-36 rounded-2xl overflow-hidden border-4 border-white dark:border-slate-700 shadow-2xl">
                    <img
                      src="/profile.jpeg"
                      alt="Ezechiel HOUNKPE"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="absolute -bottom-3 -right-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-xl font-bold shadow-lg text-sm">
                    {projects.length} projets
                  </div>
                </div>

                {/* Informations personnelles */}
                <div className="flex-1 text-center lg:text-left">
                  <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm mb-4">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                    Étudiant Développeur Full Stack
                  </div>

                  <h1 className="text-4xl md:text-5xl font-bold mb-3">
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                      Ezechiel HOUNKPE
                    </span>
                  </h1>

                  <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg max-w-2xl leading-relaxed">
                    Passionné par la création d'applications web modernes et
                    performantes. Spécialisé dans le développement d'outils
                    pratiques avec React, Node.js et les technologies web
                    modernes.
                  </p>

                  {/* Contacts élégants */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-2">
                    <div className="flex items-center justify-center lg:justify-start space-x-3 p-3 bg-gray-50 dark:bg-slate-700/50 rounded-xl">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/30 flex items-center justify-center">
                        <FaEnvelope className="text-blue-600 dark:text-blue-300" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Email
                        </div>
                        <div className="font-medium dark:text-white">
                          ezechielben06@gmail.com
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-center lg:justify-start space-x-3 p-3 bg-gray-50 dark:bg-slate-700/50 rounded-xl">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-purple-100 to-purple-50 dark:from-purple-900/30 dark:to-purple-800/30 flex items-center justify-center">
                        <FaPhoneAlt className="text-purple-600 dark:text-purple-300" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Téléphone
                        </div>
                        <div className="font-medium dark:text-white">
                          +229 65 43 35 36
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-center lg:justify-start space-x-3 p-3 bg-gray-50 dark:bg-slate-700/50 rounded-xl">
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-pink-100 to-pink-50 dark:from-pink-900/30 dark:to-pink-800/30 flex items-center justify-center">
                        <FaMapMarkerAlt className="text-pink-600 dark:text-pink-300" />
                      </div>
                      <div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Localisation
                        </div>
                        <div className="font-medium dark:text-white">
                          Cotonou | Bénin
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Grille de contenu du CV - Design Moderne */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Colonne principale */}
              <div className="lg:col-span-2 space-y-8">
                {/* Section Expérience - Design Amélioré */}
                <div className="print-break-avoid">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center mr-3">
                      <FaBriefcase className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold dark:text-white">
                      Expérience Professionnelle
                    </h3>
                  </div>

                  <div className="space-y-6">
                    {experiences.map((exp, index) => (
                      <div
                        key={index}
                        className="relative bg-gradient-to-br from-white to-gray-50 dark:from-slate-700 dark:to-slate-800 rounded-2xl p-6 border border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300 group"
                      >
                        {/* Timeline dot */}
                        <div className="absolute -left-3 top-6 w-6 h-6 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 border-4 border-white dark:border-slate-800"></div>

                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                          <div>
                            <h4 className="text-xl font-bold dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                              {exp.role}
                            </h4>
                            <div className="flex items-center mt-2 space-x-3">
                              <span className="text-blue-600 dark:text-blue-400 font-medium">
                                {exp.company}
                              </span>
                              <span className="px-3 py-1 bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/30 text-blue-700 dark:text-blue-300 rounded-full text-sm font-semibold">
                                {exp.year}
                              </span>
                            </div>
                          </div>
                        </div>

                        <p className="text-gray-600 dark:text-gray-300 mb-5">
                          {exp.description}
                        </p>

                        <div>
                          <h5 className="font-semibold mb-3 dark:text-gray-300 flex items-center">
                            <div className="w-6 h-6 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mr-2">
                              <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                            </div>
                            Réalisations clés :
                          </h5>
                          <ul className="space-y-2">
                            {exp.achievements.map((achievement, idx) => (
                              <li key={idx} className="flex items-start">
                                <div className="w-6 h-6 flex items-center justify-center mr-3 mt-0.5">
                                  <div className="w-1.5 h-1.5 rounded-full bg-blue-400"></div>
                                </div>
                                <span className="text-gray-600 dark:text-gray-400">
                                  {achievement}
                                </span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Technologies */}
                        <div className="mt-6 pt-6 border-t border-gray-100 dark:border-slate-700">
                          <div className="flex flex-wrap gap-2">
                            {exp.technologies.map((tech, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1.5 bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-lg text-sm font-medium border border-gray-200 dark:border-slate-600"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section Projets - Design Amélioré */}
                <div className="print-break-avoid">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-purple-500 to-pink-600 flex items-center justify-center mr-3">
                      <FaCode className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold dark:text-white">
                      Projets Significatifs
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {projects.slice(0, 5).map((project) => (
                      <div
                        key={project.id}
                        className="group bg-gradient-to-br from-white to-gray-50 dark:from-slate-700 dark:to-slate-800 rounded-xl p-5 border border-gray-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-500 transition-all duration-300 hover:shadow-lg"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-bold text-lg dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                              {project.title}
                            </h4>
                            <div className="flex items-center mt-2 space-x-3">
                              <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                                <FaStar className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                                <span>{project.rating}</span>
                              </div>
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                • {project.downloads} téléchargements
                              </span>
                            </div>
                          </div>
                          <span className="px-3 py-1 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-800/30 text-purple-700 dark:text-purple-300 rounded-full text-sm font-semibold">
                            {project.year}
                          </span>
                        </div>

                        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                          {project.description}
                        </p>

                        <div className="flex flex-wrap gap-2">
                          {project.tags.slice(0, 4).map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-slate-600 dark:to-slate-800 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Colonne latérale */}
              <div className="space-y-8">
                {/* Section Compétences Techniques - Design Amélioré */}
                <div className="print-break-avoid">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 flex items-center justify-center mr-3">
                      <FaTools className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold dark:text-white">
                      Compétences Techniques
                    </h3>
                  </div>

                  <div className="space-y-5">
                    {skills.slice(0, 6).map((skill) => (
                      <div key={skill.name} className="group">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-3">
                            <div
                              className={`w-8 h-8 rounded-lg flex items-center justify-center ${skill.textColor} bg-gradient-to-r from-gray-100 to-gray-50 dark:from-slate-700 dark:to-slate-800`}
                            >
                              {skill.icon}
                            </div>
                            <span className="dark:text-gray-300 font-medium">
                              {skill.name}
                            </span>
                          </div>
                          <span className="font-bold text-blue-600 dark:text-blue-400">
                            {skill.level}%
                          </span>
                        </div>

                        <div className="h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${skill.gradientColor} rounded-full transition-all duration-1000 group-hover:shadow-lg`}
                            style={{ width: `${skill.level}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section Technologies - Design Amélioré */}
                <div className="print-break-avoid">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-amber-500 to-orange-600 flex items-center justify-center mr-3">
                      <FaCode className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold dark:text-white">
                      Technologies
                    </h3>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {technologies.slice(0, 9).map((tech) => (
                      <div
                        key={tech.name}
                        className="group flex flex-col items-center p-3 bg-gradient-to-br from-white to-gray-50 dark:from-slate-700 dark:to-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300 hover:scale-105"
                      >
                        <div
                          className={`text-2xl ${tech.color} mb-2 group-hover:scale-110 transition-transform`}
                        >
                          {tech.icon}
                        </div>
                        <span className="text-xs font-medium dark:text-gray-300 text-center">
                          {tech.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section Certifications - NOUVELLE SECTION */}
                <div className="print-break-avoid">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center mr-3">
                      <FaGraduationCap className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold dark:text-white">
                      Certifications
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {cvCertifications.map((cert, index) => (
                      <div
                        key={index}
                        className="group bg-gradient-to-br from-white to-gray-50 dark:from-slate-700 dark:to-slate-800 rounded-xl p-4 border border-gray-200 dark:border-slate-700 hover:border-cyan-300 dark:hover:border-cyan-500 transition-all duration-300"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-bold text-sm dark:text-white group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                            {cert.title}
                          </h4>
                          <span className="px-2 py-1 bg-gradient-to-r from-cyan-100 to-blue-100 dark:from-cyan-900/30 dark:to-blue-800/30 text-cyan-700 dark:text-cyan-300 rounded text-xs font-semibold">
                            {cert.date}
                          </span>
                        </div>

                        <div className="text-xs text-gray-500 dark:text-gray-400 mb-2">
                          {cert.issuer}
                        </div>

                        <p className="text-gray-600 dark:text-gray-400 text-xs mb-3">
                          {cert.description}
                        </p>

                        <div className="flex flex-wrap gap-1.5">
                          {cert.skills.map((skill, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-slate-600 dark:to-slate-800 text-gray-700 dark:text-gray-300 rounded text-xs"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section Langues - Design Amélioré */}
                <div className="print-break-avoid">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 flex items-center justify-center mr-3">
                      <FaComment className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold dark:text-white">
                      Langues
                    </h3>
                  </div>

                  <div className="space-y-4">
                    {[
                      {
                        language: "Français",
                        level: "Langue maternelle",
                        percentage: 100,
                        color: "from-blue-500 to-blue-600",
                      },
                      {
                        language: "Anglais",
                        level: "Intermédiaire",
                        percentage: 70,
                        color: "from-purple-500 to-purple-600",
                      },
                    ].map((lang, idx) => (
                      <div key={idx} className="group">
                        <div className="flex justify-between items-center mb-2">
                          <span className="dark:text-gray-300 font-medium">
                            {lang.language}
                          </span>
                          <span className="text-sm font-bold text-blue-600 dark:text-blue-400">
                            {lang.level}
                          </span>
                        </div>
                        <div className="h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div
                            className={`h-full bg-gradient-to-r ${lang.color} rounded-full transition-all duration-1000`}
                            style={{ width: `${lang.percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Section Liens - Design Amélioré */}
                <div className="print-break-avoid">
                  <div className="flex items-center mb-6">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-pink-500 to-rose-600 flex items-center justify-center mr-3">
                      <FaExternalLinkAlt className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold dark:text-white">
                      Liens
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {socialLinks.map((social) => (
                      <a
                        key={social.label}
                        href={social.href}
                        className="group flex items-center p-3 bg-gradient-to-br from-white to-gray-50 dark:from-slate-700 dark:to-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 hover:border-pink-300 dark:hover:border-pink-500 transition-all duration-300 hover:scale-102"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-gray-100 to-gray-50 dark:from-slate-600 dark:to-slate-800 flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                          <div className="text-gray-700 dark:text-gray-300 text-lg">
                            {social.icon}
                          </div>
                        </div>
                        <div>
                          <div className="font-medium dark:text-white">
                            {social.label}
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            Profil professionnel
                          </div>
                        </div>
                      </a>
                    ))}

                    <div className="group p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl border border-blue-200 dark:border-blue-700 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300">
                      <div className="flex items-center">
                        <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-100 to-blue-50 dark:from-blue-800/30 dark:to-blue-700/30 flex items-center justify-center mr-3">
                          <span className="text-lg">📦</span>
                        </div>
                        <div>
                          <div className="font-medium dark:text-white">
                            Boutique d'outils
                          </div>
                          <div className="text-xs text-blue-600 dark:text-blue-400">
                            Mes projets live
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pied de page du CV - Design Amélioré */}
          <div className="border-t border-gray-200 dark:border-slate-700 p-6 text-center text-gray-500 dark:text-gray-400 text-sm print-break-avoid">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <p className="font-medium dark:text-gray-300">
                  © {new Date().getFullYear()} Ezechiel HOUNKPE
                </p>
                <p className="text-xs">
                  Tous droits réservés • Portfolio professionnel
                </p>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-xs">
                  <span className="font-medium">Dernière mise à jour : </span>
                  {new Date().toLocaleDateString("fr-FR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </div>
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // 🎯 COMPOSANT CERTIFICATIONS
  const Certifications = () => {
    const [activeFilter, setActiveFilter] = useState("all");

    const certifications = [
      {
        id: 1,
        title: "JavaScript Moderne ES6+",
        issuer: "FreeCodeCamp",
        date: "2023",
        description:
          "Formation complète sur les fonctionnalités modernes de JavaScript et les bonnes pratiques.",
        skills: ["ES6+", "Async/Await", "Modules", "Design Patterns", "OOP"],
        image:
          "https://images.unsplash.com/photo-1627398242454-45a1465c2479?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        credentialUrl: "#",
        category: "frontend",
        duration: "45 heures",
        level: "Intermédiaire",
        badgeColor: "from-yellow-500 to-orange-500",
      },
      {
        id: 2,
        title: "Git & GitHub Professionnel",
        issuer: "LinkedIn Learning",
        date: "2022",
        description:
          "Gestion de version avancée, workflows collaboratifs et intégration continue.",
        skills: ["Git", "GitHub", "CI/CD", "Branches", "Collaboration"],
        image:
          "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        credentialUrl: "#",
        category: "tools",
        duration: "15 heures",
        level: "Débutant",
        badgeColor: "from-orange-500 to-red-500",
      },
    ];

    const filters = [
      { id: "all", label: "Toutes", count: certifications.length },
      {
        id: "frontend",
        label: "Frontend",
        count: certifications.filter((c) => c.category === "frontend").length,
      },
      {
        id: "backend",
        label: "Backend",
        count: certifications.filter((c) => c.category === "backend").length,
      },
      {
        id: "web",
        label: "Full Stack",
        count: certifications.filter((c) => c.category === "web").length,
      },
      {
        id: "tools",
        label: "Outils",
        count: certifications.filter((c) => c.category === "tools").length,
      },
    ];

    const filteredCerts =
      activeFilter === "all"
        ? certifications
        : certifications.filter((cert) => cert.category === activeFilter);

    return (
      <section
        id="certifications"
        className="py-20 bg-gradient-to-b from-white to-gray-50 dark:from-slate-800 dark:to-slate-900 transition-colors duration-300"
      >
        <div className="container mx-auto px-4">
          {/* En-tête de section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm mb-4">
              <FaGraduationCap className="mr-2" />
              Certifications & Formations
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Mes Certifications
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg">
              Diplômes et certifications obtenus pour valider mes compétences en
              développement web
            </p>
          </div>

          {/* Filtres */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {filters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={`px-5 py-2.5 rounded-full transition-all duration-300 flex items-center space-x-2 ${
                  activeFilter === filter.id
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg"
                    : "bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 border border-gray-200 dark:border-slate-700"
                }`}
              >
                <span>{filter.label}</span>
                <span
                  className={`px-2 py-0.5 rounded-full text-xs ${
                    activeFilter === filter.id
                      ? "bg-white/20"
                      : "bg-gray-100 dark:bg-slate-700"
                  }`}
                >
                  {filter.count}
                </span>
              </button>
            ))}
          </div>

          {/* Grille de certifications */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {filteredCerts.map((cert) => (
              <div
                key={cert.id}
                className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-cyan-500 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2"
              >
                {/* En-tête de la certification avec badge */}
                <div className="relative h-48 overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-r ${cert.badgeColor} opacity-10`}
                  ></div>
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    loading="lazy"
                  />
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1 bg-gradient-to-r  from-blue-600 to-purple-600 text-white text-xs font-bold rounded-full shadow-lg">
                      {cert.level}
                    </span>
                  </div>
                  <div className="absolute bottom-4 left-4">
                    <div className="flex items-center space-x-2">
                      <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <FaGraduationCap className="text-white w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-white text-sm font-semibold">
                          Durée
                        </div>
                        <div className="text-white text-xs">
                          {cert.duration}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contenu de la certification */}
                <div className="p-6">
                  <div className="mb-4">
                    <h3 className="text-xl font-bold dark:text-white group-hover:text-blue-600 dark:group-hover:text-cyan-400 transition-colors mb-2">
                      {cert.title}
                    </h3>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center text-gray-600 dark:text-gray-400">
                        <span className="text-sm">Par</span>
                        <span className="ml-2 font-semibold text-blue-600 dark:text-blue-400">
                          {cert.issuer}
                        </span>
                      </div>
                      <span className="px-3 py-1 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-full text-sm">
                        {cert.date}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 dark:text-gray-400 mb-5 line-clamp-3">
                    {cert.description}
                  </p>

                  {/* Compétences */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                      Compétences acquises :
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {cert.skills.map((skill, index) => (
                        <span
                          key={index}
                          className="px-3 py-1.5 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-slate-700 dark:to-slate-800 text-gray-700 dark:text-gray-300 rounded-lg text-xs font-medium hover:scale-105 transition-transform"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center justify-between pt-5 border-t border-gray-100 dark:border-slate-700">
                    <a
                      href={cert.credentialUrl}
                      className="flex items-center text-blue-600 dark:text-cyan-400 font-semibold text-sm hover:underline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaExternalLinkAlt className="w-4 h-4 mr-2" />
                      Voir la certification
                    </a>
                    <div className="flex items-center space-x-2">
                      <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">
                        Validée
                      </span>
                    </div>
                  </div>
                </div>

                {/* Effet de bordure colorée */}
                <div
                  className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${cert.badgeColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
                ></div>
              </div>
            ))}
          </div>

          {/* Statistiques - Design aligné avec le portfolio */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 mb-12 border border-gray-200 dark:border-slate-700 shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl hover:scale-105 transition-transform duration-300">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-2">
                  {certifications.length}+
                </div>
                <div className="text-gray-700 dark:text-gray-300 font-medium">
                  Certifications
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Validées
                </div>
              </div>

              <div className="text-center p-4 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-800/20 rounded-xl hover:scale-105 transition-transform duration-300">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-2">
                  5+
                </div>
                <div className="text-gray-700 dark:text-gray-300 font-medium">
                  Plateformes
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Prestigieuses
                </div>
              </div>

              <div className="text-center p-4 bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/20 dark:to-green-800/20 rounded-xl hover:scale-105 transition-transform duration-300">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 dark:from-emerald-400 dark:to-green-400 bg-clip-text text-transparent mb-2">
                  100%
                </div>
                <div className="text-gray-700 dark:text-gray-300 font-medium">
                  Validées
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Taux de réussite
                </div>
              </div>

              <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-800/20 rounded-xl hover:scale-105 transition-transform duration-300">
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-amber-600 to-orange-600 dark:from-amber-400 dark:to-orange-400 bg-clip-text text-transparent mb-2">
                  500h+
                </div>
                <div className="text-gray-700 dark:text-gray-300 font-medium">
                  Formation
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  Cumulées
                </div>
              </div>
            </div>

            {/* Légende */}
            <div className="mt-6 pt-6 border-t border-gray-100 dark:border-slate-700">
              <div className="flex items-center justify-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                  <span>Frontend</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
                  <span>Backend</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-purple-500 mr-2"></div>
                  <span>Full Stack</span>
                </div>
                <div className="flex items-center">
                  <div className="w-2 h-2 rounded-full bg-amber-500 mr-2"></div>
                  <span>Outils</span>
                </div>
              </div>
            </div>
          </div>
          {/* CTA */}
          <div className="text-center">
            <p className="mt-4 text-gray-500 dark:text-gray-400 text-sm">
              Toutes les certifications sont vérifiables en ligne
            </p>
          </div>
        </div>
      </section>
    );
  };

  // 🎯 COMPOSANT BACK TO TOP
  const BackToTop = () => (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 ${
        isBackToTopVisible
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-4 pointer-events-none"
      }`}
      aria-label="Retour en haut"
    >
      <FaArrowUp />
    </button>
  );

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 transition-colors duration-300">
      <Header />
      <main>
        <Hero />
        <About />
        <Certifications />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
      {showCVModal && <CVModal />}
    </div>
  );
}

export default App;
