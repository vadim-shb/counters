import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {UserService} from '../../services/user/user.service';
import {User, UserRole} from '../../domain/security/user';

@Directive({
  selector: '[userHasRoles]'
})
export class UserHasRolesDirective {

  private isView = false;

  //@formatter:off
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private userService: UserService
  ) { }
  //@formatter:on

  @Input() set userHasRoles(rolesList: UserRole[]) {
    this.userService.getUser()
      .subscribe(user => {
        if (user && this.isHasEveryRole(user, rolesList) && !this.isView) {
          this.isView = true;
          this.viewContainer.createEmbeddedView(this.templateRef);
        }
        else if (!user || !this.isHasEveryRole(user, rolesList) && this.isView) {
          this.isView = false;
          this.viewContainer.clear();
        }
      });
  }

  private isHasEveryRole(user: User, rolesList: UserRole[]) {
    return rolesList.filter(role => user.roles.includes(role)).length == rolesList.length;
  }
}
