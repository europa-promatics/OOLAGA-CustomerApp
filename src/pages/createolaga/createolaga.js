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
import { NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { AppProvider } from '../../providers/app-provider';
import { ENV } from '../../app/env';
//--------------------------------------------
import { LocationSelectPage } from '../location-select/location-select';
import { LaboronlyPage } from '../laboronly/laboronly';
var CreateolagaPage = /** @class */ (function () {
    function CreateolagaPage(http, loadingCtrl, navCtrl, navParams, alertCtrl, appProvider) {
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.alertCtrl = alertCtrl;
        this.appProvider = appProvider;
        this.service_description = '';
        this.editable = false;
        this.http = http;
        this.service_type = 1;
        if (this.navParams.get('data') == 'edit') {
            this.editable = true;
        }
    }
    CreateolagaPage.prototype.help = function () {
        var alert = this.alertCtrl.create({
            title: 'Create Oolaga',
            message: 'This is where you tell us what type of move you need. Be as precise as possible to ensure your helper is well prepared.',
            buttons: ['OK']
        });
        alert.present();
    };
    CreateolagaPage.prototype.details = function (value) {
        this.service_description = value;
    };
    CreateolagaPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        if (this.appProvider.current.enable_draft == true) {
        }
        else {
            this.appProvider.createNew();
        }
        var loader = this.loadingCtrl.create();
        loader.present();
        this.http.get(ENV.api + "/webserviceoolagaServices").subscribe(function (data) {
            if (JSON.parse(data._body).response == true) {
                _this.service = JSON.parse(data._body).services;
                loader.dismiss();
                if (_this.appProvider.current.summary_edit_service) {
                    _this.service_description = _this.appProvider.current.service_description;
                    _this.hightlightStatus = _this.appProvider.current.service_id;
                    console.log(_this.hightlightStatus);
                }
                else if (localStorage['edit_draft_oolaga'] == true || localStorage['edit_draft_oolaga'] == 'true') {
                    _this.service_description = localStorage['service_description'];
                    _this.hightlightStatus = localStorage['service_no'];
                    _this.enablenext = true;
                }
                else {
                    localStorage['service_type'] = _this.service[0].service_id;
                    localStorage['service_image'] = _this.service[0].service_image;
                    localStorage['service_name'] = _this.service[0].service_name;
                    localStorage['service_description'] = _this.service[0].service_description;
                }
            }
            else {
                loader.dismiss();
            }
        }, function (err) {
            alert(JSON.stringify('error' + err));
            loader.dismiss();
        });
    };
    CreateolagaPage.prototype.selectcard = function (type, img, name, description, i) {
        if (i == 0) {
            var confirm_1 = this.alertCtrl.create({
                title: 'Donation items',
                message: 'Some items (like matress) are typically not accepted at donation centres <br> <br> Please Make Sure Your Donation Will be Accepted By your choosen donation center or you may be responsible for additional disposal',
                buttons: [
                    {
                        text: 'OK',
                        handler: function () { },
                    }
                ]
            });
            confirm_1.present();
        }
        this.enablenext = true;
        this.service_type = type;
        localStorage['service_no'] = i + 1;
        localStorage['service_type'] = type;
        localStorage['service_image'] = img;
        localStorage['service_name'] = name;
        localStorage['service_description'] = description;
    };
    CreateolagaPage.prototype.nextpage = function () {
        var _this = this;
        this.appProvider.current.service_description = localStorage['service_description'];
        this.appProvider.current.service_id = localStorage['service_type'];
        this.appProvider.current.service_image = localStorage['service_image'];
        this.appProvider.current.service_name = localStorage['service_name'];
        if (this.editable || this.appProvider.current.oolaga_created || this.appProvider.current.summary_edit_service) {
            var loader_1 = this.loadingCtrl.create();
            loader_1.present();
            var link = ENV.api + '/webserviceeditOolagaService';
            var data = JSON.stringify({
                oolaga_id: this.appProvider.current.oolaga_id,
                service_type: this.service_type
            });
            this.http.post(link, data).subscribe(function (data) {
                loader_1.dismiss();
                if (JSON.parse(data._body).response == true) {
                    if (_this.appProvider.current.summary_edit_service) {
                        localStorage['draftOolaga'] = JSON.stringify(data.json().data);
                        _this.navCtrl.pop();
                    }
                    else if (_this.appProvider.current.oolaga_created) {
                        if (_this.service_type == 7) {
                            _this.navCtrl.push(LaboronlyPage, {});
                        }
                        else {
                            _this.navCtrl.push(LocationSelectPage, {});
                        }
                    }
                    else {
                        _this.navCtrl.pop();
                    }
                }
                else {
                    alert('error');
                }
            });
        }
        else {
            if (this.enablenext) {
                var loader_2 = this.loadingCtrl.create();
                loader_2.present();
                var link = ENV.api + '/webserviceaddOolaga';
                var data = JSON.stringify({
                    customer_id: localStorage['user_id'],
                    service_type: this.service_type
                });
                this.http.post(link, data).subscribe(function (data) {
                    loader_2.dismiss();
                    if (JSON.parse(data._body).response == true) {
                        localStorage['oolaga_id'] = JSON.parse(data._body).oolaga_id;
                        _this.appProvider.current.oolaga_id = JSON.parse(data._body).oolaga_id;
                        _this.appProvider.current.oolaga_created = true;
                    }
                    else {
                        alert('error');
                    }
                });
                if (this.service_type == 7) {
                    this.navCtrl.push(LaboronlyPage, {});
                }
                else {
                    this.navCtrl.push(LocationSelectPage, {});
                }
            }
            else {
                var alert_1 = this.alertCtrl.create({
                    title: 'Please select ooLaga',
                    buttons: [{
                            text: 'Ok',
                            handler: function () { }
                        }]
                });
                alert_1.present();
            }
        }
    };
    CreateolagaPage = __decorate([
        Component({
            selector: 'page-createolaga',
            templateUrl: 'createolaga.html'
        }),
        __metadata("design:paramtypes", [Http,
            LoadingController,
            NavController,
            NavParams,
            AlertController,
            AppProvider])
    ], CreateolagaPage);
    return CreateolagaPage;
}());
export { CreateolagaPage };
//# sourceMappingURL=createolaga.js.map