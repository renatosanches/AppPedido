import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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
    public produtoService: ProdutoService,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    // Carrega produtos conforme a categoria categoria_id
    let categoria_id = this.navParams.get('categoria_id');
    let loader = this.presentLoading();
    this.produtoService.findByCategoria(categoria_id)
      .subscribe(response => {
        // traz so o atributo content do backend
        this.items = response['content'];
        //Fecha Tela de Espera
        loader.dismiss();
        //carrega as imagens dos produtos
        this.loadImageUrls();
      },
      error => {
        //Fecha Tela de Espera
        loader.dismiss();
      });
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
  //metodo para abrir a pagina de detalhes do produto 
  showDetail(produto_id : string) {
    this.navCtrl.push('ProdutoDetailPage', {produto_id: produto_id});
  }   
  
  // Chama Tela de Espera
  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

  // Faz refresh para recarregar os dados quando chega no topo de pagina
  doRefresh(refresher) {
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

}