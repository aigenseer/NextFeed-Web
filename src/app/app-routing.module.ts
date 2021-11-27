import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NotFoundComponent} from "./component/pages/error/not-found/not-found.component";
import {ParticipantSessionComponent} from "./component/pages/participant/participant-session/paricipant-session.component";
import {ParticipantLoginComponent} from "./component/pages/participant/participant-login/participant-login.component";
import {PresenterManagementComponent} from "./component/pages/presenter/presenter-management/presenter-management.component";
import {PresenterSessionComponent} from "./component/pages/presenter/presenter-session/presenter-session.component";
import {AboutUsComponent} from "./component/pages/footerpages/about-us/about-us.component";
import {CopyrightComponent} from "./component/pages/footerpages/copyright/copyright.component";
import {DataProtectionComponent} from "./component/pages/footerpages/data-protection/data-protection.component";
import {ImprintComponent} from "./component/pages/footerpages/imprint/imprint.component";


const routes: Routes = [
  { path: 'aboutus', component: AboutUsComponent },
  { path: 'copyright', component: CopyrightComponent },
  { path: 'dataprotection', component: DataProtectionComponent },
  { path: 'imprint', component: ImprintComponent },
  { path: 'presenter', component: PresenterManagementComponent },
  { path: 'presenter/:sessionId',  component: PresenterSessionComponent },
  { path: 'participant/:sessionId',  component: ParticipantSessionComponent },
  { path: 'participant/join/:sessionId', component: ParticipantLoginComponent },
  { path: '',   redirectTo: 'participant/join/', pathMatch: 'full' },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
