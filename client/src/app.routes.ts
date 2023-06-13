import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { UnauthorizedComponent } from './modules/errors/401/401.component';
import { NotFoundComponent } from './modules/errors/404/404.component';
import { AuthGuard } from 'guard/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./modules/portal/portal.module').then((m) => m.PortalModule),
  },
  // { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'admin',
    loadChildren: () =>
      import('./modules/admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AuthGuard]
  },

  { path: '401', component: UnauthorizedComponent },
  { path: '**', pathMatch: 'full', component: NotFoundComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
