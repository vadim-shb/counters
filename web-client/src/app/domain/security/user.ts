import {UserResponse} from './success-authentication-response';
export class User {

  id: number;
  name: string;
  email: string;
  language: string;
  roles: UserRole[];

  constructor(userResponse: UserResponse) {
    this.id = userResponse.id;
    this.name = userResponse.name;
    this.email = userResponse.email;
    this.language = userResponse.language;
    this.roles = userResponse.roles.map(roleAsString => UserRole[roleAsString]);
  }
}

export enum UserRole {
  ADMIN, USER
}
