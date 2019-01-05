import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import {ENV} from '../../app/env'
@Component({
  selector: 'page-edit-location-detail',
  templateUrl: 'edit-location-detail.html'
})
export class EditLocationDetailPage {
  http
  location_id;
  location;
  unit_nu:number;
  stairs:number;
  elevator:boolean=false;
  ride:boolean=false;
  parking_info:string;
  data
  location_nu
  constructor(public loadingCtrl:LoadingController,http:Http,public navCtrl: NavController, public navParams: NavParams) {
  	this.http=http;
  	this.location_id = this.navParams.get('location_id')
  	this.location = this.navParams.get('location_data')
  	this.location_nu = this.navParams.get('value')
  	console.log(this.location)
  	console.log(this.location_id)
  	this.data=JSON.parse(localStorage['locations']);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditLocationDetailPage');
  }
	submit(value)
	{ 
	    if(value==0){
	      this.navCtrl.pop()
	    }
	    else if(value==1){
	    	let loader = this.loadingCtrl.create();
    		loader.present();
	   	  	var link1=ENV.api+'/webserviceeditLocation';
              this.http.post(link1,{location:this.location_id,
              						unit_nu:this.unit_nu,
              						stairs:this.stairs,
              						elevator:this.elevator,
              						ride:this.ride,
              						parking_info:this.parking_info
                                   }
                ).subscribe(data=>{
                if(JSON.parse(data._body).response==true){
                	console.log(this.data)
                	  this.data[this.location_nu].unit_nu=this.unit_nu;
                      this.data[this.location_nu].stairs=this.stairs;
                      this.data[this.location_nu].elevator=this.elevator;
                      this.data[this.location_nu].ride=this.ride;
                      this.data[this.location_nu].parking_info=this.parking_info;              							 
                    localStorage['locations']=JSON.stringify(this.data);
                    loader.dismiss();
	      			this.navCtrl.pop()
                }
                else{

                }
	    })
	}
}
}
