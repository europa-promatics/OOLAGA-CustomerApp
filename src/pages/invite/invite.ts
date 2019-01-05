import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {SocialSharing} from 'ionic-native';
import { CustomerOolagaScheduledPage } from '../customer-oolaga-scheduled/customer-oolaga-scheduled';
import { CustomerThankYouPage } from '../customer-thank-you/customer-thank-you';

@Component({
  selector: 'page-invite',
  templateUrl: 'invite.html'
})
export class InvitePage {
    name:string='ooLAGA Customer App';
    url:any='aasfasdfsd';
    msg:string='The message you would like to share';
  constructor(public navCtrl: NavController, public navParams: NavParams) {}
  openschedule(){
      this.navCtrl.push(CustomerOolagaScheduledPage, {});
  }
   openthankyou(){
      this.navCtrl.push(CustomerThankYouPage, {});
  }
  share(a){
        if(a==1){
        SocialSharing.shareViaFacebook(this.name,null,this.url).then(() => {
        }).catch(()=>{alert("Something Went Wrong...")})
        }
        else if(a==2){
        SocialSharing.shareViaTwitter(this.name,null,this.url).then(()=>{
        }).catch(()=>{alert("Something Went Wrong...")})
        }
        else if(a==3){
        SocialSharing.shareViaWhatsApp(this.name,null,this.url).then(() => {
        }).catch(() => {alert("Something Went Wrong...")})
        }
        else if(a==4){
        SocialSharing.share(this.msg,this.name,null, this.url).then(()=>{
        }).catch(()=>{alert("Something Went Wrong...")})
        }
    }
}
