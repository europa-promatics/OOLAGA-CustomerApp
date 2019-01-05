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
import { LoadingController } from 'ionic-angular';
import { ChatPage } from '../../chat/chat';
import { ENV } from '../../../app/env';
var InboxPage = /** @class */ (function () {
    function InboxPage(navCtrl, navParams, http, loadingCtrl) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.msg = false;
        this.http = http;
        var loader = this.loadingCtrl.create();
        loader.present();
        var link = ENV.api + '/webserviceonline_users';
        this.http.post(link, {
            user_id: localStorage['user_id']
        }).subscribe(function (data) {
            if (JSON.parse(data._body).response == true) {
                _this.data = JSON.parse(data._body).user_info;
                if (_this.data.length > 0) {
                    _this.msg = true;
                }
                console.log(_this.data);
                loader.dismiss();
            }
            else {
                loader.dismiss();
                alert("Something wrong.....");
            }
        }, function (err) {
            alert(JSON.stringify('error' + err));
        });
    }
    InboxPage.prototype.ionViewWillEnter = function () {
    };
    InboxPage.prototype.chat = function (user_id, image) {
        this.navCtrl.push(ChatPage, { receiver_id: user_id, image: image });
    };
    InboxPage = __decorate([
        Component({
            selector: 'page-inbox',
            templateUrl: 'inbox.html'
        }),
        __metadata("design:paramtypes", [NavController, NavParams, Http, LoadingController])
    ], InboxPage);
    return InboxPage;
}());
export { InboxPage };
//# sourceMappingURL=inbox.js.map