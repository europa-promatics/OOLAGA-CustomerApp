import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { InAppBrowser } from "@ionic-native/in-app-browser";


/*
  Generated class for the Helper page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-helper',
  templateUrl: 'helper.html'
})
export class HelperPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private iab: InAppBrowser) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad HelperPage');
  }
  
  openPage(){
	  this.iab.create('http://18.188.229.2/oolaga-french/applyashelper');
  }

}
