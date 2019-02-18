import { Component } from '@angular/core';
import {NavController, NavParams, ViewController, AlertController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { ENV } from '../../app/env'; 
/**
 * Generated class for the PopOver page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-pop-over',
  templateUrl: 'pop-over.html',
})
export class PopOver {
http
cData

  constructor(public navCtrl: NavController, 
			  public navParams: NavParams, 
			  public viewCtrl: ViewController, 
			  public alertCtrl: AlertController,
			  public loadingCtrl: LoadingController,
			  http:Http) {
				  this.http=http;
				  this.cData=this.navParams.get('ev');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopOver');
  }
  close() { 
    this.viewCtrl.dismiss();
  }

  onChangePassword(){
	 this.presentPrompt();
  }
  
  presentPrompt() {
	  console.log(this.cData);

  }

setCardStatus(){
	
	  let cardData={
  	  		user_id:localStorage['user_id'],
			id:this.cData.id
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
                  let alert = this.alertCtrl.create({
                  
                   subTitle: 'Votre carte de paiement par défaut a été enregistrée',
                   buttons:[ 
                    { 
                       text:'OK',
                       handler:()=>
                       {
						   
						   localStorage['card_id']=JSON.parse(data._body).data.card_id;
						   this.close();
						   //this.getCardList();
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
			this.close();
  	    })
      }
	  
deleteCard(){
	var id=this.cData.id;
	if(id){
		 let loader = this.loadingCtrl.create();
        loader.present();
  	  	this.http.get(ENV.api+'/removeCard/'+id).subscribe(data=>{
			   loader.dismiss();
		if(JSON.parse(data._body).response==true){
			  let alert = this.alertCtrl.create({
			  title: 'Success!',
			  message: 'Card Removed Successfully!',
			  buttons: ['OK']
			})
			alert.present();
			this.close();
			
			
		}else{
			  let alert = this.alertCtrl.create({
			  title: 'Error!',
			  message: 'Missing Card Details',
			  buttons: ['OK']
			})
			alert.present();
			this.close();
		
			
		}
		}, err=>{
			   loader.dismiss();
			let alert = this.alertCtrl.create({
			  title: 'Error!',
			  message: 'Something went wrong!',
			  buttons: ['OK']
			})
			alert.present();
			this.close();
			
		})
		
	}
}
	  
}




