import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
@Component({
  selector: 'page-open-item-pic',
  templateUrl: 'open-item-pic.html'
})
export class OpenItemPicPage {
	pic
  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad OpenItemPic');
    this.pic = this.navParams.get('pic');
  }

}
