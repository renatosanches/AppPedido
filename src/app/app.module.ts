//Todas as classes utilizadas no modulo devem ser importadas no import

import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  //São as paginas, classes e componentes de um modulo
  declarations: [
    MyApp,
    HomePage    
  ],
  imports: [
    //lista de modulos que sao importados pelo modulo (NgModule)
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    //que segue a mesma linha do declarations
    MyApp,
    HomePage
  ],
  providers: [
    //declara as classes no qual os objetos injetados utilizem a mesma instancia
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
