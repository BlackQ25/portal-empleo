import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register/register.component';
import { ProfileComponent } from './profile/profile.component';
import { CatalogComponent } from './catalog/catalog.component';
import { CatalogItemComponent } from './catalog-item/catalog-item.component';
import { UserDetailsComponent } from './user-details/user-details.component';

@NgModule({
  declarations: [LoginComponent, CatalogComponent, RegisterComponent, ProfileComponent, CatalogItemComponent, UserDetailsComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [LoginComponent, CatalogComponent, RegisterComponent, ProfileComponent, CatalogItemComponent, UserDetailsComponent],
})
export class HomeModule {}
