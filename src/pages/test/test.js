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
import { NavController, NavParams, LoadingController, AlertController, ViewController } from 'ionic-angular';
import { ENV } from '../../app/env';
var TestPage = /** @class */ (function () {
    function TestPage(viewCtrl, http, alertCtrl, LoadingCtrl, navCtrl, navParams) {
        this.viewCtrl = viewCtrl;
        this.http = http;
        this.alertCtrl = alertCtrl;
        this.LoadingCtrl = LoadingCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.submit = false;
        this.pay = false;
        this.token = 'sandbox_55brmgzn_nnkbnnmzyf72yc7k';
        this.wait = true;
        this.options = '$56';
        this.data = this.navParams.get('data');
    }
    TestPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        console.log('ionViewDidLoad TestPage');
        var button = document.querySelector('#submit-button');
        this.submit = false;
        this.pay = false;
        this.http.get(ENV.api + '/createToken').subscribe(function (data) {
            if (data.json().result.status == 1) {
                braintree.dropin.create({ authorization: data.json().result.data, container: '#dropin-container' }, function (createErr, instance) {
                    if (createErr) {
                        console.log(createErr);
                    }
                    else if (instance) {
                        console.log(instance);
                        _this.submit = true;
                        _this.wait = false;
                        button.addEventListener('click', function () {
                            instance.requestPaymentMethod(function (err, payload) {
                                if (err) {
                                    console.log(err);
                                }
                                else if (payload) {
                                    setTimeout(function () {
                                        _this.pay = true;
                                    }, 1000);
                                    _this.submit = false;
                                    _this.payload = payload;
                                    console.log(payload);
                                }
                            });
                        });
                    }
                });
            }
        }, function (err) {
            var alert = _this.alertCtrl.create({
                title: 'Error',
                message: 'Try after sometime',
                buttons: ['OK']
            });
            alert.present();
            alert.onDidDismiss(function (data) {
            });
        });
    };
    TestPage.prototype.reset = function () {
        document.getElementById('dropin-container').innerHTML = '';
        this.ionViewDidLoad();
    };
    TestPage.prototype.payOolaga = function () {
        var _this = this;
        var loader = this.LoadingCtrl.create();
        loader.present();
        this.http.post(ENV.api + '/test', JSON.stringify({ oolaga_id: this.data.oolaga_id, amount: this.data.cost, nonce: this.payload.nonce }))
            .subscribe(function (data) {
            console.log(data.json().result);
            if (data.json().result.status == 1) {
                var alert_1 = _this.alertCtrl.create({
                    subTitle: data.json().result.transaction,
                    message: 'Amount:-' + data.json().result.data.amount + '<br>' + 'Transaction Id:-' + (data.json().result.data.trans_id).toUpperCase(),
                    buttons: ['OK']
                });
                loader.dismiss();
                alert_1.present();
                alert_1.onDidDismiss(function () {
                    _this.viewCtrl.dismiss(true);
                });
            }
            if (data.json().result.status == 0) {
                var alert_2 = _this.alertCtrl.create({
                    subTitle: data.json().result.transaction,
                    buttons: ['OK']
                });
                loader.dismiss();
                alert_2.present();
                alert_2.onDidDismiss(function () {
                    _this.viewCtrl.dismiss(false);
                });
            }
        }, function (err) {
            loader.dismiss();
            console.log(err);
        });
    };
    TestPage = __decorate([
        Component({
            selector: 'page-test',
            templateUrl: 'test.html'
        }),
        __metadata("design:paramtypes", [ViewController, Http, AlertController, LoadingController, NavController, NavParams])
    ], TestPage);
    return TestPage;
}());
export { TestPage };
//# sourceMappingURL=test.js.map