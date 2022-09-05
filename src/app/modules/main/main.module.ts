import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {Route, RouterModule} from "@angular/router";
import {MainComponent} from "./main.component";
import {ReactiveFormsModule} from "@angular/forms";
import {CoreModule} from "../../core/core.module";
import {HideEmailPipe} from "../../pipes/hide-email.pipe";


export const route: Route[] = [
  {
    path: '',
    component: MainComponent
  }
]

@NgModule({
  declarations: [MainComponent, HideEmailPipe],
  exports: [

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(route),
    ReactiveFormsModule,
    CoreModule,
  ]
})
export class MainModule { }
