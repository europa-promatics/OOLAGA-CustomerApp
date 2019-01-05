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
import { Http } from '@angular/http';
import { ENV } from '../../app/env';
import { AppProvider } from '../../providers/app-provider';
import { SelectTimeDatePage } from '../select-time-date/select-time-date';
var LaboronlyPage = /** @class */ (function () {
    function LaboronlyPage(loadingCtrl, alertCtrl, appProvider, http, navCtrl, navParams) {
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.appProvider = appProvider;
        this.http = http;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.timeValues = ['01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30', '05:00', '05:30', '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00'];
        this.value = 0;
        this.locationData = [];
        this.oolaga = new labor();
        this.oolaga.hours = this.timeValues[0];
        this.locationData = [];
    }
    LaboronlyPage.prototype.ionViewDidLoad = function () {
        this.acService = new google.maps.places.AutocompleteService();
        console.log('ionViewDidLoad LaboronlyPage');
        this.appProvider.current.laborHours ? this.oolaga.hours = this.appProvider.current.laborHours : '',
            this.oolaga.info = this.appProvider.current.laborInfo;
        this.oolaga.latitude = this.appProvider.current.laborLocationLat;
        this.oolaga.longitude = this.appProvider.current.laborLocationLng;
        this.oolaga.location_name = this.appProvider.current.laborLocationName;
        this.oolaga.unit_nu = this.appProvider.current.laborUnit_no;
    };
    LaboronlyPage.prototype.searchLocation = function () {
        var config;
        if (this.oolaga.location_name == '') {
            this.locationData = [];
            return;
        }
        config = {
            types: ['geocode'],
            input: this.oolaga.location_name,
        };
        var self = this;
        this.acService.getPlacePredictions(config, function (predictions, status) {
            if (predictions) {
                self.locationData = [];
                if (predictions) {
                    predictions.forEach(function (prediction) {
                        self.locationData.push(prediction);
                    });
                }
            }
        });
    };
    LaboronlyPage.prototype.selectLocation = function (value) {
        var _this = this;
        this.http.get('https://maps.googleapis.com/maps/api/geocode/json?place_id=' + value + '&key=AIzaSyAI2_gJfnHQ8ztCJ8omA-YrefkddT7y5TI').subscribe(function (data) {
            _this.oolaga.latitude = Math.round(data.json().results[0].geometry.location.lat * 10000000) / 10000000;
            _this.oolaga.longitude = Math.round(data.json().results[0].geometry.location.lng * 10000000) / 10000000;
        }, function (err) {
            console.log(err);
        });
    };
    LaboronlyPage.prototype.up = function () {
        if (this.value != this.timeValues.length - 1) {
            this.value++;
            this.oolaga.hours = this.timeValues[this.value];
        }
    };
    LaboronlyPage.prototype.down = function () {
        if (this.value != 0) {
            this.value--;
            this.oolaga.hours = this.timeValues[this.value];
        }
    };
    LaboronlyPage.prototype.submit = function (value) {
        var _this = this;
        if (value) {
            this.oolaga.oolaga_id = this.appProvider.current.oolaga_id;
            this.appProvider.current.laborInfo = this.oolaga.info;
            this.appProvider.current.laborHours = this.oolaga.hours;
            this.appProvider.current.laborLocationLat = this.oolaga.latitude;
            this.appProvider.current.laborLocationLng = this.oolaga.longitude;
            this.appProvider.current.laborLocationName = this.oolaga.location_name;
            this.appProvider.current.laborUnit_no = this.oolaga.unit_nu;
            var loader_1 = this.loadingCtrl.create();
            loader_1.present();
            this.http.post(ENV.api + '/webservicesaddLabour', JSON.stringify(this.oolaga))
                .subscribe(function (data) {
                console.log(data);
                if (data.json().response == true) {
                    if (_this.appProvider.current.summary_edit_location == true) {
                        if (_this.appProvider.current.draft_edit_labor_location == true) {
                            var a = JSON.parse(localStorage['draftOolaga']);
                            a.info = _this.appProvider.current.laborInfo;
                            a.hours = _this.appProvider.current.laborHours;
                            a.source.latitude = _this.appProvider.current.laborLocationLat;
                            a.source.longitude = _this.appProvider.current.laborLocationLng;
                            a.source.location_name = _this.appProvider.current.laborLocationName;
                            a.source.unit_nu = _this.appProvider.current.laborUnit_no;
                            localStorage['draftOolaga'] = JSON.stringify(a);
                        }
                        _this.navCtrl.pop();
                    }
                    else {
                        _this.navCtrl.push(SelectTimeDatePage, {});
                    }
                    loader_1.dismiss();
                }
                else if (data.json().response == false) {
                    loader_1.dismiss();
                    var alert_1 = _this.alertCtrl.create({
                        title: 'Oops!',
                        subTitle: 'Please Fill All Entries',
                        buttons: ['OK']
                    });
                    alert_1.present();
                }
            }, function (err) {
                console.log(err);
            });
        }
        else {
            this.navCtrl.pop();
        }
    };
    LaboronlyPage = __decorate([
        Component({
            selector: 'page-laboronly',
            templateUrl: 'laboronly.html'
        }),
        __metadata("design:paramtypes", [LoadingController, AlertController, AppProvider, Http, NavController, NavParams])
    ], LaboronlyPage);
    return LaboronlyPage;
}());
export { LaboronlyPage };
//       this.http.post(ENV.api+'/webservicesaddLabour',JSON.stringify(this.oolaga))
//       .subscribe(data=>{
//         console.log(data);
//         if(data.json().response==true){
//   				this.navCtrl.push(SelectTimeDatePage,{})
//   			}
//   		},err=>{
//   			console.log(err);
//   		})
//   	}
//   	else{
//   		this.navCtrl.pop();
//   	}
//   }
// }
var labor = /** @class */ (function () {
    function labor() {
    }
    return labor;
}());
//# sourceMappingURL=laboronly.js.map