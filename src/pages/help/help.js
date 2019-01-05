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
import { ContactusPage } from '../contactus/contactus';
import { HowPage } from '../how/how';
import { FAQPage } from '../faq/faq';
import { PrivacyPolicyPage } from '../privacy-policy/privacy-policy';
import { TermsofServicePage } from '../termsof-service/termsof-service';
import { CancellationPage } from '../cancellation/cancellation';
/*
  Generated class for the Help page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var HelpPage = /** @class */ (function () {
    function HelpPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.howpage = HowPage;
        this.contactuspage = ContactusPage;
        this.faq = FAQPage;
        this.privacy = PrivacyPolicyPage;
        this.cancellation = CancellationPage;
        this.termsofservice = TermsofServicePage;
        //this.help(this.navParams.get('help'))
    }
    HelpPage.prototype.help = function (value) {
        if (localStorage['helpPage'] == 'category') {
            alert('category');
        }
        else if (localStorage['helpPage'] == 'help') {
            alert('help');
        }
        else if (localStorage['helpPage'] == 'location') {
            alert('location');
        }
        else if (localStorage['helpPage'] == 'item') {
            alert('item');
        }
        else if (localStorage['helpPage'] == 'helper') {
            alert('helper');
        }
        else if (localStorage['helpPage'] == 'date&time') {
            alert('date&times');
        }
        else if (localStorage['helpPage'] == 'summary') {
            alert('summary');
        }
        else if (localStorage['helpPage'] == 'addeditems') {
            alert('addeditems');
        }
    };
    HelpPage = __decorate([
        Component({
            selector: 'page-help',
            templateUrl: 'help.html'
        }),
        __metadata("design:paramtypes", [NavController, NavParams])
    ], HelpPage);
    return HelpPage;
}());
export { HelpPage };
//# sourceMappingURL=help.js.map