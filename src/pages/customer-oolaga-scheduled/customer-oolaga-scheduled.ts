import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MyoolagaPage } from '../myoolaga/myoolaga'

/*
  Generated class for the CustomerOolagaScheduled page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-customer-oolaga-scheduled',
  templateUrl: 'customer-oolaga-scheduled.html'
})
export class CustomerOolagaScheduledPage {
 helper_data
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	
  	this.helper_data=this.navParams.get('data')
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomerOolagaScheduledPage');
  }
  
    onMyoolaga(){
  	this.navCtrl.setRoot(MyoolagaPage)
  }
  
    titleCase(str){
if(str){
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}else{
	return "";
}

}

}
