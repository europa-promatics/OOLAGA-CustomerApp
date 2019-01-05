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
import { Http } from '@angular/http';
import { NavController, NavParams, ActionSheetController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { Transfer, Camera } from 'ionic-native';
import { ENV } from '../../app/env';
import { AppProvider } from '../../providers/app-provider';
import { Device } from '@ionic-native/device';
import { Events } from 'ionic-angular';
import { FormBuilder } from '@angular/forms';
var ProfilePage = /** @class */ (function () {
    function ProfilePage(device, events, formBuilder, appProvider, http, loadingCtrl, navCtrl, navParams, alertCtrl, actionSheetCtrl) {
        this.device = device;
        this.events = events;
        this.formBuilder = formBuilder;
        this.appProvider = appProvider;
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.actionSheetCtrl = actionSheetCtrl;
        this.edit = true;
        this.pic = false;
        this.profile_pic = localStorage['profile_pic'];
        this.firstname = localStorage['user_name'];
        this.lastname = localStorage['lastname'];
        this.email = localStorage['email'];
        this.number = localStorage['number'];
        this.id = localStorage['user_id'];
        if (localStorage['profile_pic'] == '') {
            this.pic = false;
        }
        else {
            this.pic = true;
        }
        this.http = http;
    }
    ProfilePage.prototype.picOption = function (value) {
        var _this = this;
        FileTransfer = new Transfer(); //------------browser code
        var data = {
            id: this.id,
            pic: ''
        };
        if (value == 1) {
            Camera.getPicture({
                quality: 75,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                encodingType: Camera.EncodingType.JPEG,
                targetHeight: 500,
                targetWidth: 500,
                saveToPhotoAlbum: false
            }).then(function (imageData) {
                _this.profile_pic = "data:image/jpeg;base64," + imageData;
                localStorage['profile_pic'] = _this.profile_pic;
                _this.events.publish('changeProfileData', true);
                var options;
                options = {
                    fileKey: "image",
                    chunkedMode: false,
                    mimeType: "image/jpg",
                };
                FileTransfer.upload(_this.profile_pic, ENV.api + "/webservicefileupload1/" + _this.id, options)
                    .then(function (data) {
                    // alert(JSON.stringify(data));
                }, function (err) {
                    // alert(JSON.stringify(err))
                });
            }, function (err) { });
        }
        else if (value == 2) {
            Camera.getPicture({
                quality: 75,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                encodingType: Camera.EncodingType.JPEG,
                targetHeight: 500,
                targetWidth: 500,
                saveToPhotoAlbum: false
            }).then(function (imageData) {
                _this.profile_pic = "data:image/jpeg;base64," + imageData;
                localStorage['profile_pic'] = _this.profile_pic;
                _this.events.publish('changeProfileData', true);
                var options;
                options = {
                    fileKey: "image",
                    chunkedMode: false,
                    mimeType: "image/jpg",
                };
                FileTransfer.upload(_this.profile_pic, ENV.api + "/webservicefileupload1/" + _this.id, options)
                    .then(function (data) {
                    // alert(JSON.stringify(data));
                }, function (err) {
                    // alert(JSON.stringify(err))
                });
            }, function (err) { });
        }
    };
    ProfilePage.prototype.changePic = function () {
        var _this = this;
        if (this.edit) {
        }
        else {
            var actionSheet = this.actionSheetCtrl.create({
                title: 'Upload Option',
                buttons: [
                    {
                        text: 'Camera',
                        icon: 'ios-camera-outline',
                        role: 'destructive',
                        handler: function () {
                            _this.picOption(1);
                        }
                    },
                    {
                        text: 'Gallery',
                        icon: 'ios-image-outline',
                        role: 'destructive',
                        handler: function () {
                            _this.picOption(2);
                        }
                    },
                    {
                        text: 'Cancel',
                        icon: 'md-close',
                        role: 'cancel',
                        handler: function () {
                        }
                    }
                ]
            });
            actionSheet.present();
        }
    };
    ProfilePage.prototype.editprofile = function () {
        if (this.edit == false) {
            this.saveprofile();
        }
        else {
            this.edit = !this.edit;
        }
    };
    ProfilePage.prototype.saveprofile = function () {
        var _this = this;
        this.password == '' ? this.password = null : '';
        if (this.password && this.password.length < 8 && this.password.length != 0) {
            var alert_1 = this.alertCtrl.create({
                title: 'Oops..!',
                subTitle: 'Please enter minimum 8 character password',
                buttons: ['OK']
            });
            alert_1.present();
        }
        else {
            var loader_1 = this.loadingCtrl.create();
            loader_1.present();
            var data = JSON.stringify({
                id: this.id,
                // email:this.email,
                firstname: this.firstname,
                lastname: this.lastname,
                password: this.password,
                number: this.number
            });
            this.http.post(ENV.api + '/webserviceeditprofile', data).subscribe(function (data) {
                loader_1.dismiss();
                var message = JSON.parse(data._body).message;
                if (JSON.parse(data._body).response == true) {
                    var alert_2 = _this.alertCtrl.create({
                        title: 'Profile updated successfully',
                        buttons: ['OK']
                    });
                    alert_2.present();
                    localStorage['user_name'] = _this.firstname;
                    localStorage['lastname'] = _this.lastname;
                    localStorage['email'] = _this.email;
                    localStorage['number'] = _this.number;
                    localStorage['password'] = _this.password;
                    _this.events.publish('changeProfileData', true);
                    _this.edit = !_this.edit;
                }
                else if (JSON.parse(data._body).response == false) {
                    var alertf = _this.alertCtrl.create({
                        title: 'Error!',
                        subTitle: message,
                        buttons: ['OK']
                    });
                    alertf.present();
                }
                console.log(JSON.parse(data._body).response);
            }, function (error) {
                console.log(error);
            });
        }
    };
    ProfilePage.prototype.doFbLogout = function () {
    };
    ProfilePage.prototype.logout = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({ title: 'Logout',
            message: "Are you sure?.",
            buttons: [
                {
                    text: 'No',
                    handler: function () {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        var loading = _this.loadingCtrl.create();
                        loading.present();
                        localStorage.clear();
                        _this.navCtrl.setRoot(LoginPage);
                        _this.http.post(ENV.api + '/webservicelogout', ({ device_id: _this.device.uuid })).subscribe(function (data) { }, function (err) { });
                        loading.dismiss();
                    }
                }
            ]
        });
        confirm.present();
    };
    ProfilePage = __decorate([
        Component({
            selector: 'page-profile',
            templateUrl: 'profile.html'
        }),
        __metadata("design:paramtypes", [Device, Events,
            FormBuilder,
            AppProvider,
            Http,
            LoadingController,
            NavController,
            NavParams,
            AlertController,
            ActionSheetController])
    ], ProfilePage);
    return ProfilePage;
}());
export { ProfilePage };
//# sourceMappingURL=profile.js.map