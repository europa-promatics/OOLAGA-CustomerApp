import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController,Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import {MyoolagaPage} from '../myoolaga/myoolaga';
import {ForgotPage} from '../forgot/forgot';
import { Device } from '@ionic-native/device';
import { Events ,MenuController} from 'ionic-angular';
import {RegisterationPage} from '../registeration/registeration';
//-------------env file --------------------

import { FCM } from '@ionic-native/fcm';
import {Validators, FormBuilder } from '@angular/forms';
import {ENV} from '../../app/env';
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
   platform;
   uid;
   tok:string;
   pushPage;
   username;
   password;
   forgot;
   http;
   data;
   pic;
   tokk;
   name;
   email;
   gender;
   loader;
   menu
   signupage;
   log_in;

  constructor(public fcm:FCM,public device:Device,public platfm:Platform,
              public formBuilder: FormBuilder,
              public menuCtrl:MenuController,
              public events: Events,
              public navCtrl: NavController,
              public navParams: NavParams,
              http: Http,
              public alertCtrl: AlertController,
              public loadingCtrl: LoadingController) {
    //=====================mobile code=========================
             this.platform=this.device.platform;
             this.uid=this.device.uuid;
    //=====================browser code=========================
           // this.platform='browser';
           // this.uid='browser';
           // localStorage['token']='sdfkjhfjsdfjajhiohjioankmn4uhrenwjkehr8'
    //============================================================        
            this.forgot=ForgotPage;
            this.signupage=RegisterationPage;
            this.username='';
            this.password='';
            this.http = http;
            this.data = {};
            this.data.response = '';
            localStorage['msg_no']=0;
            this.menu=menuCtrl;
            this.menu.enable(false,"mymenu");
            // let emailRegex = '^[a-zA-Z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
            let emailRegex=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            this.log_in = formBuilder.group({
               username:['' , Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
               password:['' , Validators.compose([Validators.maxLength(25),Validators.minLength(8), Validators.required])],
              });
            localStorage['loginStatus']='flase';
  }
  ionViewDidLoad(){
                
                  //====================Mobile code=====================
                    this.fcm.getToken().then(token=>{
                       console.log('Token saved:', token);
                      localStorage['token']=token;
                       this.tok=token;
                     })
                  //====================Mobile code=====================
                
  }
  login(){
    if(this.log_in.valid){
      let loader = this.loadingCtrl.create();
      loader.present();
          var link = ENV.api + '/webservicelogin';
          var data = JSON.stringify({ 
                                    user_type: 0,
                                    email:this.log_in.controls["username"].value,
                                    password:this.log_in.controls["password"].value,
                                    device_id:this.uid,
                                    device_token:this.tok,
                                    device_type:this.platform
                                  });
          // let alert = this.alertCtrl.create({
          //               title: 'Oopss...!',
          //               subTitle: data,
          //               buttons: ['OK']
          //           });
          //           alert.present();
          this.http.post(link, data)
          .subscribe(data => {
            loader.dismiss();
            this.data.response = data;
                if(JSON.parse(data._body).response==true){
                    localStorage['user_name']=JSON.parse(data._body).user_info.firstname;
                    let image_name=JSON.parse(data._body).user_info.image;
                    console.log(image_name)
                    if(image_name==null){localStorage['profile_pic'] = '' }
                    else{localStorage['profile_pic']=ENV.api + "/public/frontend/img/profile/" + image_name;}
                    console.log(localStorage['profile_pic'])
                    localStorage['lastname']=JSON.parse(data._body).user_info.lastname;
                    localStorage['email']=JSON.parse(data._body).user_info.email;
                    localStorage['number']=JSON.parse(data._body).user_info.number;
                    localStorage['user_id']=JSON.parse(data._body).user_info.id;
                    localStorage['mango_user_id']=JSON.parse(data._body).user_info.mango_user_id;
                    localStorage['wallet_id']=JSON.parse(data._body).user_info.wallet_id;
					//alert(JSON.stringify(JSON.parse(data._body).user_info));
					if(JSON.parse(data._body).user_info.card_detail[0]){
                    localStorage['card_id']=JSON.parse(data._body).user_info.card_detail[0].card_id;
                    console.log('user_name', localStorage['user_name']);
                    console.log('card_id', localStorage['card_id']);
					}
                    localStorage['login']=true; //login set
                    this.events.publish('user:created',true);
                    this.navCtrl.setRoot(MyoolagaPage);
                }
                else if(JSON.parse(data._body).response==false){
                    let error = JSON.parse(data._body).message
                    let alert = this.alertCtrl.create({
                        subTitle: error,
                        buttons: ['OK']
                    });
                    alert.present();
                }
            console.log(JSON.parse(data._body).response);
          }, error => {
              let alert = this.alertCtrl.create({
                        title: 'Oopss...!',
                        subTitle: 'Network Problem...',
                        buttons: ['OK']
                    });
                    alert.present();
              loader.dismiss();
          });
    }
    else{
      if((this.log_in.controls["username"].value==null && this.log_in.controls["password"].value==null)||(this.log_in.controls["username"].value=='' && this.log_in.controls["password"].value==null)||(this.log_in.controls["username"].value==null && this.log_in.controls["password"].value=='')||(this.log_in.controls["username"].value=='' && this.log_in.controls["password"].value=='')){
        let alert = this.alertCtrl.create({
          title:'Oopss..',
          message:'Please enter your Username and Password',
          buttons:['OK']
        })
        alert.present();
      }else if(this.log_in.controls["username"].value==null||this.log_in.controls["username"].value==''){
        let alert = this.alertCtrl.create({
          title:'Oopss..',
          message:'Please enter your Username',
          buttons:['OK']
        })
        alert.present();
      }else if(!this.log_in.controls["username"].valid){
        let alert = this.alertCtrl.create({
          title:'Oopss..',
          message:'Please check your Username',
          buttons:['OK']
        })
        alert.present();
      }else if(this.log_in.controls["password"].value==null||this.log_in.controls["password"].value==''){
        let alert = this.alertCtrl.create({
          title:'Oopss..',
          message:'Please enter your Password',
          buttons:['OK']
        })
        alert.present();
      }else if(!this.log_in.controls["password"].valid){
        let alert = this.alertCtrl.create({
          title:'Oopss..',
          message:'Please enter minimum 8 character password',
          buttons:['OK']
        }) 
        alert.present();
      }
    }
  }
}
