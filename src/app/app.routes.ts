import { Routes } from '@angular/router';
import { ResumeComponent } from './resume/resume.component';

export const routes: Routes = [
    {
      path: 'resume',
      component: ResumeComponent
    },
    {
      path: '',
      redirectTo: '/resume',
      pathMatch: 'full'
    }
  ];