import { Component } from '@angular/core';
import { Http } from '@angular/http';
import { NavController, NavParams,LoadingController,AlertController,ViewController } from 'ionic-angular';
import { ENV } from '../../app/env'; 
declare var braintree
@Component({
  selector: 'page-test',
  templateUrl: 'test.html'
})
export class TestPage {
	submit:boolean=false;
	pay:boolean=false;
	token:any='sandbox_55brmgzn_nnkbnnmzyf72yc7k';
	options:any;
	payload
  data;
  wait:boolean=true;
  constructor(public viewCtrl:ViewController,public http:Http,public alertCtrl:AlertController,public LoadingCtrl:LoadingController,public navCtrl: NavController, public navParams: NavParams) {
  	this.options='$56';
    this.data=this.navParams.get('data');
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TestPage');
    var button = document.querySelector('#submit-button');
    
  	this.submit=false;
	  this.pay=false;
  	this.http.get(ENV.api+'/createToken').subscribe(data=>{
  		if(data.json().result.status==1){
            braintree.dropin.create({authorization: data.json().result.data,container: '#dropin-container'},(createErr, instance)=> 
            {
              if(createErr){console.log(createErr)}
              else if(instance){
                console.log(instance)
            	this.submit=true;
            	this.wait=false;
                button.addEventListener('click',()=>{
                  instance.requestPaymentMethod((err, payload)=>{
                    if(err){console.log(err)}
                   	else if(payload){
            		  setTimeout(()=>{
            		  	this.pay=true;
            		  },1000)
            		  this.submit=false;
            		  this.payload = payload;
                      console.log(payload)
                    }
                  });
                });
              }
            });
  		}
  	},err=>{
  		let alert = this.alertCtrl.create({
          title:'Error',
          message:'Try after sometime',
          buttons:['OK']
        }) 
        alert.present();
        alert.onDidDismiss(data=>{
          
        })
  	})
  }
  reset(){
  	document.getElementById('dropin-container').innerHTML='';
  	this.ionViewDidLoad();
  }
  payOolaga(){
  	let loader = this.LoadingCtrl.create();
  	loader.present();
  	this.http.post(ENV.api + '/test' , JSON.stringify({oolaga_id:this.data.oolaga_id ,amount: this.data.cost , nonce:this.payload.nonce}))
  	.subscribe(data=>{
      console.log(data.json().result)
      if(data.json().result.status==1){
  	  	let alert = this.alertCtrl.create({
  	  		subTitle:data.json().result.transaction,
          message:'Amount:-'+data.json().result.data.amount + '<br>' + 'Transaction Id:-' + (data.json().result.data.trans_id).toUpperCase(),
  	  		buttons:['OK']
  	  	}) 
    		loader.dismiss();
  	  	alert.present();
  	  	alert.onDidDismiss(()=>{
  		  	this.viewCtrl.dismiss(true);
  	  	})
      }
      if(data.json().result.status==0){
        let alert = this.alertCtrl.create({
          subTitle:data.json().result.transaction,
          buttons:['OK']
        }) 
        loader.dismiss();
        alert.present();
        alert.onDidDismiss(()=>{
          this.viewCtrl.dismiss(false);
        })
      }
    },err=>{
      loader.dismiss();
      console.log(err)
    })
  }

}
