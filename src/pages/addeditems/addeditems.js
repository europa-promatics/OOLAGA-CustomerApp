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
import { NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { SelectTimeDatePage } from '../select-time-date/select-time-date';
import { EditItemDetailPage } from '../edit-item-detail/edit-item-detail';
import { ENV } from '../../app/env';
import { Http } from '@angular/http';
import { AppProvider } from '../../providers/app-provider';
var AddeditemsPage = /** @class */ (function () {
    function AddeditemsPage(appProvider, loadingCtrl, http, alertCtrl, navCtrl, navParams) {
        this.appProvider = appProvider;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.selecteditem = null;
        this.popup = false;
        this.enableclear = false;
        this.http = http;
    }
    AddeditemsPage.prototype.edit = function (value) {
        this.navCtrl.push(EditItemDetailPage, { itemDetails: value });
    };
    AddeditemsPage.prototype.ionViewDidEnter = function () {
        this.items = this.appProvider.current.items;
        console.log('ionViewDidLoad AddeditemsPage');
    };
    AddeditemsPage.prototype.help = function () {
        var alert = this.alertCtrl.create({
            title: 'Added Items',
            message: 'This is a summary of all the items you have entered.  Feel free to edit any of them by pressing the three dots to the right',
            buttons: ['OK']
        });
        alert.present();
    };
    AddeditemsPage.prototype.submit = function (value) {
        var _this = this;
        if (this.appProvider.current.summary_edit_item) {
            this.navCtrl.pop();
        }
        else if (value == 0) {
            this.navCtrl.pop();
        }
        else if (value == 1) {
            var alert_1 = this.alertCtrl.create({
                message: 'Keep in mind that large items require at least two people. If you cannot help you can create a seprate "Labor only" Oolaga once you have finalized this one',
                buttons: [
                    {
                        text: 'CONTINUE',
                        handler: function () {
                            _this.navCtrl.push(SelectTimeDatePage, {});
                        }
                    }
                ]
            });
            alert_1.present();
        }
    };
    AddeditemsPage.prototype.enablecleartrue = function () {
        var _this = this;
        setTimeout(function () { _this.enableclear = true; }, 100);
    };
    AddeditemsPage.prototype.select = function (value) {
        var _this = this;
        this.selecteditem = value;
        console.log(this.selecteditem);
        setTimeout(function () { _this.enableclear = true; }, 100);
    };
    AddeditemsPage.prototype.delete = function (item) {
        var _this = this;
        console.log(item);
        this.loading = this.loadingCtrl.create();
        this.loading.present();
        var link = ENV.api + '/webservicedeleteItem';
        this.http.post(link, { item_id: item.item_id }).subscribe(function (data) {
            console.log(JSON.parse(data._body));
            if (JSON.parse(data._body).response == true) {
                _this.remove_item(item.item_id);
            }
            else { }
        });
    };
    AddeditemsPage.prototype.remove_item = function (id) {
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].item_id == id) {
                this.items.splice(i, 1);
            }
        }
        localStorage['items'] = JSON.stringify(this.items);
        this.appProvider.current.items = this.items;
        this.loading.dismiss();
        console.log(this.items.length);
        if (this.items[0] == null) {
            this.navCtrl.pop();
        }
    };
    AddeditemsPage = __decorate([
        Component({
            selector: 'page-addeditems',
            templateUrl: 'addeditems.html'
        }),
        __metadata("design:paramtypes", [AppProvider, LoadingController, Http, AlertController, NavController, NavParams])
    ], AddeditemsPage);
    return AddeditemsPage;
}());
export { AddeditemsPage };
//# sourceMappingURL=addeditems.js.map