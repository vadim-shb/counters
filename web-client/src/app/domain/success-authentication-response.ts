import {AuthenticationSession} from './authentication-session';

export class SuccessAuthenticationResponse {
  session: AuthenticationSession;
  user: UserResponse;
}

export class UserResponse {
  id: number;
  name: string;
  email: string;
  language: string;
  roles: string[];
}
