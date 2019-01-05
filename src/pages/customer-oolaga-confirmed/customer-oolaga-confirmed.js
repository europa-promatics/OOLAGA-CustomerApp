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
import { NavController, NavParams } from 'ionic-angular';
import { MyoolagaPage } from '../myoolaga/myoolaga';
/*
  Generated class for the CustomerOolagaConfirmed page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var CustomerOolagaConfirmedPage = /** @class */ (function () {
    function CustomerOolagaConfirmedPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
    }
    CustomerOolagaConfirmedPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad CustomerOolagaConfirmedPage');
    };
    CustomerOolagaConfirmedPage.prototype.onMyoolaga = function () {
        this.navCtrl.push(MyoolagaPage);
    };
    CustomerOolagaConfirmedPage = __decorate([
        Component({
            selector: 'page-customer-oolaga-confirmed',
            templateUrl: 'customer-oolaga-confirmed.html'
        }),
        __metadata("design:paramtypes", [NavController, NavParams])
    ], CustomerOolagaConfirmedPage);
    return CustomerOolagaConfirmedPage;
}());
export { CustomerOolagaConfirmedPage };
//# sourceMappingURL=customer-oolaga-confirmed.js.map