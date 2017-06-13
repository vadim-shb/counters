import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {SecurityService} from '../../../services/security/security.service';
import {InternationalizedComponent} from '../../../modules/i18n/utils/internationalized-component';

@Component({
  selector: 'message-screen',
  templateUrl: './message-screen.component.html',
  styleUrls: ['./message-screen.component.less']
})
export class MessageScreenComponent extends InternationalizedComponent implements OnInit {

  private messageWindow: {
    title: string;
    message: string;
    linkPath: string;
    linkText: string;
  };

  constructor(private route: ActivatedRoute,
              private securityService: SecurityService,) {
    super();
  }

  ngOnInit() {
    this.route.params
      .map(params => params['messageScreenType'])
      .subscribe(messageScreenType => {
        this.messageWindow = {
          title: '',
          message: '',
          linkPath: '/',
          linkText: this.i18n.uiSecurity.TO_THE_MAIN_PAGE,
        };
        switch (messageScreenType) {
          case 'password-recovery-email-sent':
            this.messageWindow.title = this.i18n.uiSecurity.PASSWORD_RECOVERY_EMAIL_SENT_TITLE;
            this.messageWindow.message = this.i18n.uiSecurity.PASSWORD_RECOVERY_EMAIL_SENT_MESSAGE;
            break;
          case 'password-recovery-success':
            this.messageWindow.title = this.i18n.uiSecurity.PASSWORD_RECOVERY_SUCCESS_TITLE;
            this.messageWindow.message = this.i18n.uiSecurity.PASSWORD_RECOVERY_SUCCESS_MESSAGE;
            this.messageWindow.linkPath = '/security/sign-in';
            this.messageWindow.linkText = this.i18n.uiSecurity.SIGN_IN;
            break;
          case 'password-recovery-error':
            this.messageWindow.title = this.i18n.uiSecurity.PASSWORD_RECOVERY_ERROR_TITLE;
            this.messageWindow.message = this.i18n.uiSecurity.PASSWORD_RECOVERY_ERROR_MESSAGE;
            break;
          case 'sign-up__confirmation-email-sent':
            this.messageWindow.title = this.i18n.uiSecurity.CONFIRMATION_EMAIL_SENT_TITLE;
            this.messageWindow.message = this.i18n.uiSecurity.CONFIRMATION_EMAIL_SENT_MESSAGE;
            break;
          case 'sign-up__email-confirmation-success':
            this.messageWindow.title = this.i18n.uiSecurity.EMAIL_CONFIRMATION_SUCCESS_TITLE;
            this.messageWindow.message = this.i18n.uiSecurity.EMAIL_CONFIRMATION_SUCCESS_MESSAGE;
            this.messageWindow.linkPath = '/security/sign-in';
            this.messageWindow.linkText = this.i18n.uiSecurity.SIGN_IN;
            break;
          case 'sign-up__email-confirmation-error':
            this.messageWindow.title = this.i18n.uiSecurity.SIGN_UP__EMAIL_CONFIRMATION_ERROR_TITLE;
            this.messageWindow.message = this.i18n.uiSecurity.SIGN_UP__EMAIL_CONFIRMATION_ERROR_MESSAGE;
            break;
          case 'change-email__success':
            this.messageWindow.title = this.i18n.uiSecurity.CHANGE_EMAIL__SUCCESS_TITLE;
            this.messageWindow.message = this.i18n.uiSecurity.CHANGE_EMAIL__SUCCESS_MESSAGE;
            this.securityService.refreshAuthSession();
            break;
          case 'change-email__new-email-confirmation-success':
            this.messageWindow.title = this.i18n.uiSecurity.CHANGE_EMAIL__NEW_EMAIL_CONFIRMATION_SUCCESS_TITLE;
            this.messageWindow.message = this.i18n.uiSecurity.CHANGE_EMAIL__NEW_EMAIL_CONFIRMATION_SUCCESS_MESSAGE;
            break;
          case 'change-email__current-email-confirmation-success':
            this.messageWindow.title = this.i18n.uiSecurity.CHANGE_EMAIL__CURRENT_EMAIL_CONFIRMATION_SUCCESS_TITLE;
            this.messageWindow.message = this.i18n.uiSecurity.CHANGE_EMAIL__CURRENT_EMAIL_CONFIRMATION_SUCCESS_MESSAGE;
            break;
          case 'change-email__email-confirmation-error':
            this.messageWindow.title = this.i18n.uiSecurity.CHANGE_EMAIL__EMAIL_CONFIRMATION_ERROR_TITLE;
            this.messageWindow.message = this.i18n.uiSecurity.CHANGE_EMAIL__EMAIL_CONFIRMATION_ERROR_MESSAGE;
            break;
        }
      });
  }

}

