import {Directive, TemplateRef, ViewContainerRef} from "@angular/core";
import {UserService} from "../../services/user/user.service";

@Directive({
  selector: '[ifAuthenticated]'
})
export class IfAuthenticatedDirective {

  private isView = false;

  //todo: change to *userHasRoles="['ADMIN', 'USER']"  // may be UserRoles.ADMIN
  //todo: change to *userHasAnyRole="['ADMIN', 'USER']"

  //@formatter:off
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private userService: UserService
    //@formatter:on
  ) {
    this.userService.getUser()
      .subscribe(user => {
        if (user && !this.isView) {
          this.isView = true;
          this.viewContainer.createEmbeddedView(this.templateRef);
        }
        else if (!user && this.isView) {
          this.isView = false;
          this.viewContainer.clear();
        }
      });
  }

}