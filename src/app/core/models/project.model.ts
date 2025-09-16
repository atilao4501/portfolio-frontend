import { Skill } from './skill.model';

export interface ProjectLinks {
  github?: string;
  site?: string;
  swagger?: string;
}

// Estrutura multilíngue crua (como em shared.json)
export interface RawMultilangProject {
  id: string;
  title: { pt: string; en: string };
  shortDescription: { pt: string; en: string };
  features: { pt: string[]; en: string[] };
  skills: string[]; // ids
  links?: ProjectLinks;
}

// Estrutura final (resolvida para um idioma + skills expandidos)
export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  features: string[];
  skills: Skill[];
  links?: ProjectLinks;
}
