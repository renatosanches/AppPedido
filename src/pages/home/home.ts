/* 
* App Pedido - XP IT Tecnologia - Front End
* Typescript
* Classe: HomePage
* Dev: Renato Sanches
*/

import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
// Controlador da view que é o home.html
// o Component faz com que o 

//o @IonicPage() referencia que 
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
// No construtor é que sao injetadas as dependencias como NavController e MenuController
  constructor(public navCtrl: NavController, public menu: MenuController) {
  }

  //Desabilita o menu quando entrar na pagina / evita arrastar do menu
  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  //Habilita o menu quando sair na pagina
  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  //No login acessa CategoriasPage
  login() {
    this.navCtrl.setRoot('CategoriasPage');
  }

}
