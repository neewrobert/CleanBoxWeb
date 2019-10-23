import { BrowserModule } from '@angular/platform-browser';
import { NgModule, LOCALE_ID } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginModule } from './components/login/login.module';
import { registerLocaleData, LocationStrategy, HashLocationStrategy } from '@angular/common';
import localePt from '@angular/common/locales/pt';
import { SharedModule } from './components/shared/shared.module';
import { HomeModule } from './components/home/home.module';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MinhaCaixaDaguaModule } from './components/minha-caixa-dagua/minha-caixa-dagua.module';
import { QuemSomosModule } from './components/quem-somos/quem-somos.module';
import { AuthGuardService } from './services/auth/auth-guard.service';

registerLocaleData(localePt, 'pt-BR');

import {
  MqttModule,
  IMqttServiceOptions
} from 'ngx-mqtt';
import { ApiService } from './services/api.service';
import { HttpClientModule } from '@angular/common/http';

export const MQTT_SERVICE_OPTIONS: IMqttServiceOptions = {
  hostname: 'soldier.cloudmqtt.com',
  port: 31425,
  username: 'sctjsukp',
  password: '3uZyReh212Pd',
  protocol: 'wss'
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    LoginModule,
    HomeModule,
    QuemSomosModule,
    MinhaCaixaDaguaModule,
    SharedModule,
    ToastrModule.forRoot(),
    MqttModule.forRoot(MQTT_SERVICE_OPTIONS),
    HttpClientModule
  ],
  providers: [
    {
      provide: LocationStrategy, 
      useClass: HashLocationStrategy
    },
    {
      provide: LOCALE_ID,
      useValue: 'pt-BR'
    },
    AuthGuardService,
    ApiService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
