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
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { LoadingController, AlertController } from 'ionic-angular';
import { ENV } from '../../app/env';
import { Validators, FormBuilder } from '@angular/forms';
import { LoginPage } from '../login/login';
var ForgotPage = /** @class */ (function () {
    function ForgotPage(formBuilder, http, loadingCtrl, alertCtrl, navCtrl, navParams) {
        this.formBuilder = formBuilder;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.mailsend = false;
        this.otp = '0';
        this.imagepath = "/assets/icon/rightthick.png";
        var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        this.http = http;
        this.email = '';
        this.forget = formBuilder.group({
            email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
        });
    }
    ForgotPage.prototype.checkotp = function (event) {
        console.log(event.class);
    };
    // -------------------21-5-2018-----------
    //  submitpassword(){
    //  	let loader = this.loadingCtrl.create();
    //     loader.present();
    //  	var link=ENV.api+'/webserviceforgotpassword';
    // var data = JSON.stringify({user_id:this.user_id,password:this.enterNewPassword});
    //    this.http.post(link, data).subscribe(data => {
    //     var message =JSON.parse(data._body).message;
    //     loader.dismiss();
    //     if(JSON.parse(data._body).response){
    //     	let alert = this.alertCtrl.create({
    //                  title: 'Thank you!',
    //                  subTitle: message,
    //                  buttons: ['OK']
    //              });
    //              alert.present();
    //         this.navCtrl.pop();
    //     }else{
    //     	let alert = this.alertCtrl.create({
    //                  title: 'Error!',
    //                  subTitle: message,
    //                  buttons: ['OK']
    //              });
    //              alert.present();
    //     }
    // });
    //  }
    ForgotPage.prototype.submit = function () {
        var _this = this;
        if (this.forget.controls["email"].value == '' || this.forget.controls["email"].value == null) {
            var alert_1 = this.alertCtrl.create({
                title: 'Oops..!',
                subTitle: 'Enter Email address',
                buttons: ['OK']
            });
            alert_1.present();
        }
        else if (!this.forget.valid) {
            var alert_2 = this.alertCtrl.create({
                title: 'Oops..!',
                subTitle: 'Enter valid email id',
                buttons: ['OK']
            });
            alert_2.present();
        }
        else {
            var loader_1 = this.loadingCtrl.create();
            loader_1.present();
            var link = ENV.api + '/webserviceforgotpassword';
            var data = JSON.stringify({ email: this.forget.controls["email"].value });
            this.http.post(link, data).subscribe(function (data) {
                var message = JSON.parse(data._body).message;
                loader_1.dismiss();
                if (JSON.parse(data._body).response == true) {
                    _this.otp = JSON.parse(data._body).data.otp;
                    _this.user_id = JSON.parse(data._body).data.user_id;
                    var alert_3 = _this.alertCtrl.create({
                        title: 'Password Reset',
                        subTitle: 'A new password has been sent to your email.You can update password on your profile page.',
                        buttons: [{
                                text: 'OK',
                                handler: function (data) {
                                    _this.navCtrl.push(LoginPage);
                                }
                            }]
                    });
                    alert_3.present();
                }
                else if (JSON.parse(data._body).response == false) {
                    var alert_4 = _this.alertCtrl.create({
                        title: 'Error!',
                        subTitle: message,
                        buttons: ['OK']
                    });
                    alert_4.present();
                }
                console.log(JSON.parse(data._body).response);
            }, function (error) {
                console.log(error);
            });
        }
    };
    ForgotPage = __decorate([
        Component({
            selector: 'page-forgot',
            templateUrl: 'forgot.html'
        }),
        __metadata("design:paramtypes", [FormBuilder, Http, LoadingController, AlertController, NavController, NavParams])
    ], ForgotPage);
    return ForgotPage;
}());
export { ForgotPage };
//# sourceMappingURL=forgot.js.map