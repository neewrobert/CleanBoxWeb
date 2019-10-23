
import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private _router: Router) {}

  canActivate() {
    if (localStorage.getItem("isUserLoggedIn") == "true") {
      return true;
    } else { 
      this._router.navigate(['']);
      return false;
    }
  }
}