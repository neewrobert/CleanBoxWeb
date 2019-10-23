import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../login/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  public IsShowMenuMobile: boolean = false;
  public IsLogado: boolean;
  public IsMenuVisible = false;
  public IsLoginPage: boolean;

  constructor(
    private _loginService: LoginService,
    private _router: Router) { 
    this.IsLogado = (localStorage.getItem("isUserLoggedIn") == "true");

    _router.events.subscribe(() => {
      this.IsLogado = (localStorage.getItem("isUserLoggedIn") == "true");
      this.IsLoginPage = (_router.url == "/")
    })
  }

  ngOnInit() {
    this._loginService.loginEmit.subscribe(isLogado => {
      this.IsLogado = isLogado;
    });
  }

  public ToggleMenu() {
    this.IsShowMenuMobile = !this.IsShowMenuMobile;
  }

  public Toggle(visible: boolean): void {
    this.IsMenuVisible = visible;
  }

  OnClick_Logout() {
    this.IsMenuVisible = false;
    this.IsLogado = false;
    this._router.navigate(['']);
    return this._loginService.Logout();
  }

}
