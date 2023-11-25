import { Component, OnInit } from '@angular/core';
import { Erro, FormService } from '../form.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrl: './form.component.css'
})
export class FormComponent implements OnInit{
  constructor(private errorService: FormService) { }

  erros: Erro[] = [];
  
  ngOnInit(): void {
    this.erros = this.errorService.passErrors();
  }

}
