import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FinishedGameComponent } from './finished-game/finished-game.component';

import { QuestionComponent } from './question/question.component';
import { UsersComponent } from './users/users.component';

export const routes: Routes = [
  { path: '', component: QuestionComponent },
  { path: 'login', component: UsersComponent },
  { path: 'finished', component: FinishedGameComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
