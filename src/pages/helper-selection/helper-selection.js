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
import { AppProvider } from '../../providers/app-provider';
import { Http } from '@angular/http';
import { ENV } from '../../app/env';
var HelperSelectionPage = /** @class */ (function () {
    function HelperSelectionPage(loadingCtrl, http, appProvider, alertCtrl, navCtrl, navParams) {
        this.loadingCtrl = loadingCtrl;
        this.appProvider = appProvider;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.selection1 = false;
        this.selection2 = false;
        this.selection3 = false;
        this.selection = '2 Helpers';
        this.user_help = false;
        if (this.navParams.get('data') == 'edit') {
            this.editable = true;
        }
        this.http = http;
    }
    HelperSelectionPage.prototype.ionViewDidEnter = function () {
        if (this.appProvider.current.helper_no == '1 Helper + 1 Van') {
            this.selectcard(1);
        }
        else if (this.appProvider.current.helper_no == '1 Helper + 1 Van + You') {
            this.selectcard(2);
        }
        else if (this.appProvider.current.helper_no == '2 Helper + 1 Van') {
            this.selectcard(3);
        }
        else {
            console.log('Empty Data');
        }
    };
    HelperSelectionPage.prototype.help = function () {
        var alert = this.alertCtrl.create({
            title: 'Helper Selection',
            message: 'This is where you give us more details about the help you need. In addition to a helper and his/her van, you can specify that you will help out or that you need an additional helper for labor only.',
            buttons: ['OK']
        });
        alert.present();
    };
    HelperSelectionPage.prototype.selectcard = function (value) {
        if (value == 1) {
            this.selection1 = true;
            this.selection2 = false;
            this.selection3 = false;
            this.selection = '1 Helper';
            localStorage['helper_no'] = '1 Helper + 1 Van';
            this.appProvider.current.helper_no = '1 Helper + 1 Van';
            this.appProvider.current.helper_number = 1;
        }
        else if (value == 2) {
            this.selection2 = true;
            this.selection1 = false;
            this.selection3 = false;
            this.selection = '2 Helpers';
            localStorage['helper_no'] = '1 Helper + 1 Van + You';
            this.appProvider.current.helper_no = '1 Helper + 1 Van + You';
            this.appProvider.current.helper_number = 2;
        }
        else if (value == 3) {
            this.selection3 = true;
            this.selection1 = false;
            this.selection2 = false;
            this.selection = '2 Helpers';
            localStorage['helper_no'] = '2 Helper + 1 Van';
            this.appProvider.current.helper_no = '2 Helper + 1 Van';
            this.appProvider.current.helper_number = 3;
        }
    };
    HelperSelectionPage.prototype.submit = function (value) {
        if (value == 0) {
            this.navCtrl.pop();
        }
        else if (value == 1) {
            var loader_1 = this.loadingCtrl.create();
            loader_1.present();
            if (this.appProvider.current.summary_edit_helper) {
                console.log('updated');
                this.http.post(ENV.api + '/webservicehelper_edit', {
                    oolaga_id: this.appProvider.current.oolaga_id,
                    helper_type: this.appProvider.current.helper_no
                })
                    .subscribe(function (data) {
                    console.log(data);
                    loader_1.dismiss();
                });
                this.navCtrl.pop();
            }
            else if (this.editable) {
                localStorage['helper_selection'] = this.selection;
                this.http.post(ENV.api + '/webservicehelper_edit', {
                    oolaga_id: this.appProvider.current.oolaga_id,
                    helper_type: this.appProvider.current.helper_no
                })
                    .subscribe(function (data) {
                    console.log(data);
                    loader_1.dismiss();
                });
                this.navCtrl.pop();
            }
            else {
                if (this.selection1 == true || this.selection2 == true || this.selection3 == true) {
                    // if(localStorage['helper_no']=='2 Helper + 1 Van'){
                    //   let alert = this.alertCtrl.create({
                    //       title: 'Alert',
                    //       message: 'Select Helper in lieu of moving to the next step',
                    //       buttons: ['OK']
                    //     })
                    //     alert.present();
                    // }
                    this.http.post(ENV.api + '/webservicehelper_edit', {
                        oolaga_id: this.appProvider.current.oolaga_id,
                        helper_type: this.appProvider.current.helper_no
                    })
                        .subscribe(function (data) {
                        console.log(data);
                        loader_1.dismiss();
                    });
                    localStorage['user_help'] = this.user_help;
                    localStorage['helper_selection'] = this.selection;
                    this.navCtrl.push(SelectTimeDatePage, {});
                }
                else {
                    alert('Select Helper');
                    loader_1.dismiss();
                }
            }
        }
    };
    HelperSelectionPage = __decorate([
        Component({
            selector: 'page-helper-selection',
            templateUrl: 'helper-selection.html'
        }),
        __metadata("design:paramtypes", [LoadingController, Http, AppProvider, AlertController, NavController, NavParams])
    ], HelperSelectionPage);
    return HelperSelectionPage;
}());
export { HelperSelectionPage };
//# sourceMappingURL=helper-selection.js.map