import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AuthGuard} from './shared/auth.guard';
import {PageNotFoundComponent} from './shared/pages/page-not-found/page-not-found.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},

  {path: 'login', loadChildren: 'src/app/pages/login/login.module#LoginModule'},
  {
    path: 'courses',
    // canActivate: [AuthGuard],
    loadChildren: 'src/app/pages/course/course.module#CourseModule',
  },

  {path: '**', component: PageNotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
