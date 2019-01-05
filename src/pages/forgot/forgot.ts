import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import {LoadingController,AlertController} from 'ionic-angular';
import {ENV} from '../../app/env'
import {Validators, FormBuilder } from '@angular/forms';
import { LoginPage } from '../login/login'

@Component({
  selector: 'page-forgot',
  templateUrl: 'forgot.html'
})
export class ForgotPage {
	http;
	email;
	forget;
	mailsend:boolean=false;
	otp='0';
	otpEnter;
	imagepath="/assets/icon/rightthick.png"
	enterNewPassword;
	confirmNewPassword;
	user_id
  constructor(public formBuilder:FormBuilder,http:Http,public loadingCtrl:LoadingController,public alertCtrl:AlertController,public navCtrl: NavController, public navParams: NavParams) {
    let emailRegex=/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  	this.http=http;
  	this.email='';
  	this.forget = formBuilder.group({
        email:['' , Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
    });
  }
  checkotp(event){
  	console.log(event.class);
  }
  // -------------------21-5-2018-----------
 //  submitpassword(){
 //  	let loader = this.loadingCtrl.create();
	//     loader.present();
 //  	var link=ENV.api+'/webserviceforgotpassword';
	// var data = JSON.stringify({user_id:this.user_id,password:this.enterNewPassword});
 //    this.http.post(link, data).subscribe(data => {
	//     var message =JSON.parse(data._body).message;
	//     loader.dismiss();
	//     if(JSON.parse(data._body).response){
	//     	let alert = this.alertCtrl.create({
 //                  title: 'Thank you!',
 //                  subTitle: message,
 //                  buttons: ['OK']
 //              });
 //              alert.present();
	//         this.navCtrl.pop();
	//     }else{
	//     	let alert = this.alertCtrl.create({
 //                  title: 'Error!',
 //                  subTitle: message,
 //                  buttons: ['OK']
 //              });
 //              alert.present();
	//     }
	// });
 //  }
  

  submit(){

  	
  	if(this.forget.controls["email"].value=='' || this.forget.controls["email"].value==null)
  	{
		let alert = this.alertCtrl.create({
	          title: 'Oops..!',
	          subTitle: 'Enter Email address',
	          buttons: ['OK']
	      });
	      alert.present();
  	}else if(!this.forget.valid){
  		let alert = this.alertCtrl.create({
	          title: 'Oops..!',
	          subTitle: 'Enter valid email id',
	          buttons: ['OK']
	      });
	      alert.present();
  	}else{
	  	let loader = this.loadingCtrl.create();
	    loader.present();
	    var link=ENV.api+'/webserviceforgotpassword';
	    var data = JSON.stringify({email:this.forget.controls["email"].value});

	        this.http.post(link, data).subscribe(data => {
	        	var message =JSON.parse(data._body).message;
	          	loader.dismiss();
	              if(JSON.parse(data._body).response==true){
	                  this.otp=JSON.parse(data._body).data.otp;
	                  this.user_id=JSON.parse(data._body).data.user_id
	                  let alert = this.alertCtrl.create({
		                    title: 'Password Reset',
		                    subTitle: 'A new password has been sent to your email.You can update password on your profile page.',
		                    buttons: [{
		                      	text:'OK',
		                      	handler:data=>{
		                      		this.navCtrl.push(LoginPage)
		                      	}
		                    }]
	                  });
	                  alert.present();
	              }
	              else if(JSON.parse(data._body).response==false){
	                  let alert = this.alertCtrl.create({
	                      title: 'Error!',
	                      subTitle: message,
	                      buttons: ['OK']
	                  });
	                  alert.present();
	              }
	          console.log(JSON.parse(data._body).response);
	        }, error => {
	            console.log(error);
	        });
  	}
  }

}
