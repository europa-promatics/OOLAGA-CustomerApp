import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import {ENV} from '../../app/env'

@Component({
  selector: 'page-termsof-service',
  templateUrl: 'termsof-service.html'
})
export class TermsofServicePage {
  http;
  constructor(http:Http,public navCtrl: NavController, public navParams: NavParams) {
	this.http=http;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TermsofServicePage');
    this.http.get(ENV.api+'/webservicetermsCondition').subscribe(data=>{
    	if(JSON.parse(data._body).response=true){
    		console.log(JSON.parse(data._body))
    	}
    })
  }

}
