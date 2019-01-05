import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the FillStorePickUpDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-fill-store-pick-up-detail',
  templateUrl: 'fill-store-pick-up-detail.html'
})
export class FillStorePickUpDetailPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad FillStorePickUpDetailPage');
  }

}
