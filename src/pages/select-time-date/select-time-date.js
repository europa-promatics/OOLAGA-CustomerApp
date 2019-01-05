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
import { NavController, NavParams, ModalController, AlertController, LoadingController, PopoverController } from 'ionic-angular';
import { YourPricePage } from '../your-price/your-price';
import { PoptimePage } from '../poptime/poptime';
import { AppProvider } from '../../providers/app-provider';
import { ENV } from '../../app/env';
import { Http } from '@angular/http';
var SelectTimeDatePage = /** @class */ (function () {
    function SelectTimeDatePage(popoverCtrl, loadingCtrl, http, appProvider, alertCtrl, modalCtrl, navCtrl, navParams) {
        this.popoverCtrl = popoverCtrl;
        this.loadingCtrl = loadingCtrl;
        this.appProvider = appProvider;
        this.alertCtrl = alertCtrl;
        this.modalCtrl = modalCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.enabletimediv = false;
        this.count = 0;
        this.showlast = false;
        this.enablenext = true;
        this.enable = false;
        this.firsttime = null;
        this.lasttime = null;
        this.calendarEvent = {};
        this.attendees = [{ email: "" }];
        this.validation = {};
        this.calendar = { mode: 'month', currentDate: new Date() };
        this.am_pm = false;
        this.mm = 0;
        this.hh = 0;
        this.ondivclick = false;
        this.markDisabled = function (date) {
            var current = new Date();
            current.setHours(0, 0, 0);
            return date < current;
        };
        this.http = http;
    }
    ;
    SelectTimeDatePage.prototype.ionViewDidLoad = function () {
        var today = new Date();
        this.yyyy = today.getFullYear();
        this.myDate = new Date().toISOString().substring(0, 10);
        this.appProvider.current.firstAvailableTime ? this.firsttime = this.appProvider.current.firstAvailableTime : this.firsttime = 'SELECT A TIME';
        this.appProvider.current.lastAvailableTime ? this.lasttime = this.appProvider.current.lastAvailableTime : this.lasttime = 'SELECT A TIME';
        this.appProvider.current.lastAvailableTime ? this.showlast = true : this.showlast = false;
        var someday = new Date();
        var a = someday.getDate().toString().length == 1 ? '0' + someday.getDate().toString() : someday.getDate().toString();
        var b = (someday.getMonth() + 1).toString();
        b = b.length == 1 ? '0' + b : b;
        console.log(a + '-' + b + '-' + someday.getFullYear().toString().substr(-2));
        this.appProvider.current.date = a + '-' + b + '-' + someday.getFullYear().toString().substr(-2);
    };
    SelectTimeDatePage.prototype.checktime = function (value) {
        // alert(this.firsttime)
        if (this.lasttime == null || this.lasttime == "Select A Time" || this.lasttime == "SELECT A TIME") {
            this.enable = true;
        }
        else {
            var a = this.firsttime.split(':');
            var b = this.lasttime.split(':');
            if (parseInt(a[0]) * 60 + parseInt(a[1]) < parseInt(b[0]) * 60 + parseInt(b[1])) {
                this.enable = true;
            }
            else {
                var alert_1 = this.alertCtrl.create({
                    subTitle: 'Last available start time should not be less then First time',
                    buttons: ['Ok']
                });
                alert_1.present();
                this.enable = false;
            }
        }
    };
    SelectTimeDatePage.prototype.help = function () {
        var alert = this.alertCtrl.create({
            title: 'Date & Time',
            message: 'Tell us when you would like to schedule the move.  You can provide a wider time frame by pressing "I am flexible".',
            buttons: ['OK']
        });
        alert.present();
    };
    SelectTimeDatePage.prototype.flexable = function () {
        this.lasttime = null;
        this.showlast = !this.showlast;
        console.log(this.firsttime, this.lasttime);
        if (this.showlast == false) {
            this.enable = true;
        }
    };
    SelectTimeDatePage.prototype.show_last_time = function (myevent) {
        var _this = this;
        var popover = this.popoverCtrl.create(PoptimePage);
        popover.present({
            ev: myevent
        });
        popover.onDidDismiss(function (data) {
            console.log(data);
            _this.myTime = _this.appProvider.current.firstAvailableTime;
            _this.lasttime = _this.appProvider.current.firstAvailableTime;
            _this.appProvider.current.last_time = _this.appProvider.current.firstAvailableTime;
        });
        //   let timeModal = this.modalCtrl.create(SelectTimePage);
        //   timeModal.onDidDismiss(data => {
        //    this.myTime=data;
        //    this.lasttime=data;
        //    this.appProvider.current.lastAvailableTime=data;
        //    console.log(this.appProvider.current.lastAvailableTime)
        //    });
        //    timeModal.present();
        // // }
        // enabletimedivCheck(){
        //   console.log(this.ondivclick)
        //  if(this.ondivclick && this.popshow=='show'){
        //     if(this.divcount==1 && this.popshow=='show'){
        //       this.enabletimediv=false;
        //       this.count=0;
        //       this.divcount=0
        //       this.popshow='hide';
        //       console.log('iff data 1')
        //     }else{
        //       // this.divcount=0; 
        //       // this.enabletimediv=false;
        //       // this.count=0;
        //        console.log('iff data else')
        //     }
        //  }
        // if(this.divcount==0 && this.popshow=='show'){
        //   // this.ondivclick=false; 
        //    if(this.popshow=='show'){
        //        if(this.count==0 && this.popshow=='show'){
        //          this.enabletimediv=true;
        //          this.count=1;
        //          this.popshow='hide'
        //          console.log(this.count)
        //          console.log('hello if 1')
        //        }
        //        else{
        //           console.log('hello else')
        //           this.popshow='hide'
        //           this.enabletimediv=false;
        //           this.count=0;
        //        }
        //    }else{
        //     this.count=0;
        //     this.popshow='hide'
        //     this.enabletimediv=false;
        //      console.log('hello elswe')
        //    }
        //  }
        // }
        // ondiv(){
        //   console.log('kk')
        //   this.divcount=1;
        //   this.ondivclick=true; 
    };
    SelectTimeDatePage.prototype.show_first_time = function (myevent) {
        var _this = this;
        var popover = this.popoverCtrl.create(PoptimePage);
        popover.present({
            ev: myevent
        });
        popover.onDidDismiss(function (data) {
            console.log(data);
            _this.myTime = _this.appProvider.current.firstAvailableTime;
            _this.firsttime = _this.appProvider.current.firstAvailableTime;
            _this.appProvider.current.first_time = _this.appProvider.current.firstAvailableTime;
        });
        //  if(this.count==0){
        //     //this.enabletimediv=true;
        //     this.popshow='show';
        //     console.log('if')
        //     this.divcount=0;
        //     // this.ondivclick=false;
        //  }
        // //this.count=this.count+1;
        //  //this.enabletimediv=!this.enabletimediv;
        // let timeModal = this.modalCtrl.create(SelectTimePage);
        // timeModal.onDidDismiss(data => {
        //  this.myTime=data;
        //  this.firsttime=data;
        //  this.appProvider.current.firstAvailableTime=data;
        //  console.log(this.appProvider.current.firstAvailableTime)
        //  });
        //  timeModal.present();
    };
    SelectTimeDatePage.prototype.submit = function (value) {
        var _this = this;
        var enable = false;
        console.log(this.firsttime, this.lasttime);
        if (this.firsttime != 'Select A Time' && this.firsttime != 'SELECT A TIME') {
            enable = true;
        }
        this.myTime = this.firsttime;
        this.appProvider.current.first_time = this.firsttime;
        this.appProvider.current.last_time = this.lasttime;
        if (value == 0) {
            this.navCtrl.pop();
        }
        else if (value == 1) {
            var loader_1 = this.loadingCtrl.create();
            if (this.myTime && this.enablenext && this.enable && enable) {
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
                    loader_1.present();
                    // if(this.showlast==true){
                    //   this.appProvider.current.time = this.appProvider.current.firstAvailableTime.start_time + '-' +this.appProvider.current.lastAvailableTime.end_time
                    // }
                    // else if(this.showlast==false){
                    //   this.appProvider.current.time = this.appProvider.current.firstAvailableTime.start_time + '-' + this.appProvider.current.firstAvailableTime.end_time
                    // }
                    // localStorage['date']=this.myDate;
                    // localStorage['time']=this.myTime;
                    if (this.appProvider.current.summary_edit_dateTime) {
                        console.log('updated');
                        this.http.post(ENV.api + '/webservicehelper_edit', {
                            oolaga_id: this.appProvider.current.oolaga_id,
                            date: this.appProvider.current.date,
                            first_time: this.appProvider.current.first_time,
                            last_time: this.appProvider.current.last_time
                        })
                            .subscribe(function (data) {
                            if (_this.appProvider.current.Draft_edit_dateTime) {
                                var a_1 = JSON.parse(localStorage['draftOolaga']);
                                a_1.date = _this.appProvider.current.date;
                                a_1.first_time = _this.appProvider.current.first_time;
                                a_1.last_time = _this.appProvider.current.last_time;
                                localStorage['draftOolaga'] = JSON.stringify(a_1);
                            }
                            _this.navCtrl.pop();
                            loader_1.dismiss();
                        }, function (err) {
                            loader_1.dismiss();
                        });
                    }
                    else {
                        this.http.post(ENV.api + '/webservicehelper_edit', {
                            oolaga_id: this.appProvider.current.oolaga_id,
                            date: this.appProvider.current.date,
                            first_time: this.appProvider.current.first_time,
                            last_time: this.appProvider.current.last_time
                        })
                            .subscribe(function (data) {
                            loader_1.dismiss();
                            _this.navCtrl.push(YourPricePage);
                        }, function (err) {
                            loader_1.dismiss();
                        });
                    }
                }
                else {
                    var alert_2 = this.alertCtrl.create({
                        subTitle: 'Please select future time',
                        buttons: ['Ok']
                    });
                    alert_2.present();
                }
            }
            else {
                var alert_3 = this.alertCtrl.create({
                    subTitle: 'Enter valid Time and Date',
                    buttons: ['Ok']
                });
                alert_3.present();
                //this.navCtrl.push(YourPricePage,{});
            }
        }
    };
    SelectTimeDatePage.prototype.loadEvents = function () {
        this.eventSource = this.createRandomEvents();
    };
    SelectTimeDatePage.prototype.onViewTitleChanged = function (title) {
        this.viewTitle = title;
    };
    SelectTimeDatePage.prototype.onEventSelected = function (event) {
        console.log('Event selected:' + event.startTime + '-' + event.endTime + ',' + event.title);
    };
    SelectTimeDatePage.prototype.changeMode = function (mode) {
        this.calendar.mode = mode;
    };
    SelectTimeDatePage.prototype.today = function () {
        this.appProvider.current.fullDate ? this.calendar.currentDate = this.appProvider.current.fullDate : this.calendar.currentDate = new Date();
    };
    SelectTimeDatePage.prototype.onTimeSelected = function (ev) {
        console.log('Selected time: ' + ev.selectedTime + ', hasEvents: ' +
            (ev.events !== undefined && ev.events.length !== 0) + ', disabled: ' + ev.disabled);
        localStorage['select'] = ev.selectedTime;
        this.SelectedTime = localStorage['select'];
        var text = ev.selectedTime.getDate();
        var today = new Date();
        var someday = new Date();
        someday.setFullYear(ev.selectedTime.getFullYear(), ev.selectedTime.getMonth(), ev.selectedTime.getDate());
        console.log('date' + someday);
        this.appProvider.current.fullDate = someday;
        console.log(ev.selectedTime.getFullYear(), ev.selectedTime.getMonth(), ev.selectedTime.getDate());
        if (someday < today) {
            alert("Please Enter valid Date");
            this.enablenext = false;
        }
        else {
            this.enablenext = true;
        }
        console.log(text);
        var m;
        switch (this.SelectedTime.substring(4, 7)) {
            case "Dec":
                m = '12';
                break;
            case "Nov":
                m = '11';
                break;
            case "Oct":
                m = '10';
                break;
            case "Sep":
                m = '09';
                break;
            case "Aug":
                m = '08';
                break;
            case "Jul":
                m = '07';
                break;
            case "Jun":
                m = '06';
                break;
            case "May":
                m = '05';
                break;
            case "Apr":
                m = '04';
                break;
            case "Mar":
                m = '03';
                break;
            case "Feb":
                m = '02';
                break;
            case "Jan":
                m = '01';
                break;
            default:
                break;
        }
        var date = this.SelectedTime.substring(8, 10) + '-' + m + '-' + this.SelectedTime.substring(11, 15).toString().substr(-2);
        localStorage['select'] = date;
        this.myDate = date;
        console.log(date);
        this.appProvider.current.date = date;
    };
    SelectTimeDatePage.prototype.onCurrentDateChanged = function (event) {
        var today = new Date();
        today.setHours(0, 0, 0, 0);
        event.setHours(0, 0, 0, 0);
        this.isToday = today.getTime() === event.getTime();
    };
    SelectTimeDatePage.prototype.createRandomEvents = function () {
        var events = [];
        for (var i = 0; i < 50; i += 1) {
            var date = new Date();
            var eventType = Math.floor(Math.random() * 2);
            var startDay = Math.floor(Math.random() * 90) - 45;
            var endDay = Math.floor(Math.random() * 2) + startDay;
            var startTime;
            var endTime;
            if (eventType === 0) {
                startTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + startDay));
                if (endDay === startDay) {
                    endDay += 1;
                }
                endTime = new Date(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate() + endDay));
                events.push({
                    title: 'All Day - ' + i,
                    startTime: startTime,
                    endTime: endTime,
                    allDay: true
                });
            }
            else {
                var startMinute = Math.floor(Math.random() * 24 * 60);
                var endMinute = Math.floor(Math.random() * 180) + startMinute;
                startTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + startDay, 0, date.getMinutes() + startMinute);
                endTime = new Date(date.getFullYear(), date.getMonth(), date.getDate() + endDay, 0, date.getMinutes() + endMinute);
                events.push({
                    title: 'Event - ' + i,
                    startTime: startTime,
                    endTime: endTime,
                    allDay: false
                });
            }
        }
        return events;
    };
    SelectTimeDatePage.prototype.onRangeChanged = function (ev) {
        console.log('range changed: startTime: ' + ev.startTime + ', endTime: ' + ev.endTime);
    };
    SelectTimeDatePage = __decorate([
        Component({
            selector: 'page-select-time-date',
            templateUrl: 'select-time-date.html'
        }),
        __metadata("design:paramtypes", [PopoverController, LoadingController, Http, AppProvider, AlertController, ModalController, NavController, NavParams])
    ], SelectTimeDatePage);
    return SelectTimeDatePage;
}());
export { SelectTimeDatePage };
//# sourceMappingURL=select-time-date.js.map