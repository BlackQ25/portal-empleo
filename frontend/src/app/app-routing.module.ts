import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { LoginComponent } from './home/login/login.component';
import { AuthGuard } from './service/auth.guard';
import { RegisterComponent } from './home/register/register.component';
import { ProfileComponent } from './home/profile/profile.component';
import { CatalogComponent } from './home/catalog/catalog.component';
import { CatalogItemComponent } from './home/catalog-item/catalog-item.component';
import { UserDetailsComponent } from './home/user-details/user-details.component';
import { ApplyComponent } from './home/apply/apply.component';
import { ApplicationsComponent } from './home/applications/applications.component';
import { AdminManagementComponent } from './home/admin-management/admin-management.component';
import { UsersCatalogComponent } from './home/users-catalog/users-catalog.component';
import { OffersCatalogComponent } from './home/offers-catalog/offers-catalog.component';
import { OffersCreateComponent } from './home/offers-create/offers-create.component';
import { OffersEditComponent } from './home/offers-edit/offers-edit.component';

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
      {
        path: 'catalog-item/:id',
        component: CatalogItemComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'user-details/:id',
        component: UserDetailsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'apply/:id',
        component: ApplyComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'applications',
        component: ApplicationsComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'admin-management',
        component: AdminManagementComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'users-catalog',
        component: UsersCatalogComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'offers-catalog',
        component: OffersCatalogComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'offers-create',
        component: OffersCreateComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'offers-edit/:id',
        component: OffersEditComponent,
        canActivate: [AuthGuard],
      }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
