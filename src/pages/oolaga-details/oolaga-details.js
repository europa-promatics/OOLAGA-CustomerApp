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
var OolagaDetailsPage = /** @class */ (function () {
    function OolagaDetailsPage(navCtrl, navParams) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.wypt = [];
        this.selection = "detail";
        this.d = this.navParams.get('data');
        console.log(this.d);
    }
    OolagaDetailsPage.prototype.loadmap = function (value) {
        var _this = this;
        if (value == 'map') {
            setTimeout(function () {
                _this.start = new google.maps.LatLng(_this.d.src_latitude, _this.d.src_longitude);
                _this.end = new google.maps.LatLng(_this.d.dst_latitude, _this.d.dst_longitude);
                var directionsService = new google.maps.DirectionsService;
                var directionsDisplay = new google.maps.DirectionsRenderer;
                var mapel = new google.maps.Map(document.getElementById('map1'), {
                    zoom: 4,
                    disableDefaultUI: true
                });
                directionsDisplay.setMap(mapel);
                directionsService.route({
                    origin: _this.start,
                    destination: _this.end,
                    waypoints: _this.wypt,
                    optimizeWaypoints: true,
                    travelMode: google.maps.DirectionsTravelMode.DRIVING
                }, function (response, status) {
                    if (status === 'OK') {
                        directionsDisplay.setDirections(response);
                    }
                });
            }, 1000);
        }
    };
    OolagaDetailsPage = __decorate([
        Component({
            selector: 'page-oolaga-details',
            templateUrl: 'oolaga-details.html'
        }),
        __metadata("design:paramtypes", [NavController, NavParams])
    ], OolagaDetailsPage);
    return OolagaDetailsPage;
}());
export { OolagaDetailsPage };
//# sourceMappingURL=oolaga-details.js.map