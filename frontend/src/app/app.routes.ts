import {Routes} from '@angular/router';

export const routes: Routes = [
  {path: '', loadComponent: () => import('./pages/exam/exam').then(c => c.Exam)},
  {path: 'exam-form', loadComponent: () => import('./pages/exam-form/exam-form').then(c => c.ExamForm)},
];
