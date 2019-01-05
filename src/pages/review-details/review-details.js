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
import { YourPricePage } from '../your-price/your-price';
import { ModalController, LoadingController } from 'ionic-angular';
import { CreateolagaPage } from '../createolaga/createolaga';
import { Http } from '@angular/http';
import { EditLocationDetailPage } from '../edit-location-detail/edit-location-detail';
import { HelperSelectionPage } from '../helper-selection/helper-selection';
import { EditItemDetailPage } from '../edit-item-detail/edit-item-detail';
import { ENV } from '../../app/env';
var ReviewDetailsPage = /** @class */ (function () {
    function ReviewDetailsPage(loadingCtrl, http, modalCtrl, navCtrl, navParams) {
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
    }
    ReviewDetailsPage.prototype.ionViewDidEnter = function () {
        this.locations = JSON.parse(localStorage['locations']);
        this.oolaga_type = localStorage['service_type'];
        this.items = JSON.parse(localStorage['items']);
        this.date = localStorage['date'];
        this.time = localStorage['time'];
        this.helper = localStorage['helper_selection'];
        this.oolaga_img = localStorage['service_image'];
        this.oolaga_name = localStorage['service_name'];
        console.log(this.locations);
    };
    ReviewDetailsPage.prototype.submit = function (value) {
        if (value == 0) {
            this.navCtrl.pop();
        }
        else if (value == 1) {
            this.navCtrl.push(YourPricePage, {});
        }
    };
    ReviewDetailsPage.prototype.edit_oolaga_type = function () {
        this.navCtrl.push(CreateolagaPage, { data: 'edit' });
    };
    ReviewDetailsPage.prototype.edit_locations = function (value) {
        // let edit = this.modalCtrl.create(SelectLocationMapPage,{edit:'edit'});
        //  edit.onDidDismiss(data => {
        //  if(data.name!=''&&data.lat!=''&&data.lng!=''){
        //     this.edit_location(data.name,data.lat,data.lng,value);
        //  }});
        //  edit.present();
    };
    ReviewDetailsPage.prototype.edit_location_details = function (value, location) {
        var _this = this;
        var location_id;
        var loader = this.loadingCtrl.create();
        loader.present();
        this.http.post(ENV.api + '/webservicegetLocation', { olaga_id: localStorage['oolaga_id'] }).subscribe(function (data) {
            if (JSON.parse(data._body).response == true) {
                location_id = JSON.parse(data._body).locations[value].id;
                _this.navCtrl.push(EditLocationDetailPage, { location_id: location_id, location_data: location, value: value })
                    .then(function () {
                    loader.dismiss();
                });
            }
        });
    };
    ReviewDetailsPage.prototype.edit_item_details = function (value, id) {
        this.navCtrl.push(EditItemDetailPage, { data: id }, { animation: 'ios-transition' });
    };
    ReviewDetailsPage.prototype.edit_time_details = function () {
        this.navCtrl.pop({ animation: 'ios-transition', animate: true, direction: 'forward' });
    };
    ReviewDetailsPage.prototype.edit_helper_details = function () {
        this.navCtrl.push(HelperSelectionPage, { data: 'edit' });
    };
    ReviewDetailsPage.prototype.edit_location = function (name, lat, lng, value) {
        var _this = this;
        var location_id;
        var id = localStorage['oolaga_id'];
        console.log(localStorage['oolaga_id']);
        var loader = this.loadingCtrl.create();
        loader.present();
        this.http.post(ENV.api + '/webservicegetLocation', { olaga_id: id }).subscribe(function (data) {
            if (JSON.parse(data._body).response == true) {
                console.log(JSON.parse(data._body));
                if (value == 0) {
                    location_id = JSON.parse(data._body).locations[0].id;
                }
                else if (value == 1) {
                    location_id = JSON.parse(data._body).locations[1].id;
                }
                _this.http.post(ENV.api + '/webserviceeditLocation', { location: location_id,
                    latitude: lat,
                    longitude: lng,
                    location_name: name
                }).subscribe(function (data) {
                    if (JSON.parse(data._body).response == true) {
                        console.log(JSON.parse(data._body));
                        if (value == 0) {
                            _this.locations[0].location_name = name;
                            _this.locations[0].latitude = lat;
                            _this.locations[0].longitude = lng;
                            localStorage['locations'] = _this.locations;
                        }
                        else if (value == 1) {
                            _this.locations[1].location_name = name;
                            _this.locations[1].latitude = lat;
                            _this.locations[1].longitude = lng;
                            localStorage['locations'] = _this.locations;
                        }
                        loader.dismiss();
                    }
                    else {
                    }
                });
            }
            else {
                alert('error');
            }
        });
    };
    ReviewDetailsPage = __decorate([
        Component({
            selector: 'page-review-details',
            templateUrl: 'review-details.html'
        }),
        __metadata("design:paramtypes", [LoadingController, Http, ModalController, NavController, NavParams])
    ], ReviewDetailsPage);
    return ReviewDetailsPage;
}());
export { ReviewDetailsPage };
//# sourceMappingURL=review-details.js.map