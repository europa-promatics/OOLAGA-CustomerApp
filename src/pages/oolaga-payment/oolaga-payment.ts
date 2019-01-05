import { Component } from '@angular/core';
import { NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { AppProvider } from '../../providers/app-provider';
import { ENV } from '../../app/env'; 
import {Http} from '@angular/http';
@Component({
  selector: 'page-oolaga-payment',
  templateUrl: 'oolaga-payment.html'
})
export class OolagaPaymentPage {
  http;
  src_location;
  dst_location;
  way_point1;
  way_point2;
  constructor(http:Http,public loadingCtrl:LoadingController,private appProvider: AppProvider,public modalCtrl:ModalController,public navCtrl: NavController, public navParams: NavParams) {
    this.http=http;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad OolagaPaymentPage');
  }
  submit(){
  	console.log('payment');
  	this.payment();
  }
  payment(){
    // let pay = this.modalCtrl.create(PaymentStripePage)
    //     pay.onDidDismiss(data=>{
    //       if(data==null){
    //         console.log('empty data')
    //       }
    //       else if(data.response==true){
    //         let loader = this.loadingCtrl.create({content:'Please wait'})
    //         loader.present();
    //         var d = JSON.stringify(
    //             {  
    //               oolaga_id:this.appProvider.current.oolaga_id,
    //                cost:this.appProvider.current.price,
    //             });
    //               this.http.post(ENV.api+'/webservicecompleteOolaga', d).subscribe(data => {
    //               if(JSON.parse(data._body).response==true){
    //               }
    //               else if(JSON.parse(data._body).response==false){
    //                 // this.error=JSON.parse(data._body).message;
    //           }
    //         });
    //         loader.dismiss();
    //      			alert('Payment Complete')
    //      			this.navCtrl.popToRoot();
    //       }
    //       else{
    //            alert('Payment not Complete')
    //       }
    //     });
    //     pay.present();
  }
}
