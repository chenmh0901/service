import { Injectable } from "@nestjs/common";

@Injectable()
export class AuthService {
  singin() {
    return { msg: "I am signup" };
  }

  signup() {
    return { msg: "I am signin" };
  }
}