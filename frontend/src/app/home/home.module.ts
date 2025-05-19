import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BoardComponent } from './board/board.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  declarations: [LoginComponent, BoardComponent, RegisterComponent],
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  exports: [LoginComponent, BoardComponent, RegisterComponent],
})
export class HomeModule {}
