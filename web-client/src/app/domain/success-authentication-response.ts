import {User} from "./user";
import {AuthenticationSession} from "./authentication-session";

export class SuccessAuthenticationResponse {
  session: AuthenticationSession;
  user: User;
}
