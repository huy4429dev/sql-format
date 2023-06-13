import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccessRights } from 'guard/accessRights.guard';
import { AccessWaiting } from 'guard/authWaiting.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./dashboard/dashboard.component').then(c => c.DashboardComponent),
      },
      {
        path: 'template',
        loadChildren: () =>
          import('./template/template.module').then((m) => m.TemplateModule),
      },
      {
        path: 'recipe',
        loadChildren: () =>
          import('./recipe/recipe.module').then((m) => m.RecipeModule),

      },
      {
        path: 'bridge',
        loadChildren: () =>
          import('./bridge/bridge.module').then((m) => m.BridgeModule),

      },
      {
        path: 'user',
        loadChildren: () =>
          import('./user/user.module').then((m) => m.UserModule),
        canActivate: [AccessRights]
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule { }
