import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { LoadingController} from 'ionic-angular';
import { ChatPage} from '../../chat/chat';
import {ENV} from '../../../app/env';
@Component({
  selector: 'page-inbox',
  templateUrl: 'inbox.html'
})
export class InboxPage {
  http;
  data;
  msg:boolean=false;
  constructor(public navCtrl: NavController, public navParams: NavParams,http: Http,public loadingCtrl: LoadingController) {
    this.http = http;
    let loader = this.loadingCtrl.create();
    loader.present();
    let link = ENV.api+'/webserviceonline_users';
      this.http.post(link,{
        user_id:localStorage['user_id']
      }).subscribe(
      data => {
        if(JSON.parse(data._body).response==true)
        {
        this.data = JSON.parse(data._body).user_info;
        if(this.data.length > 0){this.msg=true;}
        console.log(this.data);
        loader.dismiss();
        }
        else{
        loader.dismiss();
        alert("Something wrong.....")
        }
      },
      err => {
        alert(JSON.stringify('error'+err));
      });
  }
  ionViewWillEnter() {
  }
  chat(user_id,image){
    this.navCtrl.push(ChatPage,{receiver_id:user_id,image:image});
  }
}
