import {Component, OnInit} from '@angular/core';
import {ToastService} from '../../services/toast/toast.service';
import {ToasterConfig} from 'angular2-toaster';
import {UserService} from '../../services/user/user.service';
import {Router} from '@angular/router';
import {UserRole} from '../../domain/security/user';

@Component({
  selector: 'app-root',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.less']
})
export class RootComponent implements OnInit {

  private toasterConfig: ToasterConfig;

  constructor(private toastService: ToastService) {
    this.toasterConfig = this.toastService.getConfig();
  }

  ngOnInit() {
  }

}

// ===================== root "/" navigation =====================

@Component({
  selector: 'app-root-navigator',
  template: '',
})
export class RootNavigatorComponent implements OnInit {

  constructor(private router: Router,
              private userService: UserService,) {
  }

  ngOnInit() {
    this.userService.getUser()
      .subscribe(user => {
        if (!user) {
          this.router.navigate(['/security/sign-in']);
          return;
        }
        if (user.roles.includes(UserRole.ADMIN)) {
          this.router.navigate(['/admin/dashboard']);
          return;
        }
        if (user.roles.includes(UserRole.USER)) {
          this.router.navigate(['/user/dashboard']);
          return;
        }
      });
  }
}
