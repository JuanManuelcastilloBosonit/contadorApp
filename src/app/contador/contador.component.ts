import { ThisReceiver } from '@angular/compiler';
import { Component } from '@angular/core';
import { interval, Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-contador',
  templateUrl: './contador.component.html',
  styleUrls: ['./contador.component.css']
})
export class ContadorComponent  {

  valor:number=0
  contador:number=0
  funciona:boolean=false
  cuentaArriba: boolean=true
  intervalo= interval(1000);
  aumentar=new Subject<boolean>()
  constructor() { }

  iniciar(){
    this.funciona=true;
    this.funcionar()
  }
  pausar(){
    this.funciona=false
    this.aumentar.next(false)
  }
  reset(){
    this.contador=0
    this.pausar()
  }
  contarArriba(){
    this.cuentaArriba=true
    this.funcionar()
  } 
  contarAbajo(){
    this.cuentaArriba=false
    this.funcionar()
  }
  funcionar(){
    if(this.funciona){
      if(this.cuentaArriba===true){
        this.aumentar.next(true)
        this.intervalo
          .pipe(takeUntil(this.aumentar))
          .subscribe(val => this.contador+=this.valor)
      }else if(this.cuentaArriba===false){
        this.aumentar.next(false)
        this.intervalo
          .pipe(takeUntil(this.aumentar))
          .subscribe(val => this.contador-=this.valor)
      }
    }
  }

}
