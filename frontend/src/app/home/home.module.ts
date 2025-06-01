import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CatalogItemComponent } from './catalog-item/catalog-item.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { ApplyComponent } from './apply/apply.component';
import { ApplicationsComponent } from './applications/applications.component';
import { AdminManagementComponent } from './admin-management/admin-management.component';
import { UsersCatalogComponent } from './users-catalog/users-catalog.component';
import { OffersCatalogComponent } from './offers-catalog/offers-catalog.component';
import { OffersCreateComponent } from './offers-create/offers-create.component';

@NgModule({
  declarations: [
    LoginComponent,
    CatalogComponent,
    RegisterComponent,
    ProfileComponent,
    CatalogItemComponent,
    UserDetailsComponent,
    ApplyComponent,
    ApplicationsComponent,
    AdminManagementComponent,
    UsersCatalogComponent,
    OffersCatalogComponent,
    OffersCreateComponent
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [
    LoginComponent,
    CatalogComponent,
    RegisterComponent,
    ProfileComponent,
    CatalogItemComponent,
    UserDetailsComponent,
    ApplyComponent,
    ApplicationsComponent,
    AdminManagementComponent,
    UsersCatalogComponent,
    OffersCatalogComponent,
    OffersCreateComponent
  ],
})
export class HomeModule {}
