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
import { Camera } from 'ionic-native';
import { AlertController } from 'ionic-angular';
import { ENV } from '../../app/env';
import { AppProvider } from '../../providers/app-provider';
var EditItemDetailPage = /** @class */ (function () {
    function EditItemDetailPage(appProvider, loadingCtrl, alertCtrl, http, navCtrl, navParams) {
        this.appProvider = appProvider;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.pic_exist = false;
        this.item_name = null;
        this.item_quantity = null;
        this.item_image = null;
        this.item_info = null;
        this.item_data = [];
        this.image_number = 0;
        this.item_id = this.navParams.get('itemDetails');
        this.item = this.item_id;
        this.item_data = this.appProvider.current.items;
        this.pic1 = [];
        this.image_number = this.pic1.length;
        console.log(this.item_data);
        console.log(this.item_id);
        this.pic = "img/man.png";
        this.pic_exist = false;
        this.http = http;
        this.item_name = this.item_id.item_name;
        this.item_quantity = this.item_id.quantity;
        this.item_info = this.item_id.information;
        this.id = this.item_id.item_id;
        this.my = ENV.api;
    }
    EditItemDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EditItemDetailPage');
    };
    EditItemDetailPage.prototype.ionViewDidEnter = function () {
        for (var i = 0; i < this.item_id.pics.length; i++) {
            if (this.item_id.pics[i].length < 50) {
                this.pic1[i] = this.my + '/public/frontend/img/addImage/' + this.item_id.pics[i];
            }
            else {
                this.pic1[i] = this.item_id.pics[i];
            }
        }
    };
    EditItemDetailPage.prototype.help = function () {
        var alert = this.alertCtrl.create({
            title: 'Add items',
            message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim ven',
            buttons: ['OK']
        });
        alert.present();
    };
    EditItemDetailPage.prototype.updateitem = function () {
        var _this = this;
        console.log(this.item_data);
        console.log(this.item_id);
        console.log(this.item);
        this.item_id.item_name = this.item_name;
        this.item_id.quantity = this.item_quantity;
        this.item_id.information = this.item_info;
        var link = ENV.api + "/webserviceeditItem";
        var data = JSON.stringify({ item_name: this.item_name,
            quantity: this.item_quantity,
            information: this.item_info,
            item_id: this.id });
        this.http.post(link, data).subscribe(function (data) {
            if (JSON.parse(data._body).response == true) {
                _this.additems();
                _this.navCtrl.pop();
            }
        });
    };
    EditItemDetailPage.prototype.remove_pic = function (value) {
        var p = [];
        for (var i = 0; i < this.pic1.length; i++) {
            if (i == value) {
            }
            else {
                p.push(this.pic1[i]);
            }
        }
        this.pic1 = p;
    };
    EditItemDetailPage.prototype.add = function () {
        this.item_quantity++;
    };
    EditItemDetailPage.prototype.remove = function () {
        if (this.item_quantity == 1) {
        }
        else {
            this.item_quantity--;
        }
    };
    EditItemDetailPage.prototype.additems = function () {
        for (var i = 0; i < this.item_data.length; i++) {
            if (this.item_data[i].item_id == this.id) {
                this.item_data[i].item_name = this.item_name;
                this.item_data[i].quantity = this.item_quantity;
                this.item_data[i].information = this.item_info;
            }
        }
        localStorage['items'] = JSON.stringify(this.item_data);
        this.appProvider.current.items = this.item_data;
    };
    EditItemDetailPage.prototype.upload_pic = function (value) {
        var _this = this;
        if (value == 0) {
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
                _this.pic1[_this.image_number] = "data:image/jpeg;base64," + imageData;
                _this.image_number++;
                _this.pic = "data:image/jpeg;base64," + imageData;
                _this.pic_exist = true;
            }, function (err) { alert('Camera is not Working'); });
        }
        else if (value == 1) {
            Camera.getPicture({
                quality: 75,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                encodingType: Camera.EncodingType.JPEG,
                targetHeight: 500,
                targetWidth: 500,
                saveToPhotoAlbum: false
            }).then(function (imageData) {
                _this.pic1[_this.image_number] = "data:image/jpeg;base64," + imageData;
                _this.image_number++;
                _this.pic = "data:image/jpeg;base64," + imageData;
                _this.pic_exist = true;
            }, function (err) { alert('Camera is not Working'); });
        }
    };
    EditItemDetailPage.prototype.submit = function (value) {
        var _this = this;
        if (value == 0) {
            this.navCtrl.pop();
        }
        else if (value == 1) {
            var loader_1 = this.loadingCtrl.create();
            loader_1.present();
            var link = ENV.api + "/webserviceeditItem";
            var data = JSON.stringify({ item_name: this.item_name,
                quantity: this.item_quantity,
                information: this.item_info,
                item_id: this.item_id });
            this.http.post(link, data).subscribe(function (data) {
                if (JSON.parse(data._body).response == true) {
                    if (_this.pic != "img/man.png") {
                        _this.additems();
                        _this.navCtrl.pop()
                            .then(function () {
                            setTimeout(function () {
                                loader_1.dismiss();
                            }, 500);
                        });
                    }
                    else {
                        _this.additems();
                        _this.navCtrl.pop()
                            .then(function () {
                            setTimeout(function () {
                                loader_1.dismiss();
                            }, 500);
                        });
                    }
                }
                else {
                    alert('error');
                }
            });
        }
    };
    EditItemDetailPage = __decorate([
        Component({
            selector: 'page-edit-item-detail',
            templateUrl: 'edit-item-detail.html'
        }),
        __metadata("design:paramtypes", [AppProvider, LoadingController, AlertController, Http, NavController, NavParams])
    ], EditItemDetailPage);
    return EditItemDetailPage;
}());
export { EditItemDetailPage };
//# sourceMappingURL=edit-item-detail.js.map