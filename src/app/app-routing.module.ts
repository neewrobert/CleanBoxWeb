import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MinhaCaixaDaguaComponent } from './components/minha-caixa-dagua/minha-caixa-dagua.component';
import { QuemSomosComponent } from './components/quem-somos/quem-somos.component';
import { AuthGuardService } from './services/auth/auth-guard.service';


const appRoutes: Routes = [  
  {
    path: '',
    component: LoginComponent
  },
  {
      path: '',
      redirectTo: '', 
      pathMatch: 'full',
  },    
  {
      path: 'login',
      component: LoginComponent
  },  
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'minha-caixa-dagua',
    component: MinhaCaixaDaguaComponent,
    canActivate: [AuthGuardService]
  },
  // {
  //   path: 'quem-somos',
  //   component: QuemSomosComponent
  // },
  {
      path: '**',
      component: LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
