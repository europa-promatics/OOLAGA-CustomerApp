import { Component,ElementRef,ViewChild } from '@angular/core';
import { NavController, NavParams,AlertController } from 'ionic-angular';
import { ENV } from '../../app/env'
import { Http } from '@angular/http';
import { CustomerThankYouPage } from '../customer-thank-you/customer-thank-you'
@Component({
  selector: 'page-feedback',
  templateUrl: 'feedback.html'
})
export class FeedbackPage {

  helper_data;
  mangoUserId;
  tax
  total
  user_id
  wallet_id;
  card_id;
  no_tip=0;
  star1:number=0;
  star2:number=0;
  star3:number=0;
  data:any;
  image:any='img/man.png';
  tip_value:number;
  tipp=0;
  http
  buttonColor: any
helper_image
helper_name
  helperWalletId
helperId
oolaga_id
disabled:number=0;
        
        btn1
        btn2
        btn3     
        btn4
  constructor(public alertCtrl:AlertController,public navCtrl: NavController, http:Http, public navParams: NavParams) {
	
    this.http = http;
    this.helper_data=this.navParams.data;
	//alert(JSON.stringify(this.helper_data));
	console.log(this.helper_data);
    this.helperWalletId=this.navParams.get('helperWalletId')
    this.helperId=this.navParams.get('helperId')
    this.oolaga_id=this.navParams.get('oolaga_id')
	this.disabled=this.navParams.get('disabled');
    this.user_id=localStorage['user_id'];
    this.mangoUserId=localStorage['mango_user_id']
    this.wallet_id=localStorage['wallet_id']
    this.card_id=localStorage['card_id'],
	this.helper_image='http://18.188.229.2/oolaga-french/public/img/helperfiles/'+this.helper_data.helper_image;
	this.helper_name=this.helper_data.helper_name;

  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad FeedbackPage');
    this.data=this.navParams.get('data');
   this.image=this.helper_image;
    console.log(this.data)
  }
  select(vale,value2){
          this.tipp=value2
      if (vale==1) {
          this.btn1='active' 
          this.btn2=''
          this.btn3=''
          this.btn4=''
		  this.no_tip=1
      }
      else  if (vale==2) {
          this.btn1=''
          this.btn2='active'
          this.btn3=''
          this.btn4=''
		  this.no_tip=0
      } else  if (vale==3) {
          this.btn1=''
          this.btn2=''
          this.btn3='active'
          this.btn4=''
		  this.no_tip=0
      }else  if (vale==4) {
          this.btn1=''
          this.btn2=''
          this.btn3=''
          this.btn4='active'
		  this.no_tip=0
      }
	  this.tax=(parseInt(value2)*1.6)/100;
	  this.total=value2+this.tax;
  //   this.tip1.nativeElement.style.backgroundColor='#1B4079';
  //   this.tip2.nativeElement.style.backgroundColor='#fff';
  //   this.tip3.nativeElement.style.backgroundColor='#fff';
  //   this.tip4.nativeElement.style.backgroundColor='#fff';
  // //	this.tip5.nativeElement.style.backgroundColor='#fff';
  //   this.buttonColor='#fff';
  // alert(vale)
  }
  tip(value){
    console.log(value);
  }
  set_tip(value){
	  if(value==''){
	  value=0;
	  }
    console.log(value);
    this.tipp=parseFloat(value);
	 this.tax=(parseFloat(value)*1.6)/100;
	 console.log(this.tipp);
	 console.log(this.tax);
	 this.tax=parseFloat( this.tax ).toFixed(2);
	 this.total=0;
	  this.total=(this.tipp+ parseFloat(this.tax));
	  this.total=parseFloat(this.total).toFixed(2);
	  
  }
  submit(){ 
    if(this.tipp>0){
      this.payHelper()
      var data=JSON.stringify({
              Punchuality:this.star1,
              friendliness:this.star2,
              prepardness:this.star3,
              tip:this.tipp,
              oolaga_id:this.oolaga_id,
              customer_id:localStorage['user_id'],
              helper_id:this.helperId
            })
              console.log(data)
              this.http.post(ENV.api+'/webservicesave_rating',data).subscribe(data => {
                console.log(data.json());
                if(data.json().response){
                   let alert = this.alertCtrl.create({
                                subTitle: "Merci d’avoir laissé votre avis!",
                                buttons: ['OK']
                            });
                            alert.present();
                            this.navCtrl.push(CustomerThankYouPage);
                }else{
                  let alert = this.alertCtrl.create({
                                subTitle: data.json().message,
                                buttons: ['OK']
                            });
                            alert.present();
                }
              },err=>{
                let alert = this.alertCtrl.create({
                                subTitle: 'Error',
                                buttons: ['OK']
                            });
                            alert.present();
              })
    }
    else{
      var data=JSON.stringify({
              Punchuality:this.star1,
              friendliness:this.star2,
              prepardness:this.star3,
              tip:this.tipp,
              oolaga_id:this.oolaga_id,
              customer_id:localStorage['user_id'],
              helper_id:this.helperId
            })
      console.log(data)
      this.http.post(ENV.api+'/webservicesave_rating',data).subscribe(data => {
        console.log(data.json());
        if(data.json().response){
           let alert = this.alertCtrl.create({
                        subTitle: "Merci d’avoir laissé votre avis!",
                        buttons: ['OK']
                    });
                    alert.present();
                    this.navCtrl.push(CustomerThankYouPage);
        }else{
          let alert = this.alertCtrl.create({
                        subTitle: data.json().message,
                        buttons: ['OK']
                    });
                    alert.present();
        }
      },err=>{
        let alert = this.alertCtrl.create({
                        subTitle: 'Error',
                        buttons: ['OK']
                    });
                    alert.present();
      })
    }
  }


  payHelper(){
    var data={
      receiver_wallet_id:this.helperWalletId,
      mango_user_id:this.mangoUserId,
      amount:this.tipp*100,
      helper_id:this.helperId,
      user_id:this.user_id,
      oolaga_id:this.oolaga_id,
      fee:0,
      payee_wallet_id:this.wallet_id,
      mango_card_id:this.card_id
    }
    this.http.post(ENV.api + '/directMangoCardPayIn',data)
    .subscribe(data=>{
        console.log(data);
        if(JSON.parse(data['_body']).response){
           let a= this.alertCtrl.create({
             title:'Confirmation',
             message:"Merci d’avoir récompensé votre helper !",
             buttons:['OK']
          })
          a.present();
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
}
