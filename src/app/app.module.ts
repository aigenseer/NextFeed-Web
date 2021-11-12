import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import { NotFoundComponent } from './component/pages/error/not-found/not-found.component';
import { FooterComponent } from './component/organisms/footer/footer.component';
import { HeaderComponent } from './component/organisms/header/header.component';
import { ParticipantLoginComponent } from './component/pages/participant/participant-login/participant-login.component';
import { ParticipantSessionComponent } from './component/pages/participant/participant-session/paricipant-session.component';
import { ContentComponent } from './component/organisms/content/content.component';
import { AdminManagementComponent } from './component/pages/admin/admin-management/admin-management.component';
import { AdminSessionComponent } from './component/pages/admin/admin-session/admin-session.component';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    FooterComponent,
    HeaderComponent,
    ParticipantLoginComponent,
    ParticipantSessionComponent,
    ContentComponent,
    AdminManagementComponent,
    AdminSessionComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
