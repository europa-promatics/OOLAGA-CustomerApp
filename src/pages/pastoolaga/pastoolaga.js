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
import { PastOolagaDetailsPage } from '../past-oolaga-details/past-oolaga-details';
import { Http } from '@angular/http';
import { ENV } from '../../app/env';
var PastoolagaPage = /** @class */ (function () {
    function PastoolagaPage(loadingCtrl, http, navCtrl, navParams) {
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.oolaga_created = true;
        this.msg_no = 0;
        this.http = http;
    }
    PastoolagaPage.prototype.openDetails = function (value) {
        this.navCtrl.push(PastOolagaDetailsPage, { data: value });
    };
    PastoolagaPage.prototype.selection = function () {
    };
    PastoolagaPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        var loader = this.loadingCtrl.create();
        loader.present();
        this.http.get(ENV.api + '/webservicepastoolaga/' + localStorage['user_id'])
            .subscribe(function (data) {
            if (JSON.parse(data._body).response) {
                loader.dismiss();
                if (JSON.parse(data._body).data[0] == null) {
                    _this.oolaga_created = true;
                }
                else if (JSON.parse(data._body).data[0] != null) {
                    _this.oolaga_created = false;
                    console.log(JSON.parse(data._body).data);
                    _this.data = JSON.parse(data._body).data;
                }
            }
            else {
                loader.dismiss();
                _this.oolaga_created = true;
            }
        }, function (err) { alert(JSON.stringify('error' + err)); });
    };
    PastoolagaPage.prototype.get_detail = function (value) {
        //this.navCtrl.push(OolagaDetailsPage,{data:value})
    };
    PastoolagaPage = __decorate([
        Component({
            selector: 'page-pastoolaga',
            templateUrl: 'pastoolaga.html'
        }),
        __metadata("design:paramtypes", [LoadingController, Http, NavController, NavParams])
    ], PastoolagaPage);
    return PastoolagaPage;
}());
export { PastoolagaPage };
//# sourceMappingURL=pastoolaga.js.map