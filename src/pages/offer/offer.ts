import { Component } from '@angular/core';
import { NavController, NavParams,LoadingController,AlertController } from 'ionic-angular';
import { OpenOfferPage } from '../open-offer/open-offer'
import { ENV } from '../../app/env'
import { Http } from '@angular/http';
@Component({
  selector: 'page-offer',
  templateUrl: 'offer.html'
})
export class OfferPage {
	oolaga_id;
	offerData;
	time;
	env=ENV.api;
  constructor(public alertCtrl:AlertController,public loadingCtrl:LoadingController,public http:Http,public navCtrl: NavController, public navParams: NavParams) {
  	this.oolaga_id=this.navParams.get('id')
	this.time=this.navParams.get('time');
  	this.loadOffers()
  }
  loadOffers(){
  	let loader = this.loadingCtrl.create()
  	loader.present()
  	this.http.post(ENV.api + '/webservicebiddingdetail',{oolaga_id:this.oolaga_id})
  	.subscribe(data=>{
  		if(JSON.parse(data['_body']).response){
			  this.offerData=JSON.parse(data['_body']).data;
       //alert(JSON.stringify(this.offerData));
	  		loader.dismiss()
  		}
  		else{
        let a= this.alertCtrl.create({
           title:'oops..',
           message:'Something wrong...',
           buttons:['Ok']
         })
         a.present();
        loader.dismiss()
      }
    },err=>{
      let a= this.alertCtrl.create({
         title:'oops..',
         message:'please check your Internet connection',
         buttons:['Ok']
       })
       a.present();
  		loader.dismiss()
  	})
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad OfferPage');
  }
  titleCase(str){
if(str){
    return str.replace(
        /\w\S*/g,
        function(txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}else{
	return "";
}

}
  open_offer(value){
	 
	  
	  if(this.time<2){
		 let alert=this.alertCtrl.create({
        title:'Offre expirée',
        message:'Le temps ne permettant pas au Helper d\'arriver à l\'heure, nous vous suggérons de soumettre de nouveau votre projet avec une heure de collection qui permet au Helper d’y arriver à l’heure.',
        buttons:['OK']
      })
      alert.present();
	  return false;
	  }
  	this.navCtrl.push(OpenOfferPage,{data:value});
  }
  checkNumber(value){
    return Math.round(parseInt(value))
  }
}
