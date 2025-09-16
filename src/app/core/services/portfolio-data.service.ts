import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { combineLatest, map, Observable, shareReplay } from 'rxjs';
import { DATA_PATHS, LangCode } from '../config/data-paths';
import { Skill } from '../models/skill.model';
import { Project } from '../models/project.model';

// Tipos internos para merge
type SharedProject = { id: string; skills: string[]; links?: any };
type SharedFile = {
  personal: any;
  links: any;
  contact: any;
  projects: SharedProject[];
  skills: Skill[]; // lista única de skills
};
type LangFile = {
  navbar: any;
  hero: any;
  about: any;
  projects: Array<{
    id: string;
    title?: string;
    shortDescription?: string;
    features?: string[];
  }>;
  skills: any;
  contact: any;
};

// Flag simples para futura API
const USE_API = false;

@Injectable({ providedIn: 'root' })
export class PortfolioDataService {
  constructor(private http: HttpClient) {}

  private _shared$?: Observable<SharedFile>;
  private get shared$(): Observable<SharedFile> {
    return (this._shared$ ??= this.http
      .get<SharedFile>(DATA_PATHS.shared)
      .pipe(shareReplay(1)));
  }

  private _skillsIndex$?: Observable<{
    allSkills: Skill[];
    index: Map<string, Skill>;
  }>;
  private get skillsIndex$() {
    return (this._skillsIndex$ ??= this.shared$.pipe(
      map((shared) => {
        const allSkills: Skill[] = shared.skills || [];
        const index = new Map<string, Skill>();
        for (const s of allSkills) index.set(s.id, s);
        return { allSkills, index };
      }),
      shareReplay(1)
    ));
  }

  private langFile(lang: LangCode) {
    return this.http
      .get<LangFile>(DATA_PATHS.byLang[lang])
      .pipe(shareReplay(1));
  }

  private apiSkills$(): Observable<Skill[]> {
    return this.http.get<Skill[]>('/api/skills').pipe(shareReplay(1));
  }
  private apiProjects$(lang: LangCode): Observable<Project[]> {
    return this.http
      .get<Project[]>(`/api/projects?lang=${encodeURIComponent(lang)}`)
      .pipe(shareReplay(1));
  }

  getSkills(): Observable<Skill[]> {
    if (USE_API) return this.apiSkills$();
    return this.skillsIndex$.pipe(map((x) => x.allSkills));
  }

  /** Retorna objeto de categorias -> array de skills */
  getSkillsGrouped(): Observable<Record<string, Skill[]>> {
    return this.shared$.pipe(
      map((shared) => {
        const skillsArray = shared.skills || [];
        return skillsArray.reduce(
          (acc: Record<string, Skill[]>, skill: Skill) => {
            const type = skill.type;
            if (!acc[type]) {
              acc[type] = [];
            }
            acc[type].push(skill);
            return acc;
          },
          {}
        );
      })
    );
  }

  getProjects(lang: LangCode): Observable<Project[]> {
    if (USE_API) return this.apiProjects$(lang);
    return combineLatest([
      this.shared$,
      this.skillsIndex$,
      this.langFile(lang),
    ]).pipe(
      map(([shared, { index }, langData]) => {
        const langProjectsMap = new Map(
          langData.projects.map((p) => [p.id, p])
        );
        return shared.projects.map((sharedProj) => {
          const langProj = langProjectsMap.get(sharedProj.id);
          const skillsExpanded: Skill[] = sharedProj.skills
            .map((id) => index.get(id))
            .filter((s): s is Skill => !!s);
          return {
            id: sharedProj.id,
            title: langProj?.title,
            shortDescription: langProj?.shortDescription,
            features: langProj?.features ?? [],
            skills: skillsExpanded,
            links: sharedProj.links,
          } as Project;
        });
      }),
      shareReplay(1)
    );
  }

  getUi(lang: LangCode) {
    return this.langFile(lang).pipe(
      map((lf) => ({
        navbar: lf.navbar,
        hero: lf.hero,
        about: lf.about,
        skills: lf.skills,
        contact: lf.contact,
      })),
      shareReplay(1)
    );
  }
}
