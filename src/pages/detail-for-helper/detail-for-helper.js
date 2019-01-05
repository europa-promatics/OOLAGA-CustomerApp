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
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { ItemDetailPage } from '../item-detail/item-detail';
import { Content } from 'ionic-angular';
import { Http } from '@angular/http';
import { ENV } from '../../app/env';
var DetailForHelperPage = /** @class */ (function () {
    function DetailForHelperPage(loadingCtrl, http, navCtrl, navParams, alertCtrl) {
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.unit_nu = null;
        this.stairs = null;
        this.elevator = false;
        this.ride = false;
        this.parking_info = null;
        this.count = 0;
        this.i = 0;
        this.locations_details = [];
        this.http = http;
        this.service_name = localStorage['service_name'];
    }
    DetailForHelperPage.prototype.ionViewWillEnter = function () {
        this.locations = this.navParams.get('data');
        this.locations[this.locations.length - 1].location_selection = false;
        this.count = 0;
        this.i = 0;
        console.log(this.navParams.get('data'));
        this.locations[0].location_selection = true;
    };
    DetailForHelperPage.prototype.add1 = function () {
        this.count = this.count + 1;
        this.stairs = this.count;
    };
    DetailForHelperPage.prototype.sub1 = function () {
        this.count = this.count - 1;
        this.stairs = this.count;
    };
    DetailForHelperPage.prototype.add = function () {
        this.add1();
        console.log('add' + this.count);
    };
    DetailForHelperPage.prototype.sub = function () {
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
    DetailForHelperPage.prototype.submit = function (value) {
        var _this = this;
        if (value == 0) {
            this.navCtrl.pop();
        }
        else if (value == 1) {
            if (this.i < this.locations.length - 1) {
                this.locations_details.push({ loc_no: this.i,
                    oolaga_id: localStorage['oolaga_id'],
                    location_name: this.locations[this.i].name,
                    latitude: this.locations[this.i].lat,
                    longitude: this.locations[this.i].lng,
                    unit_nu: this.unit_nu,
                    stairs: this.stairs,
                    elevator: this.elevator,
                    ride: this.ride,
                    parking_info: this.parking_info
                });
                this.locations[this.i].location_selection = false;
                this.unit_nu = null;
                this.stairs = null;
                this.elevator = false;
                this.ride = false;
                this.parking_info = null;
                this.content.scrollToTop();
                this.locations[this.i + 1].location_selection = true;
            }
            else if (this.i == this.locations.length - 1) {
                this.locations_details.push({ loc_no: this.i,
                    oolaga_id: localStorage['oolaga_id'],
                    location_name: this.locations[this.i].name,
                    latitude: this.locations[this.i].lat,
                    longitude: this.locations[this.i].lng,
                    unit_nu: this.unit_nu,
                    stairs: this.stairs,
                    elevator: this.elevator,
                    ride: this.ride,
                    parking_info: this.parking_info
                });
                //------------------------------------------------------
                var loader_1 = this.loadingCtrl.create();
                loader_1.present();
                localStorage['locations'] = JSON.stringify(this.locations_details);
                var link = ENV.api + '/webserviceaddLocation';
                this.http.post(link, this.locations_details).subscribe(function (data) {
                    loader_1.dismiss();
                    if (JSON.parse(data._body).response == true) {
                        console.log(JSON.parse(data._body).location);
                        _this.navCtrl.push(ItemDetailPage, { locationId: JSON.parse(data._body).location });
                    }
                    else {
                        alert('error');
                    }
                });
                //-----------------------------------------------------
            }
            this.i++;
        }
        else if (value == 2) {
            alert('jhagsdghasd');
        }
    };
    __decorate([
        ViewChild(Content),
        __metadata("design:type", Content)
    ], DetailForHelperPage.prototype, "content", void 0);
    DetailForHelperPage = __decorate([
        Component({
            selector: 'page-detail-for-helper',
            templateUrl: 'detail-for-helper.html'
        }),
        __metadata("design:paramtypes", [LoadingController, Http, NavController, NavParams, AlertController])
    ], DetailForHelperPage);
    return DetailForHelperPage;
}());
export { DetailForHelperPage };
//# sourceMappingURL=detail-for-helper.js.map