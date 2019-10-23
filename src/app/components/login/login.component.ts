import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoginService } from './login.service';
import { MessagesEnum } from '../shared/core/helpers/MessagesEnum';
import { ToastrService } from 'ngx-toastr';
import { TypeMessageEnum } from '../shared/core/helpers/TypeMessageEnum';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public form: FormGroup

  msgLoginInvalido: string = "Preencha o campo usuário!";
  msgSenhaInvalida: string = "Preencha o campo senha!";

  constructor(
    private _formBuilder: FormBuilder,
    private _loginService: LoginService,
    private _toastService: ToastrService) { }

  ngOnInit() {
    localStorage.clear();
    this.CreateValidationForm();
  }

  private CreateValidationForm() {
    this.form = this._formBuilder.group({
      login: ["", Validators.compose([Validators.required])],
      senha: ["", Validators.compose([Validators.required])]
    });
  }

  public OnClick_Logar() {
    if (this.form.valid) {
      this._loginService.FazerLogin(this.form.value.login, this.form.value.senha)
    } else {
      this._toastService.warning(MessagesEnum._000, TypeMessageEnum.Warning, {
        timeOut: 2000,
        positionClass: 'toast-bottom-right',
        progressBar: true
      });
    }
  }
}
