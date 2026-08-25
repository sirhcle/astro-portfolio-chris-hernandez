/*!
 * Projects Data
 * Single source of truth for all portfolio projects.
 * Add a new project by appending an object to this array —
 * both /proyectos and the home page read from here.
 */

import project1 from "../assets/project-liverpool-pocket.png";
import project2 from "../assets/project-stori-app.png";
import project3 from "../assets/project-superapp-liverpool.png";
import project4 from "../assets/project-portfolio.png";
import project7 from "../assets/project-open-chat.png";
import project8 from "../assets/project-open-direct-chat-web.png";

export const projects = [
  {
    slug: "liverpool-pocket",
    title: "Liverpool Pocket",
    category: "Mobile App",
    featured: true,
    highlight: true, // renders as the large "featured" card on the home grid
    image: project1,
    imageAlt: "Liverpool Pocket",
    description:
      'Fui parte del equipo de desarrollo original que lanzó la primera versión de Liverpool Pocket, estableciendo un nuevo y exitoso canal de ventas en línea para una de las mayores empresas de retail en México.',
    tech: ["Swift", "iOS", "Mobile App"],
    links: [
      {
        label: "App Store",
        url: "https://apps.apple.com/mx/app/liverpool-compra-en-l%C3%ADnea/id1148204349",
      },
      {
        label: "Google Play",
        url: "https://play.google.com/store/apps/details?id=mx.com.liverpool.shoppingapp",
      },
    ],
  },
  {
    slug: "stori-app",
    title: "Stori App",
    category: "Mobile App",
    featured: true,
    image: project2,
    imageAlt: "Stori App",
    description:
      "Desarrollé funcionalidades clave para la app de Stori, una solución de crédito para la población no bancarizada en México. El objetivo fue crear una plataforma móvil robusta y fácil de usar que eliminara las barreras de acceso a los servicios financieros tradicionales.",
    tech: ["Objective-C, Swift, Swift UI", "iOS", "Mobile App"],
    links: [
      {
        label: "App Store",
        url: "https://apps.apple.com/mx/app/stori-cr%C3%A9dito-y-ahorro/id1486481718",
      },
      {
        label: "Google Play",
        url: "https://play.google.com/store/apps/details?id=ai.powerup.stori",
      },
    ],
  },
  {
    slug: "superapp-liverpool",
    title: "Super App Liverpool",
    category: "Mobile App",
    featured: true,
    image: project3,
    imageAlt: "Super App Liverpool",
    description:
      'Desarrollo de la "Super App" interna para Liverpool, una solución estratégica en Flutter diseñada para centralizar y optimizar los procesos diarios de los empleados en tienda. La aplicación integra múltiples herramientas existentes en una única plataforma cohesiva, mejorando la eficiencia operativa y la comunicación. Su arquitectura modular permite una evolución constante, con la capacidad de agregar nuevos módulos de forma ágil para responder a las necesidades del negocio.',
    tech: ["Flutter", "Dart", "Mobile UI/UX"],
    links: [],
    caseStudy: {
      title: "📱 Super App Liverpool - Caso de Estudio",
      goal: "Centralizar múltiples herramientas y procesos de los empleados en tienda mediante una solución estratégica que unifique el ecosistema tecnológico interno.",
      contributions: [
        "Desarrollador Flutter senior",
        'Liderazgo técnico en la implementación del módulo "Contacto Logístico"',
        "Diseño e implementación de arquitectura modular escalable",
        "Configuración y gestión de la base de paquetes adicionales desarrollados por otros equipos",
        "Supervisión de la integración de componentes externos al proyecto principal",
        "Desarrollo de múltiples módulos de negocio críticos",
      ],
      stack: ["Flutter", "Dart", "APIs REST", "Microservicios", "Arquitectura Modular"],
    },
  },
  {
    slug: "open-direct-chat",
    title: "Open Direct Chat",
    category: "Mobile App",
    featured: true,
    image: project7,
    imageAlt: "Open Direct Chat",
    description:
      "Aplicación móvil que permite abrir tu servicio de mensajería favorito directamente sin la necesidad de guardar el contacto en tu agenda. Ideal para enviar mensajes rápidos y efímeros a través de plataformas como WhatsApp, Telegram y Signal.",
    tech: ["Flutter", "Mobile App"],
    links: [
      {
        label: "App Store",
        url: "https://apps.apple.com/us/app/open-direct-chat/id6755072807",
      },
      {
        label: "Google Play",
        url: "https://play.google.com/store/apps/details?id=chr.sirhcleapps.sociallauncher",
      },
    ],
  },
  {
    slug: "open-direct-chat-web",
    title: "Open Direct Chat Web",
    category: "Web",
    featured: false,
    image: project8,
    imageAlt: "Open Direct Chat Web",
    description:
      "Esta es la versión web de la aplicación Open Direct Chat, aplicación con diseño responsivo con funcionalidades mínimas (como el enfoque solo para WhatsApp). Es una aplicación responsiva y con algunos cambios visuales que se diferencían de la versión móvil, que además invita a descargar la aplicación.",
    tech: ["React", "JavaScript", "CSS"],
    links: [{ label: "Demo Live", url: "https://opendirectchat.vercel.app/" }],
  },
  {
    slug: "portfolio-v1",
    title: "Primera versión de mi portafolio",
    category: "Web",
    featured: false,
    image: project4,
    imageAlt: "Mi portafolio - Primera versión",
    description:
      "La primera iteración de mi portafolio personal, construida desde cero con React. El objetivo fue crear una Single Page Application (SPA) rápida y moderna para presentar mi trayectoria profesional y mis proyectos de manera efectiva.",
    tech: ["React", "JavaScript", "CSS"],
    links: [
      { label: "Demo Live", url: "https://react-portfolio-silk-omega.vercel.app/" },
    ],
  },
];

export function getFeaturedProjects() {
  return projects.filter((project) => project.featured);
}
