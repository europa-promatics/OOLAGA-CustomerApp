import { Component } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { SaveCardDetailsPage } from '../save-card-details/save-card-details'
import { LoginPage } from '../login/login'

@Component({
  selector: 'page-payment',
  templateUrl: 'payment.html'
})
export class PaymentPage {
  card;
  user_id;
  mangoUserId;

  constructor(public alertCtrl:AlertController,public navCtrl: NavController, public navParams: NavParams) {
      this.user_id=this.navParams.get('user_id');
      // this.user_id=56;
      // this.mangoUserId=47811298;
      console.log(this.user_id);
      this.mangoUserId=this.navParams.get('mangoUserId');
      console.log(this.mangoUserId);
  }
  ionViewDidLoad() {}
  help(){
    let alert = this.alertCtrl.create({
      title: 'Payment',
      message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim ven',
      buttons: ['OK']
    })
    alert.present();
  }
  pay(){
   //  	PayPal.init({
  	//   "PayPalEnvironmentProduction": "EHq52w3WpSMQDy79b8N59brHZhtQneuDdcGCwBigbj5LesXVsX3avy-5Lm0MSDTX00yriHOxAsvdli0M",
  	//   "PayPalEnvironmentSandbox": "ATOFecC0-4Uv4J1oz2Ad1QeTPmonVVjF2a9WN_wM3o6RpyfN77A4rnP1LAxhYb8th0edszdyoo9dND6Z"
  	// }).then(() => {
  	// 	  PayPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
  	// 	  })).then(() => {
  	// 	    let payment = new PayPalPayment('3.33', 'USD', 'Description', 'sale');
  	// 	    PayPal.renderSinglePaymentUI(payment).then((data) => {
  	// 	    	alert(JSON.stringify(data))
  	// 	 		var time=data.response.create_time;
  	// 	 		var id=data.response.id;
  	// 	 		var intent=data.response.intent;
  	// 	 		var state=data.response.state;
  	// 	 		alert(time+'<br>'+id+'<br>'+intent+'<br>'+state)
  	//     	}, (err) => {alert('1'+JSON.stringify(err))});
  	// 	}, (err) => {alert('2'+JSON.stringify(err))});
  	// }, (err) => {alert('3'+JSON.stringify(err))});
  }
  submit(value)
   {  
      if(value==0){
        this.navCtrl.pop()
      }
      else if(value==1){
             this.navCtrl.popToRoot();
      }
   }
login(){
	this.navCtrl.push(LoginPage);
}
   onAddCard(){
     this.navCtrl.push(SaveCardDetailsPage,{'user_id':this.user_id,'mangoUserId':this.mangoUserId})
   }
}