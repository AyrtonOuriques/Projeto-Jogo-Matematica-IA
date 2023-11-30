import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { generate } from 'rxjs';
import { trigger, style, animate, transition, state } from '@angular/animations';
import { Erro, FormService } from '../form.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

export interface Requisicao {
  numeros: number[];
}


@Component({
  selector: 'app-levelone',
  templateUrl: './levelone.component.html',
  styleUrl: './levelone.component.css',
  animations: [
    trigger('fade', [
      state('show', style({ opacity: '1' })),
      state('hide', style({ opacity: '0' })),
      transition('show => hide', animate('1s')),
      transition('hide => show', animate('1s')),
    ]),
  ]
})
export class LeveloneComponent implements OnInit{
    numero1 = 0;
    numero2 = 0;
    resposta?: number;
    contador = 1;
    operatorarray: number[] = this.generateOperatorArray();
    levelatual = 1;
    @Output() levelEmitter = new EventEmitter<number>();
    resultadoesperado?: number;
    erros: Erro[] = [];
    timeLeft: number = 10;
    timer: any;
    images = [
      {
        url: '../assets/imagens/solacordado.png',
        state: 'show',
      },
      {
        url: '../assets/imagens/soldormindo.png',
        state: 'hide',
      }
    ];
    personagemUrl = "";
    nomeCrianca = "";
    pontuacao = 0;
    end = false;
    resultsAnalized = false;
    reviewNumbers: number[] = [];
    requestInfo:any;

    constructor(private errorService: FormService, private http: HttpClient) { }

    ngOnInit(): void {
      [this.personagemUrl, this.nomeCrianca] = this.errorService.passPersonagem();
      this.levelEmitter.emit(this.levelatual);
      [this.numero1, this.numero2] = this.generateRandomNumbers(this.levelatual);
      this.startTimer();
    }

  calculo(): void {
    if (this.resposta && !isNaN(+this.resposta)){       
      //console.log('OK button clicked! Entered text: ', this.resposta);
      if(this.operatorarray[this.contador - 1]){
        this.resultadoesperado = this.numero1 + this.numero2;
        if (this.resultadoesperado == this.resposta){
          console.log("acertou");
          this.pontuacao += 1;
        }
        else{
          console.log("errou");
        }
        this.erros.push({
          numero1: this.numero1,
          numero2: this.numero2,
          operator: "+",
          resultado: this.resposta,
          resultadoesperado: this.resultadoesperado,
          margemdeerro: Math.abs(this.resultadoesperado - this.resposta),
          levelatual: this.levelatual
        })
      }
      else{
        this.resultadoesperado = this.numero1 - this.numero2;
        if (this.resultadoesperado == this.resposta){
          console.log("acertou");
          this.pontuacao += 1;
        }
        else{
          console.log("errou");
          this.erros.push({
            numero1: this.numero1,
            numero2: this.numero2,
            operator: "-",
            resultado: this.resposta,
            resultadoesperado: this.resultadoesperado,
            margemdeerro: Math.abs(this.resultadoesperado - this.resposta),
            levelatual: this.levelatual
          })
        }
      }
      this.contador +=1;
    }
    else{
      alert('Por favor digite um número válido');
    }
    //console.log(this.erros);
    this.resposta = undefined;
    if (this.contador > 10 && this.levelatual < 5) {
      console.log("proximo level")
      this.contador = 1;
      this.levelatual += 1;
      this.levelEmitter.emit(this.levelatual);
      if (this.levelatual == 5) {
        this.end = true;
      }
      else{
        this.operatorarray = this.generateOperatorArray();
      }
    }
    if(this.end) {
      this.analizeResults();
    }
    this.showNext();
    clearInterval(this.timer);
    this.timeLeft = 10;
    this.startTimer();
    [this.numero1, this.numero2] = this.generateRandomNumbers(this.levelatual);

  }

  generateRandomNumbers(type : number): [number, number] {
    if (type == 1){
      return [Math.floor(Math.random() * 9) + 1, Math.floor(Math.random() * 9) + 1]
    }
    else if (type == 2){
      return [Math.floor(Math.random() * 90) + 11, Math.floor(Math.random() * 9) + 1]
    }
    else if (type == 3){
      return [Math.floor(Math.random() * 40) + 11, Math.floor(Math.random() * 39) + 11]
    }
    else if (type == 4){
      return [Math.floor(Math.random() * 50) + 1, Math.floor(Math.random() * 49) + 1]
    }
    //console.log(this.erros);
    return this.generateReviewQuestion()
  }

  generateReviewQuestion(): [number, number] {

    let reviewQuestion: [number, number] = [0, 0];
    let a, b = 0;
    let temp = 0;

    if(!this.resultsAnalized) {
      this.analizeResults();
      this.resultsAnalized = true;
    }

    if(this.reviewNumbers.length == 0) {
      this.resultsAnalized = false;
    } else {
      a = Math.abs(this.reviewNumbers.pop() || 0);
      b = Math.abs(this.reviewNumbers.pop() || 0);
      if(a < b) {
        temp = a;
        a = b;
        b = temp;
      }

      reviewQuestion = [a, b];
    }

    if(reviewQuestion[0] == 0) {
      reviewQuestion[0] = Math.floor(Math.random() * 50) + 1
    }

    if(reviewQuestion[1] == 0) {
      reviewQuestion[1] = Math.floor(Math.random() * 49) + 1
    }

    return reviewQuestion;
  }

  analizeResults() {
    this.getPrediction();  
  }

  getPrediction() {

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', '*/*');
    headers.append('Accept-Encoding', 'gzip, deflate, br');
    headers.append('Connection', 'keep-alive')
    
    try {
      this.http.post<Requisicao>('http://localhost:8081/api/predict', this.erros, { headers: headers}).subscribe((response) =>{
        this.reviewNumbers = [...response.numeros];
        console.log(response);
        console.log(this.reviewNumbers);
      })
    } catch (error) {
      console.error(error)
      throw error;  
    }
  }

  generateOperatorArray(): number[] {
    const array: number[] = [];

    for (let i = 0; i < 5; i++) {
      array.push(0);
      array.push(1);
    }
    
    for (let i = 9; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements
    }
    //console.log(array);
    return array;
  }

  changePreview(): string{
    return this.levelatual == 1 ? '../assets/imagens/level1p.png' :
    this.levelatual == 2 ? '../assets/imagens/level2p.png' :
    this.levelatual == 3 ? '../assets/imagens/level3p.png' :
    this.levelatual >= 4 ? '../assets/imagens/level4p.png' : ""
  }

  reload(): void {
    window.location.reload();
  }

  showNext() {
    this.images[0].state = this.images[0].state === 'hide' ? 'show' : 'hide';
    this.images[1].state = this.images[1].state === 'show' ? 'hide' : 'show';
  }


  startTimer() {
    this.timer = setInterval(() => {
      if(this.timeLeft > 0) {
        this.timeLeft--;
        if (this.timeLeft==5){
          this.showNext();
        }
      } else {
        this.timeLeft = 10;
      }
    },1000)
  } 
  

}
