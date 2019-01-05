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
import { Http } from '@angular/http';
import { LoadingController, AlertController } from 'ionic-angular';
import { Validators, FormBuilder } from '@angular/forms';
import { ENV } from '../../app/env';
var ContactusPage = /** @class */ (function () {
    function ContactusPage(formBuilder, alertCtrl, loadCtrl, http, navCtrl, navParams) {
        this.formBuilder = formBuilder;
        this.alertCtrl = alertCtrl;
        this.loadCtrl = loadCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.http = http;
        this.link = ENV.api + '/webservicecontactUs';
        var emailRegex = '^[a-zA-Z0-9]+(\.[_a-z0-9]+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{1,15})$';
        this.contactus = formBuilder.group({
            email: ['', Validators.compose([Validators.required, Validators.pattern(emailRegex)])],
            phone: ['', Validators.compose([Validators.minLength(10), Validators.pattern('[0-9]*'), Validators.required])],
            name: ['', Validators.compose([Validators.minLength(3), Validators.pattern('[a-zA-z]*'), Validators.required])],
            description: ['']
        });
    }
    ContactusPage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad ContactusPage');
    };
    ContactusPage.prototype.contect = function () {
        var _this = this;
        if (this.contactus.valid) {
            console.log('valid', this.contactus.valid);
            var loading_1 = this.loadCtrl.create();
            loading_1.present();
            var data = JSON.stringify({
                name: this.contactus.controls["name"].value,
                email: this.contactus.controls["email"].value,
                phone: this.contactus.controls["phone"].value,
                description: this.contactus.controls["description"].value
            });
            this.http.post(this.link, data).subscribe(function (data) {
                console.log(JSON.parse(data._body));
                if (JSON.parse(data._body).response == true) {
                    _this.name = '';
                    _this.email = '';
                    _this.phone = '';
                    _this.description = '';
                    loading_1.dismiss().then(function () {
                        _this.alertError(JSON.parse(data._body).message);
                    });
                }
                else {
                    loading_1.dismiss().then(function () {
                        _this.alertError(JSON.parse(data._body).message);
                    });
                }
            });
        }
        else {
        }
    };
    ContactusPage.prototype.alertError = function (value) {
        var alert = this.alertCtrl.create({
            title: value,
            buttons: [{
                    text: 'Ok'
                }]
        });
        alert.present();
    };
    ContactusPage = __decorate([
        Component({
            selector: 'page-contactus',
            templateUrl: 'contactus.html'
        }),
        __metadata("design:paramtypes", [FormBuilder,
            AlertController,
            LoadingController, Http,
            NavController,
            NavParams])
    ], ContactusPage);
    return ContactusPage;
}());
export { ContactusPage };
//# sourceMappingURL=contactus.js.map