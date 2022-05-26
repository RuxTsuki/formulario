import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';

@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styles: [`
    .ng-invalid.ng-touched:not(form) {
      border: 1px solid #dc3545;
    }
  `]
})
export class TemplateComponent implements OnInit {
  mostrarCamposNecesarios = false;
  usuario: any = {
    nombre: '',
    apellido: null,
    email: null,
    pais: '',
    sexo: null,
    acepta: false
  };

  paises = [{
    codigo: 'KR',
    nombre: 'Corea del sur'
  },
  {
    codigo: 'ESP',
    nombre: 'España'
  },
  {
    codigo: 'COL',
    nombre: 'Colombia'
  }];

  constructor() { }

  ngOnInit() {
  }

  validar(form: NgForm) {
    if (!form.value.nombre || !form.value.apellido || !form.value.email) {
      this.mostrarCamposNecesarios = true;
    }
  }

  onSubmit(form: NgForm) {
    console.log('jiji enviando');
    console.log(form);
  }


}
