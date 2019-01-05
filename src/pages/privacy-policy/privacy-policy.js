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
import { Http } from '@angular/http';
import { ENV } from '../../app/env';
var PrivacyPolicyPage = /** @class */ (function () {
    function PrivacyPolicyPage(http, navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
    }
    PrivacyPolicyPage.prototype.ionViewDidLoad = function () {
        console.log('PrivacyPolicy Page');
        this.http.get(ENV.api + '/webserviceprivacyPolicy').subscribe(function (data) {
            if (JSON.parse(data._body).response = true) {
                console.log(JSON.parse(data._body));
            }
        });
    };
    PrivacyPolicyPage = __decorate([
        Component({
            selector: 'page-privacy-policy',
            templateUrl: 'privacy-policy.html'
        }),
        __metadata("design:paramtypes", [Http, NavController, NavParams])
    ], PrivacyPolicyPage);
    return PrivacyPolicyPage;
}());
export { PrivacyPolicyPage };
//# sourceMappingURL=privacy-policy.js.map