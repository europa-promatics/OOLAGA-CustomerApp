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
import { LoginPage } from '../login/login';
/*
  Generated class for the SaveCardDetails page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var SaveCardDetailsPage = /** @class */ (function () {
    function SaveCardDetailsPage(http, navCtrl, alertController, navParams) {
        this.navCtrl = navCtrl;
        this.alertController = alertController;
        this.navParams = navParams;
        this.PaymentDetails = {};
        this.http = http;
        this.data = {};
        this.data.response = '';
        this.user_id = this.navParams.get('user_id');
        // this.user_id=56;
        // this.mangoUserId=47811298;
        console.log(this.user_id);
        this.mangoUserId = this.navParams.get('mangoUserId');
        console.log(this.mangoUserId);
    }
    SaveCardDetailsPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad SaveCardDetailsPage');
    };
    SaveCardDetailsPage.prototype.card = function (number) {
        // visa
        var re = new RegExp("^4");
        if (number.match(re) != null) {
            console.log("visa");
            this.cardType = "CB_VISA_MASTERCARD";
            return "Visa.png";
        }
        // Mastercard
        re = new RegExp("^5[1-5]");
        if (number.match(re) != null) {
            console.log("master card");
            this.cardType = "Mastercard";
            return "Mastercard.png";
        }
        // AMEX
        re = new RegExp("^3[47]");
        if (number.match(re) != null) {
            console.log("amex");
            this.cardType = "AMEX";
            return "AMEX.png";
        }
        // Discover
        re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
        if (number.match(re) != null) {
            console.log("Discover");
            this.cardType = "Discover";
            return "Discover.png";
        }
        // Diners
        re = new RegExp("^36");
        if (number.match(re) != null) {
            console.log("Diners");
            this.cardType = "Diners";
            return "Diners.png";
        }
        // Diners - Carte Blanche
        re = new RegExp("^30[0-5]");
        if (number.match(re) != null) {
            console.log("Carte Blanche");
            this.cardType = "Diners - Carte Blanche";
            return "Diners.png";
        }
        // JCB
        re = new RegExp("^35(2[89]|[3-8][0-9])");
        if (number.match(re) != null) {
            console.log("JCB");
            this.cardType = "JCB";
            return "JCB.png";
        }
        // Visa Electron
        re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
        if (number.match(re) != null) {
            console.log("Visa Electron");
            this.cardType = "Visa Electron";
            return "Visa Electron.png";
        }
        re = new RegExp("^12");
        if (number.match(re) != null) {
            console.log("AirPlus");
            this.cardType = "AirPlus";
            return "Airplus.png";
        }
        re = new RegExp("^67");
        if (number.match(re) != null) {
            console.log("maestro");
            this.cardType = "Maestro";
            return "Maestro.png";
        }
        return "";
    };
    SaveCardDetailsPage.prototype.cardCheck = function (a) {
        this.cardImage = this.card(a);
    };
    SaveCardDetailsPage.prototype.dateCheck = function (a) {
        if (this.PaymentDetails.expireDate) {
            // code...
            this.dateError = false;
            if (a.length < 2) {
                this.slash = 'flase';
                this.PaymentDetails.expireDate = a;
            }
            else if (a.length == 2) {
                if (this.slash != 'true') {
                    this.PaymentDetails.expireDate = a + '/';
                }
            }
            if (a.length == 5) {
                var mydate = parseInt('20' + a.split('/')[1]);
                var mymonth = parseInt(a.split('/')[0]);
                var date = new Date();
                var currentdate = date.getFullYear();
                var currentMonth = date.getMonth() + 1;
                if (mydate < currentdate) {
                    this.dateError = true;
                }
                else if (mydate == currentdate) {
                    if (mymonth < currentMonth) {
                        this.dateError = true;
                    }
                }
                if (mymonth > 12) {
                    this.dateError = true;
                }
                // code...
            }
            if (this.PaymentDetails.expireDate.length == 3) {
                this.slash = 'true';
            }
        }
    };
    SaveCardDetailsPage.prototype.onSaveCard = function () {
        var _this = this;
        if (!this.PaymentDetails.nameOnCard) {
            // alert('name missing')
            var alert_1 = this.alertController.create({
                title: 'Oopss....!',
                subTitle: 'Please enter name on card',
                buttons: ['OK']
            });
            alert_1.present();
        }
        else if (!this.PaymentDetails.number) {
            var alert_2 = this.alertController.create({
                title: 'Oopss....!',
                subTitle: 'Please enter card number',
                buttons: ['OK']
            });
            alert_2.present();
        }
        else if (!this.PaymentDetails.expireDate) {
            var alert_3 = this.alertController.create({
                title: 'Oopss....!',
                subTitle: 'Please enter expiry date',
                buttons: ['OK']
            });
            alert_3.present();
        }
        else if (!this.PaymentDetails.cvc) {
            var alert_4 = this.alertController.create({
                title: 'Oopss....!',
                subTitle: 'Please enter cvv',
                buttons: ['OK']
            });
            alert_4.present();
        }
        else if (!this.PaymentDetails.zipcode) {
            var alert_5 = this.alertController.create({
                title: 'Oopss....!',
                subTitle: 'Please enter zipcode',
                buttons: ['OK']
            });
            alert_5.present();
        }
        else {
            var dateToSend = this.PaymentDetails.expireDate.split("/");
            dateToSend = dateToSend[0] + dateToSend[1];
            var cardData = {
                user_id: this.user_id,
                mangoUserId: this.mangoUserId,
                card_type: this.cardType,
                card_number: this.PaymentDetails.number,
                nameOnCard: this.PaymentDetails.nameOnCard,
                zipCode: this.PaymentDetails.zipCode,
                expiry_date: dateToSend,
                cvv: this.PaymentDetails.cvc
            };
            this.http.post(ENV.api + '/createMangoCardRegistration', cardData).subscribe(function (data) {
                console.log("card successfully registered");
                console.log(data.res);
                if (JSON.parse(data._body).response == true) {
                    _this.navCtrl.push(LoginPage);
                }
            }, function (err) {
                console.log(err);
            });
        }
    };
    SaveCardDetailsPage.prototype.onNameChange = function (a) {
        console.log(a);
    };
    SaveCardDetailsPage = __decorate([
        Component({
            selector: 'page-save-card-details',
            templateUrl: 'save-card-details.html'
        }),
        __metadata("design:paramtypes", [Http, NavController, AlertController, NavParams])
    ], SaveCardDetailsPage);
    return SaveCardDetailsPage;
}());
export { SaveCardDetailsPage };
//# sourceMappingURL=save-card-details.js.map