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
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Camera } from 'ionic-native';
//-------------pages-------------------
import { AddeditemsPage } from '../addeditems/addeditems';
import { ENV } from '../../app/env';
//------------provider-------------------
import { AppProvider } from '../../providers/app-provider';
var ItemDetailPage = /** @class */ (function () {
    function ItemDetailPage(appProvider, loadingCtrl, alertCtrl, http, navCtrl, navParams) {
        this.appProvider = appProvider;
        this.loadingCtrl = loadingCtrl;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.image_number = 0;
        this.pic_exist = false;
        this.item_name = '';
        this.item_quantity = 1;
        this.item_info = '';
        this.items_quantity = 0;
        this.added_item = true;
        this.pic = "img/man.png";
        this.pic_exist = false;
        this.items = [];
        this.item = [];
        this.pic1 = [];
        this.http = http;
        this.src_location;
        this.itemlist = [];
        this.suggestions = [];
    }
    ItemDetailPage.prototype.itemList = function () {
        console.log('item list');
        if (this.items[0] == null) {
            var alert_1 = this.alertCtrl.create({
                title: 'Add Item!',
                buttons: ['OK']
            });
            alert_1.present();
        }
        else {
            localStorage['items'] = JSON.stringify(this.items);
            // console.log(JSON.parse(localStorage['items']));
            this.navCtrl.push(AddeditemsPage, {});
        }
    };
    ItemDetailPage.prototype.help = function () {
        var alert = this.alertCtrl.create({
            title: 'Add items',
            message: 'Here you tell us about the items you need moved.  Press the "+" sign and tell us the type of item, quantity, take pictures and give any additional information you deem relevant to ensure your helper is well prepared',
            buttons: ['OK']
        });
        alert.present();
    };
    ItemDetailPage.prototype.ionViewDidEnter = function () {
        var _this = this;
        this.items_quantity = 0;
        this.http.get(ENV.api + '/webservicesuggetionItem/' + localStorage['service_type']).subscribe(function (data) {
            _this.suggestions = JSON.parse(data._body);
        });
        this.locations = this.appProvider.current.locations;
        this.dst_item_loc = this.appProvider.current.dst_location;
        this.src_item_loc = this.appProvider.current.src_location;
        if (this.items[0] != null || this.appProvider.current.edit_item_data || this.appProvider.current.summary_edit_item) {
            this.items = this.appProvider.current.items;
            console.log(this.items.length);
            for (var i = 0; i < this.items.length; i++) {
                console.log(this.items[i].quantity);
                // this.items_quantity=this.items_quantity+this.items[i].quantity;
                this.items_quantity += parseInt(this.appProvider.current.items[i].quantity);
            }
        }
        // if(this.appProvider.current.summary_edit_item){
        //   this.items=this.appProvider.current.items
        //   console.log(this.items.length);
        //   for(var i=0;i<this.items.length;i++){
        //     console.log(this.items[i].quantity);
        //   }
        // }
    };
    ItemDetailPage.prototype.updateSearch = function () {
        console.log(this.item_name);
        if (this.item_name == '') {
            this.itemlist = [];
            return;
        }
        var ev = this.item_name;
        if (ev && ev.trim() != '') {
            this.itemlist = this.suggestions.filter(function (value) {
                return (value.suggestion.toUpperCase().indexOf(ev.toUpperCase()) > -1);
            });
        }
        else {
            this.itemlist = [];
        }
        console.log(this.itemlist);
    };
    ItemDetailPage.prototype.chooseItem = function (value) {
        this.item_name = value;
        this.itemlist = [];
    };
    ItemDetailPage.prototype.remove_pic = function (value) {
        var p = [];
        for (var i = 0; i < this.pic1.length; i++) {
            if (i == value) {
                //alert('yes')
                this.image_number--;
            }
            else {
                p.push(this.pic1[i]);
            }
        }
        this.pic1 = p;
    };
    ItemDetailPage.prototype.toggle_added_item = function () {
        this.added_item = false;
    };
    ItemDetailPage.prototype.add = function () {
        this.item_quantity++;
    };
    ItemDetailPage.prototype.remove = function () {
        if (this.item_quantity == 1) {
        }
        else {
            this.item_quantity--;
        }
    };
    ItemDetailPage.prototype.delete_item = function (id) {
        var _this = this;
        var link = ENV.api + '/webservicedeleteItem';
        this.http.post(link, { item_id: id }).subscribe(function (data) {
            console.log(JSON.parse(data._body));
            if (JSON.parse(data._body).response == true) {
                _this.remove_item(id);
            }
            else { }
        });
    };
    ItemDetailPage.prototype.remove_item = function (value) {
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].item_id == value) {
                this.items.splice(i, 1);
            }
        }
    };
    ItemDetailPage.prototype.additems = function () {
        var _this = this;
        if (this.item_name == null || this.item_name == '' || this.item_name == ' ') {
            var alert_2 = this.alertCtrl.create({
                title: 'Oops...',
                subTitle: 'Please enter item details...',
                buttons: ['OK']
            });
            alert_2.present();
        }
        else {
            var loader_1 = this.loadingCtrl.create();
            loader_1.present();
            var data = JSON.stringify({
                item_name: this.item_name,
                quantity: this.item_quantity,
                information: this.item_info,
                oolaga_id: this.appProvider.current.oolaga_id,
                src_item_loc: this.src_item_loc,
                dst_item_loc: this.dst_item_loc,
                pics: this.pic1
            });
            this.http.post(ENV.api + "/webserviceaddItem", data).subscribe(function (data) {
                console.log(JSON.parse(data._body));
                if (JSON.parse(data._body).response == true) {
                    console.log(JSON.parse(data._body).item_id);
                    _this.items.push({
                        item_name: _this.item_name,
                        quantity: _this.item_quantity,
                        information: _this.item_info,
                        oolaga_id: _this.appProvider.current.oolaga_id,
                        item_id: JSON.parse(data._body).item_id,
                        src_item_loc: _this.src_item_loc,
                        dst_item_loc: _this.dst_item_loc,
                        pics: _this.pic1
                    });
                    _this.appProvider.current.items = _this.items;
                    console.log(_this.appProvider.current.items);
                    _this.items_quantity = _this.items_quantity + _this.item_quantity;
                    _this.appProvider.current.edit_item_data = true;
                    if (_this.pic != "img/man.png") {
                    }
                    else { }
                    _this.item_name = '';
                    _this.item_quantity = 1;
                    _this.item_info = '';
                    _this.pic1 = [];
                    _this.image_number = 0;
                    if (_this.locations.length > 2) {
                        _this.src_item_loc = null;
                    }
                    loader_1.dismiss();
                    var alt = _this.alertCtrl.create({
                        title: 'Item Added',
                        buttons: ['OK']
                    });
                    alt.present();
                }
                else {
                    alert('error');
                }
            });
        }
    };
    ItemDetailPage.prototype.uploadpic = function (id) {
        var options;
        options = { fileKey: "image", chunkedMode: false, mimeType: "image/jpg" };
        this.http.post(ENV.api + "/webserviceoolagaImage/" + id, { image: this.pic1[0] }).subscribe(function (data) {
            console.log(JSON.parse(data._body));
        });
    };
    ItemDetailPage.prototype.upload_pic = function (value) {
        var _this = this;
        if (this.image_number < 4) {
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
                    _this.pic1[_this.image_number] = "data:image/jpeg;base64," + imageData;
                    _this.image_number++;
                    _this.pic = "data:image/jpeg;base64," + imageData;
                    _this.pic_exist = true;
                }, function (err) { });
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
                    _this.pic1[_this.image_number] = "data:image/jpeg;base64," + imageData;
                    _this.image_number++;
                    _this.pic = "data:image/jpeg;base64," + imageData;
                    _this.pic_exist = true;
                }, function (err) { });
            }
        }
    };
    ItemDetailPage.prototype.submit = function (value) {
        if (value == 0) {
            this.navCtrl.pop();
        }
        else if (value == 1) {
            // console.log(this.appProvider.current.items)
            if (this.items[0] == null) {
                var alert_3 = this.alertCtrl.create({
                    title: 'Add Item!',
                    buttons: ['OK']
                });
                alert_3.present();
            }
            else if (this.appProvider.current.summary_edit_item == true) {
                if (this.appProvider.current.draft_edit_item) {
                    console.log('draft', JSON.parse(localStorage['draftOolaga']));
                    var a = JSON.parse(localStorage['draftOolaga']);
                    a.oolaga_item = [];
                    for (var i = 0; i < this.items.length; i++) {
                        if (this.items[i].pics.length == 0) {
                            this.items[i].pics = ["no_image.jpg", "no_image.jpg", "no_image.jpg", "no_image.jpg"];
                        }
                        else if (this.items[i].pics.length == 1) {
                            this.items[i].pics = [this.items[i].pics[0], "no_image.jpg", "no_image.jpg", "no_image.jpg"];
                        }
                        else if (this.items[i].pics.length == 2) {
                            this.items[i].pics = [this.items[i].pics[0], this.items[i].pics[1], "no_image.jpg", "no_image.jpg"];
                        }
                        else if (this.items[i].pics.length == 3) {
                            this.items[i].pics = [this.items[i].pics[0], this.items[i].pics[1], this.items[i].pics[2], "no_image.jpg"];
                        }
                        a.oolaga_item.push({
                            dst_item_loc: this.items[i].dst_item_loc,
                            id: this.items[i].item_id,
                            information: this.items[i].information,
                            item_name: this.items[i].item_name,
                            oolaga_id: this.items[i].oolaga_id,
                            quantity: this.items[i].quantity,
                            src_item_loc: this.items[i].src_item_loc,
                            image1: this.items[i].pics[0],
                            image2: this.items[i].pics[1],
                            image3: this.items[i].pics[2],
                            image4: this.items[i].pics[3]
                        });
                    }
                    console.log(a.oolaga_item);
                    console.log(this.items[0]);
                    localStorage['draftOolaga'] = JSON.stringify(a);
                }
                this.navCtrl.pop();
            }
            else {
                localStorage['items'] = JSON.stringify(this.items);
                localStorage['itemimages'] = this.pic1;
                // console.log(JSON.parse(localStorage['items']));
                this.navCtrl.push(AddeditemsPage, {});
            }
        }
    };
    ItemDetailPage = __decorate([
        Component({
            selector: 'page-item-detail',
            templateUrl: 'item-detail.html'
        }),
        __metadata("design:paramtypes", [AppProvider, LoadingController, AlertController, Http, NavController, NavParams])
    ], ItemDetailPage);
    return ItemDetailPage;
}());
export { ItemDetailPage };
//# sourceMappingURL=item-detail.js.map