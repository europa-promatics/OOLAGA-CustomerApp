import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Camera } from 'ionic-native';
import { AlertController } from 'ionic-angular';
import {ENV} from '../../app/env'
import { PopoverController } from 'ionic-angular';
import { PopOver } from '../pop-over/pop-over';
import { AppProvider }from '../../providers/app-provider';
import { SaveCardDetailsPage } from '../save-card-details/save-card-details'

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
  constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController, http:Http, private alertController: AlertController, public popoverCtrl: PopoverController ) {
    this.http=http;	
	this.getCardList();
	
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CustomeCardListPage');
	//this.getCardList();
  }
  ionViewDidEnter() {
 this.getCardList();
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
  	          loader.dismiss();
		
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
                   subTitle: 'Votre carte de paiement par défaut a été enregistrée!',
                   buttons:[ 
                    { 
                       text:'OK',
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
	  
	  onAddCard(){
     this.navCtrl.push(SaveCardDetailsPage,{'user_id':localStorage['user_id'],'mangoUserId':1})
   }
	presentPopover(myEvent, data){
    let popover = this.popoverCtrl.create(PopOver, {ev:data});
    popover.present({
      ev: myEvent
    });
	
	popover.onDidDismiss(() => {
	this.getCardList();
});
  }
  formatCard(card){
	  if(card){
		  return "••••"+card.slice(-4);
	  }
  }
  }


