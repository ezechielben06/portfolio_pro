/* eslint-disable no-unused-vars */
import { useState, useEffect, useCallback, useMemo, useRef } from "react";
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
  FaTwitter,
  FaInstagram,
  FaRocket,
  FaLightbulb,
  FaChartLine,
  FaCodeBranch,
  FaGraduationCap,
  FaDatabase,
  FaGamepad,
  FaBriefcase,
  FaTools,
  FaStar,
  FaLanguage,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaPrint,
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
  SiPython,
  SiMongodb,
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
  const [projectFilter, setProjectFilter] = useState("all");
  const [loading, setLoading] = useState(true);
  const [formStatus, setFormStatus] = useState({ type: "", message: "" });
  const [projectModal, setProjectModal] = useState({
    isOpen: false,
    project: null,
  });
  const [showCVModal, setShowCVModal] = useState(false);
  const [isPrintMode, setIsPrintMode] = useState(false);

  // 🎯 RÉFÉRENCES
  const observerRef = useRef(null);
  const lastScrollRef = useRef(0);
  const cvRef = useRef(null);

  // 🎯 DONNÉES PERSONNALISÉES
  const navItems = [
    { id: "home", label: "Accueil", icon: <FaRocket /> },
    { id: "about", label: "À propos", icon: <FaGraduationCap /> },
    { id: "skills", label: "Compétences", icon: <FaCodeBranch /> },
    { id: "projects", label: "Projets", icon: <FaLightbulb /> },
    { id: "contact", label: "Contact", icon: <FaEnvelope /> },
  ];

  const projects = [
    {
      id: 1,
      title: "Plateforme de E-learning",
      description:
        "Site web d'apprentissage en ligne avec cours interactifs et suivi de progression.",
      fullDescription:
        "Développement d'une plateforme e-learning complète avec système d'inscription, gestion de cours, quiz interactifs et tableau de bord étudiant.",
      image:
        "https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["PHP", "MySQL", "JavaScript", "Bootstrap"],
      category: "web",
      github: "https://github.com/username/elearning",
      demo: "https://elearning-demo.com",
      features: [
        "Cours interactifs",
        "Quiz en ligne",
        "Suivi progression",
        "Espace étudiant",
      ],
      technologies: ["PHP", "MySQL", "JavaScript", "Bootstrap 5"],
      year: 2024,
    },
    {
      id: 2,
      title: "Application de Gestion de Budget",
      description:
        "Application web pour suivre ses dépenses et économies avec visualisation graphique.",
      fullDescription:
        "Application React avec Node.js backend permettant de suivre ses finances personnelles.",
      image:
        "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["React", "Node.js", "Chart.js", "MongoDB"],
      category: "web",
      github: "https://github.com/username/budgetapp",
      demo: "https://budgetapp.demo",
      features: ["Suivi dépenses", "Graphiques", "Catégories", "Export PDF"],
      technologies: ["React", "Node.js", "Express", "MongoDB"],
      year: 2024,
    },
    {
      id: 3,
      title: "Jeu de Memory en Java",
      description:
        "Jeu de mémoire classique avec différentes difficultés et suivi des scores.",
      fullDescription:
        "Développement d'un jeu de mémoire en Java avec interface graphique Swing.",
      image:
        "https://images.unsplash.com/photo-1550745165-9bc0b252726f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      tags: ["Java", "Swing", "Jeu"],
      category: "mobile",
      github: "https://github.com/username/memorygame",
      demo: null,
      features: ["Multi-niveaux", "Système score", "Classement"],
      technologies: ["Java", "Swing", "JDBC"],
      year: 2023,
    },
  ];

  const projectCategories = [
    { id: "all", label: "Tous", count: projects.length },
    {
      id: "web",
      label: "Web",
      count: projects.filter((p) => p.category === "web").length,
    },
    {
      id: "mobile",
      label: "Applications",
      count: projects.filter((p) => p.category === "mobile").length,
    },
  ];

  // CORRECTION : Ajout de textColor pour les icônes
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
      name: "PHP",
      level: 88,
      gradientColor: "from-purple-500 to-purple-600",
      textColor: "text-purple-500",
      icon: <SiPhp />,
    },
    {
      name: "Node.js",
      level: 80,
      gradientColor: "from-green-500 to-green-600",
      textColor: "text-green-500",
      icon: <SiNodedotjs />,
    },
    {
      name: "MySQL",
      level: 85,
      gradientColor: "from-blue-500 to-blue-700",
      textColor: "text-blue-600",
      icon: <SiMysql />,
    },
  ];

  const technologies = [
    { icon: <SiHtml5 />, name: "HTML5", color: "text-orange-500" },
    { icon: <SiCss3 />, name: "CSS3", color: "text-blue-500" },
    { icon: <SiJavascript />, name: "JavaScript", color: "text-yellow-500" },
    { icon: <SiReact />, name: "React", color: "text-blue-400" },
    { icon: <SiTailwindcss />, name: "Tailwind", color: "text-blue-500" },
    { icon: <SiPhp />, name: "PHP", color: "text-purple-500" },
    { icon: <SiNodedotjs />, name: "Node.js", color: "text-green-500" },
    { icon: <SiExpress />, name: "Express", color: "text-gray-400" },
    { icon: <SiMysql />, name: "MySQL", color: "text-blue-700" },
    { icon: <FaJava />, name: "Java", color: "text-red-500" },
    { icon: <SiGit />, name: "Git", color: "text-orange-600" },
    { icon: <SiFigma />, name: "Figma", color: "text-purple-500" },
  ];

  const services = [
    {
      icon: <FaCode />,
      title: "Développement Web Frontend",
      description:
        "Création de sites web modernes, responsives et performants.",
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      icon: <FaServer />,
      title: "Développement Backend",
      description: "Développement d'APIs robustes avec PHP et Node.js.",
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      icon: <FaDatabase />,
      title: "Bases de Données",
      description: "Conception et gestion de bases de données relationnelles.",
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      icon: <FaGamepad />,
      title: "Développement de Jeux",
      description: "Création de jeux simples et éducatifs.",
      color: "text-red-600",
      bgColor: "bg-red-100",
    },
  ];

  const socialLinks = [
    {
      icon: <FaGithub />,
      href: "https://github.com/username",
      label: "GitHub",
    },
    {
      icon: <FaLinkedinIn />,
      href: "https://linkedin.com/in/username",
      label: "LinkedIn",
    },
    {
      icon: <FaTwitter />,
      href: "https://twitter.com/username",
      label: "Twitter",
    },
    {
      icon: <FaInstagram />,
      href: "https://instagram.com/username",
      label: "Instagram",
    },
  ];

  const experiences = [
    {
      year: "2023 - Présent",
      role: "Étudiant en Développement Web",
      company: "Auto-formation et Projets Personnels",
      description: "Apprentissage autodidacte et développement de projets.",
      technologies: ["React", "Node.js", "PHP", "MySQL"],
    },
    {
      year: "2022 - 2023",
      role: "Développeur Web Freelance",
      company: "Projets Indépendants",
      description: "Création de sites web pour petites entreprises.",
      technologies: ["HTML/CSS", "JavaScript", "PHP", "Bootstrap"],
    },
    {
      year: "2021 - 2022",
      role: "Apprentissage des Bases",
      company: "Cours en Ligne & Tutoriels",
      description: "Apprentissage des fondamentaux du développement web.",
      technologies: ["HTML", "CSS", "JavaScript", "Algorithmes"],
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

    // Injecter les styles d'impression pour le CV
    const styleElement = document.createElement("style");
    styleElement.innerHTML = cvPrintStyles;
    document.head.appendChild(styleElement);

    // Simuler chargement
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

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

  const filteredProjects = useMemo(
    () =>
      projectFilter === "all"
        ? projects
        : projects.filter((project) => project.category === projectFilter),
    [projectFilter, projects]
  );

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

  // 🎯 FONCTIONS POUR LE CV
  const openCVModal = () => {
    setShowCVModal(true);
    document.body.style.overflow = "hidden";
  };

  const closeCVModal = () => {
    setShowCVModal(false);
    setIsPrintMode(false);
    document.body.style.overflow = "auto";
  };

  const handlePrintCV = () => {
    setIsPrintMode(true);
    const originalTitle = document.title;
    document.title = `CV_Ezechiel_${new Date().getFullYear()}`;

    setTimeout(() => {
      window.print();
      setTimeout(() => {
        setIsPrintMode(false);
        document.title = originalTitle;
      }, 500);
    }, 100);
  };

  const downloadCV = () => {
    setIsPrintMode(true);
    const originalTitle = document.title;
    document.title = `CV_Ezechiel_${new Date().getFullYear()}`;

    setTimeout(() => {
      window.print();
      setTimeout(() => {
        setIsPrintMode(false);
        document.title = originalTitle;
        closeCVModal();
      }, 500);
    }, 100);
  };

  // 🎯 DONNÉES POUR LE CV
  const cvData = {
    personalInfo: {
      name: "Ezechiel HOUNKPE",
      title: "Étudiant Développeur Full Stack",
      email: "ezechielben06@gmail.com",
      phone: "+229 65 43 35 36",
      location: "Benin, Cotonou",
      github: "https://github.com/ezechielben06",
      linkedin: "https://linkedin.com/in/username",
      summary:
        "Étudiant passionné par le développement web avec une expertise en création d'applications modernes et performantes. Autodidacte rigoureux, je combine créativité et expertise technique pour développer des solutions innovantes.",
    },

    experiences: [
      {
        period: "2023 - Présent",
        role: "Étudiant en Développement Web",
        company: "Auto-formation et Projets Personnels",
        description:
          "Apprentissage autodidacte intensif et développement de projets full stack. Maîtrise des technologies modernes et bonnes pratiques de développement.",
        technologies: ["React", "Node.js", "PHP", "MySQL", "MongoDB", "Git"],
        achievements: [
          "Développement de 10+ projets web complets",
          "Maîtrise des architectures modernes (MVC, REST API)",
          "Optimisation des performances et SEO",
        ],
      },
      {
        period: "2022 - 2023",
        role: "Développeur Web Freelance",
        company: "Projets Indépendants",
        description:
          "Création de sites web et applications pour clients variés. Gestion complète du cycle de développement.",
        technologies: ["HTML/CSS", "JavaScript", "PHP", "Bootstrap"],
        achievements: [
          "Développement de 5 sites web responsives",
          "Intégration de systèmes de paiement",
          "Optimisation pour les moteurs de recherche",
        ],
      },
    ],

    education: [
      {
        period: "2021 - Présent",
        degree: "Auto-formation en Développement Web",
        institution: "Cours en ligne & Projets Personnels",
        description:
          "Apprentissage intensif des technologies web modernes à travers des projets concrets et des certifications en ligne.",
        courses: [
          "Full Stack Development",
          "Base de données",
          "UI/UX Design",
          "DevOps Basics",
        ],
      },
    ],

    technicalSkills: [
      {
        category: "Frontend",
        skills: [
          {
            name: "HTML5/CSS3",
            level: 95,
            icon: <SiHtml5 className="text-orange-500" />,
            color: "text-orange-500",
          },
          {
            name: "JavaScript",
            level: 90,
            icon: <SiJavascript className="text-yellow-500" />,
            color: "text-yellow-500",
          },
          {
            name: "React.js",
            level: 85,
            icon: <SiReact className="text-blue-400" />,
            color: "text-blue-400",
          },
          {
            name: "TypeScript",
            level: 75,
            icon: <SiTypescript className="text-blue-500" />,
            color: "text-blue-500",
          },
          {
            name: "Tailwind CSS",
            level: 88,
            icon: <SiTailwindcss className="text-blue-500" />,
            color: "text-blue-500",
          },
        ],
      },
      {
        category: "Backend",
        skills: [
          {
            name: "Node.js",
            level: 80,
            icon: <SiNodedotjs className="text-green-500" />,
            color: "text-green-500",
          },
          { name: "PHP", level: 88, icon: <SiPhp className="text-purple-500" />, color: "text-purple-500" },
          {
            name: "Express.js",
            level: 78,
            icon: <SiExpress className="text-gray-400" />,
            color: "text-gray-400",
          },
          { name: "Java", level: 75, icon: <FaJava className="text-red-500" />, color: "text-red-500" },
          {
            name: "Python",
            level: 70,
            icon: <SiPython className="text-blue-600" />,
            color: "text-blue-600",
          },
        ],
      },
      {
        category: "Bases de données",
        skills: [
          {
            name: "MySQL",
            level: 85,
            icon: <SiMysql className="text-blue-700" />,
            color: "text-blue-700",
          },
          {
            name: "MongoDB",
            level: 75,
            icon: <SiMongodb className="text-green-500" />,
            color: "text-green-500",
          },
        ],
      },
      {
        category: "Outils & autres",
        skills: [
          {
            name: "Git/GitHub",
            level: 90,
            icon: <SiGit className="text-orange-600" />,
            color: "text-orange-600",
          },
          {
            name: "Figma",
            level: 75,
            icon: <SiFigma className="text-purple-500" />,
            color: "text-purple-500",
          },
          {
            name: "Docker",
            level: 65,
            icon: <FaServer className="text-blue-500" />,
            color: "text-blue-500",
          },
          {
            name: "Redux",
            level: 80,
            icon: <SiRedux className="text-blue-500" />,
            color: "text-blue-500",
          },
        ],
      },
    ],

    cvProjects: [
      {
        title: "Plateforme de E-learning",
        description:
          "Site web d'apprentissage en ligne avec cours interactifs, quiz et suivi de progression",
        role: "Développeur Full Stack",
        technologies: ["PHP", "MySQL", "JavaScript", "Bootstrap"],
        achievements: [
          "Système d'inscription et authentification",
          "Interface admin complète",
          "Suivi des progrès des étudiants",
        ],
      },
      {
        title: "Application de Gestion de Budget",
        description:
          "Application web pour suivi financier avec visualisation graphique",
        role: "Développeur Frontend & Backend",
        technologies: ["React", "Node.js", "MongoDB", "Chart.js"],
        achievements: [
          "Graphiques interactifs en temps réel",
          "Export des données en PDF/Excel",
          "Synchronisation multi-appareils",
        ],
      },
      {
        title: "API REST pour Bibliothèque",
        description:
          "API RESTful avec authentification JWT pour système de gestion de bibliothèque",
        role: "Développeur Backend",
        technologies: ["Node.js", "Express", "MongoDB", "JWT"],
        achievements: [
          "Documentation Swagger complète",
          "Système de pagination avancé",
          "Tests unitaires avec 90%+ de couverture",
        ],
      },
    ],

    languages: [
      { name: "Français", level: "Natif" },
      { name: "Anglais", level: "Intermédiaire" },
    ],

    certifications: [
      "Développement Web Full Stack (Auto-certifié)",
      "React & Node.js - Projets avancés",
      "Base de données et optimisation MySQL",
      "Git & GitHub - Collaboration professionnelle",
    ],
  };

  // 🎯 COMPOSANTS
  const LoadingScreen = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-white dark:bg-slate-900 z-50">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-300 font-semibold">
          Chargement...
        </p>
      </div>
    </div>
  );

  // 🎯 COMPOSANT CV
  const CVModal = () => {
    const SectionHeader = ({ icon, title }) => (
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center text-white mr-3">
          {icon}
        </div>
        <h2 className="text-xl font-bold text-gray-800 dark:text-white">
          {title}
        </h2>
      </div>
    );

    const SkillBar = ({ skill }) => (
      <div className="mb-4 print-break-avoid">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center">
            <span className="mr-2 text-lg">{skill.icon}</span>
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {skill.name}
            </span>
          </div>
          <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">
            {skill.level}%
          </span>
        </div>
        <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full"
            style={{ width: `${skill.level}%` }}
          />
        </div>
      </div>
    );

    const ProjectCard = ({ project, index }) => (
      <div
        className={`mb-6 print-break-avoid ${
          index > 0 ? "print-break-before" : ""
        }`}
      >
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-bold text-lg text-gray-800 dark:text-white">
            {project.title}
          </h3>
          <span className="text-sm text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded">
            {project.role}
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-3">
          {project.description}
        </p>

        <div className="mb-3">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Technologies :
          </h4>
          <div className="flex flex-wrap gap-1">
            {project.technologies.map((tech, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Réalisations :
          </h4>
          <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
            {project.achievements.map((achievement, i) => (
              <li key={i} className="mb-1">
                {achievement}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );

    const ExperienceCard = ({ exp }) => (
      <div className="mb-6 print-break-avoid">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-gray-800 dark:text-white">
              {exp.role}
            </h3>
            <p className="text-blue-600 dark:text-blue-400">{exp.company}</p>
          </div>
          <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
            {exp.period}
          </span>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-3">
          {exp.description}
        </p>

        <div className="mb-3">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Technologies utilisées :
          </h4>
          <div className="flex flex-wrap gap-1">
            {exp.technologies.map((tech, i) => (
              <span
                key={i}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
            Principales réalisations :
          </h4>
          <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-400">
            {exp.achievements.map((achievement, i) => (
              <li key={i} className="mb-1">
                {achievement}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
        <div
          ref={cvRef}
          className={`relative bg-white dark:bg-gray-800 rounded-lg max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl ${
            isPrintMode ? "print-mode" : ""
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header du CV modal */}
          <div className="sticky top-0 bg-white dark:bg-gray-800 p-5 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center no-print">
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                Mon CV Professionnel
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Étudiant Développeur Full Stack
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <button
                onClick={downloadCV}
                className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:shadow-lg transition-shadow flex items-center"
              >
                <FaDownload className="mr-2" />
                Télécharger PDF
              </button>
              <button
                onClick={handlePrintCV}
                className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors flex items-center"
              >
                <FaPrint className="mr-2" />
                Imprimer
              </button>
              <button
                onClick={closeCVModal}
                className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              >
                <FaTimes className="dark:text-gray-300" />
              </button>
            </div>
          </div>

          {/* Contenu du CV */}
          <div className="p-6 print:p-8">
            {/* Section principale avec informations personnelles */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 mb-8 print-break-avoid border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Photo de profil */}
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-gray-700 shadow-lg print:hidden">
                  <img
                    src="/deux.jpg"
                    alt="Ezechiel"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Informations principales */}
                <div className="flex-1">
                  <div className="mb-4">
                    <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
                      {cvData.personalInfo.name}
                    </h1>
                    <div className="text-lg bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent font-semibold">
                      {cvData.personalInfo.title}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                      {cvData.personalInfo.summary}
                    </p>
                  </div>

                  {/* Informations de contact */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 print:grid-cols-2">
                    <div className="flex items-center">
                      <FaEnvelope className="text-blue-500 mr-2" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {cvData.personalInfo.email}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <FaPhoneAlt className="text-blue-500 mr-2" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {cvData.personalInfo.phone}
                      </span>
                    </div>
                    <div className="flex items-center">
                      <FaMapMarkerAlt className="text-blue-500 mr-2" />
                      <span className="text-gray-700 dark:text-gray-300">
                        {cvData.personalInfo.location}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3 print:hidden">
                      <a
                        href={cvData.personalInfo.github}
                        className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
                      >
                        <FaGithub className="text-lg" />
                      </a>
                      <a
                        href={cvData.personalInfo.linkedin}
                        className="text-gray-700 dark:text-gray-300 hover:text-blue-500"
                      >
                        <FaLinkedinIn className="text-lg" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Grille principale */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 print:gap-6">
              {/* Colonne gauche */}
              <div className="lg:col-span-2 space-y-8 print:space-y-6">
                {/* Expériences professionnelles */}
                <div className="print-break-avoid">
                  <SectionHeader
                    icon={<FaBriefcase />}
                    title="Expériences Professionnelles"
                  />
                  {cvData.experiences.map((exp, index) => (
                    <ExperienceCard key={index} exp={exp} />
                  ))}
                </div>

                {/* Projets */}
                <div className="print-break-avoid">
                  <SectionHeader
                    icon={<FaCode />}
                    title="Projets Significatifs"
                  />
                  {cvData.cvProjects.map((project, index) => (
                    <ProjectCard key={index} project={project} index={index} />
                  ))}
                </div>

                {/* Formation */}
                <div className="print-break-avoid">
                  <SectionHeader icon={<FaGraduationCap />} title="Formation" />
                  {cvData.education.map((edu, index) => (
                    <div key={index} className="mb-6">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h3 className="font-bold text-gray-800 dark:text-white">
                            {edu.degree}
                          </h3>
                          <p className="text-blue-600 dark:text-blue-400">
                            {edu.institution}
                          </p>
                        </div>
                        <span className="text-sm text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">
                          {edu.period}
                        </span>
                      </div>
                      <p className="text-gray-600 dark:text-gray-400 mb-3">
                        {edu.description}
                      </p>

                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
                          Cours suivis :
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {edu.courses.map((course, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs rounded"
                            >
                              {course}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Colonne droite */}
              <div className="space-y-8 print:space-y-6">
                {/* Compétences techniques */}
                <div className="print-break-avoid">
                  <SectionHeader
                    icon={<FaTools />}
                    title="Compétences Techniques"
                  />
                  {cvData.technicalSkills.map((category, index) => (
                    <div key={index} className="mb-6">
                      <h3 className="font-semibold text-gray-700 dark:text-gray-300 mb-3 text-lg">
                        {category.category}
                      </h3>
                      {category.skills.map((skill, skillIndex) => (
                        <SkillBar key={skillIndex} skill={skill} />
                      ))}
                    </div>
                  ))}
                </div>

                {/* Langues */}
                <div className="print-break-avoid">
                  <SectionHeader icon={<FaLanguage />} title="Langues" />
                  <div className="space-y-3">
                    {cvData.languages.map((lang, index) => (
                      <div
                        key={index}
                        className="flex justify-between items-center"
                      >
                        <span className="text-gray-700 dark:text-gray-300">
                          {lang.name}
                        </span>
                        <span className="px-2 py-1 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm rounded">
                          {lang.level}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div className="print-break-avoid">
                  <SectionHeader icon={<FaStar />} title="Certifications" />
                  <ul className="space-y-2">
                    {cvData.certifications.map((cert, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
                        <span className="text-gray-700 dark:text-gray-300">
                          {cert}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            {/* Footer du CV */}
            <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center print:hidden">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Dernière mise à jour : {new Date().toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const Header = () => (
    <header className="fixed w-full z-50 bg-white dark:bg-slate-900 shadow-md py-3 transition-colors duration-300">
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
              onClick={openCVModal}
              className="hidden md:inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
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
                onClick={openCVModal}
                className="flex items-center justify-center space-x-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
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

  const Hero = () => (
    <section
      id="home"
      className="min-h-screen flex items-center pt-16 pb-12 bg-gray-50 dark:bg-slate-900 transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-sm mb-4">
              <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
              Étudiant en Développement Web
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 dark:text-white">
              Bonjour, je suis{" "}
              <span className="text-blue-600 dark:text-blue-400">
                Ezechiel HOUNKPE
              </span>
            </h1>

            <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-4 text-gray-600 dark:text-gray-300">
              <span className="inline-flex items-center">
                <FaCode className="mr-2 text-blue-500" />
                Étudiant Développeur Full Stack
              </span>
            </h2>

            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-xl">
              Passionné par le développement web et les nouvelles technologies.
              Je crée des sites web et applications modernes.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 mb-8">
              <button
                onClick={openCVModal}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-semibold transition-colors flex items-center justify-center"
              >
                <FaDownload className="mr-2" />
                Télécharger CV
              </button>

              <button
                onClick={() => scrollToSection("contact")}
                className="px-6 py-3 border border-gray-300 dark:border-slate-600 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center dark:text-gray-300"
              >
                Me contacter
                <FaArrowRight className="ml-2" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
              {[
                { value: "10+", label: "Projets" },
                { value: "4+", label: "Langages" },
                { value: "100%", label: "Passionné" },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700"
                >
                  <div className="text-xl font-bold text-blue-600 dark:text-blue-400 mb-1">
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
                Stack :
              </span>
              <div className="flex space-x-2">
                {technologies.slice(0, 4).map((tech, index) => (
                  <div
                    key={index}
                    className="w-8 h-8 rounded-lg bg-white dark:bg-slate-800 shadow-sm flex items-center justify-center"
                    title={tech.name}
                  >
                    <div className={`text-lg ${tech.color}`}>{tech.icon}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 flex justify-center">
            <div className="relative">
              <div className="relative w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-4 border-white dark:border-slate-800 shadow-xl">
                <img
                  src="/deux.jpg"
                  alt="Ezechiel"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute -top-3 -right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                Étudiant
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const About = () => (
    <section
      id="about"
      className="py-16 bg-white dark:bg-slate-900 transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-blue-600 dark:text-blue-400">
            À propos de moi
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Étudiant passionné par le développement web
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">
          <div className="lg:w-2/5">
            <div className="w-48 h-48 md:w-56 md:h-56 lg:w-64 lg:h-64 rounded-full overflow-hidden border-4 border-gray-200 dark:border-slate-600 shadow-lg mx-auto">
              <img
                src="/un.jpg"
                alt="Ezechiel"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          <div className="lg:w-3/5">
            <h3 className="text-2xl font-bold mb-4 dark:text-white">
              Mon parcours étudiant
            </h3>

            <div className="mb-6">
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                En tant qu'étudiant autodidacte en développement web, je me suis
                spécialisé dans la création d'applications web modernes et
                performantes.
              </p>

              <p className="text-gray-600 dark:text-gray-300">
                Je combine créativité et rigueur technique pour développer des
                solutions qui allient esthétique et fonctionnalité.
              </p>
            </div>

            <div className="mb-8">
              <h4 className="text-xl font-semibold mb-4 dark:text-white flex items-center">
                <FaChartLine className="mr-2 text-blue-500" />
                Mon apprentissage
              </h4>

              <div className="space-y-4">
                {experiences.map((exp, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 dark:bg-slate-800 rounded-lg p-4 border border-gray-200 dark:border-slate-700"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                      <div>
                        <div className="font-semibold dark:text-white">
                          {exp.role}
                        </div>
                        <div className="text-blue-600 dark:text-blue-400 text-sm">
                          {exp.company}
                        </div>
                      </div>
                      <div className="mt-1 sm:mt-0 px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs">
                        {exp.year}
                      </div>
                    </div>

                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                      {exp.description}
                    </p>

                    <div className="flex flex-wrap gap-1">
                      {exp.technologies.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-2 py-1 bg-white dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={openCVModal}
                className="px-5 py-2 bg-gray-100 dark:bg-slate-800 rounded-lg font-medium hover:bg-gray-200 dark:hover:bg-slate-700 transition-colors flex items-center dark:text-gray-300"
              >
                <FaDownload className="mr-2" />
                Télécharger CV
              </button>

              <button
                onClick={() => scrollToSection("contact")}
                className="px-5 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-medium transition-colors"
              >
                Échanger avec moi
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );

  const Skills = () => (
    <section
      id="skills"
      className="py-16 bg-gray-50 dark:bg-slate-800 transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-blue-600 dark:text-blue-400">
            Mes compétences
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Technologies et outils que j'utilise
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <div>
            <h3 className="text-xl font-semibold mb-6 dark:text-white">
              Compétences techniques
            </h3>

            <div className="space-y-6">
              {skills.map((skill, index) => (
                <div key={index}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-3">
                      {/* CORRECTION : Utilisation de textColor au lieu de skill.color */}
                      <div className="w-8 h-8 rounded-lg bg-gray-100 dark:bg-slate-700 flex items-center justify-center">
                        <div className={skill.textColor}>
                          {skill.icon}
                        </div>
                      </div>
                      <div className="font-medium dark:text-white">
                        {skill.name}
                      </div>
                    </div>
                    <div className="font-bold text-blue-600 dark:text-blue-400">
                      {skill.level}%
                    </div>
                  </div>

                  <div className="h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
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
            <h3 className="text-xl font-semibold mb-6 dark:text-white">
              Technologies maîtrisées
            </h3>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
              {technologies.map((tech, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-slate-700 rounded-lg p-4 flex flex-col items-center justify-center border border-gray-200 dark:border-slate-600 hover:shadow-md transition-shadow"
                >
                  <div className={`text-3xl mb-2 ${tech.color}`}>
                    {tech.icon}
                  </div>
                  <div className="text-sm font-medium dark:text-white text-center">
                    {tech.name}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold mb-6 dark:text-white text-center">
            Ce que je peux faire
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map((service, index) => (
              <div
                key={index}
                className="bg-white dark:bg-slate-700 rounded-lg p-5 border border-gray-200 dark:border-slate-600 hover:shadow-md transition-all"
              >
                <div
                  className={`${service.bgColor} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}
                >
                  <div className={`text-xl ${service.color}`}>
                    {service.icon}
                  </div>
                </div>

                <h4 className="font-semibold mb-2 dark:text-white">
                  {service.title}
                </h4>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );

  const Projects = () => (
    <section
      id="projects"
      className="py-16 bg-white dark:bg-slate-900 transition-colors duration-300"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-blue-600 dark:text-blue-400">
            Mes projets
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Une sélection de mes réalisations
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {projectCategories.map((category) => (
            <button
              key={category.id}
              onClick={() => setProjectFilter(category.id)}
              className={`px-4 py-2 rounded-full transition-colors ${
                projectFilter === category.id
                  ? "bg-blue-500 dark:bg-blue-600 text-white"
                  : "bg-gray-100 dark:bg-slate-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-700"
              }`}
            >
              {category.label} ({category.count})
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden border border-gray-200 dark:border-slate-700 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => openProjectModal(project)}
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>

              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-bold dark:text-white">{project.title}</h3>
                  <div className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded text-xs">
                    {project.year}
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {project.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex justify-between items-center pt-4 border-t border-gray-200 dark:border-slate-700">
                  <button className="text-blue-500 dark:text-blue-400 text-sm font-medium flex items-center">
                    Détails
                    <FaArrowRight className="ml-1" />
                  </button>

                  <div className="flex space-x-2">
                    {project.github && (
                      <a
                        href={project.github}
                        onClick={(e) => e.stopPropagation()}
                        className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                        title="Code source"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaGithub className="text-gray-700 dark:text-gray-300 text-sm" />
                      </a>
                    )}
                    {project.demo && (
                      <a
                        href={project.demo}
                        onClick={(e) => e.stopPropagation()}
                        className="w-8 h-8 rounded-full bg-blue-500 dark:bg-blue-600 flex items-center justify-center hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
                        title="Voir la démo"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FaExternalLinkAlt className="text-white text-sm" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {projectModal.isOpen && projectModal.project && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
          <div
            className="relative bg-white dark:bg-slate-800 rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="sticky top-0 bg-white dark:bg-slate-800 p-5 border-b border-gray-200 dark:border-slate-700 flex justify-between items-center">
              <h3 className="font-bold dark:text-white">
                {projectModal.project.title}
              </h3>
              <button
                onClick={closeProjectModal}
                className="w-8 h-8 rounded-full bg-gray-100 dark:bg-slate-700 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
              >
                <FaTimes className="dark:text-gray-300" />
              </button>
            </div>

            <div className="p-5">
              <img
                src={projectModal.project.image}
                alt={projectModal.project.title}
                className="w-full h-48 object-cover rounded mb-5"
              />

              <div className="mb-5">
                <h4 className="font-semibold mb-2 dark:text-white">
                  Description
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  {projectModal.project.fullDescription}
                </p>
              </div>

              <div className="mb-5">
                <h4 className="font-semibold mb-2 dark:text-white">
                  Fonctionnalités
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {projectModal.project.features.map((feature, index) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 p-2 bg-gray-50 dark:bg-slate-700/50 rounded"
                    >
                      <div className="w-2 h-2 bg-blue-500 dark:bg-blue-400 rounded-full"></div>
                      <span className="dark:text-gray-300 text-sm">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mb-5">
                <h4 className="font-semibold mb-2 dark:text-white">
                  Technologies
                </h4>
                <div className="flex flex-wrap gap-2">
                  {projectModal.project.technologies.map((tech, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex space-x-3">
                {projectModal.project.demo && (
                  <a
                    href={projectModal.project.demo}
                    className="flex-1 py-2 bg-blue-500 dark:bg-blue-600 text-white rounded text-center font-medium hover:bg-blue-600 dark:hover:bg-blue-700 transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Voir la démo
                  </a>
                )}
                <a
                  href={projectModal.project.github}
                  className="flex-1 py-2 bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 rounded text-center font-medium hover:bg-gray-200 dark:hover:bg-slate-600 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Code source
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );

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
        className="py-16 bg-gray-50 dark:bg-slate-800 transition-colors duration-300"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 text-blue-600 dark:text-blue-400">
              Contactez-moi
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Discutons de projets ou d'opportunités
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-6 dark:text-white">
                Parlons de votre projet
              </h3>

              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Que vous ayez une idée de projet ou une question technique, je
                serais ravi de discuter avec vous !
              </p>

              <div className="space-y-4 mb-8">
                <div className="bg-white dark:bg-slate-700 rounded-lg p-4 border border-gray-200 dark:border-slate-600">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                      <FaEnvelope className="text-blue-600 dark:text-blue-300" />
                    </div>
                    <div>
                      <div className="font-semibold dark:text-white">Email</div>
                      <div className="text-gray-600 dark:text-gray-300">
                        ezechielben06@gmail.com
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="font-semibold mb-4 dark:text-white">
                  Me suivre
                </h4>
                <div className="flex space-x-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.href}
                      className="w-10 h-10 rounded-full bg-white dark:bg-slate-700 flex items-center justify-center hover:shadow-md transition-shadow"
                      aria-label={social.label}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="text-gray-700 dark:text-gray-300">
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
                className="bg-white dark:bg-slate-700 rounded-lg p-6 border border-gray-200 dark:border-slate-600"
              >
                {formStatus.message && (
                  <div
                    className={`mb-4 p-3 rounded ${
                      formStatus.type === "success"
                        ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                        : "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300"
                    }`}
                  >
                    {formStatus.message}
                  </div>
                )}

                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
                  >
                    Votre nom
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-600 border border-gray-300 dark:border-slate-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
                  >
                    Adresse email
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-600 border border-gray-300 dark:border-slate-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="subject"
                    className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
                  >
                    Sujet
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-600 border border-gray-300 dark:border-slate-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white"
                    required
                  />
                </div>

                <div className="mb-6">
                  <label
                    htmlFor="message"
                    className="block text-gray-700 dark:text-gray-300 font-medium mb-2"
                  >
                    Votre message
                  </label>
                  <textarea
                    id="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-2 bg-gray-50 dark:bg-slate-600 border border-gray-300 dark:border-slate-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-white resize-none"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  disabled={formStatus.type === "loading"}
                  className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded font-semibold transition-colors disabled:opacity-50"
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

  const Footer = () => (
    <footer className="bg-slate-800 dark:bg-slate-900 text-white py-8 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <div className="mb-4 md:mb-0">
            <div className="text-xl font-bold text-blue-400">Portfolio</div>
            <p className="mt-1 text-gray-400 text-sm">
              Étudiant Développeur Web
            </p>
          </div>

          <div className="flex space-x-6">
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.href}
                className="text-gray-400 hover:text-white transition-colors"
                aria-label={social.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        <div className="border-t border-slate-700 dark:border-slate-800 pt-6 text-center">
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} Portfolio - Étudiant Développeur Web
          </p>
        </div>
      </div>
    </footer>
  );

  const BackToTop = () => (
    <button
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 w-10 h-10 bg-blue-500 dark:bg-blue-600 text-white rounded-full shadow-lg flex items-center justify-center transition-all ${
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
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
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

      {/* Modal du CV */}
      {showCVModal && <CVModal />}
    </div>
  );
}

export default App;