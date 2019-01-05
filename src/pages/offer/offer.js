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
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { OpenOfferPage } from '../open-offer/open-offer';
import { ENV } from '../../app/env';
import { Http } from '@angular/http';
var OfferPage = /** @class */ (function () {
    function OfferPage(alertCtrl, loadingCtrl, http, navCtrl, navParams) {
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.http = http;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.env = ENV.api;
        this.oolaga_id = this.navParams.get('id');
        this.loadOffers();
    }
    OfferPage.prototype.loadOffers = function () {
        var _this = this;
        var loader = this.loadingCtrl.create();
        loader.present();
        this.http.post(ENV.api + '/webservicebiddingdetail', { oolaga_id: this.oolaga_id })
            .subscribe(function (data) {
            if (JSON.parse(data['_body']).response) {
                _this.offerData = JSON.parse(data['_body']).data;
                loader.dismiss();
            }
            else {
                var a = _this.alertCtrl.create({
                    title: 'oops..',
                    message: 'Something wrong...',
                    buttons: ['Ok']
                });
                a.present();
                loader.dismiss();
            }
        }, function (err) {
            var a = _this.alertCtrl.create({
                title: 'oops..',
                message: 'please check your Internet connection',
                buttons: ['Ok']
            });
            a.present();
            loader.dismiss();
        });
    };
    OfferPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad OfferPage');
    };
    OfferPage.prototype.open_offer = function (value) {
        this.navCtrl.push(OpenOfferPage, { data: value });
    };
    OfferPage.prototype.checkNumber = function (value) {
        return Math.round(parseInt(value));
    };
    OfferPage = __decorate([
        Component({
            selector: 'page-offer',
            templateUrl: 'offer.html'
        }),
        __metadata("design:paramtypes", [AlertController, LoadingController, Http, NavController, NavParams])
    ], OfferPage);
    return OfferPage;
}());
export { OfferPage };
//# sourceMappingURL=offer.js.map