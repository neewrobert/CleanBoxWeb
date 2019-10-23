import { Injectable, HostListener, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MessagesEnum } from '../shared/core/helpers/MessagesEnum';
import { ToastrService } from 'ngx-toastr';
import { TypeMessageEnum } from '../shared/core/helpers/TypeMessageEnum';

@Injectable()
export class LoginService {
  loginEmit = new EventEmitter<boolean>();
  
  constructor(
    private _router: Router,
    private _toastService: ToastrService) {
      if (localStorage.getItem("isUserLoggedIn") == "true")
        this.RedirectToURL();
  }

  public FazerLogin(usuario: string, senha: string) {
    if (usuario == "admin" && senha == "admin") {
      this.loginEmit.emit(true);
      this.setData("true");
      return this.RedirectToURL();
    } else {
      this.loginEmit.emit(false);
      this.setData("false");
      this._toastService.error(MessagesEnum._001, TypeMessageEnum.Error, {
        timeOut: 2000,
        positionClass: 'toast-bottom-right',
        progressBar: true
      });
    }
  }

  public setData(isUserLoggedIn: string) {
    localStorage.setItem("isUserLoggedIn", isUserLoggedIn);
    this.loginEmit.emit(localStorage.getItem("isUserLoggedIn") == "true");

    if (localStorage.getItem("isUserLoggedIn") == "true") {
      return this.RedirectToURL();
    }

    return this.RedirectToURL('');
  }

  public Logout() {
    this.loginEmit.emit(false);
    localStorage.clear();
    return this.RedirectToURL('');
  }

  private RedirectToURL(url: string = 'home'): void {
    this._router.navigate([`/${url}`], {skipLocationChange: true});
  }
  
}