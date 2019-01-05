import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http'
import {ENV} from '../../app/env'
@Component({
  selector: 'page-cancellation',
  templateUrl: 'cancellation.html'
})
export class CancellationPage {
	http;
  constructor(http:Http,public navCtrl: NavController, public navParams: NavParams) {
  	this.http=http;
  }

  ionViewDidLoad() {
    console.log('Cancellation Page');
    this.http.get(ENV.api+'/webservicecancellationPolicy').subscribe(data=>{
    	if(JSON.parse(data._body).response=true){
    		console.log(JSON.parse(data._body))
    	}
    })
  }

}
