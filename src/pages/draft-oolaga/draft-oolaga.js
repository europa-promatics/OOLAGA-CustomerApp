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
import { CreateolagaPage } from '../createolaga/createolaga';
import { ENV } from '../../app/env';
import { Http } from '@angular/http';
import { AppProvider } from '../../providers/app-provider';
import { LocationSelectPage } from '../location-select/location-select';
import { SummaryEditLocationPage } from '../summary-edit-location/summary-edit-location';
import { SelectTimeDatePage } from '../select-time-date/select-time-date';
import { YourPricePage } from '../your-price/your-price';
import { ItemDetailPage } from '../item-detail/item-detail';
import { LaboronlyPage } from '../laboronly/laboronly';
import { Camera } from 'ionic-native';
var DraftOolagaPage = /** @class */ (function () {
    function DraftOolagaPage(http, appProvider, loadingCtrl, alertCtrl, navCtrl, navParams) {
        this.appProvider = appProvider;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.dataLoaded = false;
        this.selected_item = 0;
        this.http = http;
    }
    DraftOolagaPage.prototype.openNextStep = function (data) {
        var _this = this;
        if (this.appProvider.current.service_id != 7) {
            if (data == 'location') {
                this.submit();
            }
            if (data == 'items') {
                if (this.value.source == null) {
                    var alert_1 = this.alertCtrl.create({
                        message: 'You have to enter Location details first',
                        buttons: [{ text: 'OK', handler: function () {
                                    _this.submit();
                                } }]
                    });
                    alert_1.present();
                }
                else {
                    this.submit();
                }
            }
            if (data == 'datetime') {
                if (this.value.source == null) {
                    var alert_2 = this.alertCtrl.create({
                        message: 'You have to enter Location details first',
                        buttons: [{ text: 'OK', handler: function () {
                                    _this.submit();
                                } }]
                    });
                    alert_2.present();
                }
                else if (this.value.oolaga_item[0] == null) {
                    var alert_3 = this.alertCtrl.create({
                        message: 'You have to enter item details first',
                        buttons: [{ text: 'OK', handler: function () {
                                    _this.submit();
                                } }]
                    });
                    alert_3.present();
                }
                else {
                    this.submit();
                }
            }
            if (data == 'price') {
                if (this.value.source == null) {
                    var alert_4 = this.alertCtrl.create({
                        message: 'You have to enter Location details first',
                        buttons: [{ text: 'OK', handler: function () {
                                    _this.submit();
                                } }]
                    });
                    alert_4.present();
                }
                else if (this.value.oolaga_item[0] == null) {
                    var alert_5 = this.alertCtrl.create({
                        message: 'You have to enter item details first',
                        buttons: [{ text: 'OK', handler: function () {
                                    _this.submit();
                                } }]
                    });
                    alert_5.present();
                }
                else if (this.appProvider.current.date && this.appProvider.current.date == null) {
                    var alert_6 = this.alertCtrl.create({
                        message: 'You have to enter Date and Time first',
                        buttons: [{ text: 'OK', handler: function () {
                                    _this.submit();
                                } }]
                    });
                    alert_6.present();
                }
                else {
                    this.submit();
                }
            }
        }
        else if (this.appProvider.current.service_id == 7) {
            if (data == 'price') {
                if (this.appProvider.current.laborLocationName == null) {
                    var alert_7 = this.alertCtrl.create({
                        message: 'You have to enter Location details first',
                        buttons: [{ text: 'OK', handler: function () {
                                    _this.submit();
                                } }]
                    });
                    alert_7.present();
                }
                else if (this.appProvider.current.date && this.appProvider.current.date == null) {
                    var alert_8 = this.alertCtrl.create({
                        message: 'You have to enter Date and Time first',
                        buttons: [{ text: 'OK', handler: function () {
                                    _this.submit();
                                } }]
                    });
                    alert_8.present();
                }
                else {
                    this.submit();
                }
            }
            if (data == 'datetime') {
                if (this.appProvider.current.laborLocationName == null) {
                    var alert_9 = this.alertCtrl.create({
                        message: 'You have to enter Location details first',
                        buttons: [{ text: 'OK', handler: function () {
                                    _this.submit();
                                } }]
                    });
                    alert_9.present();
                }
                else {
                    this.submit();
                }
            }
            if (data == 'location') {
                this.submit();
            }
        }
    };
    DraftOolagaPage.prototype.loadProvider = function () {
        console.log('jkashkhskdh', this.value);
        this.appProvider.createNew();
        this.appProvider.current.enable_draft = true;
        this.appProvider.current.oolaga_id = this.value.id;
        this.appProvider.current.service_name = this.value.service.service;
        this.appProvider.current.service_image = this.value.service.image;
        this.appProvider.current.service_id = this.value.service.id;
        this.appProvider.current.service_description = this.value.service.description;
        if (this.appProvider.current.service_id == 7) {
            if (this.appProvider.current.service_name != null) {
                this.nextpage = LaboronlyPage;
            }
            if (this.value.source != null) {
                this.appProvider.current.laborLocationName = this.value.source.location_name;
                this.appProvider.current.laborLocationLat = this.value.source.latitude;
                this.appProvider.current.laborLocationLng = this.value.source.longitude;
                this.appProvider.current.laborUnit_no = this.value.source.unit_nu;
                this.appProvider.current.laborHours = this.value.hours;
                this.appProvider.current.laborInfo = this.value.info;
                this.nextpage = SelectTimeDatePage;
                if ((this.value.source != null && this.value.date != null)) {
                    this.appProvider.current.date = this.value.date;
                    this.appProvider.current.first_time = this.value.first_time;
                    this.appProvider.current.last_time = this.value.last_time;
                    this.nextpage = YourPricePage;
                    if (this.value.max_price != null) {
                        this.appProvider.current.max_price = this.value.max_price;
                        this.nextpage = true;
                    }
                }
            }
        }
        if (this.appProvider.current.service_id != 7) {
            if (this.appProvider.current.service_name != null) {
                this.nextpage = LocationSelectPage;
            }
            if (this.value.source != null) {
                this.appProvider.current.src_location = this.value.source.id;
                this.appProvider.current.locations = [];
                this.appProvider.current.locations.push({
                    latitude: this.value.source.latitude,
                    curbside: this.value.source.curbside,
                    inhome: this.value.source.inhome,
                    longitude: this.value.source.longitude,
                    loc_no: this.value.source.loc_no,
                    oolaga_id: this.value.source.oolaga_id,
                    location_name: this.value.source.location_name,
                    unit_nu: this.value.source.unit_nu,
                    elevator: this.value.source.elevator,
                    stairs: this.value.source.stairs,
                    ride: this.value.source.ride,
                    parking_info: this.value.source.parking_info
                });
                if (this.value.way_point1 != null) {
                    this.appProvider.current.way_point1 = this.value.way_point1.id;
                    this.appProvider.current.locations.push({
                        latitude: this.value.way_point1.latitude,
                        curbside: this.value.way_point1.curbside,
                        inhome: this.value.way_point1.inhome,
                        longitude: this.value.way_point1.longitude,
                        loc_no: this.value.way_point1.loc_no,
                        oolaga_id: this.value.way_point1.oolaga_id,
                        location_name: this.value.way_point1.location_name,
                        unit_nu: this.value.way_point1.unit_nu,
                        elevator: this.value.way_point1.elevator,
                        stairs: this.value.way_point1.stairs,
                        ride: this.value.way_point1.ride,
                        parking_info: this.value.way_point1.parking_info
                    });
                    if (this.value.way_point2 != null) {
                        this.appProvider.current.way_point2 = this.value.way_point2.id;
                        this.appProvider.current.locations.push({
                            latitude: this.value.way_point2.latitude,
                            curbside: this.value.way_point2.curbside,
                            inhome: this.value.way_point2.inhome,
                            longitude: this.value.way_point2.longitude,
                            loc_no: this.value.way_point2.loc_no,
                            oolaga_id: this.value.way_point2.oolaga_id,
                            location_name: this.value.way_point2.location_name,
                            unit_nu: this.value.way_point2.unit_nu,
                            elevator: this.value.way_point2.elevator,
                            stairs: this.value.way_point2.stairs,
                            ride: this.value.way_point2.ride,
                            parking_info: this.value.way_point2.parking_info
                        });
                    }
                }
                if (this.value.destination != null) {
                    this.appProvider.current.dst_location = this.value.destination.id;
                    this.appProvider.current.locations.push({
                        latitude: this.value.destination.latitude,
                        inhome: this.value.destination.inhome,
                        curbside: this.value.destination.curbside,
                        longitude: this.value.destination.longitude,
                        loc_no: this.value.destination.loc_no,
                        oolaga_id: this.value.destination.oolaga_id,
                        location_name: this.value.destination.location_name,
                        unit_nu: this.value.destination.unit_nu,
                        elevator: this.value.destination.elevator,
                        stairs: this.value.destination.stairs,
                        ride: this.value.destination.ride,
                        parking_info: this.value.destination.parking_info
                    });
                }
                if (this.appProvider.current.locations[0] != null) {
                    this.nextpage = ItemDetailPage;
                }
            }
            if (this.value.source != null && this.value.oolaga_item[0] != null) {
                this.appProvider.current.items = [];
                for (var i = 0; i < this.value.oolaga_item.length; i++) {
                    var pic = [];
                    pic = [this.value.oolaga_item[i].image1, this.value.oolaga_item[i].image2, this.value.oolaga_item[i].image3, this.value.oolaga_item[i].image4];
                    this.appProvider.current.items.push({
                        item_name: this.value.oolaga_item[i].item_name,
                        quantity: this.value.oolaga_item[i].quantity,
                        oolaga_id: this.value.oolaga_item[i].oolaga_id,
                        item_id: this.value.oolaga_item[i].id,
                        src_item_loc: this.value.oolaga_item[i].src_item_loc,
                        dst_item_loc: this.value.oolaga_item[i].dst_item_loc,
                        information: this.value.oolaga_item[i].information,
                        pics: pic
                    });
                }
                if (this.appProvider.current.items[0] != null) {
                    this.nextpage = SelectTimeDatePage;
                }
            }
            if ((this.value.source != null && this.value.oolaga_item[0] != null && this.value.date != null)) {
                this.appProvider.current.date = this.value.date;
                this.appProvider.current.first_time = this.value.first_time;
                this.appProvider.current.last_time = this.value.last_time;
                this.nextpage = YourPricePage;
                if (this.value.max_price != null) {
                    this.appProvider.current.max_price = this.value.max_price;
                    this.nextpage = true;
                }
            }
        }
    };
    DraftOolagaPage.prototype.ionViewWillUnload = function () {
        this.appProvider.current.enable_draft = false;
        this.appProvider.current.summary_edit_service = false;
        this.appProvider.current.summary_edit_helper = false;
        this.appProvider.current.summary_edit_dateTime = false;
        this.appProvider.current.summary_edit_oolagaType = false;
        this.appProvider.current.summary_edit_item = false;
        this.appProvider.current.summary_edit_location = false;
        this.appProvider.current.summary_edit_price = false;
        this.appProvider.current.draft_edit_price = false;
        this.appProvider.current.draft_edit_labor_location = false;
        this.appProvider.current.Draft_edit_dateTime = false;
        console.log('ionViewWillUnload');
    };
    DraftOolagaPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewdidload draft oolaga');
        this.my = ENV.api;
    };
    DraftOolagaPage.prototype.ionViewWillEnter = function () {
        var val = JSON.parse(localStorage['draftOolaga']);
        this.value = val;
        console.log('ionViewWillEnter', this.value);
        this.loadProvider();
        this.appProvider.current.summary_edit_service = false;
        this.appProvider.current.summary_edit_helper = false;
        this.appProvider.current.summary_edit_dateTime = false;
        this.appProvider.current.summary_edit_oolagaType = false;
        this.appProvider.current.summary_edit_item = false;
        this.appProvider.current.summary_edit_location = false;
        this.appProvider.current.summary_edit_price = false;
        this.appProvider.current.draft_edit_price = false;
        this.appProvider.current.draft_edit_labor_location = false;
        this.appProvider.current.Draft_edit_dateTime = false;
        this.appProvider.consoleData();
        this.appProvider.current.items ? this.calc() : '';
        this.dataLoaded = true;
    };
    DraftOolagaPage.prototype.calc = function () {
        var q = 0;
        for (var i = 0; i < this.appProvider.current.items.length; i++) {
            q = q + parseInt(this.appProvider.current.items[i].quantity);
        }
        this.item_quantity = q;
    };
    DraftOolagaPage.prototype.ionViewDidLeave = function () {
        console.log('leave');
        //this.appProvider.createNew();
    };
    DraftOolagaPage.prototype.edit_Price = function () {
        this.appProvider.current.summary_edit_oolagaType = true;
        this.appProvider.current.draft_edit_price = true;
        this.navCtrl.push(YourPricePage);
    };
    DraftOolagaPage.prototype.edit_Cotegory = function () {
        var _this = this;
        var alert = this.alertCtrl.create({
            message: 'If you edit Category then you have to re-enter all the other information',
            buttons: [{
                    text: 'Cancel',
                    handler: function () {
                    }
                }, {
                    text: 'OK',
                    handler: function () {
                        _this.appProvider.current.summary_edit_service = true;
                        _this.navCtrl.push(CreateolagaPage);
                    }
                }]
        });
        alert.present();
    };
    DraftOolagaPage.prototype.edit_locations = function () {
        this.appProvider.current.summary_edit_location = true;
        if (this.value.service_type != 7) {
            this.navCtrl.push(SummaryEditLocationPage);
        }
        if (this.value.service_type == 7) {
            this.appProvider.current.draft_edit_labor_location = true;
            this.navCtrl.push(LaboronlyPage);
        }
    };
    DraftOolagaPage.prototype.edit_items = function () {
        this.appProvider.current.summary_edit_item = true;
        this.appProvider.current.draft_edit_item = true;
        //this.navCtrl.push(AddeditemsPage);
        this.navCtrl.push(ItemDetailPage);
    };
    // edit_helper(){
    //   this.appProvider.current.summary_edit_helper=true;
    //   this.navCtrl.push(HelperSelectionPage);
    // }
    DraftOolagaPage.prototype.edit_datetime = function () {
        this.appProvider.current.summary_edit_dateTime = true;
        this.appProvider.current.Draft_edit_dateTime = true;
        this.navCtrl.push(SelectTimeDatePage);
    };
    DraftOolagaPage.prototype.edit_type = function () {
        this.appProvider.current.summary_edit_oolagaType = true;
        this.navCtrl.push(YourPricePage);
    };
    DraftOolagaPage.prototype.deleteDraft = function () {
        var _this = this;
        console.log('DeleteEnable');
        var confirm = this.alertCtrl.create({
            title: 'Do you want to delete',
            message: "<ion-icon name=\"ios-arrow-forward\" style=\"color: #999999\"></ion-icon>",
            buttons: [
                {
                    text: 'Yes',
                    handler: function () {
                        var loading = _this.loadingCtrl.create();
                        loading.present();
                        _this.http.get(ENV.api + '/webservicedeleteDraft/' + _this.value.id)
                            .subscribe(function (data) {
                            if (JSON.parse(data['_body']).response) {
                                loading.dismiss();
                                _this.navCtrl.pop();
                                // let alert = this.alertCtrl.create({
                                //     title:'Draft Deleted',
                                //     buttons:[{
                                //       text:'Ok',
                                //       handler:()=>
                                //       {
                                //       }
                                //     }]
                                //   })
                                // alert.present();
                            }
                            else {
                                loading.dismiss();
                                var alert_10 = _this.alertCtrl.create({
                                    title: 'Oops...',
                                    message: 'Something Wrong...',
                                    buttons: [{
                                            text: 'Ok'
                                        }]
                                });
                                alert_10.present();
                            }
                        });
                    },
                },
                {
                    text: 'No',
                    handler: function () {
                    },
                }
            ]
        });
        confirm.present();
    };
    DraftOolagaPage.prototype.submit = function () {
        var _this = this;
        if (this.nextpage == true) {
            // let x :any   = new Date().getFullYear()+'-'+(new Date().getMonth()+1)+'-'+new Date().getDate()+'T'+ new Date().getHours()+':'+ new Date().getMinutes()+':00.000Z'
            var x = new Date().getFullYear() + '-';
            (new Date().getMonth() + 1).toString().length == 1 ? x = x + '0' + (new Date().getMonth() + 1) : x = x + (new Date().getMonth() + 1);
            (new Date().getDate()).toString().length == 1 ? x = x + '-0' + (new Date().getDate()) : x = x + '-' + new Date().getDate();
            (new Date().getHours()).toString().length == 1 ? x = x + 'T0' + (new Date().getHours()) : x = x + 'T' + new Date().getHours();
            (new Date().getMinutes()).toString().length == 1 ? x = x + ':0' + (new Date().getMinutes()) + ':00.000Z' : x = x + ':' + new Date().getMinutes() + ':00.000Z';
            var time = '20' + this.appProvider.current.date.split('-')[2] + '-' + this.appProvider.current.date.split('-')[1] + '-' + this.appProvider.current.date.split('-')[0];
            var y = time + 'T' + this.appProvider.current.first_time + ':00.000Z';
            var a = Date.parse(x); //+24*60*60*1000;
            var b = Date.parse(y);
            console.log(b > a);
            if (b > a) {
                var alert_11 = this.alertCtrl.create({
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
                                var value = JSON.stringify({
                                    oolaga_id: _this.appProvider.current.oolaga_id,
                                    cost: _this.appProvider.current.max_price,
                                });
                                _this.http.post(ENV.api + '/webservicecompleteOolaga', value).subscribe(function (data) {
                                    if (data.json().response == true) {
                                        loader.dismiss();
                                        _this.navCtrl.popToRoot();
                                    }
                                    else if (data.json().response == false) {
                                        loader.dismiss();
                                        var a_1 = _this.alertCtrl.create({
                                            title: 'oops..',
                                            message: 'Something wrong...',
                                            buttons: ['Ok']
                                        });
                                        a_1.present();
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
                alert_11.present();
            }
            else {
                var alert_12 = this.alertCtrl.create({
                    message: 'Please update Date & Time',
                    buttons: ['OK']
                });
                alert_12.present();
            }
        }
        else {
            this.navCtrl.push(this.nextpage, {});
        }
    };
    DraftOolagaPage.prototype.remove_pic = function (itemId, index) {
        var _this = this;
        // alert(itemId);
        // alert(index);
        var data = {
            item_id: itemId,
            index: index
        };
        console.log('DeleteEnable');
        var confirm = this.alertCtrl.create({
            title: 'Do you want to remove this image',
            message: "<ion-icon name=\"ios-arrow-forward\" style=\"color: #999999\"></ion-icon>",
            buttons: [
                {
                    text: 'Yes',
                    handler: function () {
                        var loading = _this.loadingCtrl.create();
                        loading.present();
                        _this.http.post(ENV.api + '/deleteImage', data)
                            .subscribe(function (data) {
                            if (JSON.parse(data['_body']).response) {
                                loading.dismiss();
                                _this.appProvider.current.items[_this.selected_item].pics[index] = 'no_image.jpg';
                            }
                            else {
                                loading.dismiss();
                                var alert_13 = _this.alertCtrl.create({
                                    title: 'Oops...',
                                    message: 'Something Wrong...',
                                    buttons: [{
                                            text: 'Ok'
                                        }]
                                });
                                alert_13.present();
                            }
                        });
                    },
                },
                {
                    text: 'No',
                    handler: function () {
                    },
                }
            ]
        });
        confirm.present();
    };
    DraftOolagaPage.prototype.upload_pic = function (value, index, itemId) {
        var _this = this;
        if (value == 0) {
            Camera.getPicture({
                quality: 75,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.CAMERA,
                encodingType: 0,
                correctOrientation: true,
                targetHeight: 300,
                targetWidth: 300,
                saveToPhotoAlbum: false,
            }).then(function (imageData) {
                //   this.pic1[this.image_number]="data:image/jpeg;base64," + imageData;
                //   this.image_number++
                // this.pic = "data:image/jpeg;base64," + imageData;
                // this.pic_exist=true;
                alert(imageData);
                _this.appProvider.current.items[_this.selected_item].pics[index] = "data:image/jpeg;base64," + imageData;
                var loading = _this.loadingCtrl.create();
                loading.present();
                var data = {
                    item_id: itemId,
                    index: index + 1,
                    image: "data:image/jpeg;base64," + imageData
                };
                _this.http.post(ENV.api + '/addItemImage', data)
                    .subscribe(function (data) {
                    if (JSON.parse(data['_body']).response) {
                        loading.dismiss();
                        alert(JSON.stringify(data));
                        _this.appProvider.current.items[_this.selected_item].pics[index] = "data:image/jpeg;base64," + imageData;
                    }
                    else {
                        loading.dismiss();
                        var alert_14 = _this.alertCtrl.create({
                            title: 'Oops...',
                            message: 'Something Wrong...',
                            buttons: [{
                                    text: 'Ok'
                                }]
                        });
                        alert_14.present();
                    }
                }, function (err) {
                    // alert(err);
                    // alert(JSON.stringify(err));
                });
            }, function (err) {
                // alert(err);
                // alert(JSON.stringify(err));
            });
        }
        else if (value == 1) {
            Camera.getPicture({
                quality: 75,
                destinationType: Camera.DestinationType.DATA_URL,
                sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
                encodingType: Camera.EncodingType.JPEG,
                targetHeight: 500,
                targetWidth: 500,
                saveToPhotoAlbum: false
            }).then(function (imageData) {
                alert(imageData);
                _this.appProvider.current.items[_this.selected_item].pics[index] = "data:image/jpeg;base64," + imageData;
                var loading = _this.loadingCtrl.create();
                loading.present();
                var data = {
                    item_id: itemId,
                    index: index + 1,
                    image: "data:image/jpeg;base64," + imageData
                };
                _this.http.post(ENV.api + '/addItemImage', data)
                    .subscribe(function (data) {
                    if (JSON.parse(data['_body']).response) {
                        loading.dismiss();
                        _this.appProvider.current.items[_this.selected_item].pics[index] = "data:image/jpeg;base64," + imageData;
                    }
                    else {
                        loading.dismiss();
                        var alert_15 = _this.alertCtrl.create({
                            title: 'Oops...',
                            message: 'Something Wrong...',
                            buttons: [{
                                    text: 'Ok'
                                }]
                        });
                        alert_15.present();
                    }
                }, function (err) {
                    // alert(err);
                    // alert(JSON.stringify(err));
                });
            }, function (err) {
                // alert(err);
                // alert(JSON.stringify(err));
            });
        }
    };
    DraftOolagaPage.prototype.getImage = function (image) {
        if (image.indexOf('base64') == -1) {
            return this.my + '/public/frontend/img/addImage/' + image;
        }
        else {
            return image;
        }
    };
    DraftOolagaPage = __decorate([
        Component({
            selector: 'page-draft-oolaga',
            templateUrl: 'draft-oolaga.html'
        }),
        __metadata("design:paramtypes", [Http, AppProvider, LoadingController, AlertController, NavController, NavParams])
    ], DraftOolagaPage);
    return DraftOolagaPage;
}());
export { DraftOolagaPage };
//# sourceMappingURL=draft-oolaga.js.map