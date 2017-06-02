import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {User, UserRole} from '../../domain/security/user';
import {UserService} from '../../services/user/user.service';

@Directive({
  selector: '[userHasAnyRole]'
})
export class UserHasAnyRoleDirective {

  private isView = false;

  //@formatter:off
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private userService: UserService
  ) { }
  //@formatter:on

  @Input() set userHasAnyRole(rolesList: UserRole[]) {
    this.userService.getUser()
      .subscribe(user => {
        if (user && this.isHasAnyRole(user, rolesList) && !this.isView) {
          this.isView = true;
          this.viewContainer.createEmbeddedView(this.templateRef);
        }
        else if (!user || !this.isHasAnyRole(user, rolesList) && this.isView) {
          this.isView = false;
          this.viewContainer.clear();
        }
      });
  }

  private isHasAnyRole(user: User, rolesList: UserRole[]) {
    return rolesList.filter(role => user.roles.includes(role)).length > 0;
  }

}
