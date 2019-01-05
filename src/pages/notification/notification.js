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
import { Http } from '@angular/http';
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { ENV } from '../../app/env';
import { AppProvider } from '../../providers/app-provider';
var NotificationPage = /** @class */ (function () {
    function NotificationPage(appProvider, http, loadingCtrl, navCtrl, navParams) {
        this.appProvider = appProvider;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.noti = false;
    }
    NotificationPage.prototype.date = function (value) {
        return value.replace('20', '');
    };
    NotificationPage.prototype.time = function (value) {
        return value.split(':')[0] + ':' + value.split(':')[1];
    };
    NotificationPage.prototype.delete = function (index, item) {
        var _this = this;
        console.log(item);
        item.close();
        setTimeout(function () {
            _this.data.splice(index, 1);
        }, 300);
        this.http.get(ENV.api + '/webservicedeletenoti/' + this.data[index].id).subscribe(function (data) {
            _this.data.length == 0 ? _this.noti = false : _this.noti = true;
        }, function (err) { });
    };
    NotificationPage.prototype.deleteNoti = function (id) {
    };
    NotificationPage.prototype.openNotification = function (value) {
    };
    NotificationPage.prototype.refreshNotification = function (refresher) {
        var _this = this;
        this.http.get(ENV.api + '/webserviceshownoti/' + localStorage['user_id']).subscribe(function (data) {
            if (data.json().response) {
                _this.data = data.json().result;
                _this.noti = true;
            }
            else {
                _this.noti = false;
            }
            refresher.complete();
        }, function (err) {
            refresher.complete();
        });
    };
    NotificationPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad NotificationPage');
        var loader = this.loadingCtrl.create();
        loader.present();
        this.http.get(ENV.api + '/webserviceshownoti/' + localStorage['user_id']).subscribe(function (data) {
            if (data.json().response) {
                _this.data = data.json().result;
                _this.noti = true;
            }
            else {
                _this.noti = false;
            }
            loader.dismiss();
        }, function (err) {
            loader.dismiss();
        });
    };
    NotificationPage = __decorate([
        Component({
            selector: 'page-notification',
            templateUrl: 'notification.html'
        }),
        __metadata("design:paramtypes", [AppProvider, Http, LoadingController, NavController, NavParams])
    ], NotificationPage);
    return NotificationPage;
}());
export { NotificationPage };
//# sourceMappingURL=notification.js.map