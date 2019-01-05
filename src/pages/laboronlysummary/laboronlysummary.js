var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, } from '@angular/core';
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { ENV } from '../../app/env';
import { OfferPage } from '../offer/offer';
/*
  Generated class for the Laboronlysummary page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var LaboronlysummaryPage = /** @class */ (function () {
    function LaboronlysummaryPage(loadingController, http, alertCtrl, navCtrl, navParams) {
        this.loadingController = loadingController;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    LaboronlysummaryPage.prototype.ionViewWillLoad = function () {
        console.log('ionViewDidLoad LaboronlysummaryPage');
        this.data = this.navParams.get('data');
        console.log(this.data);
    };
    LaboronlysummaryPage.prototype.notificationpage = function (id, offer) {
        if (offer != 0 || offer != '0') {
            this.navCtrl.push(OfferPage, { id: id });
        }
        else {
            var alert_1 = this.alertCtrl.create({
                title: 'Alert',
                message: 'No Offers',
                buttons: ['Ok']
            });
            alert_1.present();
        }
    };
    LaboronlysummaryPage.prototype.withdrawAuction = function (id) {
        var _this = this;
        var confirm = this.alertCtrl.create({
            subTitle: 'Are you want to Withdraw​ Auction',
            buttons: [{
                    text: 'Cancel',
                    handler: function () {
                    }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        var loader = _this.loadingController.create();
                        loader.present();
                        _this.http.get(ENV.api + "/webservicesdeactivedraft/" + id).subscribe(function (data) {
                            _this.navCtrl.popToRoot();
                            loader.dismiss();
                        }, function (err) {
                            loader.dismiss();
                        });
                    }
                }]
        });
        confirm.present();
    };
    LaboronlysummaryPage = __decorate([
        Component({
            selector: 'page-laboronlysummary',
            templateUrl: 'laboronlysummary.html'
        }),
        __metadata("design:paramtypes", [LoadingController, Http, AlertController, NavController, NavParams])
    ], LaboronlysummaryPage);
    return LaboronlysummaryPage;
}());
export { LaboronlysummaryPage };
//# sourceMappingURL=laboronlysummary.js.map