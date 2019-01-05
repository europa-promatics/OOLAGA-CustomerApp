import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ENV } from '../../app/env';
import { AppProvider } from '../../providers/app-provider'
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html'
})
export class NotificationPage {
  noti:boolean=false;
  data:any;
  constructor(public appProvider:AppProvider,public http:Http,public loadingCtrl:LoadingController, public navCtrl: NavController, public navParams: NavParams) {

  }
  date(value){
    return value.replace('20','');
  }
  time(value){
    return value.split(':')[0]+':'+value.split(':')[1];
  }
  delete(index,item){
    console.log(item)
    item.close();
    setTimeout(()=>{
      this.data.splice(index, 1);
    },300)
    this.http.get(ENV.api+'/webservicedeletenoti/'+this.data[index].id).subscribe(data=>{
      this.data.length==0?this.noti=false:this.noti=true;
    },err=>{})
  }
  deleteNoti(id){

  }
  openNotification(value){
    
  }
  refreshNotification(refresher){
  	this.http.get(ENV.api+'/webserviceshownoti/'+localStorage['user_id']).subscribe(data=>{
      if(data.json().response){
      this.data=data.json().result;
      this.noti=true;
      }else{
        this.noti=false;
      }
      refresher.complete();
  	},err=>{
  		refresher.complete();
  	})
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad NotificationPage');
  	let loader = this.loadingCtrl.create()
  	loader.present()
  	this.http.get(ENV.api+'/webserviceshownoti/'+localStorage['user_id']).subscribe(data=>{
      if(data.json().response){
      this.data=data.json().result;
      this.noti=true;
      }else{
        this.noti=false;
      }
  		loader.dismiss();
  	},err=>{
  		loader.dismiss();
  	})
  }

}
