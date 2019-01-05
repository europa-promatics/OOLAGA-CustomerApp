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
import { NavController, NavParams, ModalController } from 'ionic-angular';
import { ENV } from '../../app/env';
import { TestPage } from '../test/test';
import { FeedbackPage } from '../feedback/feedback';
var PastOolagaDetailsPage = /** @class */ (function () {
    function PastOolagaDetailsPage(modalCtrl, navCtrl, navParams) {
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.item_quantity = 0;
        this.selected_item = 0;
        this.locations = [];
        this.my = ENV.api;
    }
    PastOolagaDetailsPage.prototype.ionViewWillEnter = function () {
        this.data = this.navParams.get('data');
        console.log(this.data);
        // this.navCtrl.push(FeedbackPage,{data:this.data});
        for (var i = 0; i < this.data.items.length; i++) {
            this.item_quantity += parseInt(this.data.items[i].quantity);
        }
        if (this.data.source && this.data.source != null) {
            this.locations.push(this.data.source);
        }
        if (this.data.way_point1 && this.data.way_point1 != null) {
            this.locations.push(this.data.way_point1);
        }
        if (this.data.way_point2 && this.data.way_point2 != null) {
            this.locations.push(this.data.way_point2);
        }
        if (this.data.destination && this.data.destination != null) {
            this.locations.push(this.data.destination);
        }
    };
    PastOolagaDetailsPage.prototype.ionViewDidLoad = function () {
    };
    PastOolagaDetailsPage.prototype.pay = function () {
        var _this = this;
        var payment = this.modalCtrl.create(TestPage, { data: this.data });
        payment.onDidDismiss(function (data) {
            if (data) {
                _this.data.payment_status = 1;
                _this.navCtrl.push(FeedbackPage, { data: _this.data });
            }
            else {
            }
        });
        payment.present();
    };
    PastOolagaDetailsPage = __decorate([
        Component({
            selector: 'page-past-oolaga-details',
            templateUrl: 'past-oolaga-details.html'
        }),
        __metadata("design:paramtypes", [ModalController, NavController, NavParams])
    ], PastOolagaDetailsPage);
    return PastOolagaDetailsPage;
}());
export { PastOolagaDetailsPage };
//# sourceMappingURL=past-oolaga-details.js.map