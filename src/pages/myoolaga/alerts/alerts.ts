import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {HireHelperPage} from '../../hire-helper/hire-helper';
@Component({
  selector: 'page-alerts',
  templateUrl: 'alerts.html'
})
export class AlertsPage {
  //tabBarElement: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	/*this.tabBarElement = document.querySelector('.tabbar.show-tabbar');
    this.tabBarElement.style.display = 'none';*/
  }
  /*ionViewWillEnter() {
    this.tabBarElement.style.display = 'none';
  }
  ionViewWillLeave() {
    this.tabBarElement.style.display = 'flex';
  }
  takeMeBack() {
    this.navCtrl.parent.select(0);
  }*/

  selectedcard(){
  	this.navCtrl.push(HireHelperPage);
  }

}
