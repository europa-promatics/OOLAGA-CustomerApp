import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Camera } from 'ionic-native';
import { AlertController } from 'ionic-angular';
import {ENV} from '../../app/env'
import { AppProvider }from '../../providers/app-provider';
/*
  Generated class for the CustomeCardList page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-custome-card-list',
  templateUrl: 'custome-card-list.html'
})
export class CustomeCardListPage {
http
CardData
  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, http:Http, private alertController: AlertController ) {
    this.http=http;	
	this.getCardList();
	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomeCardListPage');
  }
  
  getCardList(){
	  let cardData={
  	  		user_id:localStorage['user_id']
  	  	}
		 let loader = this.loadingCtrl.create();
        loader.present();
  	  	this.http.post(ENV.api+'/webserviceUserCardDetail', cardData).subscribe(data=>{
  	        console.log("card successfully registered");
			console.log(JSON.parse(data._body).data.card_detail)
			  this.CardData=JSON.parse(data._body).data.card_detail;
  	       // console.log(data.res);
  	          loader.dismiss();
			
          /*     if(JSON.parse(data._body).response==true){
                  let alert = this.alertController.create({
                   title: 'Success',
                   subTitle: 'Card successfully added',
                   buttons:[ 
                    { 
                       text:'ok',
                       handler:()=>
                       {
                        if (localStorage['loginStatus']=='true') {
                         this.navCtrl.setRoot(MyoolagaPage);
                        }else{
                          this.navCtrl.setRoot(LoginPage);
                        }
                       }
                    }]
                   });
                 alert.present();
              	
              } */
  	    },err=>{
  	       	console.log(err);
  	    })
      }  
	  
	  setCardStatus(id){
	  let cardData={
  	  		user_id:localStorage['user_id'],
			id:id
  	  	}
		 let loader = this.loadingCtrl.create();
        loader.present();
  	  	this.http.post(ENV.api+'/mangoChangeUserCardStatus', cardData).subscribe(data=>{
  	        console.log("card successfully registered");
			//console.log(JSON.parse(data._body).data.card_detail)
			//  this.CardData=JSON.parse(data._body).data.card_detail;
  	       // console.log(data.res);
  	          loader.dismiss();
			
              if(JSON.parse(data._body).response==true){
                  let alert = this.alertController.create({
                   title: 'Success',
                   subTitle: 'Card Status Changed Successfully!',
                   buttons:[ 
                    { 
                       text:'ok',
                       handler:()=>
                       {
						   localStorage['card_id']=JSON.parse(data._body).data.card_id;
						   this.getCardList();
                       /*  if (localStorage['loginStatus']=='true') {
                         this.navCtrl.setRoot(MyoolagaPage);
                        }else{
                          this.navCtrl.setRoot(LoginPage);
                        } */
                       }
                    }]
                   });
                 alert.present();
              	
              } 
  	    },err=>{
  	       	console.log(err);
  	    })
      }
  }


