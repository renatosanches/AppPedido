import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/categoria.service';
import { CategoriaDTO } from '../../models/categoria.dto';
import { API_CONFIG } from '../../config/api.config';


/* 
* App Pedido - XP IT Tecnologia - Front End
* Typescript
* Classe: CategoriasPage
* Dev: Renato Sanches
*/

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  bucketUrl: string = API_CONFIG.bucketBaseUrl;

  //Colecao de categorias
  items: CategoriaDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public categoriaService: CategoriaService) {
  }

  ionViewDidLoad() {
    this.categoriaService.findAll()
      .subscribe(response => {
        this.items = response;
      },
      error => {});
    }

    //Mostra Pagina de produto passando o codigo da categoria com push
    showProdutos(categoria_id : string) {
      this.navCtrl.push('ProdutosPage', {categoria_id: categoria_id});     
    }

  }
