import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home.component/home.component').then(
        (m) => m.HomeComponent
      ),
    title: 'Home',
    data: { preloadPriority: 1 },
  },
  {
    path: 'about',
    loadComponent: () =>
      import('./pages/about/about.component/about.component').then(
        (m) => m.AboutComponent
      ),
    title: 'About',
    data: { preloadPriority: 2 },
  },
  {
    path: 'skills',
    loadComponent: () =>
      import('./pages/skills/skill.component/skill.component').then(
        (m) => m.SkillComponent
      ),
    title: 'Skills',
    data: { preloadPriority: 3 },
  },
  {
    path: 'projects',
    loadComponent: () =>
      import('./pages/projects/projects.component/projects.component').then(
        (m) => m.ProjectsComponent
      ),
    title: 'Projects',
    data: { preloadPriority: 4 },
  },
  //   {
  //     path: 'projects',
  //     loadComponent: () =>
  //       import('./pages/projects/projects.component').then(
  //         (m) => m.ProjectsComponent
  //       ),
  //     title: 'Projects',
  //   },
  //   {
  //     path: 'experience',
  //     loadComponent: () =>
  //       import('./pages/experience/experience.component').then(
  //         (m) => m.ExperienceComponent
  //       ),
  //     title: 'Experience',
  //   },
  //   {
  //     path: 'stack',
  //     loadComponent: () =>
  //       import('./pages/stack/stack-page.component').then(
  //         (m) => m.StackPageComponent
  //       ),
  //     title: 'Stack',
  //   },
  {
    path: 'contact',
    loadComponent: () =>
      import('./pages/contact/contact.component/contact.component').then(
        (m) => m.ContactComponent
      ),
    title: 'Contact',
    data: { preloadPriority: 5 },
  },
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: '**', redirectTo: 'home' },
];
