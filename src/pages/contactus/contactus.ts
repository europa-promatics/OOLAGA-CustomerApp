import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { LoadingController , AlertController } from 'ionic-angular'

import {Validators, FormBuilder } from '@angular/forms';
import {ENV} from '../../app/env'
@Component({
  selector: 'page-contactus',
  templateUrl: 'contactus.html'
})
export class ContactusPage {
	name;
	email;
	phone;
	description;
	http;
	link;
  contactus;
  	constructor(public formBuilder: FormBuilder,
                public alertCtrl:AlertController,
      		  		public loadCtrl:LoadingController,http:Http,
      		  		public navCtrl: NavController,
                public navParams: NavParams) {
  		this.http=http;
  		this.link=ENV.api+'/webservicecontactUs';
      let emailRegex = '^[a-zA-Z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{1,15})$';
      this.contactus = formBuilder.group({
        email:['' , Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
        phone:['', Validators.compose([Validators.minLength(10), Validators.pattern('[0-9]*'), Validators.required])],
        name:['' , Validators.compose([Validators.minLength(3) , Validators.pattern('[a-zA-z]*'),Validators.required])],
        description:['']
      })
  	}

  ionViewDidLoad() {
    console.log('ionViewDidLoad ContactusPage');
  }
  contect(){
    
    if(this.contactus.valid){
      console.log('valid',this.contactus.valid);
    	let loading=this.loadCtrl.create()
    	loading.present();
    	let data=JSON.stringify({
                                name:this.contactus.controls["name"].value,
                                email:this.contactus.controls["email"].value,
                                phone:this.contactus.controls["phone"].value,
                                description:this.contactus.controls["description"].value
                               });
    	this.http.post(this.link,data).subscribe(data=>{
    		console.log(JSON.parse(data._body))
    		if(JSON.parse(data._body).response==true){
        		this.name='';
      			this.email='';
      			this.phone='';
      			this.description='';
  			loading.dismiss().then(()=>{
  				this.alertError(JSON.parse(data._body).message);
  			})        
          }else{
          	loading.dismiss().then(()=>{
  				this.alertError(JSON.parse(data._body).message);
  			})
          }
    	})
    }
    else{

    }
  }
  alertError(value){
  	let alert=this.alertCtrl.create({
  		title:value,
  		buttons:[{
  					text:'Ok'
  				}]
  	})
  	alert.present();
  }
}
