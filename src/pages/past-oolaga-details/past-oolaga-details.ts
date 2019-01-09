import { Component } from '@angular/core';
import { NavController, NavParams,ModalController } from 'ionic-angular';
import {ENV} from '../../app/env';
import { TestPage} from '../test/test';
import { Http } from '@angular/http';
import { FeedbackPage } from '../feedback/feedback';
@Component({
  selector: 'page-past-oolaga-details',
  templateUrl: 'past-oolaga-details.html'
})
export class PastOolagaDetailsPage {
	data;
	http
	locations;
	item_quantity:number=0;
	selected_item=0;
	my
	rating
  constructor(public modalCtrl:ModalController,http:Http, public navCtrl: NavController, public navParams: NavParams) {
	      this.http = http;
  	this.locations=[]
  	this.my=ENV.api

	
  }
  
  checkFeedback(){
	  
	       var data=JSON.stringify({
              helper_id:this.data.helper_id,
              customer_id:localStorage['user_id'],
              oolaga_id:this.data.oolaga_id
            });
	                this.http.post(ENV.api+'/webservicecustomerRatingCheck',data).subscribe(data => {
                console.log(data.json());
                if(data.json().response){
              this.rating=data.json().rating;
              // alert(data.json().rating);            
                }else{
                  
                }
              },err=>{
               /*  let alert = this.alertCtrl.create({
                                subTitle: 'Error',
                                buttons: ['OK']
                            });
                            alert.present(); */
              })
  }
  ionViewWillEnter(){
  	this.data=this.navParams.get('data');
    console.log(this.data);
    // this.navCtrl.push(FeedbackPage,{data:this.data});
    for(let i=0;i<this.data.items.length;i++){
      this.item_quantity += parseInt(this.data.items[i].quantity)  
    }
    if(this.data.source && this.data.source!=null){
      this.locations.push(this.data.source);
    }
    if(this.data.way_point1 && this.data.way_point1!=null){
      this.locations.push(this.data.way_point1);
    }
    if(this.data.way_point2 && this.data.way_point2!=null){
      this.locations.push(this.data.way_point2);
    }
    if(this.data.destination && this.data.destination!=null){
      this.locations.push(this.data.destination);
    }
	
		this.checkFeedback();
  }
  ionViewDidLoad(){
  }
  
  feedback(){
	    this.navCtrl.push(FeedbackPage,{
                    helperWalletId:this.data.helper_wallet_id,
                    helperId:this.data.helper_id,
                    oolaga_id:this.data.oolaga_id,
					helper_name: this.data.helper_name_formatted,
					helper_image: this.data.helper_img,
					disabled:1
                  })
  }
  pay(){
    let payment = this.modalCtrl.create(TestPage,{data:this.data})
        payment.onDidDismiss(data=>{
          if(data){
            this.data.payment_status=1;
            this.navCtrl.push(FeedbackPage,{data:this.data});
          }else{

          }
        })
        payment.present();
  }
  
  formatAmount(amount){
	  if(amount){
		  amount=amount.toString();
		  amount=amount.replace('$', '');
		  return amount+'€';
	  }
	  
  }
  
  getServiceName(string){
		return string.replace(/<[^>]*>/g, '');
	}  
	getString(string){
		return string.replace(/<[^>]*>/g, '');
	}
	formatDate(date){
	  var date_parts=date.split('-');
	  return date_parts[0]+'/'+date_parts[1]+'/'+'20'+date_parts[2];
	  
  }
   formatTime(time){
	 if(time){
		 return time.replace(":", "h");
	 }
}
}
