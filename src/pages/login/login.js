var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, AlertController, Platform } from 'ionic-angular';
import { Http } from '@angular/http';
import { MyoolagaPage } from '../myoolaga/myoolaga';
import { ForgotPage } from '../forgot/forgot';
import { Device } from '@ionic-native/device';
import { Events, MenuController } from 'ionic-angular';
import { RegisterationPage } from '../registeration/registeration';
//-------------env file --------------------
import { FCM } from '@ionic-native/fcm';
import { Validators, FormBuilder } from '@angular/forms';
import { ENV } from '../../app/env';
var LoginPage = /** @class */ (function () {
    function LoginPage(fcm, device, platfm, formBuilder, menuCtrl, events, navCtrl, navParams, http, alertCtrl, loadingCtrl) {
        this.fcm = fcm;
        this.device = device;
        this.platfm = platfm;
        this.formBuilder = formBuilder;
        this.menuCtrl = menuCtrl;
        this.events = events;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        //=====================mobile code=========================
        this.platform = this.device.platform;
        this.uid = this.device.uuid;
        //=====================browser code=========================
        // this.platform='browser';
        // this.uid='browser';
        // localStorage['token']='sdfkjhfjsdfjajhiohjioankmn4uhrenwjkehr8'
        //============================================================        
        this.forgot = ForgotPage;
        this.signupage = RegisterationPage;
        this.username = '';
        this.password = '';
        this.http = http;
        this.data = {};
        this.data.response = '';
        localStorage['msg_no'] = 0;
        this.menu = menuCtrl;
        this.menu.enable(false, "mymenu");
        // let emailRegex = '^[a-zA-Z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
        var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        this.log_in = formBuilder.group({
            username: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
            password: ['', Validators.compose([Validators.maxLength(25), Validators.minLength(8), Validators.pattern('[a-zA-Z0-9]*'), Validators.required])],
        });
    }
    LoginPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        //====================Mobile code=====================
        this.fcm.getToken().then(function (token) {
            console.log('Token saved:', token);
            localStorage['token'] = token;
            _this.tok = token;
        });
        //====================Mobile code=====================
    };
    LoginPage.prototype.login = function () {
        var _this = this;
        if (this.log_in.valid) {
            var loader_1 = this.loadingCtrl.create();
            loader_1.present();
            var link = ENV.api + '/webservicelogin';
            var data = JSON.stringify({
                user_type: 0,
                email: this.log_in.controls["username"].value,
                password: this.log_in.controls["password"].value,
                device_id: this.uid,
                device_token: this.tok,
                device_type: this.platform
            });
            // let alert = this.alertCtrl.create({
            //               title: 'Oopss...!',
            //               subTitle: data,
            //               buttons: ['OK']
            //           });
            //           alert.present();
            this.http.post(link, data)
                .subscribe(function (data) {
                loader_1.dismiss();
                _this.data.response = data;
                if (JSON.parse(data._body).response == true) {
                    localStorage['user_name'] = JSON.parse(data._body).user_info.firstname;
                    var image_name = JSON.parse(data._body).user_info.image;
                    console.log(image_name);
                    if (image_name == null) {
                        localStorage['profile_pic'] = '';
                    }
                    else {
                        localStorage['profile_pic'] = ENV.api + "/public/frontend/img/profile/" + image_name;
                    }
                    console.log(localStorage['profile_pic']);
                    localStorage['lastname'] = JSON.parse(data._body).user_info.lastname;
                    localStorage['email'] = JSON.parse(data._body).user_info.email;
                    localStorage['number'] = JSON.parse(data._body).user_info.number;
                    localStorage['user_id'] = JSON.parse(data._body).user_info.id;
                    localStorage['mango_user_id'] = JSON.parse(data._body).user_info.mango_user_id;
                    localStorage['wallet_id'] = JSON.parse(data._body).user_info.wallet_id;
                    console.log('user_name', localStorage['user_name']);
                    localStorage['login'] = true; //login set
                    _this.events.publish('user:created', true);
                    _this.navCtrl.setRoot(MyoolagaPage);
                }
                else if (JSON.parse(data._body).response == false) {
                    var error = JSON.parse(data._body).message;
                    var alert_1 = _this.alertCtrl.create({
                        subTitle: error,
                        buttons: ['OK']
                    });
                    alert_1.present();
                }
                console.log(JSON.parse(data._body).response);
            }, function (error) {
                var alert = _this.alertCtrl.create({
                    title: 'Oopss...!',
                    subTitle: 'Network Problem...',
                    buttons: ['OK']
                });
                alert.present();
                loader_1.dismiss();
            });
        }
        else {
            if ((this.log_in.controls["username"].value == null && this.log_in.controls["password"].value == null) || (this.log_in.controls["username"].value == '' && this.log_in.controls["password"].value == null) || (this.log_in.controls["username"].value == null && this.log_in.controls["password"].value == '') || (this.log_in.controls["username"].value == '' && this.log_in.controls["password"].value == '')) {
                var alert_2 = this.alertCtrl.create({
                    title: 'Oopss..',
                    message: 'Please enter your Username and Password',
                    buttons: ['OK']
                });
                alert_2.present();
            }
            else if (this.log_in.controls["username"].value == null || this.log_in.controls["username"].value == '') {
                var alert_3 = this.alertCtrl.create({
                    title: 'Oopss..',
                    message: 'Please enter your Username',
                    buttons: ['OK']
                });
                alert_3.present();
            }
            else if (!this.log_in.controls["username"].valid) {
                var alert_4 = this.alertCtrl.create({
                    title: 'Oopss..',
                    message: 'Please check your Username',
                    buttons: ['OK']
                });
                alert_4.present();
            }
            else if (this.log_in.controls["password"].value == null || this.log_in.controls["password"].value == '') {
                var alert_5 = this.alertCtrl.create({
                    title: 'Oopss..',
                    message: 'Please enter your Password',
                    buttons: ['OK']
                });
                alert_5.present();
            }
            else if (!this.log_in.controls["password"].valid) {
                var alert_6 = this.alertCtrl.create({
                    title: 'Oopss..',
                    message: 'Please enter minimum 8 character password',
                    buttons: ['OK']
                });
                alert_6.present();
            }
        }
    };
    LoginPage = __decorate([
        Component({
            selector: 'page-login',
            templateUrl: 'login.html'
        }),
        __metadata("design:paramtypes", [FCM, Device, Platform,
            FormBuilder,
            MenuController,
            Events,
            NavController,
            NavParams,
            Http,
            AlertController,
            LoadingController])
    ], LoginPage);
    return LoginPage;
}());
export { LoginPage };
//# sourceMappingURL=login.js.map