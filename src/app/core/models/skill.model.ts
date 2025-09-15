export interface Skill {
  id: string;
  name: string;
  type: string; // backend | frontend | database | devops | messaging | observability | tool
  level: string; // beginner | intermediate | advanced
  svg: { url: string };
}
