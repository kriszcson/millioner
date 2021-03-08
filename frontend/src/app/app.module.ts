import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MaterialTestComponent } from './material-test/material-test.component';


import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { QuestionComponent } from './question/question.component';
import { PointReplacerPipe } from './question/formatter/point-replacer.pipe';


@NgModule({
  declarations: [
    AppComponent,
    MaterialTestComponent,
    QuestionComponent,
    PointReplacerPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, MatToolbarModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatIconModule, MatButtonModule
  ],
  providers: [PointReplacerPipe],
  bootstrap: [AppComponent, QuestionComponent],
})
export class AppModule { }
