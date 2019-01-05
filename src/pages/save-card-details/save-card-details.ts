import { Component } from '@angular/core';
import { NavController, NavParams,AlertController,LoadingController} from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import { ENV } from '../../app/env';
import { Http } from '@angular/http';
import { LoginPage }from '../login/login';
import { MyoolagaPage} from '../myoolaga/myoolaga';
/*
  Generated class for the SaveCardDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-save-card-details',
  templateUrl: 'save-card-details.html'
})
export class SaveCardDetailsPage {
	user_id;
	mangoUserId;
	PaymentDetails;
	cardImage;
	dateError:boolean;
	slash;
	cardType;
	data
	http;
    
  constructor( http:Http,public navCtrl: NavController,public alertController:AlertController, public navParams: NavParams, public loadingCtrl:LoadingController) {
  	this.PaymentDetails={}
  	this.http=http
  	this.data = {};
   	this.data.response = '';
  	
  	// this.user_id=this.navParams.get('user_id');
  	// this.user_id=56;
  	// this.mangoUserId=47811298;
  	console.log(this.user_id);
  	// this.mangoUserId=this.navParams.get('mangoUserId');
    this.user_id=localStorage['user_id'];
    this.mangoUserId=localStorage['mango_user_id']
  	console.log(this.mangoUserId);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SaveCardDetailsPage');
  }

  card(number){
    // visa
    var re = new RegExp("^4");
    if (number.match(re) != null){
        	console.log("visa");
        	this.cardType="CB_VISA_MASTERCARD"
            return "Visa.png";
        }

    // Mastercard
    re = new RegExp("^5[1-5]");
    if (number.match(re) != null)
        {
        	console.log("master card");
        	this.cardType="Mastercard"
        	return "Mastercard.png";
        }

    // AMEX
    re = new RegExp("^3[47]");
    if (number.match(re) != null){
    	console.log("amex");
    	this.cardType="AMEX"
        return "AMEX.png";
    }

    // Discover
    re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
    if (number.match(re) != null){
    	console.log("Discover");
    	this.cardType="Discover"
        return "Discover.png";
    }

    // Diners
    re = new RegExp("^36");
    if (number.match(re) != null){
    	console.log("Diners")
    	this.cardType="Diners";
        return "Diners.png";
    }

    // Diners - Carte Blanche
    re = new RegExp("^30[0-5]");
    if (number.match(re) != null){
    	console.log("Carte Blanche")
    	this.cardType="Diners - Carte Blanche"
        return "Diners.png";
    }

    // JCB
    re = new RegExp("^35(2[89]|[3-8][0-9])");
    if (number.match(re) != null){
    	console.log("JCB")
    	this.cardType="JCB"
        return "JCB.png";
    }

    // Visa Electron
    re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
    if (number.match(re) != null){
    	console.log("Visa Electron")
    	this.cardType="Visa Electron"
        return "Visa Electron.png";
    }

     re = new RegExp("^12");
    if (number.match(re) != null){
    	console.log("AirPlus");
    	this.cardType="AirPlus"
        return "Airplus.png";
    }
    re = new RegExp("^67");
    if (number.match(re) != null){
    	console.log("maestro")
    	this.cardType="Maestro";
        return "Maestro.png";
    }
    return "";
  }

cardCheck(a){
  	this.cardImage=this.card(a);
}

dateCheck(a){
    if (this.PaymentDetails.expireDate) {
      // code...
          this.dateError=false;
          if (a.length<2) {
            this.slash='flase';
            this.PaymentDetails.expireDate=a;
          }else if (a.length==2) {
           if (this.slash!='true') {
               this.PaymentDetails.expireDate=a+'/';
           }
          }

          if (a.length==5) {
            var mydate=parseInt('20'+a.split('/')[1]);
            var mymonth=parseInt(a.split('/')[0]);
            var date= new Date();
            var currentdate=date.getFullYear()
            var currentMonth=date.getMonth()+1;
          if (mydate<currentdate) {
            this.dateError=true;
          }else if ( mydate==currentdate) {
            if (mymonth<currentMonth) {
              this.dateError=true;
            }
          }
          if (mymonth>12) {
           this.dateError=true;
          }
          // code...
          }
          if (this.PaymentDetails.expireDate.length==3) {
           this.slash='true';
          }
    }
  }

  	onSaveCard(){
      if (!this.PaymentDetails.nameOnCard) {
        // alert('name missing')
        let alert = this.alertController.create({
                 title: 'Oopss....!',
                 subTitle: 'Please enter name on card',
                 buttons: ['OK']
                 });
                 alert.present();
      }else if(!this.PaymentDetails.number){
        let alert = this.alertController.create({
                 title: 'Oopss....!',
                 subTitle: 'Please enter card number',
                 buttons: ['OK']
                 });
                 alert.present();
      }else if(!this.PaymentDetails.expireDate){
        let alert = this.alertController.create({
                 title: 'Oopss....!',
                 subTitle: 'Please enter expiry date',
                 buttons: ['OK']
                 });
                 alert.present();
      }
      else if(!this.PaymentDetails.cvc){
        let alert = this.alertController.create({
                 title: 'Oopss....!',
                 subTitle: 'Please enter cvv',
                 buttons: ['OK']
                 });
                 alert.present();
      }else if(!this.PaymentDetails.zipcode){
        let alert = this.alertController.create({
                 title: 'Oopss....!',
                 subTitle: 'Please enter zipcode',
                 buttons: ['OK']
                 });
                 alert.present();
      }else{
    		let dateToSend=this.PaymentDetails.expireDate.split("/")
    		dateToSend=dateToSend[0]+dateToSend[1]
  	  	let cardData={
  	  		user_id:this.user_id,
  	  		mangoUserId:this.mangoUserId,
  	  		card_type:this.cardType,
  	  		card_number:this.PaymentDetails.number,
          nameOnCard:this.PaymentDetails.nameOnCard,
          zipCode:this.PaymentDetails.zipcode,
  	  		expiry_date:dateToSend,
  	  		cvv:this.PaymentDetails.cvc,
			card_status: this.PaymentDetails.status
  	  	}
		 let loader = this.loadingCtrl.create();
        loader.present();
  	  	this.http.post(ENV.api+'/createMangoCardRegistration', cardData).subscribe(data=>{
  	        console.log("card successfully registered");
  	        console.log(data.res);
  	          loader.dismiss();
              if(JSON.parse(data._body).response==true){
				   if(!localStorage['card_id']){
					   console.log('Card Saved');
				  localStorage['card_id']=JSON.parse(data._body).details.CardId;
				   }
				  console.log(JSON.parse(data._body).details.CardId);
                  let alert = this.alertController.create({
                   title: 'Success',
                   subTitle: 'Card successfully added',
                   buttons:[ 
                    { 
                       text:'ok',
                       handler:()=>
                       {
                        if (localStorage['login']) {
                         this.navCtrl.pop();
                        }else{
                          this.navCtrl.setRoot(LoginPage);
                        }
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

    onNameChange(a){
      console.log(a)
    }

}
