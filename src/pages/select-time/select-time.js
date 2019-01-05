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
import { NavController, NavParams, ViewController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { ENV } from '../../app/env';
var SelectTimePage = /** @class */ (function () {
    function SelectTimePage(http, loadingCtrl, viewCtrl, navCtrl, navParams) {
        this.loadingCtrl = loadingCtrl;
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
    }
    SelectTimePage.prototype.ionViewWillEnter = function () {
        var _this = this;
        var loader = this.loadingCtrl.create();
        loader.present();
        this.http.post(ENV.api + '/webservicetimeManage', { day_id: 1 })
            .subscribe(function (data) {
            loader.dismiss();
            _this.times = JSON.parse(data._body).message;
        });
    };
    SelectTimePage.prototype.save_time = function (value) {
        this.viewCtrl.dismiss(value);
    };
    SelectTimePage = __decorate([
        Component({
            selector: 'page-select-time',
            templateUrl: 'select-time.html',
        }),
        __metadata("design:paramtypes", [Http, LoadingController, ViewController, NavController, NavParams])
    ], SelectTimePage);
    return SelectTimePage;
}());
export { SelectTimePage };
//# sourceMappingURL=select-time.js.map