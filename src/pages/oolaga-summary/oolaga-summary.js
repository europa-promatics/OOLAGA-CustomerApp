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
import { NavController, NavParams, AlertController, LoadingController, ModalController } from 'ionic-angular';
import { ENV } from '../../app/env';
import { OfferPage } from '../offer/offer';
import { CancelOolagaPage } from '../cancel-oolaga/cancel-oolaga';
import { OpenItemPicPage } from '../open-item-pic/open-item-pic';
var OolagaSummaryPage = /** @class */ (function () {
    function OolagaSummaryPage(modalCtrl, http, LoadingController, navCtrl, navParams, alertCtrl) {
        this.modalCtrl = modalCtrl;
        this.http = http;
        this.LoadingController = LoadingController;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.item_quantity = 0;
        this.selected_item = 0;
        this.fromService = false;
        this.locations = [];
        this.pics = [];
        this.oolaga_id = this.navParams.get('oolaga_id');
        // alert(this.oolaga_id);
    }
    OolagaSummaryPage.prototype.ngOnInit = function () {
        var _this = this;
        if (this.oolaga_id) {
            var dataToSend = {
                oolaga_id: this.oolaga_id
            };
            this.http.post(ENV.api + '/getOolagaById', dataToSend).subscribe(function (data) {
                _this.fromService = true;
                if (JSON.parse(data['_body']).response == true) {
                    // alert("hello")
                    _this.my = ENV.api;
                    console.log('ionViewDidLoad OolagaSummaryPage');
                    _this.data = JSON.parse(data['_body']).data[0];
                    _this.page = _this.navParams.get('page');
                    console.log(_this.page, _this.data);
                    for (var i = 0; i < _this.data.oolaga_item.length; i++) {
                        _this.item_quantity += parseInt(_this.data.oolaga_item[i].quantity);
                    }
                    if (_this.data.source && _this.data.source != null) {
                        _this.locations.push(_this.data.source);
                    }
                    if (_this.data.way_point1 && _this.data.way_point1 != null) {
                        _this.locations.push(_this.data.way_point1);
                    }
                    if (_this.data.way_point2 && _this.data.way_point2 != null) {
                        _this.locations.push(_this.data.way_point2);
                    }
                    if (_this.data.destination && _this.data.destination != null) {
                        _this.locations.push(_this.data.destination);
                    }
                    // this.locations.push({location_name:this.data.src_location_name});
                    // this.locations.push({location_name:this.data.dst_location_name});
                    console.log(_this.locations);
                    console.log(_this.data.items.length);
                    for (var i = 0; i < _this.data.items.length; i++) {
                        if (_this.data.items[i].image != null) {
                            var a = _this.data.items[i].image.split(",");
                            _this.data.items[i].image ? _this.pics.push(ENV.api + '/public/frontend/img/addImage/' + a[0]) : '';
                        }
                    }
                }
            }, function (error) {
                alert(error);
            });
        }
        else {
            this.my = ENV.api;
            console.log('ionViewDidLoad OolagaSummaryPage');
            this.data = this.navParams.get('data');
            this.page = this.navParams.get('page');
            console.log(this.page, this.data);
            for (var i = 0; i < this.data.items.length; i++) {
                this.item_quantity += parseInt(this.data.items[i].quantity);
            }
            if (this.data.source && this.data.source != null) {
                this.locations.push(this.data.source);
            }
            if (this.data.way_point1 && this.data.way_point1 != null) {
                this.locations.push(this.data.way_point1);
            }
            if (this.data.way_point2 && this.data.way_point2 != null) {
                this.locations.push(this.data.way_point2);
            }
            if (this.data.destination && this.data.destination != null) {
                this.locations.push(this.data.destination);
            }
            // this.locations.push({location_name:this.data.src_location_name});
            // this.locations.push({location_name:this.data.dst_location_name});
            console.log(this.locations);
            console.log(this.data.items.length);
            for (var i = 0; i < this.data.items.length; i++) {
                if (this.data.items[i].image != null) {
                    var a = this.data.items[i].image.split(",");
                    this.data.items[i].image ? this.pics.push(ENV.api + '/public/frontend/img/addImage/' + a[0]) : '';
                }
            }
        }
    };
    OolagaSummaryPage.prototype.cancelOolaga = function () {
        var _this = this;
        var confirm = this.alertCtrl.create({
            subTitle: 'Are you sure you want to cancel your oolaga',
            buttons: [{
                    text: 'NO',
                    handler: function () {
                    }
                },
                {
                    text: 'YES',
                    handler: function () {
                        _this.navCtrl.push(CancelOolagaPage, { data: _this.data });
                    }
                }]
        });
        confirm.present();
    };
    OolagaSummaryPage.prototype.withdrawAuction = function (id) {
        var _this = this;
        var confirm = this.alertCtrl.create({
            subTitle: 'Are you want to Withdraw​ Auction',
            buttons: [{
                    text: 'Cancel',
                    handler: function () {
                    }
                },
                {
                    text: 'Yes',
                    handler: function () {
                        var loader = _this.LoadingController.create();
                        loader.present();
                        _this.http.get(ENV.api + "/webservicesdeactivedraft/" + id).subscribe(function (data) {
                            _this.navCtrl.popToRoot();
                            loader.dismiss();
                        }, function (err) {
                            loader.dismiss();
                        });
                    }
                }]
        });
        confirm.present();
    };
    OolagaSummaryPage.prototype.notificationpage = function (id, offer) {
        if (offer != 0 || offer != '0') {
            this.navCtrl.push(OfferPage, { id: id });
        }
        else {
            var alert_1 = this.alertCtrl.create({
                title: 'Alert',
                message: 'No Offers',
                buttons: ['Ok']
            });
            alert_1.present();
        }
    };
    OolagaSummaryPage.prototype.ionViewDidLoad = function () {
    };
    OolagaSummaryPage.prototype.openPic = function (pic) {
        pic = this.my + '/public/frontend/img/addImage/' + pic;
        var model = this.modalCtrl.create(OpenItemPicPage, { pic: pic });
        model.present();
    };
    OolagaSummaryPage = __decorate([
        Component({
            selector: 'page-oolaga-summary',
            templateUrl: 'oolaga-summary.html'
        }),
        __metadata("design:paramtypes", [ModalController, Http, LoadingController, NavController, NavParams, AlertController])
    ], OolagaSummaryPage);
    return OolagaSummaryPage;
}());
export { OolagaSummaryPage };
//# sourceMappingURL=oolaga-summary.js.map