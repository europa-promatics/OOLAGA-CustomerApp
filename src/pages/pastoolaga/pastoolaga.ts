import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import { PastOolagaDetailsPage} from '../past-oolaga-details/past-oolaga-details';
import { Http } from '@angular/http';
import { OolagaDetailsPage} from '../oolaga-details/oolaga-details'
import {ENV} from '../../app/env'
@Component({
  selector: 'page-pastoolaga',
  templateUrl: 'pastoolaga.html'
})
export class PastoolagaPage {
  http;
  data;
  oolaga_created:boolean=true;
  msg_no:number=0;
  constructor(public loadingCtrl:LoadingController,http:Http,public navCtrl: NavController, public navParams: NavParams) {
        this.http = http;

  }
  openDetails(value){
  	this.navCtrl.push(PastOolagaDetailsPage,{data:value});
  }
  selection()
  {
  }
  ionViewDidLoad() {
    let loader = this.loadingCtrl.create();
    loader.present();
    this.http.get(ENV.api+'/webservicepastoolaga/'+localStorage['user_id'])
    .subscribe(data => {
      if(JSON.parse(data._body).response){
        loader.dismiss();
        if(JSON.parse(data._body).data[0] == null)
        {
          this.oolaga_created=true;
        }
        else if(JSON.parse(data._body).data[0] != null){
          this.oolaga_created=false;
          console.log(JSON.parse(data._body).data);
          this.data=JSON.parse(data._body).data;
        }
      }
      else{
          loader.dismiss();
          this.oolaga_created=true;
      }
      },err => {alert(JSON.stringify('error'+err));});
  }
  get_detail(value){
    //this.navCtrl.push(OolagaDetailsPage,{data:value})
  }
}
