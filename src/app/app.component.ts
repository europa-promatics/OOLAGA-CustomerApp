import { Component, ViewChild } from '@angular/core'; 
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Device } from '@ionic-native/device';
import {LocalNotifications} from 'ionic-native'
import { AlertController,ModalController } from 'ionic-angular';
import { FCM } from '@ionic-native/fcm';
import { Events } from 'ionic-angular';
import { Http } from '@angular/http';

//-----side menu------------
import { ProfilePage } from '../pages/profile/profile';
import { HelpPage } from '../pages/help/help';
import { InvitePage } from '../pages/invite/invite';
import { CreditPage } from '../pages/credit/credit';
import { PaymentPage } from '../pages/payment/payment';
import { PaymentAfterLoginPage } from '../pages/payment-afterloin/payment-afterloin'
import { HelperPage } from '../pages/helper/helper';
import { CustomeCardListPage } from '../pages/custome-card-list/custome-card-list';
import { PastoolagaPage } from '../pages/pastoolaga/pastoolaga' ;
import { MyoolagaPage } from '../pages/myoolaga/myoolaga';
import { NotificationPage } from '../pages/notification/notification'
//-------login page-------------
import { LoginPage }from'../pages/login/login';
//--------------extra----------------------
import { TestPage } from '../pages/test/test'
//---------------------------------------------
import { ChatPage }from '../pages/chat/chat';
import { OfferPage } from '../pages/offer/offer';
import { PastOolagaDetailsPage } from '../pages/past-oolaga-details/past-oolaga-details';
import { OolagaSummaryPage } from '../pages/oolaga-summary/oolaga-summary'
import { ENV }from './env';
import { SaveCardDetailsPage} from '../pages/save-card-details/save-card-details'
import { RegisterationPage} from '../pages/registeration/registeration'
import { FeedbackPage} from '../pages/feedback/feedback'


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage;
  pages: Array<{title: string, component: any, logo: string , color:string,notificationCount:any}>;
  profile_pic:string="img/man.png";
  pic:boolean=false;
  user_name:string;
  email;
  value:boolean=false;
  push;
  menu;
  enable:boolean=true;
  notificationcount:number=0;
  pendingRatingsCount:number=0;
  http;
  track;

  constructor(public modalCtrl:ModalController,http: Http,public device:Device,public localNotifications: LocalNotifications, private fcm: FCM,public alertCtrl:AlertController,public events: Events,public platform: Platform) {
    
	this.pages = [
      { title: 'Mes Projets', component:MyoolagaPage , logo: 'assets/icon/Post-Ico.png', color:'red_color',notificationCount:0},
      { title: 'Projets terminés', component:PastoolagaPage , logo: 'assets/icon/Hirstory-Ico.png', color:'gray_color',notificationCount:0},
      { title: 'Notifications', component:NotificationPage , logo: 'assets/icon/bell.png', color:'gray_color',notificationCount:this.notificationcount},
      { title: 'Paiement', component:PaymentAfterLoginPage , logo: 'assets/icon/Payment-Ico.png', color:'gray_color',notificationCount:0},
      { title: 'Cartes enregistrées', component:CustomeCardListPage , logo: 'assets/icon/Payment-Ico.png', color:'gray_color',notificationCount:0},
      { title: 'Invitez des amis', component:InvitePage , logo: 'assets/icon/Share-Ico.png', color:'green_color',notificationCount:0},
      { title: 'Code promo', component:CreditPage , logo: 'assets/icon/Credit-Ico.png', color:'gray_color',notificationCount:0},
      { title: 'Devenir un Helper', component: HelperPage, logo: 'assets/icon/Helper-Ico.png', color:'gray_color',notificationCount:0},
      { title: 'Aide', component:HelpPage , logo: 'assets/icon/Setting-Ico.png', color:'gray_color',notificationCount:0},
      // { title: 'Test Payment', component:TestPage , logo: 'assets/icon/Payment-Ico.png', color:'gray_color'},
    ];

    this.initializeAppDuplicate();
    this.http=http;
  }

  notification(data){
    if(data.type=='msg'){
      this.nav.push(ChatPage,{receiver_id:data.user_id,image:data.user_image,name:data.user_name, oolaga:data.oolaga_id})
    }else if(data.type=='bid'){
      this.nav.push(OfferPage,{id:data.oolaga_id})
    }else if(data.type=='endoolaga'||data.type=='end_oolaga'){
      // this.nav.push(OfferPage,{id:data.oolaga_id})
      // alert(data.data)
      // this.nav.push(PastOolagaDetailsPage,{data:data.data});
      let payment = this.modalCtrl.create(TestPage,{data:data.data})
      payment.present();
    } 
  }
  
  notificationEvents(a){
	  if(JSON.parse(a).type=='bid'){
              let alert = this.alertCtrl.create({
                title:JSON.parse(a).title,
                message:JSON.parse(a).body,
                buttons:[{
                  text:'OUVRIR',
                  handler:()=>{
                    this.nav.push(OfferPage,{id:JSON.parse(a).oolaga_id})
                  }
                }]
              })
              alert.present();
            }else if(JSON.parse(a).type=='end_oolaga'){
              let alert = this.alertCtrl.create({
                title:JSON.parse(a).title,
                message:JSON.parse(a).body,
                buttons:[{
                  text:'OUVRIR',
                  handler:()=>{
                      this.nav.push(FeedbackPage,{
                    helperWalletId:JSON.parse(a).wallet_id,
                    helperId:JSON.parse(a).helper_id,
                    oolaga_id:JSON.parse(a).oolaga_id,
					helper_name:JSON.parse(a).helper_name,
					helper_image:JSON.parse(a).helper_image
					
                  })
                  }
                }]
              })
              alert.present();
            } else if(JSON.parse(a).type=='msg'){
              let alert = this.alertCtrl.create({
                title:JSON.parse(a).title,
                message:JSON.parse(a).body,
                buttons:[{
                  text:'Show',
                  handler:()=>{
                   this.nav.push(ChatPage,
				   {receiver_id:JSON.parse(a).user_id,
				   image:JSON.parse(a).user_image,
				   name:JSON.parse(a).user_name, 
				   oolaga:JSON.parse(a).oolaga_id
				   })
                  }
                }]
              })
              alert.present();
            }else{
              let alert = this.alertCtrl.create({
                title:JSON.parse(a).title,
                message:JSON.parse(a).body,
                buttons:['ok']
              })
              alert.present();
            }
	  
  }


  initializeAppDuplicate() {
 //  this.platform.ready().then(() => {
     StatusBar.backgroundColorByHexString('#385d96');
     Splashscreen.hide();
    //  ------------------------------mobile code----------------------
/*       if(this.device.platform.toUpperCase()=='ANDROID' || this.device.platform.toUpperCase()=='IOS'){
        this.fcm.subscribeToTopic('oolaga');
        this.fcm.onNotification().subscribe(data=>{
          let a:any= JSON.stringify(data);
          if(data.wasTapped){
            console.log("Received in background");
            this.notification(data);
          } else {
            // alert(a);
            if(JSON.parse(a).type=='bid'){
              let alert = this.alertCtrl.create({
                title:JSON.parse(a).title,
                message:JSON.parse(a).body,
                buttons:[{
                  text:'Open',
                  handler:()=>{
                    this.nav.push(OfferPage,{id:JSON.parse(a).oolaga_id})
                  }
                }]
              })
              alert.present();
            }else if(this.enable){
              let alert = this.alertCtrl.create({
                title:JSON.parse(a).title,
                message:JSON.parse(a).body,
                buttons:['ok']
              })
              alert.present();
            }
            this.events.publish('notification')
            console.log("Received in foreground");
          };
        })
      } */
	//  this.fcm.subscribeToTopic('oolaga');
 //     this.fcm.onNotification().subscribe(data => {
           if(0){
             
               // let newData=data['data'];
    

              /*   if(JSON.parse(newData).type=='end_oolaga'){
                  this.nav.push(FeedbackPage,{
                    helperWalletId:JSON.parse(newData).wallet_id,
                    helperId:JSON.parse(newData).helper_id,
                    oolaga_id:JSON.parse(newData).oolaga_id
                  })
                }
                else if(JSON.parse(newData).type=='bid'){
                   this.nav.push(OfferPage,{id:JSON.parse(newData).oolaga_id})
                } */
           } else  {
              
				/* let newData=data['data'];
				let alert = this.alertCtrl.create({
                 title:JSON.parse(newData).title,
                 message:JSON.parse(newData).body,
                 buttons:[{
                   text:'OK'
                  
               }]
               })
              alert.present(); */
           };
     // });     

      this.profile_pic=localStorage['profile_pic']; 
      if(localStorage['profile_pic']==''){this.pic=false}else{this.pic=true}
      this.user_name=localStorage['user_name']; 
      this.email=localStorage['email'];
      this.events.subscribe('user:created', (data) => {
        this.profile_pic=localStorage['profile_pic']; 
        if(localStorage['profile_pic']==''){this.pic=false}else{this.pic=true}
        this.user_name=localStorage['user_name']; 
        this.email=localStorage['email'];
      });
      this.events.subscribe('enablePopup', (data) => {
          this.enable=data;
      });
      this.events.subscribe('notificationcount', (data) => {
          this.notificationcount=data;
      });
      this.events.subscribe('changeProfileData', (data) => {
          this.profile_pic=localStorage['profile_pic'];
          this.user_name=localStorage['user_name']; 
          this.email=localStorage['email'];
      });
      if(localStorage['login']==true || localStorage['login']=='true')
      {
    
        // this.rootPage = SaveCardDetailsPage
        this.rootPage = MyoolagaPage;

      }
      else
      {  
        // this.rootPage = SaveCardDetailsPage;  
       // this.rootPage = CustomerOolagaConfirmedPage;  
        this.rootPage = LoginPage;  
      }
      this.track = setInterval(()=>{
        let link = ENV.api+'/webservicepas_notification_count/'+localStorage['user_id'];
        this.http.get(link).subscribe(data => {
          if(data.json().response){
            console.log(data.json().data);
            this.events.publish('notificationcount',data.json().data);
					this.pendingRatingsCount=data.json().ratings;
          }
        })
      },10000)
   //});
  }

  
  initializeApp() {
   this.platform.ready().then(() => {
     StatusBar.backgroundColorByHexString('#385d96');
     Splashscreen.hide();
       this.events.subscribe('notificationEvents', (data) => {
			this.enable=data;
			});
      this.fcm.onNotification().subscribe(data => {
		 /*  let alert = this.alertCtrl.create({
                title:"Notification Received",
                message:JSON.stringify(data),
                buttons:['ok']
              })
              alert.present(); */
		    let a:any= JSON.stringify(data);
			this.events.publish('notificationEvents', a);
           if(data.wasTapped){
            // alert(JSON.stringify(data));
                let newData=data['data'];
    

                if(JSON.parse(newData).type=='end_oolaga'){
                  this.nav.push(FeedbackPage,{
                    helperWalletId:JSON.parse(newData).wallet_id,
                    helperId:JSON.parse(newData).helper_id,
                    oolaga_id:JSON.parse(newData).oolaga_id,
					helper_name:JSON.parse(newData).helper_name,
					helper_image:JSON.parse(newData).helper_image
					
                  })
                }
                else if(JSON.parse(newData).type=='bid'){
                   this.nav.push(OfferPage,{id:JSON.parse(newData).oolaga_id})
                }else if(JSON.parse(newData).type=='msg'){
					this.nav.push(ChatPage,{receiver_id:JSON.parse(newData).user_id,image:JSON.parse(newData).user_image,name:JSON.parse(newData).user_name, oolaga:JSON.parse(newData).oolaga_id})
				}
				
		/* if(JSON.parse(a).type=='bid'){
              let alert = this.alertCtrl.create({
                title:JSON.parse(a).title,
                message:JSON.parse(a).body,
                buttons:[{
                  text:'Open',
                  handler:()=>{
                    this.nav.push(OfferPage,{id:JSON.parse(a).oolaga_id})
                  }
                }]
              })
              alert.present();
            }else if(JSON.parse(a).type=='end_oolaga'){
              let alert = this.alertCtrl.create({
                title:JSON.parse(a).title,
                message:JSON.parse(a).body,
                buttons:[{
                  text:'Open',
                  handler:()=>{
                      this.nav.push(FeedbackPage,{
                    helperWalletId:JSON.parse(a).wallet_id,
                    helperId:JSON.parse(a).helper_id,
                    oolaga_id:JSON.parse(a).oolaga_id,
					helper_name:JSON.parse(a).helper_name,
					helper_image:JSON.parse(a).helper_image
					
                  })
                  }
                }]
              })
              alert.present();
            }else{
              let alert = this.alertCtrl.create({
                title:JSON.parse(a).title,
                message:JSON.parse(a).body,
                buttons:['ok']
              })
              alert.present();
            } */
           // this.events.publish('notification')
            console.log("Received in foreground");
           } else  {
			if(JSON.parse(a).type=='bid'){
              let alert = this.alertCtrl.create({
                title:JSON.parse(a).title,
                message:JSON.parse(a).body,
                buttons:[{
                  text:'OUVRIR',
                  handler:()=>{
                    this.nav.push(OfferPage,{id:JSON.parse(a).oolaga_id})
                  }
                }]
              })
              alert.present();
            }else if(JSON.parse(a).type=='end_oolaga'){
              let alert = this.alertCtrl.create({
                title:JSON.parse(a).title,
                message:JSON.parse(a).body,
                buttons:[{
                  text:'OUVRIR',
                  handler:()=>{
                      this.nav.push(FeedbackPage,{
                    helperWalletId:JSON.parse(a).wallet_id,
                    helperId:JSON.parse(a).helper_id,
                    oolaga_id:JSON.parse(a).oolaga_id,
					helper_name:JSON.parse(a).helper_name,
					helper_image:JSON.parse(a).helper_image
					
                  })
                  }
                }]
              })
              alert.present();
            } else if(JSON.parse(a).type=='msg'){
              let alert = this.alertCtrl.create({
                title:JSON.parse(a).title,
                message:JSON.parse(a).body,
                buttons:[{
                  text:'OUVRIR',
                  handler:()=>{
                   this.nav.push(ChatPage,
				   {receiver_id:JSON.parse(a).user_id,
				   image:JSON.parse(a).user_image,
				   name:JSON.parse(a).user_name, 
				   oolaga:JSON.parse(a).oolaga_id
				   })
                  }
                }]
              })
              alert.present();
            }else{
              let alert = this.alertCtrl.create({
                title:JSON.parse(a).title,
                message:JSON.parse(a).body,
                buttons:['ok']
              })
              alert.present();
            }
            //this.events.publish('notification')
            console.log("Received in foreground");
           };
      });     
      this.profile_pic=localStorage['profile_pic']; 
      if(localStorage['profile_pic']==''){this.pic=false}else{this.pic=true}
      this.user_name=localStorage['user_name']; 
      this.email=localStorage['email'];
      this.events.subscribe('user:created', (data) => {
        this.profile_pic=localStorage['profile_pic']; 
        if(localStorage['profile_pic']==''){this.pic=false}else{this.pic=true}
        this.user_name=localStorage['user_name']; 
        this.email=localStorage['email'];
      });
      this.events.subscribe('enablePopup', (data) => {
          this.enable=data;
      });
      this.events.subscribe('notificationcount', (data) => {
          this.notificationcount=data;
      });
      this.events.subscribe('changeProfileData', (data) => {
          this.profile_pic=localStorage['profile_pic'];
          this.user_name=localStorage['user_name']; 
          this.email=localStorage['email'];
      });
      if(localStorage['login']==true || localStorage['login']=='true')
      {
    
        // this.rootPage = SaveCardDetailsPage
        this.rootPage = MyoolagaPage;

      }
      else
      {  
        // this.rootPage = SaveCardDetailsPage;  
       // this.rootPage = CustomerOolagaConfirmedPage;  
        this.rootPage = LoginPage;  
      }
      this.track = setInterval(()=>{
        let link = ENV.api+'/webservicepas_notification_count/'+localStorage['user_id'];
        this.http.get(link).subscribe(data => {
          if(data.json().response){
            console.log(data.json().data);
            this.events.publish('notificationcount',data.json().data);
			this.pendingRatingsCount=data.json().ratings;
          }
        })
      },5000)
   });
  }

  openPage(page) {
    if(page.title=='Help' || page.title=='Test Payment'){
      localStorage['helpPage']='help'
      this.nav.push(page.component);
    }
    else{
      this.nav.setRoot(page.component)
    }
  }

  profile(){
    this.nav.setRoot(ProfilePage);
  }

}
