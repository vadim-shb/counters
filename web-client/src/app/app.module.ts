import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RootComponent } from './components/root/root.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import {RoutingModule} from "./routing-module";

@NgModule({
  declarations: [
    RootComponent,
    SignInComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RoutingModule
  ],
  providers: [],
  bootstrap: [RootComponent]
})
export class AppModule { }
