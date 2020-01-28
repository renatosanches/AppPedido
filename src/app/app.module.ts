/* 
* App Pedido - XP IT Tecnologia - Front End
* Typescript
* Modulo principal: reposnsavel por injetar todas
* Dev: Renato Sanches
*/

//Todas as classes utilizadas no modulo devem ser importadas no import

import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CategoriaService } from '../services/domain/categoria.service';

@NgModule({
  //São as paginas, classes e componentes de um modulo
  declarations: [
    MyApp    
  ],
  imports: [
    //lista de modulos que sao importados pelo modulo (NgModule)
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    //que segue a mesma linha do declarations
    MyApp
  ],
  providers: [
    //declara as classes no qual os objetos injetados utilizem a mesma instancia
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    CategoriaService
  ]
})
export class AppModule {}
