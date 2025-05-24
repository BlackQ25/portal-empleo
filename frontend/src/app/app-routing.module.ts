import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './home/login/login.component';
import { AuthGuard } from './service/auth.guard';
import { RegisterComponent } from './home/register/register.component';
import { ProfileComponent } from './home/profile/profile.component';
import { CatalogComponent } from './home/catalog/catalog.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  {
    path: 'login',
    component: LoginComponent,
  },

  {
    path: 'register',
    component: RegisterComponent,
  },

  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'catalog',
        component: CatalogComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
