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
import { SaveCardDetailsPage } from '../save-card-details/save-card-details';
var PaymentPage = /** @class */ (function () {
    function PaymentPage(alertCtrl, navCtrl, navParams) {
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.user_id = this.navParams.get('user_id');
        // this.user_id=56;
        // this.mangoUserId=47811298;
        console.log(this.user_id);
        this.mangoUserId = this.navParams.get('mangoUserId');
        console.log(this.mangoUserId);
    }
    PaymentPage.prototype.ionViewDidLoad = function () { };
    PaymentPage.prototype.help = function () {
        var alert = this.alertCtrl.create({
            title: 'Payment',
            message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim ven',
            buttons: ['OK']
        });
        alert.present();
    };
    PaymentPage.prototype.pay = function () {
        //  	PayPal.init({
        //   "PayPalEnvironmentProduction": "EHq52w3WpSMQDy79b8N59brHZhtQneuDdcGCwBigbj5LesXVsX3avy-5Lm0MSDTX00yriHOxAsvdli0M",
        //   "PayPalEnvironmentSandbox": "ATOFecC0-4Uv4J1oz2Ad1QeTPmonVVjF2a9WN_wM3o6RpyfN77A4rnP1LAxhYb8th0edszdyoo9dND6Z"
        // }).then(() => {
        // 	  PayPal.prepareToRender('PayPalEnvironmentSandbox', new PayPalConfiguration({
        // 	  })).then(() => {
        // 	    let payment = new PayPalPayment('3.33', 'USD', 'Description', 'sale');
        // 	    PayPal.renderSinglePaymentUI(payment).then((data) => {
        // 	    	alert(JSON.stringify(data))
        // 	 		var time=data.response.create_time;
        // 	 		var id=data.response.id;
        // 	 		var intent=data.response.intent;
        // 	 		var state=data.response.state;
        // 	 		alert(time+'<br>'+id+'<br>'+intent+'<br>'+state)
        //     	}, (err) => {alert('1'+JSON.stringify(err))});
        // 	}, (err) => {alert('2'+JSON.stringify(err))});
        // }, (err) => {alert('3'+JSON.stringify(err))});
    };
    PaymentPage.prototype.submit = function (value) {
        if (value == 0) {
            this.navCtrl.pop();
        }
        else if (value == 1) {
            this.navCtrl.popToRoot();
        }
    };
    PaymentPage.prototype.onAddCard = function () {
        this.navCtrl.push(SaveCardDetailsPage, { 'user_id': this.user_id, 'mangoUserId': this.mangoUserId });
    };
    PaymentPage = __decorate([
        Component({
            selector: 'page-payment',
            templateUrl: 'payment.html'
        }),
        __metadata("design:paramtypes", [AlertController, NavController, NavParams])
    ], PaymentPage);
    return PaymentPage;
}());
export { PaymentPage };
//# sourceMappingURL=payment.js.map