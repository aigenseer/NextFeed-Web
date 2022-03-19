import { Component, OnInit } from '@angular/core';
import {
  AbstractSessionManagementComponent,
  IAbstractSessionManagementComponent
} from "../../../organisms/abstract-session-management/abstract-session-management.component";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {SessionService} from "../../../../service/sessionService/session.service";
import {AdminSocket} from "../../../../socket/adminSocket/admin.socket";
import {select, Store} from "@ngrx/store";
import {IAppAdminState} from "../../../../state/admin/app.admin.state";
import {firstValueFrom} from "rxjs";
import {selectTokenCode} from "../../../../state/admin/admin.selector";
import {take} from "rxjs/operators";

@Component({
  selector: 'app-presenter-session-data',
  templateUrl: './presenter-session-data.component.html',
  styleUrls: ['./presenter-session-data.component.scss']
})
export class PresenterSessionDataComponent extends AbstractSessionManagementComponent implements IAbstractSessionManagementComponent, OnInit  {

  constructor(
    protected readonly router: Router,
    protected readonly route: ActivatedRoute,
    protected readonly messageService: MessageService,
    protected readonly adminSocket: AdminSocket,
    protected readonly sessionService: SessionService,
    private confirmationService: ConfirmationService,
    private readonly store: Store<IAppAdminState>
  ) {
    super(router, route, messageService);
  }

  ngOnInit(){
    this.validateSession().then(_ => {

    });
  }

  protected getToken()
  {
    return firstValueFrom(this.store.pipe(select(selectTokenCode), take(1)))
  }


  onDeleteSession() {
    this.confirmationService.confirm({
      header: 'Confirm',
      message: 'Do you really want to delete this session?',
      accept: () => {
        this.sessionService.deleteSession(this.getSessionId() as number).then(() => {
          this.router.navigate(['presenter']);
        });
      }
    });
  }
}
