// src/app/core/models/portfolio.model.ts

export interface LinkMap {
  demo?: string;
  github?: string;
  linkedin?: string;
  email?: string;
  whatsapp?: string;
  cv?: string;
}

// Representa o formato real do shared.json atual
export interface SharedDataProjectMultilang {
  id: string;
  title: { pt: string; en: string };
  shortDescription: { pt: string; en: string };
  features: { pt: string[]; en: string[] };
  skills: string[]; // IDs de skills (serão expandidos onde necessário)
  links?: LinkMap;
}

export interface SharedDataSkill {
  id: string;
  name: string;
  type: string; // mantemos string para evitar dependência circular com SkillType
  svg: { url: string };
}

export interface SharedDataCertification {
  id: string;
  name: string;
  issuer: string;
  year: string;
}

export interface SharedData {
  personal: {
    name: string;
    brand: string;
    githubUsername: string;
  };
  links: LinkMap;
  contact: {
    email: string;
    whatsapp: string;
  };
  projects: SharedDataProjectMultilang[];
  certifications: SharedDataCertification[];
  skills: SharedDataSkill[]; // lista plana de skills
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
