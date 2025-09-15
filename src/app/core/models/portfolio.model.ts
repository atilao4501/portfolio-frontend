// src/app/core/models/portfolio.model.ts

export interface LinkMap {
  demo?: string;
  github?: string;
  linkedin?: string;
  email?: string;
  whatsapp?: string;
  cv?: string;
}

export interface SharedData {
  personal: {
    name: string;
    brand: string;
  };
  links: LinkMap;
  contact: {
    email: string;
    whatsapp: string;
  };
  stack: string[];
  projects: {
    id: string;
    name: string;
    stack: string[];
    links?: LinkMap;
  }[];
  corporate: {
    id: string;
    company: string;
    period: string;
    stack: string[];
  }[];
  freelance: {
    id: string;
    name: string;
  }[];
  education: {
    id: string;
    institution: string;
    period: string;
  }[];
  certifications: {
    id: string;
    name: string;
    issuer: string;
    year: string;
  }[];
  skills: {
    backend: { name: string; level: string }[];
    frontend: { name: string; level: string }[];
    tools: { name: string; level: string }[];
  };
}

export interface NavbarData {
  menu: {
    home: string;
    about: string;
    skills: string;
    projects: string;
    contact: string;
  };
  brand?: string; // Será adicionado pelo serviço
  socialLinks?: {
    linkedin: string;
    github: string;
  };
}

export interface HeroData {
  title: string;
  summary: string;
  name?: string; // Será adicionado pelo serviço
  links?: LinkMap;
}

export interface AboutData {
  title: string;
  description: string;
}

export interface SkillsData {
  title: string;
  categories: {
    backend: string;
    frontend: string;
    tools: string;
  };
  levels: {
    beginner: string;
    intermediate: string;
    advanced: string;
  };
}

export interface ProjectsData {
  title: string;
  [key: string]: any; // Para IDs específicos de projetos
}

export interface ExperienceData {
  title: string;
  corporate: string;
  freelance: string;
  [key: string]: any; // Para IDs específicos de experiências
}

export interface EducationData {
  title: string;
  [key: string]: any; // Para IDs específicos de educação
}

export interface ContactData {
  title: string;
  subtitle: string;
  form: {
    name: string;
    email: string;
    message: string;
    send: string;
  };
}

export interface PortfolioData {
  navbar: NavbarData;
  hero: HeroData;
  about: AboutData;
  skills: SkillsData;
  projects: ProjectsData;
  experience: ExperienceData;
  education: EducationData;
  contact: ContactData;
}
