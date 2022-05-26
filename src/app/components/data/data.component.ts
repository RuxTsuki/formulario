import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';



@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styles: []
})
export class DataComponent implements OnInit {

  usuario: any = {
    nombrecompleto: {
      nombre: 'd',
      apellido: 'd'
    },
    correo: 'g',
    pasatiempos: ['correr', 'eeeeee']
  };
  forma: FormGroup;

  constructor() {


    this.forma = new FormGroup({
      nombrecompleto: new FormGroup({
        nombre: new FormControl(this.usuario[`nombrecompleto`].nombre, [Validators.required, Validators.minLength(5)]),
        apellido: new FormControl('', [Validators.required, this.noHerrera])
      }),
      correo: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$')]),
      pasatiempos: new FormArray([
        new FormControl('correr', Validators.required),
        new FormControl('eeeeeee')
      ]),
      password1: new FormControl('', [Validators.required]),
      password2: new FormControl(),
      username: new FormControl('', [Validators.required], this.existeUsuario)
    });
    // carga todo de forma automatica si es exactamente la misma estrucutra
    // this.forma.setValue(this.usuario);

    this.forma.controls[`password2`].setValidators([
      Validators.required,
      this.noIgual.bind(this.forma)
    ]);

    // devuelven un observable
    // me suscribo e imprimo, cadavez que cambia algo muestro data
    this.forma.controls[`username`].valueChanges.subscribe(data => {
      //console.log(data);
    });

    this.forma.controls[`username`].statusChanges.subscribe(data => {
      //console.log(data);
    });


  }

  ngOnInit() {
  }

  noHerrera(control: FormControl): { [s: string]: boolean } {
    if (control.value === 'herrera') {
      return { noherrera: true };
    }
    return null;
  }

  noIgual(control: FormControl): { [s: string]: boolean } {
    const forma: any = this;
    if (control.value !== forma.controls[`password1`].value) {
      return { noIgual: true };
    }
    return null;
  }

  existeUsuario(control: FormControl): any {
    const promesa = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          if (control.value === 'strider') {
            resolve({ existe: true });
          } else {
            resolve(null);
          }
        }, 3000);
      }
    );
    return promesa;
  }


  guardarCambios() {
    alert("Valores en consola open Devtools")

    console.log("form reactivo ",this.forma.value)

    this.forma.reset({
      nombrecompleto: {
        nombre: '',
        apellido: ''
      },
      correo: ''
    });

  }



}
