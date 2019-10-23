import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { QuemSomosComponent } from './quem-somos.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  declarations: [
    QuemSomosComponent
  ],
  providers: [],
  exports: [
    QuemSomosComponent
  ]
})

export class QuemSomosModule { }

