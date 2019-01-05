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
import { NavController, NavParams, ModalController, LoadingController } from 'ionic-angular';
import { AppProvider } from '../../providers/app-provider';
import { Http } from '@angular/http';
var OolagaPaymentPage = /** @class */ (function () {
    function OolagaPaymentPage(http, loadingCtrl, appProvider, modalCtrl, navCtrl, navParams) {
        this.loadingCtrl = loadingCtrl;
        this.appProvider = appProvider;
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
    }
    OolagaPaymentPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad OolagaPaymentPage');
    };
    OolagaPaymentPage.prototype.submit = function () {
        console.log('payment');
        this.payment();
    };
    OolagaPaymentPage.prototype.payment = function () {
        // let pay = this.modalCtrl.create(PaymentStripePage)
        //     pay.onDidDismiss(data=>{
        //       if(data==null){
        //         console.log('empty data')
        //       }
        //       else if(data.response==true){
        //         let loader = this.loadingCtrl.create({content:'Please wait'})
        //         loader.present();
        //         var d = JSON.stringify(
        //             {  
        //               oolaga_id:this.appProvider.current.oolaga_id,
        //                cost:this.appProvider.current.price,
        //             });
        //               this.http.post(ENV.api+'/webservicecompleteOolaga', d).subscribe(data => {
        //               if(JSON.parse(data._body).response==true){
        //               }
        //               else if(JSON.parse(data._body).response==false){
        //                 // this.error=JSON.parse(data._body).message;
        //           }
        //         });
        //         loader.dismiss();
        //      			alert('Payment Complete')
        //      			this.navCtrl.popToRoot();
        //       }
        //       else{
        //            alert('Payment not Complete')
        //       }
        //     });
        //     pay.present();
    };
    OolagaPaymentPage = __decorate([
        Component({
            selector: 'page-oolaga-payment',
            templateUrl: 'oolaga-payment.html'
        }),
        __metadata("design:paramtypes", [Http, LoadingController, AppProvider, ModalController, NavController, NavParams])
    ], OolagaPaymentPage);
    return OolagaPaymentPage;
}());
export { OolagaPaymentPage };
//# sourceMappingURL=oolaga-payment.js.map