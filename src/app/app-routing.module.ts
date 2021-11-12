import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NotFoundComponent} from "./component/pages/error/not-found/not-found.component";
import {ParticipantSessionComponent} from "./component/pages/participant/participant-session/paricipant-session.component";
import {ParticipantLoginComponent} from "./component/pages/participant/participant-login/participant-login.component";
import {AdminManagementComponent} from "./component/pages/admin/admin-management/admin-management.component";
import {AdminSessionComponent} from "./component/pages/admin/admin-session/admin-session.component";

const routes: Routes = [
  { path: 'admin', component: AdminManagementComponent },
  { path: 'admin/:sessionId',  component: AdminSessionComponent },
  { path: 'participant/:sessionId',  component: ParticipantSessionComponent },
  { path: 'participant', component: ParticipantLoginComponent },
  { path: '',   redirectTo: 'participant', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
