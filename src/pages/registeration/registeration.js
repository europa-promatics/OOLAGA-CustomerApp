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
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { LoginPage } from '../login/login';
import { AlertController } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { Transfer, Camera } from 'ionic-native';
import { Validators, FormBuilder } from '@angular/forms';
import { ENV } from '../../app/env';
import { PaymentPage } from '../payment/payment';
var RegisterationPage = /** @class */ (function () {
    function RegisterationPage(formBuilder, popoverCtrl, navCtrl, navParams, http, alertCtrl, loadingCtrl) {
        this.formBuilder = formBuilder;
        this.popoverCtrl = popoverCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.firstname = '';
        this.lastname = '';
        this.email = '';
        this.password = '';
        this.phone = '';
        this.about = '';
        this.http = http;
        this.data = {};
        this.data.response = '';
        var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        // let emailRegex = '^[a-zA-Z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,15})$';
        this.register = formBuilder.group({
            firstname: ['', Validators.compose([Validators.maxLength(30), Validators.minLength(3), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
            lastname: ['', Validators.compose([Validators.maxLength(30), Validators.minLength(3), Validators.pattern('[a-zA-Z ]*'), Validators.required])],
            email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
            password: ['', Validators.compose([Validators.maxLength(25), Validators.minLength(8), Validators.pattern('[a-zA-Z0-9]*'), Validators.required])],
            phone: ['', Validators.compose([Validators.minLength(10), Validators.pattern('[0-9]*'), Validators.required])],
            dob: ['', Validators.compose([Validators.required])],
            hearDetailsFrom: ['', Validators.compose([Validators.required])]
        });
        console.log('Hello registration Page');
        this.pic = "img/man.png";
    }
    RegisterationPage_1 = RegisterationPage;
    RegisterationPage.prototype.uploadpic = function (a) {
        var _this = this;
        if (a == 2) {
            Camera.getPicture({
                quality: 75,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                encodingType: Camera.EncodingType.JPEG,
                targetHeight: 500,
                targetWidth: 500,
                saveToPhotoAlbum: false
            }).then(function (imageData) {
                _this.pic = "data:image/jpeg;base64," + imageData;
            }, function (err) { alert('Camera is not Working'); });
        }
        else if (a == 1) {
            Camera.getPicture({
                quality: 75,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                encodingType: Camera.EncodingType.JPEG,
                correctOrientation: true,
                targetHeight: 300,
                targetWidth: 300,
                saveToPhotoAlbum: false
            }).then(function (imageData) {
                _this.pic = "data:image/jpeg;base64," + imageData;
            }, function (err) { alert('Camera is not Working'); });
        }
    };
    RegisterationPage.prototype.itemTapped = function (event, item) {
        this.navCtrl.push(RegisterationPage_1, {
            item: item
        });
    };
    RegisterationPage.prototype.submit = function () {
        var _this = this;
        console.log(this.register.controls["dob"].value);
        var dateForMangopay = this.register.controls["dob"].value.split('-');
        var yy = dateForMangopay[0];
        yy = yy.slice(2, 4);
        console.log(yy);
        yy = yy;
        var dd = dateForMangopay[2];
        var mm = dateForMangopay[1];
        dateForMangopay = dd + mm + yy;
        console.log(dateForMangopay);
        //----------------------------------------------------------------------
        console.log(this.register.valid);
        console.log(this.register.dirty);
        if (this.register.valid) {
            this.loader = this.loadingCtrl.create();
            this.loader.present();
            var error;
            var data = JSON.stringify({
                firstname: this.register.controls["firstname"].value,
                lastname: this.register.controls["lastname"].value,
                email: this.register.controls["email"].value,
                number: this.register.controls["phone"].value,
                user_type: 0,
                password: this.register.controls["password"].value,
                hear_aboutus: this.register.controls["hearDetailsFrom"].value,
            });
            this.http.post(ENV.api + '/webservicesignup', data).subscribe(function (data) {
                _this.data.response = data;
                if (JSON.parse(data._body).response == true) {
                    _this.user_id = JSON.parse(data._body).user_id;
                    var walletdata = JSON.stringify({
                        user_id: JSON.parse(data._body).user_id,
                        email: _this.register.controls["email"].value,
                        first_name: _this.register.controls["firstname"].value,
                        last_name: _this.register.controls["lastname"].value,
                        dob: +dateForMangopay,
                        hear_aboutus: _this.register.controls["hearDetailsFrom"].value,
                        nationality: 'US',
                        country: 'US'
                    });
                    _this.http.post(ENV.api + '/createMangoUser', walletdata).subscribe(function (data) {
                        console.log("wallet successfully created");
                        console.log(data);
                        console.log(JSON.parse(data._body).userData);
                        console.log(JSON.parse(data._body).userData.Id);
                        _this.mangoUserId = JSON.parse(data._body).userData.Id;
                        console.log(JSON.parse(data._body).walletDetails);
                        console.log(JSON.parse(data._body).walletDetails.Id);
                        if (_this.pic == "img/man.png") {
                            _this.loader.dismiss();
                            var alert_1 = _this.alertCtrl.create({
                                title: 'Thank you!',
                                subTitle: 'Registration Successful please check your email to verify your email address.',
                                buttons: ['OK']
                            });
                            alert_1.present();
                            _this.navCtrl.push(PaymentPage, { 'user_id': _this.user_id, 'mangoUserId': _this.mangoUserId });
                        }
                        else {
                            _this.submitt(JSON.parse(data._body).user_id);
                        }
                    }, function (err) {
                        console.log(err);
                    });
                }
                else if (JSON.parse(data._body).response == false) {
                    error = JSON.parse(data._body).message;
                    var alert_2 = _this.alertCtrl.create({ title: 'Error!', subTitle: error, buttons: ['OK'] });
                    alert_2.present();
                    _this.loader.dismiss();
                }
            }, function (error) {
                console.log(error);
            });
        }
        else {
            console.log('else');
            if (this.register.controls["firstname"].value == null || this.register.controls["firstname"].value == '') {
                var alert_3 = this.alertCtrl.create({
                    title: 'Oopss....!',
                    subTitle: 'Please enter first name',
                    buttons: ['OK']
                });
                alert_3.present();
            }
            else if (!this.register.controls["firstname"].valid) {
                var alert_4 = this.alertCtrl.create({
                    title: 'Oopss....!',
                    subTitle: 'Please verify first name',
                    buttons: ['OK']
                });
                alert_4.present();
            }
            else if (this.register.controls["lastname"].value == null || this.register.controls["lastname"].value == '') {
                var alert_5 = this.alertCtrl.create({
                    title: 'Oopss....!',
                    subTitle: 'Please enter last name',
                    buttons: ['OK']
                });
                alert_5.present();
            }
            else if (!this.register.controls["lastname"].valid) {
                var alert_6 = this.alertCtrl.create({
                    title: 'Oopss....!',
                    subTitle: 'Please verify last name',
                    buttons: ['OK']
                });
                alert_6.present();
            }
            else if (this.register.controls["email"].value == null || this.register.controls["email"].value == '') {
                var alert_7 = this.alertCtrl.create({
                    title: 'Oopss....!',
                    subTitle: 'Please enter email',
                    buttons: ['OK']
                });
                alert_7.present();
            }
            else if (!this.register.controls["email"].valid) {
                var alert_8 = this.alertCtrl.create({
                    title: 'Oopss....!',
                    subTitle: 'Please verify email',
                    buttons: ['OK']
                });
                alert_8.present();
            }
            else if (this.register.controls["password"].value == null || this.register.controls["password"].value == '') {
                var alert_9 = this.alertCtrl.create({
                    title: 'Oopss....!',
                    subTitle: 'Please enter password',
                    buttons: ['OK']
                });
                alert_9.present();
            }
            else if (!this.register.controls["password"].valid) {
                var alert_10 = this.alertCtrl.create({
                    title: 'Oopss....!',
                    subTitle: 'Please enter minimum 8 character password',
                    buttons: ['OK']
                });
                alert_10.present();
            }
            else if (this.register.controls["phone"].value == null || this.register.controls["phone"].value == '') {
                var alert_11 = this.alertCtrl.create({
                    title: 'Oopss....!',
                    subTitle: 'Please enter Phone no.',
                    buttons: ['OK']
                });
                alert_11.present();
            }
            else if (!this.register.controls["phone"].valid) {
                var alert_12 = this.alertCtrl.create({
                    title: 'Oopss....!',
                    subTitle: 'Please verify Phone no.',
                    buttons: ['OK']
                });
                alert_12.present();
            }
            else if (!this.register.controls["dob"].valid) {
                var alert_13 = this.alertCtrl.create({
                    title: 'Oopss....!',
                    subTitle: 'Please verify Date of birth',
                    buttons: ['OK']
                });
                alert_13.present();
            }
            else if (!this.register.controls["hearDetailsFrom"].valid) {
                var alert_14 = this.alertCtrl.create({
                    title: 'Oopss....!',
                    subTitle: 'Please verify hearing details',
                    buttons: ['OK']
                });
                alert_14.present();
            }
        }
    };
    RegisterationPage.prototype.submitt = function (id) {
        var _this = this;
        //alert(id);
        FileTransfer = new Transfer();
        var options;
        options = {
            fileKey: "image",
            chunkedMode: false,
            mimeType: "image/jpg",
        };
        FileTransfer.upload(this.pic, ENV.api + "/webservicefileupload1/" + id, options)
            .then(function (data) {
            _this.loader.dismiss();
            var alert = _this.alertCtrl.create({
                title: 'Thank you!',
                subTitle: 'Registration Successful please check your email to verify you email address',
                buttons: ['OK']
            });
            alert.present();
            _this.navCtrl.push(LoginPage);
        }, function (err) {
            alert(JSON.stringify(err));
            _this.loader.dismiss();
        });
    };
    RegisterationPage = RegisterationPage_1 = __decorate([
        Component({
            selector: 'page-registeration',
            templateUrl: 'registeration.html'
        }),
        __metadata("design:paramtypes", [FormBuilder, PopoverController, NavController, NavParams, Http, AlertController, LoadingController])
    ], RegisterationPage);
    return RegisterationPage;
    var RegisterationPage_1;
}());
export { RegisterationPage };
//# sourceMappingURL=registeration.js.map