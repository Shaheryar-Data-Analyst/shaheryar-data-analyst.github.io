export interface PortfolioProject {
  number: string;
  title: string;
  category: string;
  description: string;
  outcome: string;
  capabilityHighlights: { label: string; value: string }[];
  tags: string[];
  repositoryUrl: string | null;
  highlights?: string[];
}

export const portfolio = {
  name: "Sheikh Mohammad Shaheryar",
  shortName: "Shaheryar",
  role: "Software Engineer · Data Scientist",
  location: "Dammam, Saudi Arabia",
  email: "shaheryarnadeem@live.com",
  portrait: "/shaheryar-london-about.jpg",
  heroMedia: {
    image: "/shaheryar-hero-portrait.png",
    // Set to the new personal video's public path when it is ready.
    video: null as string | null,
  },
  intro:
    "I build reliable software and decision-grade analytics systems that turn complex operational data into measurable business outcomes.",
  about:
    "A software engineer and data scientist with a Master’s degree from Cardiff Metropolitan University. I work across the full delivery cycle—from architecture and implementation to analytics, automation, testing, and long-term improvement.",
  strengths: [
    "Systems-level architectural thinking",
    "Problem decomposition",
    "Data-driven decision-making",
    "Communication across engineering and business teams",
    "Planning, delivery, and quality assurance",
  ],
  education: [
    {
      year: "2021 — 2022",
      degree: "Master in Data Science",
      institution: "Cardiff Metropolitan University",
      result: "Graduated with Distinction",
    },
    {
      year: "2013 — 2017",
      degree: "Bachelor of Software Engineering",
      institution: "University of Engineering and Technology (UET), Taxila",
      result: "CGPA: 3.07/4.00",
    },
  ],
  certifications: [
    {
      title: "15 Days of Power BI — Complete Microsoft Power BI Bootcamp",
      provider: "Udemy",
      date: "June 2026",
      duration: "16 hours",
      description:
        "Practical training covering Power BI, data transformation, data modelling, DAX, dashboard development, and business intelligence reporting.",
    },
    {
      title: "The Complete Full-Stack Web Development Bootcamp",
      provider: "Udemy",
      date: "June 2026",
      duration: "62 hours",
      description:
        "Full-stack development training covering frontend development, backend development, databases, APIs, authentication, and deployment concepts.",
    },
  ],
  internationalExperience: {
    origin: "Pakistan",
    destinations: ["Germany", "Thailand", "Amsterdam", "United Kingdom", "Saudi Arabia", "Bahrain", "Dubai"],
    current: "Dammam, Saudi Arabia",
    workAuthorization: "Transferable Iqama",
  },
  stats: [
    { value: "5+", label: "Years experience" },
    { value: "80%+", label: "Reporting effort reduced" },
    { value: "Master’s", label: "Cardiff Metropolitan University" },
    { value: "85%", label: "ML model accuracy" },
  ],
  projects: [
    {
      number: "01",
      title: "ATAI Projects Dashboard / Management Reporting System",
      category: "MANAGEMENT REPORTING SYSTEM",
      description:
        "A quotation, project, and sales analytics platform built for management reporting and operational decision-making.",
      outcome: "Operational visibility from quotation to project delivery",
      capabilityHighlights: [
        { label: "DELIVERY", value: "Quotation → project → sales" },
        { label: "ANALYTICS", value: "Highcharts KPIs and regional reporting" },
        { label: "REPORTING", value: "OpenAI-assisted PDFs with DOMPDF" },
      ],
      tags: ["Laravel", "MySQL", "Highcharts", "DataTables", "Next.js", "OpenAI API", "DOMPDF"],
      repositoryUrl: null,
      highlights: [
        "Built Laravel dashboards, exports, and management reporting for quotations, projects, and sales analytics.",
        "Implemented Highcharts visualizations and DataTables reporting for project status, quotation pipeline, regional sales, and KPI analysis.",
        "Generated AI-powered PDF management reports using the OpenAI API and DOMPDF.",
        "Contributed to ATAI website development using Next.js and modern frontend architecture.",
      ],
    },
    {
      number: "02",
      title: "Fatoora Lite — Business Workflow Application",
      category: "BUSINESS WORKFLOW APPLICATION",
      description:
        "A lightweight business workflow and dashboard application prototype designed for operational process management and reporting.",
      outcome: "Simplified operational workflow and reporting",
      capabilityHighlights: [
        { label: "FORMAT", value: "Lightweight workflow prototype" },
        { label: "OPERATIONS", value: "Process-management dashboard" },
        { label: "REPORTING", value: "Operational monitoring and reporting" },
      ],
      tags: ["Business Workflow", "Dashboard", "Operations", "Reporting"],
      repositoryUrl: null,
      highlights: [
        "Developed a lightweight dashboard prototype for operational process management and reporting.",
      ],
    },
    {
      number: "03",
      title: "Leave Portal — HR Workflow System",
      category: "HR WORKFLOW SYSTEM",
      description:
        "An employee leave management portal supporting leave requests, multi-stage approvals, status tracking, leave balances, monthly calendars, printable records, and HR workflow processes.",
      outcome: "Employee → HR → Manager",
      capabilityHighlights: [
        { label: "WORKFLOW", value: "Employee → HR → Manager" },
        { label: "APPROVALS", value: "Multi-stage status tracking" },
        { label: "RECORDS", value: "Balances, calendars and printable records" },
      ],
      tags: ["JavaScript", "HTML", "CSS", "LocalStorage"],
      repositoryUrl: "https://github.com/Shaheryar-Data-Analyst/leave-portal-demo",
      highlights: [
        "Supports leave requests, approvals, status tracking, balances, calendars, printable records, and HR workflow processes.",
      ],
    },
    {
      number: "04",
      title: "Zoo Simulation",
      category: "PHP / OBJECT-ORIENTED SIMULATION",
      description:
        "An interactive zoo simulation with 15 animals across three species. Feeding and time-step controls apply species-specific health rules, with animal status saved in JSON and displayed in a live/dead health table.",
      outcome: "3 species · 15 animals",
      capabilityHighlights: [
        { label: "MODEL", value: "PHP object-oriented simulation" },
        { label: "SCALE", value: "3 species · 15 animals" },
        { label: "STATE", value: "JSON persistence and health tracking" },
      ],
      tags: ["PHP", "OOP", "Bootstrap", "jQuery", "JSON"],
      repositoryUrl: "https://github.com/Shaheryar-Data-Analyst/zoo-test",
    },
    {
      number: "05",
      title: "NHS Physiotherapy System",
      category: "HEALTHCARE / ANALYTICS",
      description:
        "A data-led appointment system for physiotherapy workflows, operational data extraction, and wait-time trend analysis.",
      outcome: "Continuous service reporting",
      capabilityHighlights: [
        { label: "WORKFLOW", value: "Physiotherapy appointment operations" },
        { label: "DATA", value: "MongoDB and REST API integration" },
        { label: "ANALYTICS", value: "Pandas wait-time trend analysis" },
      ],
      tags: ["Next.js", "MongoDB", "REST APIs", "Pandas"],
      repositoryUrl: null,
    },
    {
      number: "06",
      title: "VAT Invoice Generator",
      category: "DESKTOP / BUSINESS SOFTWARE",
      description:
        "A bilingual desktop application for Saudi businesses that generates VAT-compliant PDF invoices with QR support.",
      outcome: "Faster compliant invoicing",
      capabilityHighlights: [
        { label: "PLATFORM", value: "Python and Tkinter desktop application" },
        { label: "COMPLIANCE", value: "Saudi VAT-compliant PDF invoices" },
        { label: "OUTPUT", value: "Bilingual documents with QR support" },
      ],
      tags: ["Python", "Tkinter", "MySQL", "PDF"],
      repositoryUrl: null,
    },
  ] satisfies PortfolioProject[],
  repositories: [
    {
      name: "shaheryar-data-analyst.github.io",
      title: "Portfolio Website",
      description: "A bilingual software engineering and data science portfolio with project, experience, education, and résumé sections. Built as a static Next.js and React site.",
      status: "PUBLIC · LIVE SITE",
      url: "https://github.com/Shaheryar-Data-Analyst/shaheryar-data-analyst.github.io",
      demoUrl: "https://shaheryar-data-analyst.github.io/",
    },
    {
      name: "atai-dashboard",
      title: "ATAI Dashboard — Power BI",
      description: "A Power BI dashboard project for ATAI. Get in touch for a walkthrough of the reports and implementation details.",
      status: "DETAILS ON REQUEST",
      url: null,
    },
    {
      name: "atai-website",
      title: "ATAI Website",
      description: "An ATAI website project. Get in touch for a project overview and implementation details.",
      status: "DETAILS ON REQUEST",
      url: null,
    },
    {
      name: "sheikh-autos-erp",
      title: "Sheikh Autos ERP",
      description: "Project repository initialized. Source files have not been published yet.",
      status: "REPOSITORY INITIALIZED",
      url: "https://github.com/Shaheryar-Data-Analyst/sheikh-autos-erp",
    },
    {
      name: "invoice_app-python-",
      title: "Python Invoice App",
      description: "Get in touch for a project overview and further details.",
      status: "DETAILS ON REQUEST",
      url: null,
    },
    {
      name: "SHAHERYAR_POS",
      title: "Shaheryar POS",
      description: "Get in touch for a project overview and further details.",
      status: "DETAILS ON REQUEST",
      url: null,
    },
    {
      name: "reemalmaha",
      title: "Reem Al Maha",
      description: "Get in touch for a project overview and further details.",
      status: "DETAILS ON REQUEST",
      url: null,
    },
    {
      name: "playframework",
      title: "Play Framework",
      description: "A fork of the open-source Play Framework. The framework is authored and maintained by the upstream Play project.",
      status: "OPEN-SOURCE FORK",
      url: "https://github.com/Shaheryar-Data-Analyst/playframework",
    },
  ],
  capabilities: [
    {
      title: "Frontend Architecture",
      body: "High-performance applications and maintainable interfaces designed for clear, reliable user journeys.",
      tags: ["Next.js", "React", "JavaScript", "AngularJS", "HTML", "CSS", "Bootstrap", "Highcharts"],
    },
    {
      title: "Distributed Backend",
      body: "Production services, APIs, and data workflows built for reliability and long-term ownership.",
      tags: ["Java", "Spring Boot", "Laravel", "Node.js", "REST APIs", "C#", "Bash"],
    },
    {
      title: "Data Platforms",
      body: "Structured analytics systems that turn operational data into visible, actionable business signals.",
      tags: ["SQL", "MySQL", "PostgreSQL", "MongoDB", "Power BI", "Tableau", "Excel", "DAX"],
    },
    {
      title: "Algorithms & Machine Learning",
      body: "Applied models, automated reporting, and analytical workflows focused on measurable outcomes.",
      tags: ["Python", "Pandas", "NumPy", "R", "Scikit-learn", "TensorFlow", "NLP", "MATLAB", "Jupyter"],
    },
    {
      title: "Delivery & Cloud Tooling",
      body: "Engineering delivery, deployment, collaboration, and documentation across the complete product lifecycle.",
      tags: ["Docker", "Jenkins", "Git", "Jira", "AWS", "LaTeX", "Microsoft Word", "Overleaf"],
    },
  ],
  experience: [
    {
      year: "2025 — NOW",
      role: "Data Analyst · Sales & Marketing",
      company: "Arabian Thermal Aire Industries",
      place: "Saudi Arabia",
      achievements: [
        "Built executive Power BI dashboards for inquiries, quotations, purchase orders, and regional KPIs.",
        "Developed a Laravel and MySQL analytics platform connecting project and commercial reporting.",
        "Automated monthly reporting with Python, reducing manual effort by more than 80%.",
      ],
    },
    {
      year: "2023 — 2024",
      role: "Data Analyst",
      company: "Epochs IT Solutions",
      place: "United Kingdom · Remote",
      achievements: [
        "Built Power BI and Tableau dashboards for stakeholder decision-making.",
        "Created analytical SQL workflows that contributed to a 25% increase in sales.",
        "Designed ETL pipelines that automated data processing by 50%.",
      ],
    },
    {
      year: "2022 — 2023",
      role: "Software Engineer · Data Analyst",
      company: "Agile-Kinetic",
      place: "Cardiff, UK",
      achievements: [
        "Delivered full-stack modules from planning and architecture through implementation.",
        "Built a machine-learning churn prediction model with 85% reported accuracy.",
      ],
    },
    {
      year: "2020 — 2021",
      role: "Software Engineer",
      company: "Joeyco",
      place: "Canada · Karachi franchise",
      achievements: [
        "Coordinated delivery across full-stack workstreams and led systems processing 24 million transactions annually.",
        "Optimized SQL queries, stored procedures, and data-warehouse retrieval workflows.",
      ],
    },
    {
      year: "2017 — 2019",
      role: "Junior Software Engineer",
      company: "Conure",
      place: "USA · Karachi franchise",
      achievements: [
        "Built real-time applications using Java, Spring Boot, JavaScript, and AngularJS.",
        "Implemented OAuth/JWT authentication and third-party API integrations.",
      ],
    },
  ],
};
