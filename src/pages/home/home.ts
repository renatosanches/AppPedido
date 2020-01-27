import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
// Controlador da view que é o home.html
// o Component faz com que o 

//o @IonicPage() referencia que 
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }

}
