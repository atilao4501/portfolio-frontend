import { Skill } from './skill.model';

export interface ProjectLinks {
  github?: string;
  site?: string;
  swagger?: string;
}

export interface Project {
  id: string;
  title?: string; // vem do data.*.json
  shortDescription?: string; // vem do data.*.json
  features?: string[]; // vem do data.*.json
  skills: Skill[]; // expandido a partir de shared.json
  links?: ProjectLinks; // shared.json
}
