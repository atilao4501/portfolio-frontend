import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'Home',
    loadComponent: () =>
      import('./pages/home/home.component/home.component').then(
        (m) => m.HomeComponent
      ),
    title: 'Home',
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
  //   {
  //     path: 'contact',
  //     loadComponent: () =>
  //       import('./pages/contact/contact.component').then(
  //         (m) => m.ContactComponent
  //       ),
  //     title: 'Contact',
  //   },
  { path: '**', redirectTo: 'Home' },
];
