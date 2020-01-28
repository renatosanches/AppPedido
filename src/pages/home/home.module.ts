import { IonicPageModule } from 'ionic-angular/module';
import { NgModule } from '@angular/core';
import { HomePage } from './home';

// É importante que declarations e export class tenham o mesmo nome, no caso : HomePage ,assim como na classe home.ts


@NgModule({
  declarations: [HomePage],
  imports: [IonicPageModule.forChild(HomePage)]
})
export class HomeModule {
}