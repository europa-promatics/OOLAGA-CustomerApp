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
import { ENV } from '../../app/env';
var EditLocationDetailPage = /** @class */ (function () {
    function EditLocationDetailPage(loadingCtrl, http, navCtrl, navParams) {
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.elevator = false;
        this.ride = false;
        this.http = http;
        this.location_id = this.navParams.get('location_id');
        this.location = this.navParams.get('location_data');
        this.location_nu = this.navParams.get('value');
        console.log(this.location);
        console.log(this.location_id);
        this.data = JSON.parse(localStorage['locations']);
    }
    EditLocationDetailPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad EditLocationDetailPage');
    };
    EditLocationDetailPage.prototype.submit = function (value) {
        var _this = this;
        if (value == 0) {
            this.navCtrl.pop();
        }
        else if (value == 1) {
            var loader_1 = this.loadingCtrl.create();
            loader_1.present();
            var link1 = ENV.api + '/webserviceeditLocation';
            this.http.post(link1, { location: this.location_id,
                unit_nu: this.unit_nu,
                stairs: this.stairs,
                elevator: this.elevator,
                ride: this.ride,
                parking_info: this.parking_info
            }).subscribe(function (data) {
                if (JSON.parse(data._body).response == true) {
                    console.log(_this.data);
                    _this.data[_this.location_nu].unit_nu = _this.unit_nu;
                    _this.data[_this.location_nu].stairs = _this.stairs;
                    _this.data[_this.location_nu].elevator = _this.elevator;
                    _this.data[_this.location_nu].ride = _this.ride;
                    _this.data[_this.location_nu].parking_info = _this.parking_info;
                    localStorage['locations'] = JSON.stringify(_this.data);
                    loader_1.dismiss();
                    _this.navCtrl.pop();
                }
                else {
                }
            });
        }
    };
    EditLocationDetailPage = __decorate([
        Component({
            selector: 'page-edit-location-detail',
            templateUrl: 'edit-location-detail.html'
        }),
        __metadata("design:paramtypes", [LoadingController, Http, NavController, NavParams])
    ], EditLocationDetailPage);
    return EditLocationDetailPage;
}());
export { EditLocationDetailPage };
//# sourceMappingURL=edit-location-detail.js.map