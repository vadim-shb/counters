import {Component, OnInit} from "@angular/core";
import {I18nService} from "../../../modules/i18n/i18n.service";
import {Translation} from "../../../modules/i18n/domain/translation";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'message-screen',
  templateUrl: './message-screen.component.html',
  styleUrls: ['./message-screen.component.less']
})
export class MessageScreenComponent implements OnInit {

  private i18n: Translation;
  private messageWindow: {
    title: string;
    message: string;
    linkPath: string;
    linkText: string;
  };

  constructor(private i18nService: I18nService,
              private route: ActivatedRoute,) {
    i18nService.getCurrentTranslation()
      .subscribe(translation => {
        this.i18n = translation;
      });
  }

  ngOnInit() {
    this.route.params
      .map(params => params['messageScreenType'])
      .subscribe(messageScreenType => {
        this.messageWindow = {
          title: '',
          message: '',
          linkPath: '/',
          linkText: this.i18n.ui.TO_THE_MAIN_PAGE,
        };
        switch (messageScreenType) {
          case 'password-recovery-email-sent':
            this.messageWindow.title = this.i18n.component.passwordRecoveryEmailSent.TITLE;
            this.messageWindow.message = this.i18n.component.passwordRecoveryEmailSent.MESSAGE;
            break;
          case 'password-recovery-success':
            this.messageWindow.title = this.i18n.component.passwordRecoverySuccess.TITLE;
            this.messageWindow.message = this.i18n.component.passwordRecoverySuccess.MESSAGE;
            this.messageWindow.linkPath = '/security/sign-in';
            this.messageWindow.linkText = this.i18n.ui.SIGN_IN;
            break;
          case 'password-recovery-error':
            this.messageWindow.title = this.i18n.component.passwordRecoveryError.TITLE;
            this.messageWindow.message = this.i18n.component.passwordRecoveryError.MESSAGE;
            break;
          case 'confirmation-email-sent':
            this.messageWindow.title = this.i18n.component.confirmationEmailSent.TITLE;
            this.messageWindow.message = this.i18n.component.confirmationEmailSent.MESSAGE;
            break;
          case 'email-confirmation-success':
            this.messageWindow.title = this.i18n.component.emailConfirmationSuccess.TITLE;
            this.messageWindow.message = this.i18n.component.emailConfirmationSuccess.MESSAGE;
            this.messageWindow.linkPath = '/security/sign-in';
            this.messageWindow.linkText = this.i18n.ui.SIGN_IN;
            break;
        }
      });
  }

}

