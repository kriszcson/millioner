import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { Routes, RouterModule } from '@angular/router';
import { AppRoutingModule, routes } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { JwtModule } from '@auth0/angular-jwt';

import { MatSelectModule } from '@angular/material/select';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";

import { QuestionComponent } from './question/question.component';
import { PointReplacerPipe } from './question/formatter/point-replacer.pipe';
import { UsersComponent } from './users/users.component';
import { TopicSelectorComponent } from './topic-selector/topic-selector.component';
import { FinishedGameComponent } from './finished-game/finished-game.component';
import { AdminComponent } from './admin/admin.component';
import { HeaderComponent } from './header/header.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    PointReplacerPipe,
    UsersComponent,
    TopicSelectorComponent,
    FinishedGameComponent,
    AdminComponent,
    HeaderComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, MatToolbarModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' }),
    HttpClientModule,
    ReactiveFormsModule,
    MatIconModule, MatButtonModule, MatFormFieldModule, MatCardModule, MatInputModule,
    MatSelectModule
  ],
  providers: [PointReplacerPipe],
  bootstrap: [AppComponent],
  exports: [MatInputModule, MatFormFieldModule]
})
export class AppModule { }
