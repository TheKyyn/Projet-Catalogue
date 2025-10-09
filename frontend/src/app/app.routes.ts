import { Routes } from '@angular/router';
import { SearchComponent } from './components/search/search.component';
import { ProgrammeDetailsComponent } from './components/programme-details/programme-details.component';

export const routes: Routes = [
  {
    path: '',
    component: SearchComponent,
  },
  {
    path: 'programme/:id',
    component: ProgrammeDetailsComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
