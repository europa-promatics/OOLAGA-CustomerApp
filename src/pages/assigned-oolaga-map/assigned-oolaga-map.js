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
import { Http } from '@angular/http';
import { NavController, NavParams, AlertController } from 'ionic-angular';
import { ENV } from '../../app/env';
import { ChatPage } from '../chat/chat';
var AssignedOolagaMapPage = /** @class */ (function () {
    function AssignedOolagaMapPage(alertCtrl, navCtrl, http, navParams) {
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.http = http;
        this.navParams = navParams;
        this.markers = [];
        this.status = false;
        this.refresh_status = true;
        this.markers = [];
    }
    AssignedOolagaMapPage.prototype.getHelperLocation = function () {
        var _this = this;
        console.log('hello');
        // this.markers[0]=marker;
        // http://gagandeepsethi.com/oolaga/track_helper
        this.http.post(ENV.api + '/track_helper', { user_id: this.data.helper_id })
            .subscribe(function (data) {
            if (data.json().response) {
                _this.helper_lat = data.json().data.latitude;
                _this.helper_long = data.json().data.longitude;
                // if(status){
                //   this.helper.setMap(null);
                // }
                console.log(_this.helper_lat);
                console.log(_this.helper_long);
                var pin = new google.maps.LatLng(_this.data.src_latitude, _this.data.src_longitude);
                var icon1 = {
                    url: 'assets/icon/pin-1.png',
                    scaledSize: new google.maps.Size(33, 46),
                };
                var marker = new google.maps.Marker({
                    icon: icon1,
                    position: pin
                });
                _this.markers[0] = marker;
                var pin2 = new google.maps.LatLng(_this.data.dst_latitude, _this.data.dst_longitude);
                var icon2 = {
                    url: 'assets/icon/pin-2.png',
                    scaledSize: new google.maps.Size(33, 46),
                };
                var marker2 = new google.maps.Marker({
                    icon: icon2,
                    position: pin2
                });
                _this.markers[1] = marker2;
                if (_this.status == false) {
                    var pin = new google.maps.LatLng(_this.helper_lat, _this.helper_long);
                    var icon1 = {
                        url: 'img/delivery-truck.png',
                        scaledSize: new google.maps.Size(33, 33),
                    };
                    var marker3 = new google.maps.Marker({
                        position: pin,
                        icon: icon1,
                    });
                    _this.markers[2] = marker3;
                }
                // marker2.setMap(this.map);
                _this.refresh();
                _this.status = true;
            }
            else {
                var confirm_1 = _this.alertCtrl.create({
                    title: 'Helper location not available',
                    buttons: ['OK']
                });
                confirm_1.present();
                clearInterval(_this.track);
                confirm_1.onDidDismiss(function () {
                    _this.navCtrl.pop();
                });
            }
        }, function (err) {
            console.log(err.json());
        });
    };
    AssignedOolagaMapPage.prototype.refresh = function () {
        console.log(this.status);
        if (this.status) {
            // for (var i = 0; i < this.markers.length; i++) {
            var myLatlng = new google.maps.LatLng(this.helper_lat, this.helper_long);
            this.markers[2].setPosition(myLatlng);
            // }
        }
        for (var i = 0; i < this.markers.length; i++) {
            this.markers[i].setMap(this.map);
        }
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < this.markers.length; i++) {
            bounds.extend(this.markers[i].getPosition());
        }
        if (this.refresh_status) {
            this.map.setCenter(bounds.getCenter());
            this.map.fitBounds(bounds);
        }
        this.refresh_status = false;
    };
    AssignedOolagaMapPage.prototype.openChat = function (value, image, name) {
        console.log(value);
        this.navCtrl.push(ChatPage, { receiver_id: value, image: image, name: name });
    };
    AssignedOolagaMapPage.prototype.ionViewDidLeave = function () {
        clearInterval(this.track);
    };
    AssignedOolagaMapPage.prototype.ionViewWillLoad = function () {
    };
    AssignedOolagaMapPage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.data = this.navParams.get('data');
        // console.log(this.data)
        // this.http.get('https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins='+this.data.src_latitude+','+this.data.src_longitude+'&destinations='+this.data.dst_latitude+','+this.data.dst_longitude+'&key=AIzaSyAI2_gJfnHQ8ztCJ8omA-YrefkddT7y5TI')
        // .subscribe(data=>{
        //    let a = data.json()
        //    this.duration=a.rows[0].elements[0].duration.text
        //  },err=>{
        //    // alert('Something wrong...')
        //  })
        var mapp = document.getElementById('assignedMap');
        this.map = new google.maps.Map(mapp, {
            center: { lat: 37.09024, lng: -95.712891 },
            zoom: 2,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            disableDefaultUI: true
        });
        google.maps.event.addListenerOnce(this.map, 'idle', function () {
            mapp.classList.add('show-map');
            google.maps.event.trigger(mapp, 'resize');
        });
        this.getHelperLocation();
        this.track = setInterval(function () {
            _this.getHelperLocation();
        }, 5000);
        // console.log(this.markers.length)
        // for (var i = 0; i < this.markers.length; i++) {
        //       this.markers[i].setMap(this.map);
        //     }
        //   var bounds = new google.maps.LatLngBounds();
        //   // bounds.extend(new google.maps.LatLng(this.data.src_latitude,this.data.src_longitude))
        //     for(var i=0;i<this.markers.length;i++) {
        //        bounds.extend(this.markers[i].getPosition());
        //     }
        // console.log('data',bounds.getCenter(),bounds)
        // var m = new google.maps.Marker({
        //   icon:{
        //     url: 'img/delivery-truck.png', // url
        //     scaledSize: new google.maps.Size(30, 30), // scaled size
        //   },
        //   position:bounds.getCenter()
        // })
        // m.setMap(this.map);
        // this.map.setCenter(bounds.getCenter());
        // this.map.fitBounds(bounds);
    };
    AssignedOolagaMapPage = __decorate([
        Component({
            selector: 'page-assigned-oolaga-map',
            templateUrl: 'assigned-oolaga-map.html'
        }),
        __metadata("design:paramtypes", [AlertController, NavController, Http, NavParams])
    ], AssignedOolagaMapPage);
    return AssignedOolagaMapPage;
}());
export { AssignedOolagaMapPage };
//# sourceMappingURL=assigned-oolaga-map.js.map