var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { SummaryPage } from '../summary/summary';
import { ENV } from '../../app/env';
import { AppProvider } from '../../providers/app-provider';
var YourPricePage = /** @class */ (function () {
    function YourPricePage(element, appProvider, alertCtrl, http, navCtrl, navParams, loadingCtrl) {
        this.element = element;
        this.appProvider = appProvider;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.loadingCtrl = loadingCtrl;
        this.selection1 = true;
        this.selection2 = false;
        this.selection = false;
        this.value = ' ';
        this._price = '$';
        this._1price = '$00';
        this._2price = '$00';
        this.price = 0;
        this.val1 = null;
        this.val2 = null;
        this.val3 = null;
        this.val4 = null;
        this.p = '0';
        this.data = {};
        this.http = http;
        // localStorage['curbside']='Standard';
        // this.appProvider.current.oolagaType ? this.selectedtype() : this.selectcard(1);
        //this.load_locations()
    }
    YourPricePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        // console.log(this.price_input)
        this.price_input.writeValue('$');
        setTimeout(function () {
            _this.price_input.setFocus();
        }, 1500);
        console.log('YourPricePage');
    };
    YourPricePage.prototype.checkinput = function (value1, value2, val) {
        if (val == null || val.length == 0) {
            value2.setFocus();
        }
        else {
            value1.setFocus();
        }
    };
    YourPricePage.prototype.check = function (value) {
        // if(!isNaN(parseInt(value[0]))){
        // 	value='$' + value[0]
        // }
        value[0] != '$' ? value = '$' : value;
        if (value.length > 5 || isNaN(parseInt(value[value.length - 1]))) {
            value = value.slice(0, -1);
        }
        if (value.length == 0) {
            value = '$';
        }
        return value;
    };
    YourPricePage.prototype.onBlur = function (value, event) {
        value == '$' ? value = '$' : value;
        value[0] != '$' ? value = '$' + value : value;
        value.length == 2 ? this.p = value[1] : '';
        value.length == 3 ? this.p = value[1] + value[2] : '';
        value.length == 4 ? this.p = value[1] + value[2] + value[3] : '';
        value.length == 5 ? this.p = value[1] + value[2] + value[3] + value[4] : '';
        return value;
        // 	if(event=='p'){
        // 	}
        // 	else if(event==1) {
        // console.log(event)
        // this._1price=='$'?this._1price='$00':this._1price;
        // 	  	this._1price[0]!='$'?this._1price='$'+this._1price:this._1price;
        // 	  	// this._1price.length==2?( ):;
        // 	  	if(this._1price.length==2){
        // 	  		this._1price=this._1price[0]+'0'+this._1price[1];
        // 	  	}
        // 	}
        // 	else if(event==2){
        // console.log(event)
        // this._2price=='$'?this._2price='$00':this._2price;
        // 	  	this._2price[0]!='$'?this._2price='$'+this._2price:this._2price;
        // 	  	// this._2price.length==2?( ):;
        // 	  	if(this._2price.length==2){
        // 	  		this._2price=this._2price[0]+'0'+this._2price[1];
        // 	  	}
        // 	}
    };
    YourPricePage.prototype.onFocus = function (value, event) {
        if (event == 'p') {
            this._price == '$' ? this._price = '$' : this._price;
            this._1price = '$00';
            this._2price = '$00';
            this.price = 0;
        }
        else if (event == 1) {
            this._1price == '$' ? this._1price = '$' : this._1price;
            this._price = '$00';
            this.price = 1;
        }
        else if (event == 2) {
            this._2price == '$' ? this._2price = '$' : this._2price;
            this._price = '$00';
            this.price = 1;
        }
    };
    // selectedtype(){
    // 	this.appProvider.current.oolagaType=='Standard' ? this.selectcard(1) : this.selectcard(2) ;
    // }
    YourPricePage.prototype.gprice = function (value) {
        var loader = this.loadingCtrl.create();
        loader.present();
        if (value == 1) {
            this.appProvider.current.price = 123;
        }
        else if (value == 2) {
            this.appProvider.current.price = 321;
        }
        loader.dismiss();
    };
    // selectcard(value)
    // {	
    // 	if(value==1){
    // 		this.selection1 = true;
    // 		this.selection2 = false;
    // 		localStorage['curbside']='Standard';
    //   			this.appProvider.current.oolagaType='Standard';
    //   			this.appProvider.current.oolagaTypeDiscription='Your Helper will load, transport and place item(s) in theroomof your choice.';
    // 		this.gprice(1)
    // 	}
    // 	if(value==2){
    // 		this.selection2 = true;
    // 		this.selection1 = false;
    // 		localStorage['curbside']='Doorstep';
    //   			this.appProvider.current.oolagaType='Doorstep';
    //   			this.appProvider.current.oolagaTypeDiscription='Your Helper will pic up from your door, and drop off at the door step. You are responsible for getting items inside.';
    // 		this.gprice(2)
    // 	}
    // }
    YourPricePage.prototype.help = function () {
        var alert = this.alertCtrl.create({
            title: 'Budget',
            message: 'This will give the helper an indication of how much you are willing to pay for the move. Keep in mind that Oolaga works on a bidding process and setting your budget too low may lead to helpers not bidding on your move.',
            buttons: ['OK']
        });
        alert.present();
    };
    YourPricePage.prototype.load_locations = function () {
        // let loader = this.loadingCtrl.create({content: "Please wait..."});loader.present();
        // var id=localStorage['oolaga_id']
        // console.log(localStorage['oolaga_id'])
        // this.http.post(ENV.api+'/webservicegetLocation', {olaga_id:id}).subscribe(data => {
        // 	loader.dismiss();
        // 	if(JSON.parse(data._body).response==true){
        // 		console.log(JSON.parse(data._body))
        // 		this.src_location=JSON.parse(data._body).locations[0].id;
        // 		this.dst_location=JSON.parse(data._body).locations[1].id;
        // 	}
        // 	else{
        // 		alert('error')
        // 	}
        // })
    };
    YourPricePage.prototype.submit = function (value) {
        var _this = this;
        console.log(this.p);
        var p;
        p = this.p;
        console.log(p);
        if (value == 0) {
            this.navCtrl.pop();
        }
        else if (value == 1) {
            if (parseInt(p) >= 25) {
                this.appProvider.current.max_price = parseInt(p);
                var loading_1 = this.loadingCtrl.create();
                loading_1.present();
                this.appProvider.current.price = this._price;
                if (this.appProvider.current.summary_edit_oolagaType) {
                    this.http.post(ENV.api + '/webservicehelper_edit', {
                        oolaga_id: this.appProvider.current.oolaga_id,
                        max_price: this.appProvider.current.max_price,
                    })
                        .subscribe(function (data) {
                        console.log(data);
                        if (_this.appProvider.current.draft_edit_price == true) {
                            var a = JSON.parse(localStorage['draftOolaga']);
                            a.max_price = _this.appProvider.current.max_price;
                            localStorage['draftOolaga'] = JSON.stringify(a);
                        }
                        _this.navCtrl.pop();
                        loading_1.dismiss();
                    }, function (err) {
                        alert(JSON.stringify(err));
                        loading_1.dismiss();
                    });
                }
                else {
                    this.http.post(ENV.api + '/webservicehelper_edit', {
                        oolaga_id: this.appProvider.current.oolaga_id,
                        max_price: this.appProvider.current.max_price,
                    })
                        .subscribe(function (data) {
                        console.log(data);
                    }, function (err) {
                        alert(JSON.stringify(err));
                    });
                    setTimeout(function () {
                        loading_1.dismiss();
                        _this.navCtrl.push(SummaryPage, {});
                    }, 3000);
                }
            }
            else {
                var a = this.alertCtrl.create({
                    title: "Price cannot be less than $25",
                    buttons: ['ok']
                });
                a.present();
            }
        }
    };
    __decorate([
        ViewChild('text_center'),
        __metadata("design:type", Object)
    ], YourPricePage.prototype, "textfield", void 0);
    __decorate([
        ViewChild('price_input'),
        __metadata("design:type", Object)
    ], YourPricePage.prototype, "price_input", void 0);
    YourPricePage = __decorate([
        Component({
            selector: 'page-your-price',
            templateUrl: 'your-price.html'
        }),
        __metadata("design:paramtypes", [ElementRef, AppProvider, AlertController, Http, NavController, NavParams, LoadingController])
    ], YourPricePage);
    return YourPricePage;
}());
export { YourPricePage };
//# sourceMappingURL=your-price.js.map