import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MqttService, IMqttMessage } from 'ngx-mqtt';
import { MinhaCaixaDaguaService } from './minha-caixa-dagua.service';
import { error } from 'util';
import { ToastrService } from 'ngx-toastr';
import { MessagesEnum } from '../shared/core/helpers/MessagesEnum';
import { TypeMessageEnum } from '../shared/core/helpers/TypeMessageEnum';

@Component({
  selector: 'app-minha-caixa-dagua',
  templateUrl: './minha-caixa-dagua.component.html',
  styleUrls: ['./minha-caixa-dagua.component.scss']
})
export class MinhaCaixaDaguaComponent implements OnInit, OnDestroy {

  private subscription: Subscription;
  public message: string;

  dataInicial;
  dataFinal;

  type = 'bar';

  bgSuccess = "rgb(50, 168, 82)";
  bgWarning = "rgb(255, 132, 0)";
  bgAtention = "rgb(168, 50, 50)";

  dataNTU;
  dataPH;

  valorPH = 0;
  valorNTU = 0;

  options = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      point: { hitRadius: 5, hoverRadius: 5, radius: 0 }
    },
    tooltips: {
      mode: 'index',
      intersect: true
    },
    legend: {
      display: false
    }
  };

  showSpinnerGraphpH: boolean = false;
  errorGraphpH: boolean = true;

  showSpinnerGraphNTU: boolean = false;
  errorGraphNTU: boolean = true;

  constructor(
    private _mqttService: MqttService,
    private _minhaCaixaDaguaService: MinhaCaixaDaguaService,
    private _toastService: ToastrService) {
    this.subscription = this._mqttService.observe('dados').subscribe((message: IMqttMessage) => {
      let valoresTempoReal = message.payload.toString().split("|");
      this.valorPH = parseInt(parseInt(valoresTempoReal[0]).toFixed(0));
      this.valorNTU = parseInt(parseInt(valoresTempoReal[1]).toFixed(0));
    });
  }

  ngOnInit() {

  }

  changeData() {
    this.showSpinnerGraphpH = true;
    this.showSpinnerGraphNTU = true;

    if (this.dataInicial == null || this.dataInicial == '' || this.dataInicial == "" || this.dataInicial == undefined) {
      this.errorGraphpH = true; 
      this.errorGraphNTU = true; 

      this._toastService.error(MessagesEnum._003, TypeMessageEnum.Warning, {
        timeOut: 2000,
        positionClass: 'toast-bottom-right',
        progressBar: true
      });
    } else if (this.dataFinal == null || this.dataFinal == '' || this.dataFinal == "" || this.dataFinal == undefined) {
      this.errorGraphpH = true; 
      this.errorGraphNTU = true; 

      this._toastService.error(MessagesEnum._004, TypeMessageEnum.Warning, {
        timeOut: 2000,
        positionClass: 'toast-bottom-right',
        progressBar: true
      });
    } else if ((this.dataFinal == null || this.dataFinal == '' || this.dataFinal == "" || this.dataFinal == undefined) && (this.dataInicial == null || this.dataInicial == '' || this.dataInicial == "" || this.dataInicial == undefined)) {
      this.errorGraphpH = true; 
      this.errorGraphNTU = true; 

      this._toastService.error(MessagesEnum._005, TypeMessageEnum.Warning, {
        timeOut: 2000,
        positionClass: 'toast-bottom-right',
        progressBar: true
      });
    } else {
      this._minhaCaixaDaguaService.GetGraph(this.dataInicial, this.dataFinal).subscribe(
        data => {

          if (data == null || data == '' || data == "" || data == undefined) {
            this.errorGraphpH = true; 
            this.errorGraphNTU = true; 

            this._toastService.error(MessagesEnum._002, TypeMessageEnum.Error, {
              timeOut: 2000,
              positionClass: 'toast-bottom-right',
              progressBar: true
            });
          } else if (data.length >= 1) {
            this.errorGraphpH = false;
            this.errorGraphNTU = false;

            data.forEach(dia => {
              let date = new Date(dia.data);

              dia.data = ('0' + (date.getDate() + 1)).slice(-2) + '/' + 
                         ('0' + (date.getMonth() + 1)).slice(-2) + '/' +
                         date.getFullYear();

              dia.detalhesDia.forEach(detalhe => {
                if (detalhe.ntu > 350) {
                  detalhe.bgColorNTU = this.bgSuccess;
                } else if (detalhe.ntu > 280 && detalhe.ntu < 350) {
                  detalhe.bgColorNTU = this.bgWarning;
                } else if (detalhe.ntu < 280) {
                  detalhe.bgColorNTU = this.bgAtention;
                }

                if (detalhe.ph < 6 || detalhe.ph > 9) {
                  detalhe.bgColorPH = this.bgAtention;
                } else {
                  detalhe.bgColorPH = this.bgSuccess;
                }
              });  
            });

            this.dataNTU = {
              labels: data.map(x => x.data),
              datasets: [{
                label: 'Manhã',
                backgroundColor: data.map(x => x.detalhesDia.filter(x => x.periodo == "MANHA").map(y => y.bgColorNTU)),
                borderColor: data.map(x => x.detalhesDia.filter(x => x.periodo == "MANHA").map(y => y.bgColorNTU)),
                hoverBackgroundColor: data.map(x => x.detalhesDia.filter(x => x.periodo == "MANHA").map(y => y.bgColorNTU)),
                data: data.map(x => x.detalhesDia.filter(x => x.periodo == "MANHA").map(y => y.ntu.toFixed(2))),
                fill: false
              },
              {
                label: 'Tarde',
                backgroundColor: data.map(x => x.detalhesDia.filter(x => x.periodo == "TARDE").map(y => y.bgColorNTU)),
                borderColor: data.map(x => x.detalhesDia.filter(x => x.periodo == "TARDE").map(y => y.bgColorNTU)),
                hoverBackgroundColor: data.map(x => x.detalhesDia.filter(x => x.periodo == "TARDE").map(y => y.bgColorNTU)),
                data: data.map(x => x.detalhesDia.filter(x => x.periodo == "TARDE").map(y => y.ntu.toFixed(2))),
                fill: false
              },
              {
                label: 'Noite',
                backgroundColor: data.map(x => x.detalhesDia.filter(x => x.periodo == "NOITE").map(y => y.bgColorNTU)),
                borderColor: data.map(x => x.detalhesDia.filter(x => x.periodo == "NOITE").map(y => y.bgColorNTU)),
                hoverBackgroundColor: data.map(x => x.detalhesDia.filter(x => x.periodo == "NOITE").map(y => y.bgColorNTU)),
                data: data.map(x => x.detalhesDia.filter(x => x.periodo == "NOITE").map(y => y.ntu.toFixed(2))),
                fill: false
              }],
            };
            
            this.dataPH = {
              labels: data.map(x => x.data),
              datasets: [{
                label: 'Manhã',
                backgroundColor: data.map(x => x.detalhesDia.filter(x => x.periodo == "MANHA").map(y => y.bgColorPH)),
                borderColor: data.map(x => x.detalhesDia.filter(x => x.periodo == "MANHA").map(y => y.bgColorPH)),
                hoverBackgroundColor: data.map(x => x.detalhesDia.filter(x => x.periodo == "MANHA").map(y => y.bgColorPH)),
                data: data.map(x => x.detalhesDia.filter(x => x.periodo == "MANHA").map(y => y.ph.toFixed(2))),
                fill: false
              },
              {
                label: 'Tarde',
                backgroundColor: data.map(x => x.detalhesDia.filter(x => x.periodo == "TARDE").map(y => y.bgColorPH)),
                borderColor: data.map(x => x.detalhesDia.filter(x => x.periodo == "TARDE").map(y => y.bgColorPH)),
                hoverBackgroundColor: data.map(x => x.detalhesDia.filter(x => x.periodo == "TARDE").map(y => y.bgColorPH)),
                data: data.map(x => x.detalhesDia.filter(x => x.periodo == "TARDE").map(y => y.ph.toFixed(2))),
                fill: false
              },
              {
                label: 'Noite',
                backgroundColor: data.map(x => x.detalhesDia.filter(x => x.periodo == "NOITE").map(y => y.bgColorPH)),
                borderColor: data.map(x => x.detalhesDia.filter(x => x.periodo == "NOITE").map(y => y.bgColorPH)),
                hoverBackgroundColor: data.map(x => x.detalhesDia.filter(x => x.periodo == "NOITE").map(y => y.bgColorPH)),
                data: data.map(x => x.detalhesDia.filter(x => x.periodo == "NOITE").map(y => y.ph.toFixed(2))),
                fill: false
              }],
            };   
          }

          this.showSpinnerGraphpH = false;
          this.showSpinnerGraphNTU = false;
        },
        error => {
          this.errorGraphpH = true;
          this.errorGraphNTU = true;

          this._toastService.error(error, TypeMessageEnum.Error, {
            timeOut: 2000,
            positionClass: 'toast-bottom-right',
            progressBar: true
          });
        });        
    }

  }

  public unsafePublish(topic: string, message: string): void {
    this._mqttService.unsafePublish(topic, message, {qos: 1, retain: true});
  }

  public ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
