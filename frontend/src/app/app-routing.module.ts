import { ProfileComponent } from './profile/profile.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { FinishedGameComponent } from './finished-game/finished-game.component';

import { QuestionComponent } from './question/question.component';
import { UsersComponent } from './users/users.component';
import { AuthGuard } from './users/auth.guard';

export const routes: Routes = [
  {
    path: '', component: QuestionComponent,
    canActivate: [AuthGuard]
  },
  { path: 'profile', component: ProfileComponent },
  { path: 'login', component: UsersComponent },
  { path: 'finished', component: FinishedGameComponent },
  { path: 'admin', component: AdminComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
