import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LeveloneComponent } from './levelone/levelone.component';
import { FormsModule } from '@angular/forms';
import { FormComponent } from './form/form.component';
import { InitialComponent } from './initial/initial.component';

@NgModule({
  declarations: [
    AppComponent,
    LeveloneComponent,
    FormComponent,
    InitialComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
