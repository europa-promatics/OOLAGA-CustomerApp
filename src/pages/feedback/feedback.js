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
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ENV } from '../../app/env';
import { Http } from '@angular/http';
var FeedbackPage = /** @class */ (function () {
    function FeedbackPage(alertCtrl, navCtrl, http, navParams) {
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.star1 = 0;
        this.star2 = 0;
        this.star3 = 0;
        this.image = 'img/man.png';
        this.tipp = 0;
        this.http = http;
    }
    FeedbackPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FeedbackPage');
        this.data = this.navParams.get('data');
        this.image = ENV.api + '/public/frontend/img/profile/' + this.data.helper_img;
        console.log(this.data);
    };
    FeedbackPage.prototype.select = function (val1, val2, val3, val4, val5) {
        val1.style.backgroundColor = '#1B4079';
        val2.style.backgroundColor = '#fff';
        val3.style.backgroundColor = '#fff';
        val4.style.backgroundColor = '#fff';
        val5.style.backgroundColor = '#fff';
        this.buttonColor = '#fff';
    };
    FeedbackPage.prototype.tip = function (value) {
        console.log(value);
    };
    FeedbackPage.prototype.set_tip = function (value) {
        console.log(value);
        this.tipp = value;
    };
    FeedbackPage.prototype.submit = function () {
        var _this = this;
        var data = JSON.stringify({
            Punchuality: this.star1,
            friendliness: this.star2,
            prepardness: this.star3,
            tip: this.tipp,
            oolaga_id: this.data.oolaga_id,
            customer_id: localStorage['user_id'],
            helper_id: this.data.helper_id
        });
        console.log(data);
        this.http.post(ENV.api + '/webservicesave_rating', data).subscribe(function (data) {
            console.log(data.json());
            if (data.json().response) {
                var alert_1 = _this.alertCtrl.create({
                    subTitle: data.json().message,
                    buttons: ['OK']
                });
                alert_1.present();
                _this.navCtrl.pop();
            }
            else {
                var alert_2 = _this.alertCtrl.create({
                    subTitle: data.json().message,
                    buttons: ['OK']
                });
                alert_2.present();
            }
        }, function (err) {
            var alert = _this.alertCtrl.create({
                subTitle: 'Error',
                buttons: ['OK']
            });
            alert.present();
        });
    };
    FeedbackPage = __decorate([
        Component({
            selector: 'page-feedback',
            templateUrl: 'feedback.html'
        }),
        __metadata("design:paramtypes", [AlertController, NavController, Http, NavParams])
    ], FeedbackPage);
    return FeedbackPage;
}());
export { FeedbackPage };
//# sourceMappingURL=feedback.js.map