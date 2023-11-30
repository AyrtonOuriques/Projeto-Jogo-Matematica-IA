import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { generate } from 'rxjs';
import { Erro, FormService } from '../form.service';

@Component({
  selector: 'app-levelone',
  templateUrl: './levelone.component.html',
  styleUrl: './levelone.component.css',
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
    personagemUrl = "";
    nomeCrianca = "";
    pontuacao = 0;
    end = false;
    icons = [
    '../assets/imagens/icon1.png',
    '../assets/imagens/icon2.png',
    '../assets/imagens/icon3.png',
    '../assets/imagens/icon4.png',
    '../assets/imagens/icon5.png'
    ];
    currentIcons: string[] = [];


    constructor(private errorService: FormService) { }

    ngOnInit(): void {
      this.currentIcons = [this.icons[Math.floor(Math.random() * 4)], this.icons[Math.floor(Math.random() * 4)]];
      [this.personagemUrl, this.nomeCrianca] = this.errorService.passPersonagem();
      this.levelEmitter.emit(this.levelatual);
      [this.numero1, this.numero2] = this.generateRandomNumbers(this.levelatual);
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
    if (this.contador > 10 && this.levelatual<5){
      console.log("proximo level")
      this.contador = 1;
      this.levelatual += 1;
      this.levelEmitter.emit(this.levelatual);
      if (this.levelatual == 5){
        this.levelEmitter.emit(-1);
        this.end = true;
      }
      else{
        this.operatorarray = this.generateOperatorArray();
      }
    }
    this.currentIcons = [this.icons[Math.floor(Math.random() * 4)], this.icons[Math.floor(Math.random() * 4)]];
    [this.numero1, this.numero2] = this.generateRandomNumbers(this.levelatual);

  }

  generateRandomNumbers(type : number): [number, number] {
    if (type == 1){
      const primeiroNumero = Math.floor(Math.random() * 9) + 1
      if(!this.operatorarray[this.contador-1]){
        return [primeiroNumero, Math.floor(Math.random() * primeiroNumero) + 1]
      }
      return [primeiroNumero, Math.floor(Math.random() * 9) + 1]
    }
    else if (type == 2){
      return [Math.floor(Math.random() * 80) + 10, Math.floor(Math.random() * 9) + 1]
    }
    else if (type == 3){
      const primeiroNumero = Math.floor(Math.random() * 40) + 10
      if(!this.operatorarray[this.contador-1]){
        return [primeiroNumero, Math.floor(Math.random() * primeiroNumero) + 1]
      }
      return [primeiroNumero, Math.floor(Math.random() * 39) + 10]
    }
    else if (type == 4){
      const primeiroNumero = Math.floor(Math.random() * 50) + 1
      if(!this.operatorarray[this.contador-1]){
        return [primeiroNumero, Math.floor(Math.random() * primeiroNumero) + 1]
      }
      return [primeiroNumero, Math.floor(Math.random() * 49) + 1]
    }
    return [0,0]
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

  getIcons(index: number): string {
    return this.currentIcons[index]
  }

  reload(): void {
    window.location.reload();
  }

  

}
