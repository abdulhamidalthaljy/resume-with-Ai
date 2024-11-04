import { Routes } from '@angular/router';
import { ResumeComponent } from './resume/resume.component';
import { ContentConverterComponent } from './content-converter/content-converter.component';

export const routes: Routes = [
    {
      path: 'resume',
      component: ResumeComponent
    },
    {
      path: 'preview',
      component: ContentConverterComponent
    },
    {
      path: '',
      redirectTo: '/resume',
      pathMatch: 'full'
    }
  ];