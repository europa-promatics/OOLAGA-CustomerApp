import { Component, } from '@angular/core';
import { NavController, NavParams,AlertController,LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { ENV } from '../../app/env';
import { OfferPage } from '../offer/offer';

/*
  Generated class for the Laboronlysummary page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-laboronlysummary',
  templateUrl: 'laboronlysummary.html'
})
export class LaboronlysummaryPage {
    data;
 
  constructor(public loadingController:LoadingController,public http:Http,public alertCtrl:AlertController,public navCtrl: NavController, public navParams: NavParams) {}

  ionViewWillLoad() {
    console.log('ionViewDidLoad LaboronlysummaryPage');
	this.data=this.navParams.get('data');
    
    console.log(this.data)
  }



  notificationpage(id,offer){
    if(offer!=0 || offer!='0'){
      this.navCtrl.push(OfferPage,{id:id});
    }
    else{
      let alert=this.alertCtrl.create({
        title:'Alert',
        message:'No Offers',
        buttons:['Ok']
      })
      alert.present();
    }
  }

  withdrawAuction(id){
    let confirm=this.alertCtrl.create({
          subTitle:'Are you want to Withdraw​ Auction',
          buttons:[ {
                     text:'Cancel',
                     handler:()=>
                     {
                     }
                    }
                    ,{ 
                     text:'Yes',
                     handler:()=>
                     {
                      let loader = this.loadingController.create()
                      loader.present()
                      this.http.get(ENV.api+"/webservicesdeactivedraft/"+id).subscribe(data=>{
                        this.navCtrl.popToRoot();
                        loader.dismiss()
                      },err=>{
                        loader.dismiss()
                      })
                     }
                    }]
                 })
    confirm.present();
  }

}
