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
import { NavController, NavParams, AlertController, ModalController, LoadingController } from 'ionic-angular';
import { FillLocationDetailPage } from '../fill-location-detail/fill-location-detail';
import { ItemDetailPage } from '../item-detail/item-detail';
import { AppProvider } from '../../providers/app-provider';
import { Http } from '@angular/http';
import { ENV } from '../../app/env';
var LocationSelectPage = /** @class */ (function () {
    function LocationSelectPage(appProvider, http, loadingCtrl, modalCtrl, alertCtrl, navCtrl, navParams) {
        this.appProvider = appProvider;
        this.loadingCtrl = loadingCtrl;
        this.modalCtrl = modalCtrl;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this._1 = false;
        this._2 = false;
        this._3 = false;
        this._4 = false;
        this.count = true;
        this.third_location = false;
        this.forth_location = false;
        this.first_location_label = 'Pick Up';
        this.second_location_label = 'Drop off';
        this.third_location_label = 'Drop off';
        this.forth_location_label = 'Drop off';
        this.editmarker1 = false;
        this.editmarker2 = false;
        this.editmarker3 = false;
        this.editmarker4 = false;
        this.locations = [];
        this.markers = [];
        this.locations_details = [];
        this.http = http;
    }
    LocationSelectPage.prototype.clearLocation = function (value) {
        if (this.markers.length >= value + 1) {
            this.markers[value].setMap(null);
        }
        // this.locations_details[value]={
        //               loc_no:value, 
        //               oolaga_id:localStorage['oolaga_id'],
        //               latitude:null,
        //               longitude:null,
        //               location_name:null,
        //               unit_nu:null,
        //               curbside:null,
        //               inhome:null,
        //               stairs:null,
        //               elevator:null,
        //               ride:null,
        //               parking_info:null,
        //               store_name:null,
        //               purchaser:null,
        //               order_number:null,
        //               phone:null,
        //               additional_contact:null
        //             }
        // this.locations[value].name=null;
        // this.locations[value].lat=null;
        // this.locations[value].lng=null;
        if (value == 0) {
            this._1 = false;
            this.first_location_name = null;
            this.autocompleteItems1 = [];
            if (this.locations.length == 1) {
                this.locations.pop();
            }
            if (this.locations_details.length == 1) {
                this.locations_details.pop();
            }
        }
        else if (value == 1) {
            this._2 = false;
            this.second_location_name = null;
            this.autocompleteItems2 = [];
            if (this.locations.length == 2) {
                this.locations.pop();
            }
            if (this.locations_details.length == 2) {
                this.locations_details.pop();
            }
        }
        else if (value == 2) {
            if (this.forth_location) {
                this._4 = false;
                this.third_location_name = this.forth_location_name;
                this.forth_location_name = null;
                this.autocompleteItems3 = [];
                this.autocompleteItems4 = [];
                this.forth_location = !this.forth_location;
                this.third_location_label = 'Drop off';
                if (this.locations.length == 4) {
                    this.locations[2] = this.locations[3];
                    this.locations.pop();
                }
                if (this.locations_details.length == 4) {
                    this.locations_details[2] = this.locations_details[3];
                    this.locations_details.pop();
                }
            }
            else {
                this._3 = false;
                this.third_location_name = null;
                this.autocompleteItems3 = [];
                if (!this.forth_location) {
                    this.third_location = !this.third_location;
                }
                this.second_location_label = 'Drop off';
                if (this.locations.length == 3) {
                    this.locations.pop();
                }
                if (this.locations_details.length == 3) {
                    this.locations_details.pop();
                }
            }
        }
        else if (value == 3) {
            this._4 = false;
            this.forth_location_name = null;
            this.autocompleteItems4 = [];
            this.forth_location = !this.forth_location;
            this.third_location_label = 'Drop off';
            if (this.locations.length == 4) {
                this.locations.pop();
            }
            if (this.locations_details.length == 4) {
                this.locations_details.pop();
            }
        }
    };
    LocationSelectPage.prototype.editdetail = function (value) {
        var _this = this;
        var locationhead;
        var locationname;
        if (value == 0) {
            locationhead = "FIRST LOCATION DETAILS";
            locationname = this.first_location_name;
        }
        else if (value == 1) {
            locationhead = "SECOND LOCATION DETAILS";
            locationname = this.second_location_name;
        }
        else if (value == 2) {
            locationhead = "THIRD LOCATION DETAILS";
            locationname = this.third_location_name;
        }
        else if (value == 3) {
            locationhead = "FORTH LOCATION DETAILS";
            locationname = this.forth_location_name;
        }
        this.appProvider.current.edit_location_data = true;
        var locationDetails = this.modalCtrl.create(FillLocationDetailPage, { location: locationhead, location_name: locationname });
        locationDetails.onDidDismiss(function (data) {
            if (data == null) {
                _this.locations_details[value] = {
                    loc_no: value,
                    oolaga_id: localStorage['oolaga_id'],
                    latitude: _this.locations_details[value].latitude,
                    longitude: _this.locations_details[value].longitude,
                    location_name: _this.locations_details[value].location_name,
                    unit_nu: null,
                    curbside: null,
                    inhome: null,
                    stairs: null,
                    elevator: null,
                    ride: null,
                    parking_info: null,
                    store_name: null,
                    purchaser: null,
                    order_number: null,
                    phone: null,
                    additional_contact: null
                };
            }
            else {
                _this.locations_details[value] = {
                    loc_no: value,
                    oolaga_id: localStorage['oolaga_id'],
                    latitude: _this.locations_details[value].latitude,
                    longitude: _this.locations_details[value].longitude,
                    location_name: _this.locations_details[value].location_name,
                    unit_nu: data.unit_nu,
                    curbside: data.curbside,
                    inhome: data.inhome,
                    stairs: data.stairs,
                    elevator: data.elevator,
                    ride: data.ride,
                    parking_info: data.parking_info,
                    store_name: data.store_name,
                    purchaser: data.purchaser,
                    order_number: data.order_number,
                    phone: data.phone,
                    additional_contact: data.additional_contact
                };
            }
            console.log(_this.locations_details);
        });
        locationDetails.present();
    };
    LocationSelectPage.prototype.loadLocations = function () {
        this.appProvider.current.locations[0] ? this.first_location_name = this.appProvider.current.locations[0].location_name : this.first_location_name;
        this.appProvider.current.locations[1] ? this.second_location_name = this.appProvider.current.locations[1].location_name : this.second_location_name;
        this.appProvider.current.locations[2] ? this.third_location_name = this.appProvider.current.locations[2].location_name : this.third_location_name;
        this.appProvider.current.locations[3] ? this.forth_location_name = this.appProvider.current.locations[3].location_name : this.forth_location_name;
        this.locations_details = this.appProvider.current.locations;
        console.log('locations :-', this.appProvider.current.locations.length);
        if (this.appProvider.current.locations.length == 2) {
            this._1 = true;
            this._2 = true;
        }
        if (this.appProvider.current.locations.length == 3) {
            this._1 = true;
            this._2 = true;
            this._3 = true;
        }
        if (this.appProvider.current.locations.length == 4) {
            this._1 = true;
            this._2 = true;
            this._3 = true;
            this._4 = true;
        }
        for (var i_1 = 0; i_1 < this.appProvider.current.locations.length; i_1++) {
            this.locations[i_1] = {
                no: i_1,
                name: this.appProvider.current.locations[i_1].location_name,
                lat: this.appProvider.current.locations[i_1].latitude,
                lng: this.appProvider.current.locations[i_1].longitude,
                location_selection: false
            };
        }
        if (this.markers != null) {
            for (var i = 0; i < this.markers.length; i++) {
                this.markers[i].setMap(null);
            }
        }
        if (this.locations_details.length >= 1) {
            var pin = new google.maps.LatLng(this.locations_details[0].latitude, this.locations_details[0].longitude);
            var icon1 = {
                url: 'assets/icon/pin-1.png',
                scaledSize: new google.maps.Size(33, 46),
            };
            var marker = new google.maps.Marker({
                position: pin,
                icon: icon1,
            });
            this.markers[0] = marker;
        }
        if (this.locations_details.length >= 2) {
            var pin = new google.maps.LatLng(this.locations_details[1].latitude, this.locations_details[1].longitude);
            var icon1 = {
                url: 'assets/icon/pin-2.png',
                scaledSize: new google.maps.Size(33, 46),
            };
            var marker = new google.maps.Marker({
                position: pin,
                icon: icon1,
            });
            this.markers[1] = marker;
        }
        if (this.locations_details.length >= 3) {
            var pin = new google.maps.LatLng(this.locations_details[2].latitude, this.locations_details[2].longitude);
            var icon1 = {
                url: 'assets/icon/pin-3.png',
                scaledSize: new google.maps.Size(33, 46),
            };
            var marker = new google.maps.Marker({
                position: pin,
                icon: icon1,
            });
            this.markers[2] = marker;
            this.third_location = true;
        }
        if (this.locations_details.length == 4) {
            var pin = new google.maps.LatLng(this.locations_details[3].latitude, this.locations_details[3].longitude);
            var icon1 = {
                url: 'assets/icon/pin-4.png',
                scaledSize: new google.maps.Size(33, 46),
            };
            var marker = new google.maps.Marker({
                position: pin,
                icon: icon1,
            });
            this.markers[3] = marker;
            this.forth_location = true;
        }
        for (var i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(this.map);
        }
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < this.markers.length; i++) {
            bounds.extend(this.markers[i].getPosition());
        }
        this.map.setCenter(bounds.getCenter());
        this.map.fitBounds(bounds);
        if (this.markers.length == 1) {
            this.map.setZoom(10);
        }
        else {
            this.map.setZoom(this.map.getZoom());
        }
    };
    LocationSelectPage.prototype.help = function () {
        var alert = this.alertCtrl.create({
            title: 'Locations',
            message: 'This is where you tell us where to go.  Keep in mind that you can have up to 4 locations with the last location always being the final drop off.  For each location entered you will be prompted to provide more details.',
            buttons: ['OK']
        });
        alert.present();
    };
    LocationSelectPage.prototype.chooseItem = function (item, location_no) {
        var _this = this;
        if (location_no == 1) {
            this._1 = true;
        }
        if (location_no == 2) {
            this._2 = true;
        }
        if (location_no == 3) {
            this._3 = true;
        }
        if (location_no == 4) {
            this._4 = true;
        }
        var name = item.description.split(',');
        name.pop();
        item.description = name.toString();
        console.log('modal > chooseItem > item > ', item);
        this.placesService = new google.maps.places.PlacesService(this.map);
        var request = { placeId: item.place_id };
        if (location_no == 1) {
            this.first_location_name = item.description;
            this.autocompleteItems1 = [];
            this.placesService.getDetails(request, function (place, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    console.log('page > getPlaceDetail > place > ', place);
                    _this.locations[0] = {
                        no: 0,
                        name: _this.first_location_name,
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng(),
                        location_selection: true
                    };
                    _this.loadmap(1);
                }
                else {
                    console.log('page > getPlaceDetail > status > ', status);
                }
            });
            this.appProvider.current.edit_location_data = false;
            var locationDetails = this.modalCtrl.create(FillLocationDetailPage, { location: "FIRST LOCATION DETAILS", location_name: this.first_location_name });
            locationDetails.onDidDismiss(function (data) {
                console.log("first", data);
                if (data == null) {
                    _this.locations_details[0] = {
                        loc_no: 0,
                        oolaga_id: localStorage['oolaga_id'],
                        latitude: _this.locations[0].lat,
                        longitude: _this.locations[0].lng,
                        location_name: _this.locations[0].name,
                        curbside: null,
                        inhome: null,
                        unit_nu: null,
                        stairs: null,
                        elevator: null,
                        ride: null,
                        parking_info: null,
                        store_name: null,
                        purchaser: null,
                        order_number: null,
                        phone: null,
                        additional_contact: null
                    };
                }
                else {
                    _this.locations_details[0] = {
                        loc_no: 0,
                        oolaga_id: localStorage['oolaga_id'],
                        latitude: _this.locations[0].lat,
                        longitude: _this.locations[0].lng,
                        location_name: _this.locations[0].name,
                        curbside: data.curbside,
                        inhome: data.inhome,
                        unit_nu: data.unit_nu,
                        stairs: data.stairs,
                        elevator: data.elevator,
                        ride: data.ride,
                        parking_info: data.parking_info,
                        store_name: data.store_name,
                        purchaser: data.purchaser,
                        order_number: data.order_number,
                        phone: data.phone,
                        additional_contact: data.additional_contact
                    };
                }
                console.log(_this.locations_details);
                _this.appProvider.current.locations = _this.locations_details;
            });
            locationDetails.present();
        }
        else if (location_no == 2) {
            this.second_location_name = item.description;
            this.autocompleteItems2 = [];
            this.placesService.getDetails(request, function (place, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    console.log('page > getPlaceDetail > place > ', place);
                    _this.locations[1] = {
                        no: 1,
                        name: _this.second_location_name,
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng(),
                        location_selection: false
                    };
                    _this.loadmap(2);
                }
                else {
                    console.log('page > getPlaceDetail > status > ', status);
                }
            });
            this.appProvider.current.edit_location_data = false;
            var locationDetails = this.modalCtrl.create(FillLocationDetailPage, { location: "SECOND LOCATION DETAILS", location_name: this.second_location_name });
            locationDetails.onDidDismiss(function (data) {
                console.log("second", data);
                if (data == null) {
                    _this.locations_details[1] = {
                        loc_no: 1,
                        oolaga_id: localStorage['oolaga_id'],
                        latitude: _this.locations[1].lat,
                        longitude: _this.locations[1].lng,
                        location_name: _this.locations[1].name,
                        curbside: null,
                        inhome: null,
                        unit_nu: null,
                        stairs: null,
                        elevator: null,
                        ride: null,
                        parking_info: null
                    };
                }
                else {
                    _this.locations_details[1] = {
                        loc_no: 1,
                        oolaga_id: localStorage['oolaga_id'],
                        latitude: _this.locations[1].lat,
                        longitude: _this.locations[1].lng,
                        location_name: _this.locations[1].name,
                        curbside: data.curbside,
                        inhome: data.inhome,
                        unit_nu: data.unit_nu,
                        stairs: data.stairs,
                        elevator: data.elevator,
                        ride: data.ride,
                        parking_info: data.parking_info
                    };
                }
                console.log(_this.locations_details);
                _this.appProvider.current.locations = _this.locations_details;
            });
            locationDetails.present();
        }
        else if (location_no == 3) {
            this.third_location_name = item.description;
            this.autocompleteItems3 = [];
            this.placesService.getDetails(request, function (place, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    console.log('page > getPlaceDetail > place > ', place);
                    _this.locations[2] = {
                        no: 2,
                        name: _this.third_location_name,
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng(),
                        location_selection: false
                    };
                    _this.loadmap(3);
                }
                else {
                    console.log('page > getPlaceDetail > status > ', status);
                }
            });
            this.appProvider.current.edit_location_data = false;
            var locationDetails = this.modalCtrl.create(FillLocationDetailPage, { location: "THIRD LOCATION DETAILS", location_name: this.third_location_name });
            locationDetails.onDidDismiss(function (data) {
                console.log('third', data);
                if (data == null) {
                    _this.locations_details[2] = {
                        loc_no: 2,
                        oolaga_id: localStorage['oolaga_id'],
                        latitude: _this.locations[2].lat,
                        longitude: _this.locations[2].lng,
                        location_name: _this.locations[2].name,
                        curbside: null,
                        inhome: null,
                        unit_nu: null,
                        stairs: null,
                        elevator: null,
                        ride: null,
                        parking_info: null
                    };
                }
                else {
                    _this.locations_details[2] = {
                        loc_no: 2,
                        oolaga_id: localStorage['oolaga_id'],
                        latitude: _this.locations[2].lat,
                        longitude: _this.locations[2].lng,
                        location_name: _this.locations[2].name,
                        curbside: data.curbside,
                        inhome: data.inhome,
                        unit_nu: data.unit_nu,
                        stairs: data.stairs,
                        elevator: data.elevator,
                        ride: data.ride,
                        parking_info: data.parking_info
                    };
                }
                console.log(_this.locations_details);
                _this.appProvider.current.locations = _this.locations_details;
            });
            locationDetails.present();
        }
        else if (location_no == 4) {
            this.forth_location_name = item.description;
            this.autocompleteItems4 = [];
            this.placesService.getDetails(request, function (place, status) {
                if (status == google.maps.places.PlacesServiceStatus.OK) {
                    console.log('page > getPlaceDetail > place > ', place);
                    _this.locations[3] = {
                        no: 3,
                        name: _this.forth_location_name,
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng(),
                        location_selection: false
                    };
                    _this.loadmap(4);
                    console.log(_this.locations);
                }
                else {
                    console.log('page > getPlaceDetail > status > ', status);
                }
            });
            this.appProvider.current.edit_location_data = false;
            var locationDetails = this.modalCtrl.create(FillLocationDetailPage, { location: "FORTH LOCATION DETAILS", location_name: this.forth_location_name });
            locationDetails.onDidDismiss(function (data) {
                console.log('forth', data);
                if (data == null) {
                    _this.locations_details[3] = {
                        loc_no: 3,
                        oolaga_id: localStorage['oolaga_id'],
                        latitude: _this.locations[3].lat,
                        longitude: _this.locations[3].lng,
                        location_name: _this.locations[3].name,
                        curbside: null,
                        inhome: null,
                        unit_nu: null,
                        stairs: null,
                        elevator: null,
                        ride: null,
                        parking_info: null
                    };
                }
                else {
                    _this.locations_details[3] = {
                        loc_no: 3,
                        oolaga_id: localStorage['oolaga_id'],
                        latitude: _this.locations[3].lat,
                        longitude: _this.locations[3].lng,
                        location_name: _this.locations[3].name,
                        curbside: data.curbside,
                        inhome: data.inhome,
                        unit_nu: data.unit_nu,
                        stairs: data.stairs,
                        elevator: data.elevator,
                        ride: data.ride,
                        parking_info: data.parking_info
                    };
                }
                console.log(_this.locations_details);
                _this.appProvider.current.locations = _this.locations_details;
            });
            locationDetails.present();
        }
    };
    LocationSelectPage.prototype.ngOnInit = function () {
        this.acService = new google.maps.places.AutocompleteService();
        this.autocompleteItems1 = [];
        this.autocompleteItems2 = [];
        this.autocompleteItems3 = [];
        this.autocompleteItems4 = [];
        var mapEle;
        mapEle = document.getElementById('map');
        this.map = new google.maps.Map(mapEle, {
            center: { lat: 37.09024, lng: -95.712891 },
            zoom: 3,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true
        });
        google.maps.event.addListenerOnce(this.map, 'idle', function () {
            mapEle.classList.add('show-map');
            google.maps.event.trigger(mapEle, 'resize');
        });
        if (localStorage['edit_draft_oolaga'] == true || localStorage['edit_draft_oolaga'] == 'true') {
            console.log('draft location page');
            console.log(localStorage['locations'].length);
        }
        this.appProvider.current.locations ? this.loadLocations() : console.log('asd');
        // if(this.appProvider.current.summary_edit_location=true){
        //   this.loadLocations();
        // }
    };
    LocationSelectPage.prototype.add_next_location = function () {
        if (!this.third_location) {
            this.third_location = !this.third_location;
            this.second_location_label = ' ';
        }
        else if (this.third_location && !this.forth_location) {
            this.forth_location = !this.forth_location;
            this.third_location_label = ' ';
        }
    };
    LocationSelectPage.prototype.updateSearch = function (value) {
        var _this = this;
        console.log('modal > updateSearch');
        var config;
        if (value == 1) {
            if (this.first_location_name == '') {
                this.autocompleteItems1 = [];
                return;
            }
            config = {
                types: ['geocode'],
                input: this.first_location_name,
            };
        }
        if (value == 2) {
            if (this.second_location_name == '') {
                this.autocompleteItems2 = [];
                return;
            }
            config = {
                types: ['geocode'],
                input: this.second_location_name,
            };
        }
        if (value == 3) {
            if (this.third_location_name == '') {
                this.autocompleteItems3 = [];
                return;
            }
            config = {
                types: ['geocode'],
                input: this.third_location_name,
            };
        }
        if (value == 4) {
            if (this.forth_location_name == '') {
                this.autocompleteItems4 = [];
                return;
            }
            config = {
                types: ['geocode'],
                input: this.forth_location_name,
            };
        }
        if (this.count) {
            var self_1 = this;
            this.acService.getPlacePredictions(config, function (predictions, status) {
                console.log('modal > getPlacePredictions > status > ', status);
                if (value == 1 && predictions) {
                    self_1.autocompleteItems1 = [];
                    if (predictions) {
                        predictions.forEach(function (prediction) {
                            self_1.autocompleteItems1.push(prediction);
                        });
                    }
                }
                if (value == 2 && predictions) {
                    self_1.autocompleteItems2 = [];
                    predictions.forEach(function (prediction) {
                        self_1.autocompleteItems2.push(prediction);
                    });
                }
                if (value == 3 && predictions) {
                    self_1.autocompleteItems3 = [];
                    predictions.forEach(function (prediction) {
                        self_1.autocompleteItems3.push(prediction);
                    });
                }
                if (value == 4 && predictions) {
                    self_1.autocompleteItems4 = [];
                    predictions.forEach(function (prediction) {
                        self_1.autocompleteItems4.push(prediction);
                    });
                }
            });
            this.count = false;
            setTimeout(function () {
                _this.count = true;
            }, 500);
        }
    };
    LocationSelectPage.prototype.nextSubmit = function () {
        var _this = this;
        var loader = this.loadingCtrl.create();
        loader.present();
        localStorage['locations'] = JSON.stringify(this.locations_details);
        this.appProvider.current.locations = this.locations_details;
        this.appProvider.consoleData();
        this.http.post(ENV.api + '/webserviceaddLocation', this.locations_details).subscribe(function (data) {
            loader.dismiss();
            if (JSON.parse(data._body).response == true) {
                console.log(JSON.parse(data._body).location);
                if (JSON.parse(data._body).location.length >= 2) {
                    _this.appProvider.current.src_location = JSON.parse(data._body).location[0].id;
                    _this.appProvider.current.dst_location = JSON.parse(data._body).location[JSON.parse(data._body).location.length - 1].id;
                    _this.appProvider.current.way_point1 = null;
                    _this.appProvider.current.way_point2 = null;
                    if (JSON.parse(data._body).location.length == 3) {
                        _this.appProvider.current.way_point1 = JSON.parse(data._body).location[1].id;
                        _this.appProvider.current.way_point2 = null;
                    }
                    if (JSON.parse(data._body).location.length == 4) {
                        _this.appProvider.current.way_point1 = JSON.parse(data._body).location[1].id;
                        _this.appProvider.current.way_point2 = JSON.parse(data._body).location[2].id;
                    }
                }
                _this.http.post(ENV.api + '/webservicehelper_edit', {
                    oolaga_id: _this.appProvider.current.oolaga_id,
                    src_location: _this.appProvider.current.src_location,
                    dst_location: _this.appProvider.current.dst_location,
                    way_point1: _this.appProvider.current.way_point1,
                    way_point2: _this.appProvider.current.way_point2
                })
                    .subscribe(function (data) {
                });
                if (_this.appProvider.current.summary_edit_location) {
                    _this.navCtrl.pop();
                }
                else {
                    _this.navCtrl.push(ItemDetailPage, { locationId: JSON.parse(data._body).location });
                }
            }
            else {
                var alert_1 = _this.alertCtrl.create({
                    title: 'oops..',
                    message: 'Something wrong...',
                    buttons: ['Ok']
                });
                alert_1.present();
            }
        }, function (err) {
            loader.dismiss();
            var alert = _this.alertCtrl.create({
                title: 'oops..',
                message: 'please check your Internet connection',
                buttons: ['Ok']
            });
            alert.present();
        });
    };
    LocationSelectPage.prototype.submit = function (value) {
        if (value == 0) {
            this.navCtrl.pop();
        }
        else if (value == 1) {
            if (this.first_location_name != null && this.second_location_name != null && this.third_location == false && this.forth_location == false) {
                if (this.locations_details.length == 2 &&
                    this.locations_details[0].oolaga_id != null &&
                    this.locations_details[0].latitude != null &&
                    this.locations_details[0].longitude != null &&
                    this.locations_details[0].location_name != null &&
                    this.locations_details[1].oolaga_id != null &&
                    this.locations_details[1].latitude != null &&
                    this.locations_details[1].longitude != null &&
                    this.locations_details[1].location_name != null) {
                    this.nextSubmit();
                }
                else {
                    alert('Enter locations properly');
                }
            }
            else if (this.first_location_name != null && this.second_location_name != null && this.third_location_name != null && this.third_location == true && this.forth_location == false) {
                if (this.locations_details.length == 3 &&
                    this.locations_details[0].oolaga_id != null &&
                    this.locations_details[0].latitude != null &&
                    this.locations_details[0].longitude != null &&
                    this.locations_details[0].location_name != null &&
                    this.locations_details[1].oolaga_id != null &&
                    this.locations_details[1].latitude != null &&
                    this.locations_details[1].longitude != null &&
                    this.locations_details[1].location_name != null &&
                    this.locations_details[2].oolaga_id != null &&
                    this.locations_details[2].latitude != null &&
                    this.locations_details[2].longitude != null &&
                    this.locations_details[2].location_name != null) {
                    this.nextSubmit();
                }
                else {
                    alert('Enter locations properly');
                }
            }
            else if (this.first_location_name != null && this.second_location_name != null && this.third_location_name != null && this.forth_location_name != null && this.third_location == true && this.forth_location == true) {
                if (this.locations_details.length == 4 &&
                    this.locations_details[0].oolaga_id != null &&
                    this.locations_details[0].latitude != null &&
                    this.locations_details[0].longitude != null &&
                    this.locations_details[0].location_name != null &&
                    this.locations_details[1].oolaga_id != null &&
                    this.locations_details[1].latitude != null &&
                    this.locations_details[1].longitude != null &&
                    this.locations_details[1].location_name != null &&
                    this.locations_details[2].oolaga_id != null &&
                    this.locations_details[2].latitude != null &&
                    this.locations_details[2].longitude != null &&
                    this.locations_details[2].location_name != null &&
                    this.locations_details[3].oolaga_id != null &&
                    this.locations_details[3].latitude != null &&
                    this.locations_details[3].longitude != null &&
                    this.locations_details[3].location_name != null) {
                    this.nextSubmit();
                }
                else {
                    alert('Enter locations properly');
                }
            }
            else {
                alert('Enter locations');
            }
        }
    };
    LocationSelectPage.prototype.save_locations = function () {
        this.http.post(ENV.api + '/webservicehelper_edit', {
            olaga_id: this.appProvider.current.oolaga_id,
            src_location: this.appProvider.current.src_location,
            dst_location: this.appProvider.current.dst_location,
            way_point1: this.appProvider.current.way_point1,
            way_point2: this.appProvider.current.way_point2
        })
            .subscribe(function (data) {
        });
    };
    LocationSelectPage.prototype.loadmap = function (value) {
        if (this.markers != null) {
            for (var i = 0; i < this.markers.length; i++) {
                this.markers[i].setMap(null);
            }
        }
        console.log(this.locations.length);
        console.log(this.markers);
        if (value >= 1) {
            var pin = new google.maps.LatLng(this.locations[0].lat, this.locations[0].lng);
            var icon1 = {
                url: 'assets/icon/pin-1.png',
                scaledSize: new google.maps.Size(33, 46),
            };
            var marker = new google.maps.Marker({
                position: pin,
                icon: icon1,
            });
            this.markers[0] = marker;
        }
        if (value >= 2) {
            var pin = new google.maps.LatLng(this.locations[1].lat, this.locations[1].lng);
            var icon1 = {
                url: 'assets/icon/pin-2.png',
                scaledSize: new google.maps.Size(33, 46),
            };
            var marker = new google.maps.Marker({
                position: pin,
                icon: icon1,
            });
            this.markers[1] = marker;
        }
        if (value >= 3) {
            var pin = new google.maps.LatLng(this.locations[2].lat, this.locations[2].lng);
            var icon1 = {
                url: 'assets/icon/pin-3.png',
                scaledSize: new google.maps.Size(33, 46),
            };
            var marker = new google.maps.Marker({
                position: pin,
                icon: icon1,
            });
            this.markers[2] = marker;
        }
        if (value == 4) {
            var pin = new google.maps.LatLng(this.locations[3].lat, this.locations[3].lng);
            var icon1 = {
                url: 'assets/icon/pin-4.png',
                scaledSize: new google.maps.Size(33, 46),
            };
            var marker = new google.maps.Marker({
                position: pin,
                icon: icon1,
            });
            this.markers[3] = marker;
        }
        for (var i = 0; i < this.markers.length; i++) {
            if (this.locations[i].lng == null) {
                this.markers[i].setMap(null);
            }
            else {
                this.markers[i].setMap(this.map);
            }
        }
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < this.markers.length; i++) {
            if (this.locations[i].lng == null) {
            }
            else {
                bounds.extend(this.markers[i].getPosition());
            }
        }
        this.map.setCenter(bounds.getCenter());
        this.map.fitBounds(bounds);
        if (this.markers.length == 1) {
            this.map.setZoom(10);
        }
        else {
            this.map.setZoom(this.map.getZoom());
        }
    };
    LocationSelectPage = __decorate([
        Component({
            selector: 'page-location-select',
            templateUrl: 'location-select.html'
        }),
        __metadata("design:paramtypes", [AppProvider, Http, LoadingController, ModalController, AlertController, NavController, NavParams])
    ], LocationSelectPage);
    return LocationSelectPage;
}());
export { LocationSelectPage };
//# sourceMappingURL=location-select.js.map