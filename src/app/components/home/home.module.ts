import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { HomeComponent } from './home.component';
import { NgbModule, NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    SharedModule
  ],
  declarations: [
    HomeComponent
  ],
  providers: [
    NgbCarouselConfig
  ],
  exports: [
    HomeComponent
  ]
})

export class HomeModule { }

