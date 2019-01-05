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
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { ENV } from '../../app/env';
import { AppProvider } from '../../providers/app-provider';
/*
  Generated class for the CancelOolaga page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var CancelOolagaPage = /** @class */ (function () {
    function CancelOolagaPage(appProvider, http, loadingCtrl, alertCtrl, navCtrl, navParams) {
        this.appProvider = appProvider;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._1st = false;
        this._2nd = false;
        this._3rd = false;
        this._4th = false;
        this.reasons = [];
    }
    CancelOolagaPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.data = this.navParams.get('data');
        var loader = this.loadingCtrl.create();
        loader.present();
        this.http.get(ENV.api + '/webservicesdereasons').subscribe(function (data) {
            _this.reasons = data.json().reasons;
            loader.dismiss();
        }, function (err) {
            console.log(err);
        });
        console.log('ionViewDidLoad CancelOolagaPage');
    };
    CancelOolagaPage.prototype.submit = function () {
        var _this = this;
        var a = [];
        this._1st ? a.push(this.reasons[0].id) : '';
        this._2nd ? a.push(this.reasons[1].id) : '';
        this._3rd ? a.push(this.reasons[2].id) : '';
        this._4th ? a.push(this.reasons[3].id) : '';
        console.log(a);
        var d = JSON.stringify({
            oolaga_id: this.data.oolaga_id,
            customer_id: parseInt(localStorage['user_id']),
            reasons: a
        });
        var loader = this.loadingCtrl.create();
        loader.present();
        this.http.post(ENV.api + '/webservicecanceloolaga', d).subscribe(function (data) {
            loader.dismiss();
            if (data.json().response) {
                var alert_1 = _this.alertCtrl.create({
                    message: 'Your oolaga was cancelled. You will be charged / or not $xxx ( see cancellation policy )',
                    buttons: ['OK']
                });
                alert_1.present();
                alert_1.onDidDismiss(function () {
                    _this.navCtrl.popToRoot();
                });
            }
            else {
                var alert_2 = _this.alertCtrl.create({
                    message: data.json().message,
                    buttons: ['OK']
                });
                alert_2.present();
                alert_2.onDidDismiss(function () {
                    _this.navCtrl.popToRoot();
                });
            }
        }, function (err) {
            loader.dismiss();
        });
    };
    CancelOolagaPage = __decorate([
        Component({
            selector: 'page-cancel-oolaga',
            templateUrl: 'cancel-oolaga.html'
        }),
        __metadata("design:paramtypes", [AppProvider, Http, LoadingController, AlertController, NavController, NavParams])
    ], CancelOolagaPage);
    return CancelOolagaPage;
}());
export { CancelOolagaPage };
//# sourceMappingURL=cancel-oolaga.js.map