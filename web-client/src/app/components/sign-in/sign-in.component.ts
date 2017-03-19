import { Component, OnInit } from '@angular/core';
import {SecurityService} from "../../services/security/security.service";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.less']
})
export class SignInComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(private securityService: SecurityService) { }

  ngOnInit() {
  }

  signIn() {
    this.securityService.signIn(this.username, this.password);
  }
}
