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
/*
  Generated class for the FAQ page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var FAQPage = /** @class */ (function () {
    function FAQPage(http, navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.link = ENV.api + "/webservicefaqs";
        this.qus = [];
        this.http = http;
    }
    FAQPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad FAQPage');
        this.qus = [
            {
                question: 'What is Oolaga?',
                answer: 'Oolaga connects people who need something moved with people willing to move it. The price is determined by you and the helper through a bidding process. Oolaga can be used for small moves, but also for a variety of other scenarios like getting furniture delivered from a store, donating to charity, getting “muscle” help only or however else you see fit.'
            },
            {
                question: 'How do I pay my helper?',
                answer: 'Once you have selected a helper and agreed on the price, Oolaga will charge your credit card and hold on to the funds until the transaction is completed.  You will also have the opportunity to tip the helper before the transaction is complete.'
            },
            {
                question: 'How safe is using Oolaga?',
                answer: 'All Oolaga helpers have undergone a full background check and completed training to provide the highest possible level of service.  In addition, our review system will ensure full transparency into their track record in helping others.'
            },
            {
                question: 'Are my goods insured?',
                answer: 'Yes, Oolaga does provide insurance on your goods being moved when using our app.  Please see our terms and agreements or contact us for more details.'
            },
            {
                question: 'What if I must cancel an Oolaga?',
                answer: 'We understand, things happen.  See our cancellation policy for more detail.'
            },
            {
                question: 'What if my helper cancels?',
                answer: 'This may happen however our helpers adhere to a policy that includes monetary penalties to discourage “last minute” cancelations.'
            },
            {
                question: 'How do I resolve a conflict?',
                answer: 'Contact us and we will support you through the process'
            }
        ];
        this.http.get(this.link).subscribe(function (data) {
            if (JSON.parse(data._body).response = true) {
                console.log(JSON.parse(data._body));
            }
        });
    };
    FAQPage.prototype.enable = function (value) {
        this.value = value;
    };
    FAQPage = __decorate([
        Component({
            selector: 'page-faq',
            templateUrl: 'faq.html'
        }),
        __metadata("design:paramtypes", [Http, NavController, NavParams])
    ], FAQPage);
    return FAQPage;
}());
export { FAQPage };
//# sourceMappingURL=faq.js.map