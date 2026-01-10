/* eslint-disable no-unused-vars */
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
      tags: ["React", "Tailwind CSS", "Form Validation", "Code Generation", "Drag & Drop"],
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
      technologies: ["React", "JavaScript", "Tailwind CSS", "Local Storage", "React DnD"],
      year: 2024,
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
      technologies: ["JavaScript", "HTML5", "CSS3", "Local Storage", "Service Workers"],
      year: 2024,
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
      technologies: ["React", "jsPDF", "Tailwind CSS", "Context API", "HTML2Canvas"],
      year: 2024,
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
      tags: ["Image Download", "API Integration", "Advanced Search", "High Quality"],
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
      technologies: ["React", "Unsplash API", "Axios", "Tailwind CSS", "React Query"],
      year: 2024,
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
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      previewImages: [
        "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1579869847557-1f67382cc158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      ],
      tags: ["Social Media", "Real-time", "Authentication", "Full Stack", "Responsive"],
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
      technologies: ["React", "Node.js", "Express", "MongoDB", "Socket.io", "Firebase", "Redux"],
      year: 2024,
      status: "Démo",
      projectType: "Réseau Social",
      rating: 4.7,
      downloads: "1.5k",
      color: "from-blue-600 to-blue-800",
      specialBadge: "Nouveau",
    },
  ];

  // Filtrage des projets
  const filteredProjects = useMemo(() => {
    if (projectFilter === "all") return projects;
    if (projectFilter === "featured") return projects.filter(p => p.rating >= 4.5);
    return projects.filter(p => p.category === projectFilter);
  }, [projectFilter]);

  // 🎯 NAVIGATION
  const navItems = [
    { id: "home", label: "Accueil", icon: <FaCode /> },
    { id: "about", label: "À propos", icon: <FaGraduationCap /> },
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
    { icon: <SiNextdotjs />, name: "Next.js", color: "text-gray-800 dark:text-white" },
    { icon: <SiNodedotjs />, name: "Node.js", color: "text-green-500" },
    { icon: <SiExpress />, name: "Express", color: "text-gray-400" },
    { icon: <SiMysql />, name: "MySQL", color: "text-blue-700" },
    { icon: <SiMongodb />, name: "MongoDB", color: "text-green-500" },
    { icon: <SiFirebase />, name: "Firebase", color: "text-yellow-500" },
    { icon: <SiRedux />, name: "Redux", color: "text-purple-500" },
    { icon: <SiGit />, name: "Git", color: "text-orange-600" },
    { icon: <SiFigma />, name: "Figma", color: "text-purple-500" },
  ];

  // 🎯 EXPÉRIENCES
  const experiences = [
    {
      year: "2023 - Présent",
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
      { threshold: 0.3 }
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

  // 🎯 FONCTIONS
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

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
      { id: "featured", label: "Projets vedettes", count: projects.filter(p => p.rating >= 4.5).length },
      { id: "web", label: "Applications Web", count: projects.length },
    ];

    // Effet pour le carrousel automatique
    useEffect(() => {
      if (!previewAutoPlay || !projectModal.isOpen) return;
      
      const interval = setInterval(() => {
        setActivePreviewIndex((prev) => 
          prev < (projectModal.project?.previewImages?.length || 1) - 1 ? prev + 1 : 0
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
              Applications web fonctionnelles que j'ai développées et qui sont disponibles en ligne
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
                <span className={`px-2 py-0.5 rounded-full text-xs ${
                  projectFilter === filter.id 
                    ? "bg-white/20" 
                    : "bg-gray-100 dark:bg-slate-700"
                }`}>
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
                  <div className={`absolute inset-0 bg-gradient-to-r ${project.color} opacity-10`}></div>
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
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${project.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
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
                      <span className="font-semibold">{projectModal.project.rating}</span>
                      <span className="ml-1">({projectModal.project.downloads})</span>
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
                    title={previewAutoPlay ? "Arrêter le carrousel" : "Démarrer le carrousel"}
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
                      src={projectModal.project.previewImages[activePreviewIndex]}
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
                      {activePreviewIndex + 1} / {projectModal.project.previewImages.length}
                    </span>
                    <div className="flex space-x-2">
                      {projectModal.project.previewImages.slice(0, 3).map((img, index) => (
                        <button
                          key={index}
                          onClick={() => setActivePreviewIndex(index)}
                          className={`w-16 h-12 rounded overflow-hidden border-2 transition-all ${
                            index === activePreviewIndex
                              ? "border-blue-500 dark:border-blue-400"
                              : "border-transparent hover:border-gray-300 dark:hover:border-slate-600"
                          }`}
                        >
                          <img src={img} alt={`Thumb ${index}`} className="w-full h-full object-cover" />
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
                            <span className="dark:text-gray-300">{feature}</span>
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
                        {projectModal.project.technologies.map((tech, index) => (
                          <span
                            key={index}
                            className="px-4 py-2 bg-gradient-to-r from-gray-100 to-gray-50 dark:from-slate-700 dark:to-slate-800 text-gray-800 dark:text-gray-300 rounded-lg font-medium hover:scale-105 transition-transform"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Statistiques */}
                    <div className="bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 rounded-xl p-5">
                      <h4 className="font-semibold mb-4 dark:text-white">Statistiques</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Note</span>
                          <span className="font-bold text-blue-600 dark:text-blue-400">
                            {projectModal.project.rating}/5
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Téléchargements</span>
                          <span className="font-bold text-blue-600 dark:text-blue-400">
                            {projectModal.project.downloads}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Année</span>
                          <span className="font-bold text-blue-600 dark:text-blue-400">
                            {projectModal.project.year}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-400">Type</span>
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

            {/* Toggle Mode Sombre */}
            <button
              onClick={toggleDarkMode}
              className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-slate-800 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors"
              aria-label="Changer de thème"
            >
              {isDarkMode ? (
                <FaSun className="text-yellow-500" />
              ) : (
                <FaMoon className="text-gray-600" />
              )}
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
              Passionné par le développement web et la création d'outils pratiques. 
              J'ai développé plusieurs applications web utiles qui sont disponibles dans ma boutique DevTools Pro.
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
                { value: `${projects.length}`, label: "Projets Live", icon: "🚀" },
                { value: "5+", label: "Technologies", icon: "💻" },
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
                {technologies.slice(0, 5).map((tech, index) => (
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
                        <div className={skill.textColor}>
                          {skill.icon}
                        </div>
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
                Chaque application de ma boutique a été développée avec soin,
                en privilégiant l'expérience utilisateur et la performance.
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
                      <div className="font-bold dark:text-white text-lg">Email</div>
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

  // 🎯 COMPOSANT FOOTER
  const Footer = () => (
    <footer className="bg-gradient-to-r from-slate-800 to-slate-900 dark:from-slate-900 dark:to-slate-950 text-white py-12 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-6 md:mb-0">
            <div className="text-2xl font-bold text-blue-400">Ezechiel HOUNKPE</div>
            <p className="mt-2 text-gray-400">
              Étudiant Développeur Web & Créateur d'outils
            </p>
          </div>

          <div className="flex items-center space-x-6">
            <span className="text-gray-400">
              Explorez également :
            </span>
            <a
              href="/utility-tools"
              className="text-blue-400 hover:text-blue-300 transition-colors font-medium hover:underline"
            >
              Ma boutique d'outils
            </a>
          </div>

          <div className="flex space-x-6 mt-6 md:mt-0">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="text-gray-400 hover:text-white transition-colors text-xl"
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-700 dark:border-slate-800 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Ezechiel HOUNKPE - Tous mes projets sont disponibles et fonctionnels
          </p>
          <p className="text-gray-500 text-sm mt-2">
            Développé avec React, Tailwind CSS et passion
          </p>
        </div>
      </div>
    </footer>
  );

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
        <Skills />
        <Projects />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;