import { Injectable, HostListener, EventEmitter } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class MinhaCaixaDaguaService {  

  constructor(private _apiService: ApiService, private httpClient: HttpClient) { }

  public GetGraph(dataInicial: string, dataFinal: string) {
    return this._apiService.get(`/buscaporperiodo/?dataFinal=${dataFinal}&dataInicial=${dataInicial}`);
  }
}