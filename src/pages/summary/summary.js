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
import { NavController, NavParams, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { YourPricePage } from '../your-price/your-price';
import { SummaryEditLocationPage } from '../summary-edit-location/summary-edit-location';
import { ItemDetailPage } from '../item-detail/item-detail';
import { OpenItemPicPage } from '../open-item-pic/open-item-pic';
import { SelectTimeDatePage } from '../select-time-date/select-time-date';
import { LaboronlyPage } from '../laboronly/laboronly';
import { AppProvider } from '../../providers/app-provider';
import { ENV } from '../../app/env';
import { CustomerOolagaConfirmedPage } from '../customer-oolaga-confirmed/customer-oolaga-confirmed';
var SummaryPage = /** @class */ (function () {
    function SummaryPage(modalCtrl, http, loadingCtrl, appProvider, alertCtrl, navCtrl, navParams) {
        this.modalCtrl = modalCtrl;
        this.http = http;
        this.loadingCtrl = loadingCtrl;
        this.appProvider = appProvider;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.editenable = true;
        this.item_quantity = 0;
        this.selected_item = 0;
        this.pics = [];
        // oolaga_id=this.navParams.get('oolaga_id');
    }
    SummaryPage.prototype.openPic = function (pic) {
        if (pic.length > 50) {
            var model = this.modalCtrl.create(OpenItemPicPage, { pic: pic });
            model.present();
        }
        else {
            pic = this.my + '/public/frontend/img/addImage/' + pic;
            var model = this.modalCtrl.create(OpenItemPicPage, { pic: pic });
            model.present();
        }
    };
    SummaryPage.prototype.ionViewDidEnter = function () {
        this.my = ENV.api;
        // alert(JSON.stringify(this.appProvider.current.items[0].pics[0]));
        console.log(this.appProvider.current);
        if (this.appProvider.current.service_id != 7) {
            this.appProvider.current.summary_edit_item = false;
            this.appProvider.current.summary_edit_location = false;
            this.appProvider.current.summary_edit_dateTime = false;
            this.appProvider.current.summary_edit_oolagaType = false;
            this.appProvider.current.summary_edit_helper = false;
            this.date = this.appProvider.current.date;
            this.time = this.appProvider.current.time;
            this.helper = this.appProvider.current.helper_no;
            this.items = this.appProvider.current.items;
            this.service_name = this.appProvider.current.service_name;
            this.locations = this.appProvider.current.locations;
            this.src_location_name = this.locations[0].location_name;
            this.dst_location_name = this.locations[this.locations.length - 1].location_name;
            for (var i = 0; i < this.items.length; i++) {
                if (i == 0) {
                    this.item_quantity = parseInt(this.items[i].quantity);
                }
                else {
                    this.item_quantity = this.item_quantity + parseInt(this.items[i].quantity);
                }
            }
            this.pics = [];
            for (var i_1 = 0; i_1 < this.appProvider.current.items.length; i_1++) {
                if (this.appProvider.current.items[i_1].pics) {
                    console.log(this.appProvider.current.items[i_1].pics[0]);
                    this.appProvider.current.items[i_1].pics[0] ? this.pics.push(this.appProvider.current.items[i_1].pics[0]) : '';
                }
            }
        }
    };
    SummaryPage.prototype.editItems = function () {
        if (this.editenable == false) {
            console.log('Edit Items');
            this.appProvider.current.summary_edit_item = true;
            this.navCtrl.push(ItemDetailPage, {});
        }
    };
    SummaryPage.prototype.editCategory = function () {
        var _this = this;
        if (this.editenable == false) {
            var alert_1 = this.alertCtrl.create({
                message: 'If you edit Category then you have to re-enter all the other information',
                buttons: [{
                        text: 'Cancel',
                        handler: function () {
                        }
                    }, {
                        text: 'OK',
                        handler: function () {
                            _this.navCtrl.popTo(1);
                        }
                    }]
            });
            alert_1.present();
        }
    };
    SummaryPage.prototype.editLocation = function () {
        if (this.editenable == false) {
            console.log('Edit locations');
            this.appProvider.current.summary_edit_location = true;
            this.navCtrl.push(SummaryEditLocationPage, {});
        }
    };
    SummaryPage.prototype.editDateTime = function () {
        if (this.editenable == false) {
            console.log('Edit date and time');
            this.appProvider.current.summary_edit_dateTime = true;
            this.navCtrl.push(SelectTimeDatePage, {});
        }
    };
    SummaryPage.prototype.editType = function () {
        if (this.editenable == false) {
            console.log('Edit oolagatype');
            this.appProvider.current.summary_edit_oolagaType = true;
            this.navCtrl.push(YourPricePage, {});
        }
    };
    SummaryPage.prototype.editLaborData = function () {
        if (this.editenable == false) {
            console.log('Edit labor data');
            this.appProvider.current.summary_edit_location = true;
            this.navCtrl.push(LaboronlyPage);
        }
    };
    SummaryPage.prototype.editPrice = function () {
        if (this.editenable == false) {
            console.log('Edit price');
            this.navCtrl.pop();
        }
    };
    SummaryPage.prototype.submitoolaga = function () {
        //	this.navCtrl.popToRoot();
        this.navCtrl.push(CustomerOolagaConfirmedPage, {});
    };
    SummaryPage.prototype.submit = function (value) {
        var _this = this;
        if (value == 0) {
            this.navCtrl.pop();
        }
        else if (value == 1) {
            // let loader=this.loadingCtrl.create()
            //   loader.present();
            //   this.http.post()
            //   .subscribe(data=>{
            //     if(JSON.parse(data['response'])==true){
            //       this.navCtrl.popToRoot()
            //       loader.dismiss();
            //     }
            //     else{
            //       loader.dismiss()
            //       let alert = this.alertCtrl.create({
            //         title:'Alert',
            //         message:'Something Wrong...',
            //         buttons:['OK']
            //       })
            //       alert.present();
            //     }
            //   })
            var alert_2 = this.alertCtrl.create({
                message: 'Auction will be live for 24hrs after submission',
                buttons: [{
                        text: 'Cancel',
                        handler: function () {
                            _this.navCtrl.popToRoot();
                        }
                    },
                    {
                        text: 'OK',
                        handler: function () {
                            var loader = _this.loadingCtrl.create();
                            loader.present();
                            var d = JSON.stringify({
                                oolaga_id: _this.appProvider.current.oolaga_id,
                                cost: _this.appProvider.current.price,
                            });
                            _this.http.post(ENV.api + '/webservicecompleteOolaga', d)
                                .subscribe(function (data) {
                                if (JSON.parse(data['_body']).response == true) {
                                    loader.dismiss();
                                    _this.navCtrl.push(CustomerOolagaConfirmedPage, {});
                                    //  this.navCtrl.popToRoot({animation: 'ios-transition',animate: true, direction: 'forward'});
                                }
                                else if (JSON.parse(data['_body']).response == false) {
                                    // this.error=JSON.parse(data._body).message;
                                    loader.dismiss();
                                    var a = _this.alertCtrl.create({
                                        title: 'oops..',
                                        message: 'Something wrong...',
                                        buttons: ['Ok']
                                    });
                                    a.present();
                                }
                            }, function (err) {
                                loader.dismiss();
                                var a = _this.alertCtrl.create({
                                    title: 'oops..',
                                    message: 'please check your Internet connection',
                                    buttons: ['Ok']
                                });
                                a.present();
                            });
                        }
                    }]
            });
            alert_2.present();
        }
    };
    SummaryPage.prototype.help = function () {
        var alert = this.alertCtrl.create({
            title: 'Summary',
            message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim ven',
            buttons: ['OK']
        });
        alert.present();
    };
    SummaryPage.prototype.edit = function () {
        this.editenable = !this.editenable;
    };
    SummaryPage = __decorate([
        Component({
            selector: 'page-summary',
            templateUrl: 'summary.html'
        }),
        __metadata("design:paramtypes", [ModalController, Http, LoadingController, AppProvider, AlertController, NavController, NavParams])
    ], SummaryPage);
    return SummaryPage;
}());
export { SummaryPage };
//# sourceMappingURL=summary.js.map