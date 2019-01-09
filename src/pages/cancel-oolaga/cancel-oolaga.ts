import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { ENV } from '../../app/env';
import { AppProvider } from '../../providers/app-provider'
/*
  Generated class for the CancelOolaga page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-cancel-oolaga',
  templateUrl: 'cancel-oolaga.html'
})
export class CancelOolagaPage {
	reasons;
	_1st:boolean=false;
	_2nd:boolean=false;
	_3rd:boolean=false;
	_4th:boolean=false;
	_5th:boolean=false;
	_6th:boolean=false;
	data;
  constructor(public appProvider:AppProvider,public http:Http,public loadingCtrl:LoadingController,public alertCtrl:AlertController,public navCtrl: NavController, public navParams: NavParams) {
  	this.reasons=[]
  }

  ionViewDidLoad() {
  	this.data=this.navParams.get('data');
  	let loader = this.loadingCtrl.create()
  	loader.present();
  	this.http.get(ENV.api+'/webservicesdereasons').subscribe(data=>{
  		this.reasons = data.json().reasons
  		loader.dismiss();
  	},err=>{
  		console.log(err)
  	})
    console.log('ionViewDidLoad CancelOolagaPage');

  }
  submit(){
  	let a=[];
  	this._1st?a.push(this.reasons[0].id):'';
	this._2nd?a.push(this.reasons[1].id):'';
	this._3rd?a.push(this.reasons[2].id):'';
	this._4th?a.push(this.reasons[3].id):'';
	console.log(a)
	let d = JSON.stringify({
		oolaga_id:this.data.oolaga_id,
		customer_id:parseInt(localStorage['user_id']),
		reasons:a
	})
	let loader = this.loadingCtrl.create()
  	loader.present();
	this.http.post(ENV.api+'/webservicecanceloolaga',d).subscribe(data=>{
		loader.dismiss();
		if(data.json().response){
		  	let alert = this.alertCtrl.create({
		  		message:'Your oolaga was cancelled. You will be charged / or not $xxx ( see cancellation policy )',
		  		buttons:['OK']
		  	})
		  	alert.present()
		  	alert.onDidDismiss(()=>{
		  		this.navCtrl.popToRoot();
		  	})
		}
		else{
			let alert = this.alertCtrl.create({
		  		message:data.json().message,
		  		buttons:['OK']
		  	})
		  	alert.present()
		  	alert.onDidDismiss(()=>{
		  		this.navCtrl.popToRoot();
		  	})
		}
	},err=>{
		loader.dismiss();
	})
  }

}
