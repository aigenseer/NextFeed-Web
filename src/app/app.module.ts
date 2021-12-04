import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
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
import {DialogModule} from "primeng/dialog";
import {ClipboardModule} from 'ngx-clipboard';
import {RippleModule} from "primeng/ripple";
import {ButtonModule} from "primeng/button";
import {CardModule} from 'primeng/card';
import {InputTextModule} from 'primeng/inputtext';
import {InputNumberModule} from 'primeng/inputnumber';
import {InputSwitchModule} from 'primeng/inputswitch';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {ShareSessionCodeDialogComponent} from './component/organisms/share-session-code-dialog/share-session-code-dialog.component';
import {StoreModule} from "@ngrx/store";
import {adminCurrentSessionReducer, adminTokenReducer} from "./state/admin/admin.token.reducer";
import {
  participantQuestionReducer,
  participantTokenReducer,
  participantVotedQuestionReducer
} from "./state/participant/participant.reducer";
import {FormsModule} from "@angular/forms";
import {CopyrightComponent} from './component/pages/footerpages/copyright/copyright.component';
import {AboutUsComponent} from './component/pages/footerpages/about-us/about-us.component';
import {DataProtectionComponent} from './component/pages/footerpages/data-protection/data-protection.component';
import {ImprintComponent} from './component/pages/footerpages/imprint/imprint.component';
import {NewQuestionComponent} from './component/organisms/new-question/new-question.component';
import {CreateQuestionComponent} from './component/molecules/create-question/create-question.component';
import {TabViewModule} from 'primeng/tabview';
import {CheckboxModule} from 'primeng/checkbox';
import {TableModule} from 'primeng/table';
import {QuestionFilterByIdsPipe} from "./transform/QuestionFilterByIdsPipe";
import {AuthInterceptor} from "./lib/AuthInterceptor";
import { ParticipantQuestionTableComponent} from './component/organisms/participant-question-table/participant-question-table.component';
import {QuestionTableOverviewComponent} from "./component/molecules/question-table-overview/question-table-overview.component";
import {VotedQuestionByVotePipe} from "./transform/VotedQuestionByVotePipe";
import {UnvotedQuestionPipe} from "./transform/UnvotedQuestionPipe";

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
    AbstractSessionManagementComponent,
    ShareSessionCodeDialogComponent,
    CopyrightComponent,
    AboutUsComponent,
    DataProtectionComponent,
    ImprintComponent,
    NewQuestionComponent,
    CreateQuestionComponent,
    QuestionFilterByIdsPipe,
    QuestionTableOverviewComponent,
    ParticipantQuestionTableComponent,
    VotedQuestionByVotePipe,
    UnvotedQuestionPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserModule,
    BrowserAnimationsModule,
    ToastModule,
    DialogModule,
    CardModule,
    ClipboardModule,
    InputTextModule,
    InputNumberModule,
    InputSwitchModule,
    TabViewModule,
    InputTextareaModule,
    CheckboxModule,
    TableModule,
    StoreModule.forRoot({
      adminToken: adminTokenReducer,
      adminCurrentSessionData: adminCurrentSessionReducer,
      participantToken: participantTokenReducer,
      participantQuestionIds: participantQuestionReducer,
      participantVotedQuestions: participantVotedQuestionReducer
    }),
    RippleModule,
    ButtonModule,
    FormsModule
  ],
  providers: [
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
