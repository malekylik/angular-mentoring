import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { User } from './models/user/user.model';
import { AuthorizationService } from './modules/core/services/authorization/authorization.service';
import { HttpErrorHandlingService } from './modules/core/services/http-error-handling/http-error-handling.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  login: string = '';

  private unsubscribe$: Subject<void> = new Subject();

  constructor(
    private authorizationService: AuthorizationService,
    private httpErrorHandlingService: HttpErrorHandlingService,
  ) { }

  ngOnInit() {
    if (this.authorizationService.isAuthenticated()) {
      this.getUserInfo();
    }

    this.subsribeOnAuthStatus();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private getUserInfo(): void {
    this.authorizationService.getUserInfo()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((user: User) => {
        this.login = user.login;
      },
        error => this.httpErrorHandlingService.handlingError(error));
  }

  private subsribeOnAuthStatus(): void {
    this.authorizationService.getAuthStatus()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((isAuthenticated: boolean) => {
        if (isAuthenticated) {
          this.getUserInfo();
        } else {
          this.login = null;
        }
      });
  }
}
