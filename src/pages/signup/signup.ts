import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder) {

    this.formGroup = this.formBuilder.group({
      // Colocando valores preenchidos para agilizar os testes
      nome: ['Renato', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['renato.sanches@xpit.com.br', [Validators.required, Validators.email]],
      tipo : ['1', [Validators.required]],
      cpfOuCnpj : ['06134596280', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      senha : ['123', [Validators.required]],
      logradouro : ['Av Tucuruvi', [Validators.required]],
      numero : ['100', [Validators.required]],
      complemento : ['Conjunto 101', []],
      bairro : ['Tucuruvi', []],
      cep : ['02017000', [Validators.required]],
      telefone1 : ['977261827', [Validators.required]],
      telefone2 : ['', []],
      telefone3 : ['', []],
      estadoId : [null, [Validators.required]],
      cidadeId : [null, [Validators.required]]      
    });
  }

  signupUser() {
    console.log("enviou o form");
  }

}
