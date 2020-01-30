import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { API_CONFIG } from '../../config/api.config';
import { ProdutoService } from '../../services/domain/produto.service';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items : ProdutoDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    // Carrega produtos conforme a categoria categoria_id
    let categoria_id = this.navParams.get('categoria_id');
    this.produtoService.findByCategoria(categoria_id)
      .subscribe(response => {
        // traz so o atributo content do backend
        this.items = response['content'];
        //carrega as imagens dos produtos
        this.loadImageUrls();
      },
      error => {});
  }
// metodo que carrega imagens dos produtos do bucket aws
  loadImageUrls() {
    for (var i=0; i<this.items.length; i++) {
      let item = this.items[i];
      this.produtoService.getSmallImageFromBucket(item.id)
        .subscribe(response => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.id}-small.jpg`;
        },
        error => {});
    }
  }  
      
}