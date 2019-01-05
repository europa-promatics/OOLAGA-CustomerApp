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
import { Http } from '@angular/http';
import { CustomerOolagaScheduledPage } from '../customer-oolaga-scheduled/customer-oolaga-scheduled';
import { ENV } from '../../app/env';
/*
  Generated class for the OpenOffer page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var OpenOfferPage = /** @class */ (function () {
    function OpenOfferPage(alertCtrl, loadingCtrl, http, navCtrl, navParams) {
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.http = http;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.option = "about";
        this.env = ENV.api;
        this.feedback = false;
        this.helper_data = this.navParams.get('data');
        console.log(this.helper_data);
    }
    OpenOfferPage.prototype.checkNumber = function (value) {
        return Math.round(parseInt(value));
    };
    OpenOfferPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad OpenOfferPage');
    };
    OpenOfferPage.prototype.submit = function (id) {
        var _this = this;
        var alert = this.alertCtrl.create({
            //message:'Your credit card will be charged $'+this.helper_data.bid_amount+'. We Will hold the funds until the Oolaga has been completed.',
            message: 'A hold of $' + this.helper_data.bid_amount + ' will be put on your credit card and paid out when the oolaga has been completed. You will have the opportunity to tip the helper later.',
            buttons: [{
                    text: 'CANCEL'
                }, {
                    text: 'ACCEPT',
                    handler: function () {
                        _this.hire(id);
                    }
                }]
        });
        alert.present();
    };
    OpenOfferPage.prototype.hire = function (id) {
        var _this = this;
        console.log(id);
        var loader = this.loadingCtrl.create();
        loader.present();
        this.http.post(ENV.api + '/webservicehelperassigned', { bidding_id: id })
            .subscribe(function (data) {
            loader.dismiss();
            if (JSON.parse(data['_body']).response) {
                /*let a= this.alertCtrl.create({
                   title:'Helper hired',
                   buttons:['Ok']
                 })
                 a.present();
                 a.onDidDismiss(()=>{
                   this.navCtrl.popToRoot();
                 })*/
                _this.navCtrl.push(CustomerOolagaScheduledPage, {});
            }
            else {
                var a = _this.alertCtrl.create({
                    title: 'oops..',
                    message: 'Something wrong...',
                    buttons: ['Ok']
                });
                a.present();
            }
        }, function (err) {
            loader.dismiss();
            var a = _this.alertCtrl.create({
                title: 'oops..',
                message: 'please check your Internet connection',
                buttons: ['Ok']
            });
            a.present();
        });
    };
    OpenOfferPage = __decorate([
        Component({
            selector: 'page-open-offer',
            templateUrl: 'open-offer.html'
        }),
        __metadata("design:paramtypes", [AlertController,
            LoadingController,
            Http,
            NavController,
            NavParams])
    ], OpenOfferPage);
    return OpenOfferPage;
}());
export { OpenOfferPage };
//# sourceMappingURL=open-offer.js.map