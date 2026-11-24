import type { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'folder/Inbox',
    pathMatch: 'full',
  },
  {
    path: 'folder/:folder',
    loadComponent: () => import('./folder/folder.page').then((m) => m.FolderPage),
  },
  {
    path: 'mahasiswa',
    loadComponent: () => import('./mahasiswa/mahasiswa.page').then((m) => m.MahasiswaPage),
  },
];
