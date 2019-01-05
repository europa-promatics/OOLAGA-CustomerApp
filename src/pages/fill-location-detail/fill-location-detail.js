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
import { NavController, NavParams, AlertController, ViewController, LoadingController } from 'ionic-angular';
import { AppProvider } from '../../providers/app-provider';
import { Transfer } from 'ionic-native';
import { FileChooser } from '@ionic-native/file-chooser';
import { ENV } from '../../app/env';
var FillLocationDetailPage = /** @class */ (function () {
    function FillLocationDetailPage(loadingCtrl, fileChooser, appProvider, viewCtrl, alertCtrl, navCtrl, navParams) {
        this.loadingCtrl = loadingCtrl;
        this.fileChooser = fileChooser;
        this.appProvider = appProvider;
        this.viewCtrl = viewCtrl;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.unit_nu = null;
        this.stairs = 0;
        this.elevator = false;
        this.ride = false;
        this.parking_info = null;
        this.count = 0;
        this.file_name = "Please add the receipt of your purchase";
        this.curb = false;
        this.inhome = false;
        this.locationTitle = this.navParams.get('location');
        this.location_name = this.navParams.get('location_name');
        if (this.locationTitle == 'FIRST LOCATION DETAILS') {
            this.v = 0;
            this.a = 0;
        }
        if (this.locationTitle == 'SECOND LOCATION DETAILS') {
            this.v = 1;
            this.a = 1;
        }
        if (this.locationTitle == 'THIRD LOCATION DETAILS') {
            this.v = 2;
            this.a = 2;
        }
        if (this.locationTitle == 'FORTH LOCATION DETAILS') {
            this.v = 3;
            this.a = 3;
        }
        if (this.appProvider.current.edit_location_data) {
            this.appProvider.current.locations[this.v].curbside == 0 ? this.curb = false : this.curb = true;
            this.appProvider.current.locations[this.v].inhome == 0 ? this.inhome = false : this.inhome = true;
            this.appProvider.current.locations[this.v].unit_nu ? this.unit_nu = this.appProvider.current.locations[this.v].unit_nu : this.unit_nu;
            this.appProvider.current.locations[this.v].stairs ? this.stairs = this.appProvider.current.locations[this.v].stairs : this.stairs;
            this.appProvider.current.locations[this.v].elevator == 0 ? this.elevator = false : this.elevator = true;
            this.appProvider.current.locations[this.v].ride == 0 ? this.ride = false : this.ride = true;
            this.appProvider.current.locations[this.v].parking_info ? this.parking_info = this.appProvider.current.locations[this.v].parking_info : this.parking_info;
            this.appProvider.current.locations[this.v].store_name ? this.store_name = this.appProvider.current.locations[this.v].store_name : this.store_name;
            this.appProvider.current.locations[this.v].additional_contact ? this.additional_contact = this.appProvider.current.locations[this.v].additional_contact : this.additional_contact;
            this.appProvider.current.locations[this.v].order_number ? this.order_number = this.appProvider.current.locations[this.v].order_number : this.order_number;
            this.appProvider.current.locations[this.v].phone ? this.phone = this.appProvider.current.locations[this.v].phone : this.phone;
            this.appProvider.current.locations[this.v].purchaser ? this.purchaser = this.appProvider.current.locations[this.v].purchaser : this.purchaser;
        }
    }
    FillLocationDetailPage.prototype.checkUnit_nu = function () {
        console.log(isNaN(this.unit_nu[this.unit_nu.length - 1]));
        if (isNaN(this.unit_nu[this.unit_nu.length - 1])) {
            this.unit_nu = this.unit_nu.slice(0, -1);
        }
        else { }
    };
    FillLocationDetailPage.prototype.check = function (value) {
        if (value == 1 && this.inhome == true) {
            this.inhome = false;
            this.count = 0;
            this.elevator = false;
            this.ride = false;
        }
        else if (value == 2 && this.curb == true) {
            this.curb = false;
        }
    };
    FillLocationDetailPage.prototype.selectdoc = function () {
        var _this = this;
        this.fileChooser.open()
            .then(function (uri) {
            _this.upload(uri);
        })
            .catch(function (e) { return console.log(e); });
    };
    FillLocationDetailPage.prototype.upload = function (uri) {
        var _this = this;
        var loader = this.loadingCtrl.create();
        loader.present();
        var options = { fileKey: "doc", chunkedMode: false };
        var FileTransfer = new Transfer();
        FileTransfer.upload(uri, ENV.api + '/webserviceupload_doc/' + this.appProvider.current.oolaga_id, options)
            .then(function (data) {
            loader.dismiss();
            _this.file_name = "File Uploaded";
            console.log(data);
        }, function (err) {
            loader.dismiss();
        });
    };
    FillLocationDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FillLocationDetailPage');
    };
    FillLocationDetailPage.prototype.submitdata = function () {
        // this.curb==true ? this.appProvider.current.locations[this.v].curbside=1 : this.appProvider.current.locations[this.v].curbside=0;
        // this.inhome==true ? this.appProvider.current.locations[this.v].inhome=1 : this.appProvider.current.locations[this.v].inhome=0
        // this.unit_nu ? this.appProvider.current.locations[this.v].unit_nu=this.unit_nu : '';
        // this.stairs ? this.appProvider.current.locations[this.v].stairs=this.stairs : '';
        // this.elevator==true ? this.appProvider.current.locations[this.v].elevator=1:this.appProvider.current.locations[this.v].elevator=0;
        // this.ride==true ? this.appProvider.current.locations[this.v].ride=1:this.appProvider.current.locations[this.v].ride=0;
        // this.parking_info ? this.appProvider.current.locations[this.v].parking_info=this.parking_info : '';
        // this.store_name ? this.appProvider.current.locations[this.v].store_name=this.store_name : '';
        // this.additional_contact ? this.appProvider.current.locations[this.v].additional_contact=this.additional_contact : '';
        // this.order_number ? this.appProvider.current.locations[this.v].order_number=this.order_number : '';
        // this.phone ? this.appProvider.current.locations[this.v].phone=this.phone : '';
        // this.purchaser ? this.appProvider.current.locations[this.v].purchaser=this.purchaser : '';
        this.data = {
            curbside: this.curb,
            inhome: this.inhome,
            unit_nu: this.unit_nu,
            stairs: this.stairs,
            elevator: this.elevator,
            ride: this.ride,
            parking_info: this.parking_info,
            store_name: this.store_name,
            purchaser: this.purchaser,
            order_number: this.order_number,
            phone: this.phone,
            additional_contact: this.additional_contact
        };
        this.viewCtrl.dismiss(this.data);
    };
    FillLocationDetailPage.prototype.submit = function () {
        if (this.curb) {
            this.submitdata();
        }
        else if (this.inhome) {
            if (!this.elevator) {
                if (this.stairs > 0) {
                    this.submitdata();
                }
                else {
                    var a = this.alertCtrl.create({
                        title: 'Please select # of floors',
                        buttons: ['Ok']
                    });
                    a.present();
                }
            }
            else {
                this.submitdata();
            }
        }
        else {
            var a = this.alertCtrl.create({
                title: 'Please select Curbside or Inside',
                buttons: ['Ok']
            });
            a.present();
        }
    };
    FillLocationDetailPage.prototype.ionViewWillLeave = function () {
    };
    FillLocationDetailPage.prototype.add1 = function () {
        this.count = this.count + 1;
        this.stairs = this.count;
    };
    FillLocationDetailPage.prototype.sub1 = function () {
        this.count = this.count - 1;
        this.stairs = this.count;
    };
    FillLocationDetailPage.prototype.add = function () {
        this.add1();
        console.log('add' + this.count);
    };
    FillLocationDetailPage.prototype.sub = function () {
        if (this.count != 0) {
            this.sub1();
            console.log('sub' + this.count);
        }
        else {
            var confirm_1 = this.alertCtrl.create({
                message: 'Sorry it won,t go Down',
                buttons: [{
                        text: 'OK',
                        handler: function () { },
                    }]
            });
            confirm_1.present();
        }
    };
    FillLocationDetailPage = __decorate([
        Component({
            selector: 'page-fill-location-detail',
            templateUrl: 'fill-location-detail.html'
        }),
        __metadata("design:paramtypes", [LoadingController, FileChooser, AppProvider, ViewController, AlertController, NavController, NavParams])
    ], FillLocationDetailPage);
    return FillLocationDetailPage;
}());
export { FillLocationDetailPage };
//# sourceMappingURL=fill-location-detail.js.map