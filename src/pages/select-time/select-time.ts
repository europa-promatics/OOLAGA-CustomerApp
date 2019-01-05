import { Component } from '@angular/core';
import { NavController, NavParams , ViewController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import {ENV} from '../../app/env';
@Component({
  selector: 'page-select-time',
  templateUrl: 'select-time.html',
})
export class SelectTimePage {
time:number;
times:any;
http;
  constructor(http:Http,public loadingCtrl: LoadingController,public viewCtrl: ViewController,public navCtrl: NavController, public navParams: NavParams) {  				
    this.http=http;
  }
  ionViewWillEnter(){
      let loader = this.loadingCtrl.create()    
      loader.present();
      this.http.post(ENV.api+'/webservicetimeManage',{day_id:1})
      .subscribe((data)=>{
        loader.dismiss();
        this.times=JSON.parse(data._body).message;
      })
  }
  save_time(value){
  	this.viewCtrl.dismiss(value);
  }
}
