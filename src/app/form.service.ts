import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


export interface Erro {
  numero1: number;
  numero2: number;
  operator: string;
  resultado: number;
  resultadoesperado: number;
  margemdeerro: number;
  levelatual: number;
}


@Injectable({
  providedIn: 'root'
})
export class FormService {

  constructor() { }

  personagem = "";
  nome = "";
  songUrl: Subject<string> = new Subject<string>();


  getPersonagem(url: string, name :string): void{
    this.personagem = url;
    this.nome = name;
  }

  passPersonagem(): [string, string]{
    return [this.personagem, this.nome];
  }

  passCurrentSong(value: string): void{
    this.songUrl.next(value);
  }

  getCurrentSong(): Observable<string>{
    return  this.songUrl.asObservable();
  }
}
