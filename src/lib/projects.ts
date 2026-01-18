export interface Project {
  id: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  image: string;
  color: string;
  details: {
    role: string;
    timeline: string;
    tech: string[];
    overview: string;
    challenge: string;
    solution: string;
    results: string[];
  };
}

export const projects: Project[] = [
    {
      id: "01",
      slug: "salespulse",
      title: "Voltas SalesPulse",
      category: "Architecture / .NET",
      description: "An internal enterprise application built for 5000+ Voltas employees to manage daily attendance and sales tracking.",
      image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2000&auto=format&fit=crop",
      color: "#2c1810",
      details: {

      role: "Full Stack Developer",
      timeline: "6 Months",
      tech: [".NET", "MySQL"],
      overview: "Developed core backend APIs and frontend modules for managing attendance summaries, Sale Punches, and daily employee check-ins.",
      challenge: "Manual tracking of attendance and sales for over 5000 employees leading to inefficiencies and data inconsistencies.",
      solution: "Designed dynamic dashboards for Admins and other official heads to track their employees attendance and sales report. Independently handled deployment to production, database updates, and on-call issue resolution.",
      results: [
        "Streamlined attendance and sales tracking for 5000+ employees",
        "Improved administrative oversight with dynamic dashboards",
        "Successful production deployment and maintenance"
      ]
    }
  },
  //   {
  //     id: "02",
  //     slug: "histopath",
  //     title: "Histopath",
  //     category: "Medical / System",
  //     description: "A specimen pickup and delivery app for pathology lab in Australia, used by riders to manage hospital pickups efficiently.",
  //     image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?q=80&w=2000&auto=format&fit=crop",
  //     color: "#1a1a1a",
  //     details: {

  //     role: "Full Stack Developer",
  //     timeline: "8 Months",
  //     tech: ["TypeScript", "Node.js", "SQL Server", "Google Maps API"],
  //     overview: "Developed a complete tracking log history system to record and visualize rider trip data both frontend interface and backend logic.",
  //     challenge: "Inefficient specimen pickup and delivery processes requiring better tracking and offline capabilities for riders in remote Australian locations.",
  //     solution: "Enhanced UI screens and created animations for relay interaction. Implemented Progressive Web App (PWA) capabilities for offline access to hospital lists and pickup status caching. Debugged and optimized map interactions with Google Maps API for reliable hospital locator features and live route accuracy. Contributed to bug fixing and performance enhancements on both frontend and backend components.",
  //     results: [
  //       "Improved rider efficiency in specimen pickup and delivery",
  //       "Reliable offline access to critical features",
  //       "Accurate GPS tracking and route optimization"
  //     ]
  //   }
  // },
    {
      id: "02",
      slug: "autoposter",
      title: "Social Media Autoposter",
      category: "Logic / SaaS",
      description: "A multi-platform social media management tool designed for content scheduling, automation, and analytics.",
      image: "https://images.unsplash.com/photo-1694109016554-9a52bff4e9f1?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      color: "#3d2914",
      details: {

      role: "Full Stack Developer",
      timeline: "4 Months",
      tech: ["React.js", "Node.js", "Express.js", "PostgreSQL"],
      overview: "Designed and developed a full-stack social media automation platform enabling users to create, schedule, and publish content across platforms such as LinkedIn, Facebook, and Instagram.",
      challenge: "Inefficient social media management requiring manual posting across multiple platforms without unified analytics or scheduling tools.",
      solution: "Built a responsive dashboard with campaign performance tracking, post scheduling calendar, and engagement analytics. Implemented platform-specific captioning logic and image handling for optimized posts. Integrated rich-text editors and image editing tools for polished content creation. Focused on clean UI/UX and backend reliability for smooth publishing workflows and user management.",
      results: [
        "Streamlined multi-platform content scheduling and publishing",
        "Unified analytics dashboard for performance tracking",
        "Improved user efficiency in social media management"
      ]
    }
  },
    {
      id: "03",
      slug: "cloudzent",
      title: "Cloudzent Website",
      category: "Visual / Web",
      description: "A professional and animated website built for Cloudzent Technology. ",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2000&auto=format&fit=crop",
      color: "#241c14",
      details: {
      role: "Full Stack Developer",
      timeline: "2 Months",
      tech: ["Gatsby", "Framer Motion", "React", "CSS Modules"],
      overview: "A professional and animated website built for Cloudzent Technology to showcase its services and products with engaging UI interactions and optimized performance.",
      challenge: "Creating a visually engaging website that effectively communicates Cloudzent's services while maintaining fast load times and excellent SEO performance.",
      solution: "Designed and developed the complete frontend architecture using Gatsby for static optimization and SEO. Added rich UI interactions using Framer Motion to enhance user engagement. Built responsive layouts and integrated all content sections seamlessly.",
      results: [
        "Optimized static site generation for fast load times",
        "Enhanced user engagement through smooth animations",
        "Fully responsive design across all devices"
      ]
    }
  }
];
