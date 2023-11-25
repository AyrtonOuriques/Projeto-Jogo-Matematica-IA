import { Component, OnInit } from '@angular/core';
import { FormService } from './form.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'app';
  levelatual = 0;
  currentSong = "" 

  constructor(private errorService: FormService) { }

  ngOnInit(): void {
    this.errorService.getCurrentSong().subscribe((value) => {
      this.currentSong = value;
    });
  }


  getImage(): any{

    return {
      'background-image': this.levelatual === 0 ? 'url("../../assets/imagens/background.jpeg")' : 
      this.levelatual === 1 ? 'url("../../assets/imagens/level1.jpeg")' : 
      this.levelatual === 2 ? 'url("../../assets/imagens/level2.jpeg")' : 
      this.levelatual === 3 ? 'url("../../assets/imagens/level3.jpeg")' : 
      this.levelatual === 4 ? 'url("../../assets/imagens/level4.jpeg")' :
      this.levelatual === 5 ? 'url("../../assets/imagens/background.jpeg")' : "none",
      'transition': 'background-image 0.5s ease-in-out'
    };
  }

}
