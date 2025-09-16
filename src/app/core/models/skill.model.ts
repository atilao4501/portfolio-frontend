export enum SkillType {
  BACKEND = 'backend',
  FRONTEND = 'frontend',
  DATABASE = 'database',
  DEVOPS = 'devops',
  TOOLS = 'tools',
}

export interface Skill {
  id: string;
  name: string;
  type: SkillType;
  svg: { url: string };
}
