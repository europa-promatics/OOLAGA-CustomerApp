import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import {Http} from '@angular/http';
import { CustomerOolagaScheduledPage } from '../customer-oolaga-scheduled/customer-oolaga-scheduled';
import {ENV} from '../../app/env';
/*
  Generated class for the OpenOffer page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-open-offer',
  templateUrl: 'open-offer.html'
})
export class OpenOfferPage {
	option:string="about";
  helper_data
  env=ENV.api
  feedback:boolean=false;
  user_id;
  mangoUserId;
  wallet_id;
  card_id
  constructor(public alertCtrl:AlertController,
              public loadingCtrl:LoadingController,
              public http:Http,
              public navCtrl: NavController,
              public navParams: NavParams) {
    this.helper_data=this.navParams.get('data')
    //alert(JSON.stringify(this.helper_data));
    this.user_id=localStorage['user_id'];
    this.mangoUserId=localStorage['mango_user_id']
    this.wallet_id=localStorage['wallet_id']
    this.card_id=localStorage['card_id']
    console.log(this.user_id);
    console.log(this.mangoUserId);
    console.log(this.helper_data.user.wallet_id)
  }
  checkNumber(value){
    return Math.round(parseInt(value))
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad OpenOfferPage');
  }

  submit(id){
    console.log(id)
    let alert=this.alertCtrl.create({
      message:'Une Pré-autorisation de '+this.helper_data.bid_amount+'€ a été effectuée sur votre carte bancaire. Les fonds seront transférés une fois le projet terminé.',
      buttons:[{
                text:'ANNULER'
                },{
                text:'ACCEPTER',
                handler:()=>{
                  this.payHelper()
                  // this.hire(id);
                }
              }]
    })
    alert.present()
  }

  payHelper(){
    var data={
      receiver_wallet_id:this.helper_data.user.wallet_id,
      mango_user_id:this.mangoUserId,
      amount:this.helper_data.bid_amount,
      helper_id:this.helper_data.helper_id,
      user_id:this.user_id,
      oolaga_id:this.helper_data.oolaga_id,
      fee:0,
      payee_wallet_id:this.wallet_id,
      mango_card_id:this.card_id
    }
    this.http.post(ENV.api + '/directMangoCardPayIn',data)
    .subscribe(data=>{
        console.log(data);
        if(JSON.parse(data['_body']).response){
          this.hire(this.helper_data.id);
        }else{
          let a= this.alertCtrl.create({
             title:'oops..',
             message:"payment unsuccessfull!",
             buttons:['Ok']
          })
          a.present();
        }
    },err=>{
      console.log(err)
    })
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
  hire(id){
    console.log(id);
    let loader=this.loadingCtrl.create()
    loader.present();
    this.http.post(ENV.api + '/webservicehelperassigned',{bidding_id:id})
    .subscribe(data=>{
      loader.dismiss()
      if(JSON.parse(data['_body']).response){
        /*let a= this.alertCtrl.create({
           title:'Helper hired',
           buttons:['Ok']
         })
         a.present();
         a.onDidDismiss(()=>{
           this.navCtrl.popToRoot();
         })*/
         this.navCtrl.setRoot(CustomerOolagaScheduledPage, {data:this.navParams.get('data')});  
      }
      else{
        let a= this.alertCtrl.create({
           title:'oops..',
           message:JSON.parse(data['_body']).message,
           buttons:['Ok']
         })
         a.present();
      }
    },(err)=>{
      loader.dismiss()
      let a= this.alertCtrl.create({
         title:'Oups',
         message:'S\'il vous plait, vérifiez votre connexion internet',
         buttons:['Ok']
       })
       a.present();
    })
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

	getLastName(name){
		return name.charAt(0);
	}
}
