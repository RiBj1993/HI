import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreatePage } from './create.page';
import { Vibration } from '@ionic-native/vibration/ngx';

const routes: Routes = [
  {
    path: '',
    component: CreatePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,

    RouterModule.forChild(routes)
  ],
  declarations: [CreatePage],
  providers: [ Vibration ]
})
export class CreatePageModule {}
