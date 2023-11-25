import { Component, EventEmitter, Output } from '@angular/core';
import { FormService } from '../form.service';

@Component({
  selector: 'app-initial',
  templateUrl: './initial.component.html',
  styleUrl: './initial.component.css'
})
export class InitialComponent {

  constructor(private errorService: FormService) { }

  data = [
    {
      url: '../assets/imagens/crianca1.jpeg',
      name: "Criança indígena"
    },
    {
      url: '../assets/imagens/crianca2.jpeg',
      name: "Criança indígena"
    },
    {
      url: '../assets/imagens/crianca3.jpeg',
      name: "Criança quilombola"
    },
    {
      url: '../assets/imagens/crianca4.jpeg',
      name: "Criança quilombola"
    },
    {
      url: '../assets/imagens/crianca5.jpeg',
      name: "Criança ribeirinha"
    },
    {
      url: '../assets/imagens/crianca6.jpeg',
      name: "Criança ribeirinha"
    },
    {
      url: '../assets/imagens/crianca7.jpeg',
      name: "Criança guerreira"
    },
    {
      url: '../assets/imagens/crianca8.jpeg',
      name: "Criança guerreira"
    },
  ];

  trigger = 0;
  displayUrl = '../assets/imagens/crianca1.jpeg';
  displayName = "Criança indígena";
  settings = false;
  @Output() levelEmitter = new EventEmitter<number>();

  checkPlay(): void{
    this.trigger += 1;
    if (this.trigger == 2){
      this.errorService.getPersonagem(this.displayUrl, this.displayName);
      this.levelEmitter.emit(this.trigger);
    }
  }

  passCurrentSong(song: string) : void{
    this.errorService.passCurrentSong(song);
  }

}
