import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MyoolagaPage } from '../myoolaga/myoolaga'
import { InAppBrowser } from "@ionic-native/in-app-browser";

/*
  Generated class for the CustomerThankYou page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-customer-thank-you',
  templateUrl: 'customer-thank-you.html'
})
export class CustomerThankYouPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private iab: InAppBrowser) {}


  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerThankYouPage');
  }


  onMyOolaga(){
  	this.navCtrl.setRoot(MyoolagaPage);
  }
	openPlaystore(){
	 	this.iab.create('https://play.google.com/store?hl=en');
	}
}
