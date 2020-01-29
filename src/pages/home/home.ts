/* 
* App Pedido - XP IT Tecnologia - Front End
* Typescript
* Classe: Controlador : HomePage
* Dev: Renato Sanches
*/

import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';
// Controlador da view que é o home.html
// o Component faz com que o 

//o @IonicPage() referencia que 
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds : CredenciaisDTO = {
    email: "",
    senha: ""
  };

// No construtor é que sao injetadas as dependencias como NavController e MenuController
constructor(
  public navCtrl: NavController, 
  public menu: MenuController,
  public auth: AuthService) {
  }

  //Desabilita o menu quando entrar na pagina / evita arrastar do menu
  ionViewWillEnter() {
    this.menu.swipeEnable(false);
  }

  //Habilita o menu quando sair na pagina
  ionViewDidLeave() {
    this.menu.swipeEnable(true);
  }

  //evento ionViewDidEnter chama o refresh token - verifica se o token é valido e carrega as  credenciais 
  ionViewDidEnter() {
    this.auth.refreshToken()
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('CategoriasPage');
      },
      error => {});  
  }

  //chama authenticate no método login
  //No login acessa CategoriasPage
  login() {
    this.auth.authenticate(this.creds)
      .subscribe(response => {
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.navCtrl.setRoot('CategoriasPage');
      },
      error => {});    
  }

}
