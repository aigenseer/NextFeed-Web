import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {NotFoundComponent} from './component/pages/error/not-found/not-found.component';
import {FooterComponent} from './component/organisms/footer/footer.component';
import {HeaderComponent} from './component/organisms/header/header.component';
import {ParticipantLoginComponent} from './component/pages/participant/participant-login/participant-login.component';
import {ParticipantSessionComponent} from './component/pages/participant/participant-session/paricipant-session.component';
import {ContentComponent} from './component/organisms/content/content.component';
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {PresenterManagementComponent} from "./component/pages/presenter/presenter-management/presenter-management.component";
import {PresenterSessionComponent} from "./component/pages/presenter/presenter-session/presenter-session.component";
import {AbstractSessionManagementComponent} from './component/organisms/abstract-session-management/abstract-session-management.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    FooterComponent,
    HeaderComponent,
    ParticipantLoginComponent,
    ParticipantSessionComponent,
    ContentComponent,
    PresenterManagementComponent,
    PresenterSessionComponent,
    AbstractSessionManagementComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ToastModule
  ],
  providers: [
    MessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
