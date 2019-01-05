var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild, ElementRef, HostListener } from '@angular/core';
import { Content, Slides } from 'ionic-angular';
import { NavController, NavParams, AlertController, MenuController, LoadingController, ModalController } from 'ionic-angular';
import { CreateolagaPage } from '../createolaga/createolaga';
import { InboxPage } from '../myoolaga/inbox/inbox';
import { OfferPage } from '../offer/offer';
import { Http } from '@angular/http';
import { OolagaDetailsPage } from '../oolaga-details/oolaga-details';
import { DraftOolagaPage } from '../draft-oolaga/draft-oolaga';
import { Observable } from "rxjs/Rx";
import { ENV } from '../../app/env';
import { AppProvider } from '../../providers/app-provider';
import { OolagaSummaryPage } from '../oolaga-summary/oolaga-summary';
import { AssignedOolagaMapPage } from '../assigned-oolaga-map/assigned-oolaga-map';
import { ChatPage } from '../chat/chat';
import { LaboronlysummaryPage } from '../laboronlysummary/laboronlysummary';
var MyoolagaPage = /** @class */ (function () {
    function MyoolagaPage(modelCtrl, appProvider, loadingCtrl, menuCtrl, alertCtrl, http, navCtrl, navParams) {
        this.modelCtrl = modelCtrl;
        this.appProvider = appProvider;
        this.loadingCtrl = loadingCtrl;
        this.menuCtrl = menuCtrl;
        this.alertCtrl = alertCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.oolaga_created = true;
        this.msg_no = 0;
        this.draft_oolaga = false;
        this.draft_oolaga_enable = true;
        this.page_selection = true;
        this.activeSec = "active";
        this.assigned_oolaga_enable = false;
        this.activeSlide = true;
        this.enableScroll1 = true;
        this.enableScroll2 = true;
        this.enableScroll3 = true;
        this.refreasherEnabled = false;
        this.http = http;
        this.menu = menuCtrl;
        this.menu.enable(true, "mymenu");
    }
    MyoolagaPage.prototype.refreshOolagas = function (refresh) {
        var _this = this;
        this.refreasherEnabled = true;
        if (this.activeSec == 'draft') {
            this.http.get(ENV.api + '/webservicedraftOolaga/' + localStorage['user_id']).subscribe(function (data) {
                if (data.json().response) {
                    if (data.json().services[0] == null) {
                        _this.draft_oolaga_enable = true;
                    }
                    else if (data.json().services[0] != null) {
                        _this.draft_oolaga_enable = false;
                        _this.data1 = data.json().services;
                        _this.data1.reverse();
                    }
                }
                else {
                    _this.draft_oolaga_enable = true;
                }
                refresh.complete();
                // this.enableScroll=false;
                _this.refreasherEnabled = false;
            }, function (err) {
                alert(JSON.stringify('error' + err));
                refresh.complete();
                // this.enableScroll=false;
                _this.refreasherEnabled = false;
            });
        }
        else if (this.activeSec == 'auction') {
            this.http.post(ENV.api + '/webserviceuserOolagas', { user_id: localStorage['user_id'] }).subscribe(function (data) {
                if (data.json().response) {
                    if (data.json().oolagas[0] == null) {
                        _this.oolaga_created = true;
                    }
                    else if (data.json().oolagas[0] != null) {
                        _this.oolaga_created = false;
                        _this.data = data.json().oolagas;
                        _this.data.reverse();
                    }
                }
                else {
                    _this.oolaga_created = true;
                }
                refresh.complete();
                // this.enableScroll=false;
                _this.refreasherEnabled = false;
            }, function (err) {
                alert(JSON.stringify('error' + err));
                refresh.complete();
                // this.enableScroll=false;
                _this.refreasherEnabled = false;
            });
        }
        else if (this.activeSec == 'active') {
            this.http.post(ENV.api + '/webserviceshowuseroolaga', { user_id: localStorage['user_id'] }).subscribe(function (data) {
                if (data.json().response) {
                    _this.assignedOolagas = data.json().data.reverse();
                    if (data.json().data[0] != null) {
                        _this.assigned_oolaga_enable = true;
                    }
                    else {
                        _this.assigned_oolaga_enable = false;
                    }
                }
                else {
                    _this.assigned_oolaga_enable = false;
                }
                refresh.complete();
                // this.enableScroll=false;
                _this.refreasherEnabled = false;
            }, function (err) {
                alert(JSON.stringify('error' + err));
                refresh.complete();
                // this.enableScroll=false;
                _this.refreasherEnabled = false;
            });
        }
    };
    MyoolagaPage.prototype.slideChanged = function () {
        var currentIndex = this.slides.getActiveIndex();
        if (currentIndex == 0) {
            this.activeSec = 'draft';
        }
        else if (currentIndex == 1) {
            this.activeSec = 'auction';
        }
        else {
            this.activeSec = 'active';
        }
    };
    MyoolagaPage.prototype.tabChange = function () {
        var len = this.slides.length();
        var currentIndex = this.slides.getActiveIndex();
        if (len > 0) {
            if (this.activeSec == 'draft') {
                if (currentIndex != 0) {
                    this.slides.slideTo(0);
                }
            }
            else if (this.activeSec == 'auction') {
                if (currentIndex != 1) {
                    this.slides.slideTo(1);
                }
            }
            else if (this.activeSec == 'active') {
                if (currentIndex != 2) {
                    this.slides.slideTo(2);
                }
            }
        }
    };
    MyoolagaPage.prototype.openChat = function (value, image, name) {
        console.log(value);
        this.navCtrl.push(ChatPage, { receiver_id: value, image: image, name: name });
        // let chat = this.modelCtrl.create(ChatPage,{receiver_id:value,image:image,name:name});
        // chat.dismiss(data=>{
        // })
        // chat.present();
    };
    MyoolagaPage.prototype.oolaga_detail = function (value) {
        if (value.service == 'Labor Only') {
            if (this.page_selection) {
                this.navCtrl.push(LaboronlysummaryPage, { data: value });
            }
            this.page_selection = true;
        }
        else {
            if (this.page_selection) {
                this.navCtrl.push(OolagaSummaryPage, { data: value, page: 'auction' });
            }
            this.page_selection = true;
        }
    };
    MyoolagaPage.prototype.active_oolaga_detail = function (value) {
        var _this = this;
        if (value.cancel_status != 'cancel_by_helper') {
            console.log(value);
            this.navCtrl.push(OolagaSummaryPage, { data: value, page: 'active' });
        }
        else {
            var alert_1 = this.alertCtrl.create({
                title: 'Do you want to delete',
                buttons: [{
                        text: 'NO',
                        handler: function () {
                        }
                    }, {
                        text: 'YES',
                        handler: function () {
                            var loading = _this.loadingCtrl.create();
                            loading.present();
                            _this.http.get(ENV.api + '/webservicedeletecanceledoolaga/' + value.oolaga_id)
                                .subscribe(function (data) {
                                if (data.json().response) {
                                    _this.ionViewWillEnter();
                                }
                                loading.dismiss();
                            }, function (err) {
                                loading.dismiss();
                            });
                        }
                    }]
            });
            alert_1.present();
        }
    };
    MyoolagaPage.prototype.deleteCancelOolaga = function () {
    };
    MyoolagaPage.prototype.openmap = function (value) {
        if (value.service_id == 7) {
        }
        else if (value.service_id != 7) {
            console.log('map');
            this.navCtrl.push(AssignedOolagaMapPage, { data: value });
        }
    };
    MyoolagaPage.prototype.deleteDraft = function (value) {
        var _this = this;
        // this.http.get(ENV.api + '/webservicedeleteDraft/'+value.id)
        console.log('DeleteEnable');
        var confirm = this.alertCtrl.create({
            title: 'Do you want to delete',
            buttons: [
                {
                    text: 'Yes',
                    handler: function () {
                        var loading = _this.loadingCtrl.create();
                        loading.present();
                        _this.http.get(ENV.api + '/webservicedeleteDraft/' + value.id)
                            .subscribe(function (data) {
                            if (JSON.parse(data['_body']).response) {
                                _this.http.get(ENV.api + '/webservicedraftOolaga/' + localStorage['user_id'])
                                    .subscribe(function (data) {
                                    var d = JSON.parse(data['_body']);
                                    if (d.response) {
                                        if (d.services[0] == null) {
                                            _this.draft_oolaga_enable = true;
                                        }
                                        else if (d.services[0] != null) {
                                            _this.draft_oolaga_enable = false;
                                            _this.data1 = d.services;
                                            _this.data1.reverse();
                                        }
                                    }
                                    else {
                                        _this.draft_oolaga_enable = true;
                                    }
                                    loading.dismiss();
                                    var alert = _this.alertCtrl.create({
                                        title: 'Draft Deleted',
                                        buttons: [{
                                                text: 'Ok'
                                            }]
                                    });
                                    alert.present();
                                });
                            }
                            else {
                                loading.dismiss();
                                var alert_2 = _this.alertCtrl.create({
                                    title: 'Oops...',
                                    message: 'Something Wrong...',
                                    buttons: [{
                                            text: 'Ok'
                                        }]
                                });
                                alert_2.present();
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
    MyoolagaPage.prototype.showDraft = function (value) {
        console.log(value);
        localStorage['draftOolaga'] = JSON.stringify(value);
        this.navCtrl.push(DraftOolagaPage);
    };
    MyoolagaPage.prototype.createoolaga = function () {
        var _this = this;
        if (!this.draft_oolaga_enable) {
            var confirm_1 = this.alertCtrl.create({
                message: 'We noticed you have an ooLAGA draft saved.Would you like to edit your draft or create a new ooLAGA',
                buttons: [{ text: 'NEW ooLAGA',
                        handler: function () {
                            _this.appProvider.createNew();
                            _this.navCtrl.push(CreateolagaPage, { data: 'new' });
                        },
                    },
                    {
                        text: 'EDIT',
                        handler: function () {
                            _this.navCtrl.push(CreateolagaPage, { data: 'new' });
                            // this.navCtrl.push(DraftOolagaPage,{data:'new'});
                        },
                    }]
            });
            confirm_1.present();
        }
        else {
            this.appProvider.createNew();
            this.navCtrl.push(CreateolagaPage, { data: 'new' });
        }
    };
    MyoolagaPage.prototype.notificationpage = function (id, offer) {
        if (offer != 0 || offer != '0') {
            this.navCtrl.push(OfferPage, { id: id });
        }
        else {
            var alert_3 = this.alertCtrl.create({
                title: 'Alert',
                message: 'No Offers',
                buttons: ['Ok']
            });
            alert_3.present();
        }
    };
    MyoolagaPage.prototype.messagespage = function () {
        this.msg_no = 0;
        localStorage['msg_no'] = 0;
        this.navCtrl.push(InboxPage);
    };
    MyoolagaPage.prototype.ionViewDidEnter = function () {
        if (this.activeSlide) {
            this.slides.slideTo(2);
            this.activeSlide = false;
        }
    };
    MyoolagaPage.prototype.onScroll = function (event) {
        if (this.activeSec == "draft") {
            if (document.getElementById('draft_slide').scrollTop == 0) {
                this.enableScroll1 = true;
            }
            else {
                this.refreasherEnabled ? '' : this.enableScroll1 = false;
            }
        }
        if (this.activeSec == "auction") {
            if (document.getElementById('auction_slide').scrollTop == 0) {
                this.enableScroll2 = true;
            }
            else {
                this.refreasherEnabled ? '' : this.enableScroll2 = false;
            }
        }
        if (this.activeSec == "active") {
            if (document.getElementById('active_slide').scrollTop == 0) {
                this.enableScroll3 = true;
            }
            else {
                this.refreasherEnabled ? '' : this.enableScroll3 = false;
            }
        }
    };
    MyoolagaPage.prototype.ionViewWillEnter = function () {
        var _this = this;
        this.enable_service = true;
        localStorage['chat'] = 0;
        localStorage['draft_oolaga'] = true;
        // this.http.post(this.link + '',{user_id:localStorage['user_id']})
        // .subscribe(data=>{
        //   console.log(JSON.parse(data._body).response);
        //   localStorage['draft_oolaga']=true;
        //   localStorage['draft_oolaga']=false;
        // })
        var loading = this.loadingCtrl.create();
        loading.present();
        Observable.forkJoin(this.http.post(ENV.api + '/webserviceuserOolagas', { user_id: localStorage['user_id'] }), this.http.get(ENV.api + '/webservicedraftOolaga/' + localStorage['user_id']), this.http.post(ENV.api + '/webserviceshowuseroolaga', { user_id: localStorage['user_id'] }))
            .subscribe(function (data) {
            var data1 = JSON.parse(data[0]['_body']);
            var data2 = JSON.parse(data[1]['_body']);
            var data3 = JSON.parse(data[2]['_body']);
            console.log('active', data1);
            console.log('draft', data2);
            console.log('assignedOolagas', data3);
            if (data3.response) {
                _this.assignedOolagas = data3.data.reverse();
                if (data3.data[0] != null) {
                    _this.assigned_oolaga_enable = true;
                    console.log(1);
                }
                else {
                    _this.assigned_oolaga_enable = false;
                    console.log(2);
                }
            }
            else {
                _this.assigned_oolaga_enable = false;
                console.log(3);
            }
            if (data1.response) {
                if (data1.oolagas[0] == null) {
                    _this.oolaga_created = true;
                }
                else if (data1.oolagas[0] != null) {
                    _this.oolaga_created = false;
                    _this.data = data1.oolagas;
                    _this.data.reverse();
                }
            }
            else {
                _this.oolaga_created = true;
            }
            if (data2.response) {
                if (data2.services[0] == null) {
                    _this.draft_oolaga_enable = true;
                }
                else if (data2.services[0] != null) {
                    _this.draft_oolaga_enable = false;
                    _this.data1 = data2.services;
                    _this.data1.reverse();
                }
            }
            else {
                _this.draft_oolaga_enable = true;
            }
            loading.dismiss();
            _this.content.scrollToTop();
        }, function (err) {
            loading.dismiss();
            alert(JSON.stringify('error' + err));
        });
        this.update_msg();
    };
    MyoolagaPage.prototype.ionViewWillLeave = function () {
        this.enable_service = false;
    };
    MyoolagaPage.prototype.update_msg = function () {
        var _this = this;
        if (this.enable_service == true) {
            setTimeout(function () {
                _this.msg_no++;
                _this.update_msg();
            }, 5000);
        }
    };
    MyoolagaPage.prototype.get_detail = function (value) {
        this.navCtrl.push(OolagaDetailsPage, { data: value });
    };
    __decorate([
        ViewChild(Slides),
        __metadata("design:type", Slides)
    ], MyoolagaPage.prototype, "slides", void 0);
    __decorate([
        ViewChild(Content),
        __metadata("design:type", Content)
    ], MyoolagaPage.prototype, "content", void 0);
    __decorate([
        ViewChild('draft_slide'),
        __metadata("design:type", ElementRef)
    ], MyoolagaPage.prototype, "draft_slide", void 0);
    __decorate([
        ViewChild('auction_slide'),
        __metadata("design:type", ElementRef)
    ], MyoolagaPage.prototype, "auction_slide", void 0);
    __decorate([
        ViewChild('active_slide'),
        __metadata("design:type", ElementRef)
    ], MyoolagaPage.prototype, "active_slide", void 0);
    __decorate([
        HostListener('scroll', ['$event']),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], MyoolagaPage.prototype, "onScroll", null);
    MyoolagaPage = __decorate([
        Component({
            selector: 'page-myoolaga',
            templateUrl: 'myoolaga.html'
        }),
        __metadata("design:paramtypes", [ModalController, AppProvider, LoadingController, MenuController, AlertController, Http, NavController, NavParams])
    ], MyoolagaPage);
    return MyoolagaPage;
}());
export { MyoolagaPage };
//# sourceMappingURL=myoolaga.js.map