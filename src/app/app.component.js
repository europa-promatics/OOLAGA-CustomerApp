var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { Device } from '@ionic-native/device';
import { AlertController, ModalController } from 'ionic-angular';
import { FCM } from '@ionic-native/fcm';
import { Events } from 'ionic-angular';
import { Http } from '@angular/http';
//-----side menu------------
import { ProfilePage } from '../pages/profile/profile';
import { HelpPage } from '../pages/help/help';
import { InvitePage } from '../pages/invite/invite';
import { CreditPage } from '../pages/credit/credit';
import { PaymentPage } from '../pages/payment/payment';
import { HelperPage } from '../pages/helper/helper';
import { PastoolagaPage } from '../pages/pastoolaga/pastoolaga';
import { MyoolagaPage } from '../pages/myoolaga/myoolaga';
import { NotificationPage } from '../pages/notification/notification';
//-------login page-------------
import { LoginPage } from '../pages/login/login';
//--------------extra----------------------
import { TestPage } from '../pages/test/test';
//---------------------------------------------
import { ChatPage } from '../pages/chat/chat';
import { OfferPage } from '../pages/offer/offer';
import { ENV } from './env';
var MyApp = /** @class */ (function () {
    function MyApp(modalCtrl, http, device, fcm, alertCtrl, events, platform) {
        this.modalCtrl = modalCtrl;
        this.device = device;
        this.fcm = fcm;
        this.alertCtrl = alertCtrl;
        this.events = events;
        this.platform = platform;
        this.profile_pic = "img/man.png";
        this.pic = false;
        this.value = false;
        this.enable = true;
        this.notificationcount = 0;
        this.pages = [
            { title: 'My Oolagas', component: MyoolagaPage, logo: 'assets/icon/Post-Ico.png', color: 'red_color', notificationCount: 0 },
            { title: 'Past Oolaga', component: PastoolagaPage, logo: 'assets/icon/Hirstory-Ico.png', color: 'gray_color', notificationCount: 0 },
            { title: 'Notification', component: NotificationPage, logo: 'assets/icon/bell.png', color: 'gray_color', notificationCount: this.notificationcount },
            { title: 'Payment', component: PaymentPage, logo: 'assets/icon/Payment-Ico.png', color: 'gray_color', notificationCount: 0 },
            { title: 'Invite Friends', component: InvitePage, logo: 'assets/icon/Share-Ico.png', color: 'green_color', notificationCount: 0 },
            { title: 'Oolaga Credit', component: CreditPage, logo: 'assets/icon/Credit-Ico.png', color: 'gray_color', notificationCount: 0 },
            { title: 'Become a Helper', component: HelperPage, logo: 'assets/icon/Helper-Ico.png', color: 'gray_color', notificationCount: 0 },
            { title: 'Help', component: HelpPage, logo: 'assets/icon/Setting-Ico.png', color: 'gray_color', notificationCount: 0 },
        ];
        this.initializeApp();
        this.http = http;
    }
    MyApp.prototype.notification = function (data) {
        //alert(JSON.stringify(data))
        if (data.type == 'msg') {
            this.nav.push(ChatPage, { receiver_id: data.user_id, image: data.user_image, name: data.user_name });
        }
        else if (data.type == 'bid') {
            this.nav.push(OfferPage, { id: data.oolaga_id });
        }
        else if (data.type == 'endoolaga' || data.type == 'end_oolaga') {
            // this.nav.push(OfferPage,{id:data.oolaga_id})
            // alert(data.data)
            // this.nav.push(PastOolagaDetailsPage,{data:data.data});
            var payment = this.modalCtrl.create(TestPage, { data: data.data });
            payment.present();
        }
    };
    MyApp.prototype.initializeApp = function () {
        var _this = this;
        this.platform.ready().then(function () {
            StatusBar.backgroundColorByHexString('#385d96');
            Splashscreen.hide();
            //------------------------------mobile code----------------------
            // if(this.device.platform.toUpperCase()=='ANDROID' || this.device.platform.toUpperCase()=='IOS'){
            //   this.fcm.subscribeToTopic('oolaga');
            //   this.fcm.onNotification().subscribe(data=>{
            //     let a:any= JSON.stringify(data);
            //     if(data.wasTapped){
            //       console.log("Received in background");
            //       this.notification(data);
            //     } else {
            //       // alert(a);
            //       if(JSON.parse(a).type=='bid'){
            //         let alert = this.alertCtrl.create({
            //           title:JSON.parse(a).title,
            //           message:JSON.parse(a).body,
            //           buttons:[{
            //             text:'Open',
            //             handler:()=>{
            //               this.nav.push(OfferPage,{id:JSON.parse(a).oolaga_id})
            //             }
            //           }]
            //         })
            //         alert.present();
            //       }else if(this.enable){
            //         let alert = this.alertCtrl.create({
            //           title:JSON.parse(a).title,
            //           message:JSON.parse(a).body,
            //           buttons:['ok']
            //         })
            //         alert.present();
            //       }
            //       this.events.publish('notification')
            //       console.log("Received in foreground");
            //     };
            //   })
            // }
            //----------------------------------------------------------------
            _this.profile_pic = localStorage['profile_pic'];
            if (localStorage['profile_pic'] == '') {
                _this.pic = false;
            }
            else {
                _this.pic = true;
            }
            _this.user_name = localStorage['user_name'];
            _this.email = localStorage['email'];
            _this.events.subscribe('user:created', function (data) {
                _this.profile_pic = localStorage['profile_pic'];
                if (localStorage['profile_pic'] == '') {
                    _this.pic = false;
                }
                else {
                    _this.pic = true;
                }
                _this.user_name = localStorage['user_name'];
                _this.email = localStorage['email'];
            });
            _this.events.subscribe('enablePopup', function (data) {
                _this.enable = data;
            });
            _this.events.subscribe('notificationcount', function (data) {
                _this.notificationcount = data;
            });
            _this.events.subscribe('changeProfileData', function (data) {
                _this.profile_pic = localStorage['profile_pic'];
                _this.user_name = localStorage['user_name'];
                _this.email = localStorage['email'];
            });
            if (localStorage['login'] == true || localStorage['login'] == 'true') {
                _this.rootPage = MyoolagaPage;
                // this.rootPage = TestPage;
            }
            else {
                _this.rootPage = LoginPage;
            }
            _this.track = setInterval(function () {
                var link = ENV.api + '/webservicepas_notification_count/' + localStorage['user_id'];
                _this.http.get(link).subscribe(function (data) {
                    if (data.json().response) {
                        console.log(data.json().data);
                        _this.events.publish('notificationcount', data.json().data);
                    }
                });
            }, 10000);
        });
    };
    MyApp.prototype.openPage = function (page) {
        if (page.title == 'Help' || page.title == 'Test Payment') {
            localStorage['helpPage'] = 'help';
            this.nav.push(page.component);
        }
        else {
            this.nav.setRoot(page.component);
        }
    };
    MyApp.prototype.profile = function () {
        this.nav.setRoot(ProfilePage);
    };
    __decorate([
        ViewChild(Nav),
        __metadata("design:type", Nav)
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Component({
            templateUrl: 'app.html'
        }),
        __metadata("design:paramtypes", [ModalController, Http, Device, FCM, AlertController, Events, Platform])
    ], MyApp);
    return MyApp;
}());
export { MyApp };
//# sourceMappingURL=app.component.js.map