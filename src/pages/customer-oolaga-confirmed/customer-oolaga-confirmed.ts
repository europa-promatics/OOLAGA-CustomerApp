import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MyoolagaPage } from '../myoolaga/myoolaga'

/*
  Generated class for the CustomerOolagaConfirmed page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-customer-oolaga-confirmed',
  templateUrl: 'customer-oolaga-confirmed.html'
})
export class CustomerOolagaConfirmedPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerOolagaConfirmedPage');
  }


  onMyoolaga(){
  	this.navCtrl.setRoot(MyoolagaPage)
  }

}
