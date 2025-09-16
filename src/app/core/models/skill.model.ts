export interface Skill {
  id: string;
  name: string;
  type: string; // backend | frontend | database | devops | messaging | observability | tool
  svg: { url: string };
}
