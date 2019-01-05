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
import { NavController, NavParams, ViewController } from 'ionic-angular';
import { AppProvider } from '../../providers/app-provider';
var PoptimePage = /** @class */ (function () {
    function PoptimePage(appProvider, viewCtrl, navCtrl, navParams) {
        this.appProvider = appProvider;
        this.viewCtrl = viewCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.hh = 1;
        this.mm = 0;
        this.am_pm = false;
    }
    PoptimePage.prototype.ionViewDidLoad = function () {
        console.log('ionViewDidLoad PoptimePage');
    };
    PoptimePage.prototype.ionViewWillLeave = function () {
        // console.log('jj')
        // this.viewCtrl.dismiss('hello')
        //this.appProvider.current.first_time = this.hh + ':' + this.mm + ' ' + am_pm
        var am_pm;
        this.am_pm ? am_pm = 'PM' : am_pm = 'AM';
        if (this.hh < 10) {
            this.appProvider.current.firstAvailableTime = '0' + this.hh + ':';
        }
        else {
            this.appProvider.current.firstAvailableTime = this.hh + ':';
        }
        if (this.mm < 10) {
            this.appProvider.current.firstAvailableTime += '0' + this.mm + ' ' + am_pm;
        }
        else {
            this.appProvider.current.firstAvailableTime += this.mm + ' ' + am_pm;
        } //alert(this.appProvider.current.firstAvailableTime);
    };
    PoptimePage.prototype.up = function (a, value) {
        if (value) {
            if (a == 55) {
                a = 0;
            }
            else {
                a += 5;
            }
            return a;
        }
        else if (!value) {
            if (a == 12) {
                a = 1;
            }
            else {
                a++;
            }
            return a;
        }
    };
    PoptimePage.prototype.down = function (a, value) {
        if (value) {
            if (a == 0) {
                a = 55;
            }
            else {
                a -= 5;
            }
            return a;
        }
        else if (!value) {
            if (a == 1) {
                a = 12;
            }
            else {
                a--;
            }
            return a;
        }
    };
    PoptimePage = __decorate([
        Component({
            selector: 'page-poptime',
            templateUrl: 'poptime.html'
        }),
        __metadata("design:paramtypes", [AppProvider, ViewController, NavController, NavParams])
    ], PoptimePage);
    return PoptimePage;
}());
export { PoptimePage };
//# sourceMappingURL=poptime.js.map