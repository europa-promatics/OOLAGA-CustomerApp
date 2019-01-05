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
import { SocialSharing } from 'ionic-native';
import { CustomerOolagaScheduledPage } from '../customer-oolaga-scheduled/customer-oolaga-scheduled';
import { CustomerThankYouPage } from '../customer-thank-you/customer-thank-you';
var InvitePage = /** @class */ (function () {
    function InvitePage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.name = 'ooLAGA Customer App';
        this.url = 'aasfasdfsd';
        this.msg = 'The message you would like to share';
    }
    InvitePage.prototype.openschedule = function () {
        this.navCtrl.push(CustomerOolagaScheduledPage, {});
    };
    InvitePage.prototype.openthankyou = function () {
        this.navCtrl.push(CustomerThankYouPage, {});
    };
    InvitePage.prototype.share = function (a) {
        if (a == 1) {
            SocialSharing.shareViaFacebook(this.name, null, this.url).then(function () {
            }).catch(function () { alert("Something Went Wrong..."); });
        }
        else if (a == 2) {
            SocialSharing.shareViaTwitter(this.name, null, this.url).then(function () {
            }).catch(function () { alert("Something Went Wrong..."); });
        }
        else if (a == 3) {
            SocialSharing.shareViaWhatsApp(this.name, null, this.url).then(function () {
            }).catch(function () { alert("Something Went Wrong..."); });
        }
        else if (a == 4) {
            SocialSharing.share(this.msg, this.name, null, this.url).then(function () {
            }).catch(function () { alert("Something Went Wrong..."); });
        }
    };
    InvitePage = __decorate([
        Component({
            selector: 'page-invite',
            templateUrl: 'invite.html'
        }),
        __metadata("design:paramtypes", [NavController, NavParams])
    ], InvitePage);
    return InvitePage;
}());
export { InvitePage };
//# sourceMappingURL=invite.js.map