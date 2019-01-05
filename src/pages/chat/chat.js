var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Content, LoadingController } from 'ionic-angular';
import { Http } from '@angular/http';
import { Events } from 'ionic-angular';
import { ENV } from '../../app/env';
var ChatPage = /** @class */ (function () {
    function ChatPage(events, loadingCtrl, navCtrl, navParams, http) {
        this.events = events;
        this.loadingCtrl = loadingCtrl;
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.myimage = '';
        this.image = '';
        this.message = '';
        this.firstOrNot = true;
        var ab = [{ name: ' :1.png: ', path: 'assets/emoji/1.png' },
            { name: ' :2.png: ', path: 'assets/emoji/2.png' },
            { name: ' :3.png: ', path: 'assets/emoji/3.png' },
            { name: ' :4.png: ', path: 'assets/emoji/4.png' },
            { name: ' :5.png: ', path: 'assets/emoji/5.png' },
            { name: ' :6.png: ', path: 'assets/emoji/6.png' },
            { name: ' :7.png: ', path: 'assets/emoji/7.png' },
            { name: ' :8.png: ', path: 'assets/emoji/8.png' },
            { name: ' :9.png: ', path: 'assets/emoji/9.png' },
            { name: ' :10.png: ', path: 'assets/emoji/10.png' },
            { name: ' :11.png: ', path: 'assets/emoji/11.png' },
            { name: ' :12.png: ', path: 'assets/emoji/12.png' },
            { name: ' :13.png: ', path: 'assets/emoji/13.png' },
            { name: ' :14.png: ', path: 'assets/emoji/14.png' },
            { name: ' :15.png: ', path: 'assets/emoji/15.png' },
            { name: ' :16.png: ', path: 'assets/emoji/16.png' },
            { name: ' :17.png: ', path: 'assets/emoji/17.png' },
            { name: ' :18.png: ', path: 'assets/emoji/18.png' },
            { name: ' :19.png: ', path: 'assets/emoji/19.png' },
            { name: ' :20.png: ', path: 'assets/emoji/20.png' },
            { name: ' :21.png: ', path: 'assets/emoji/21.png' },
            { name: ' :22.png: ', path: 'assets/emoji/22.png' },
            { name: ' :23.png: ', path: 'assets/emoji/23.png' },
            { name: ' :24.png: ', path: 'assets/emoji/24.png' },
            { name: ' :25.png: ', path: 'assets/emoji/25.png' },
            { name: ' :26.png: ', path: 'assets/emoji/26.png' },
            { name: ' :27.png: ', path: 'assets/emoji/27.png' },
            { name: ' :28.png: ', path: 'assets/emoji/28.png' },
            { name: ' :29.png: ', path: 'assets/emoji/29.png' },
            { name: ' :30.png: ', path: 'assets/emoji/30.png' },
            { name: ' :31.png: ', path: 'assets/emoji/31.png' },
            { name: ' :32.png: ', path: 'assets/emoji/32.png' },
            { name: ' :33.png: ', path: 'assets/emoji/33.png' },
            { name: ' :34.png: ', path: 'assets/emoji/34.png' },
            { name: ' :35.png: ', path: 'assets/emoji/35.png' },
            { name: ' :36.png: ', path: 'assets/emoji/36.png' },
            { name: ' :37.png: ', path: 'assets/emoji/37.png' },
            { name: ' :38.png: ', path: 'assets/emoji/38.png' },
            { name: ' :39.png: ', path: 'assets/emoji/39.png' },
            { name: ' :40.png: ', path: 'assets/emoji/40.png' },
            { name: ' :41.png: ', path: 'assets/emoji/41.png' },
            { name: ' :42.png: ', path: 'assets/emoji/42.png' },
            { name: ' :43.png: ', path: 'assets/emoji/43.png' },
            { name: ' :44.png: ', path: 'assets/emoji/44.png' },
            { name: ' :45.png: ', path: 'assets/emoji/45.png' },
            { name: ' :46.png: ', path: 'assets/emoji/46.png' },
            { name: ' :47.png: ', path: 'assets/emoji/47.png' },
            { name: ' :48.png: ', path: 'assets/emoji/48.png' },
            { name: ' :49.png: ', path: 'assets/emoji/49.png' },
            { name: ' :50.png: ', path: 'assets/emoji/50.png' },
            { name: ' :51.png: ', path: 'assets/emoji/51.png' },
            { name: ' :52.png: ', path: 'assets/emoji/52.png' },
            { name: ' :53.png: ', path: 'assets/emoji/53.png' },
            { name: ' :54.png: ', path: 'assets/emoji/54.png' },
            { name: ' :55.png: ', path: 'assets/emoji/55.png' },
            { name: ' :56.png: ', path: 'assets/emoji/56.png' },
            { name: ' :57.png: ', path: 'assets/emoji/57.png' },
            { name: ' :58.png: ', path: 'assets/emoji/58.png' },
            { name: ' :59.png: ', path: 'assets/emoji/59.png' },
            { name: ' :60.png: ', path: 'assets/emoji/60.png' },
            { name: ' :61.png: ', path: 'assets/emoji/61.png' },
            { name: ' :62.png: ', path: 'assets/emoji/62.png' },
            { name: ' :63.png: ', path: 'assets/emoji/63.png' },
            { name: ' :64.png: ', path: 'assets/emoji/64.png' },
            { name: ' :65.png: ', path: 'assets/emoji/65.png' },
            { name: ' :66.png: ', path: 'assets/emoji/66.png' },
            { name: ' :67.png: ', path: 'assets/emoji/67.png' },
            { name: ' :68.png: ', path: 'assets/emoji/68.png' },
            { name: ' :69.png: ', path: 'assets/emoji/69.png' },
            { name: ' :70.png: ', path: 'assets/emoji/70.png' },
            { name: ' :71.png: ', path: 'assets/emoji/71.png' },
            { name: ' :72.png: ', path: 'assets/emoji/72.png' },
            { name: ' :73.png: ', path: 'assets/emoji/73.png' },
            { name: ' :74.png: ', path: 'assets/emoji/74.png' },
            { name: ' :75.png: ', path: 'assets/emoji/75.png' },
            { name: ' :76.png: ', path: 'assets/emoji/76.png' },
            { name: ' :77.png: ', path: 'assets/emoji/77.png' },
            { name: ' :78.png: ', path: 'assets/emoji/78.png' },
            { name: ' :79.png: ', path: 'assets/emoji/79.png' },
            { name: ' :80.png: ', path: 'assets/emoji/80.png' },
            { name: ' :81.png: ', path: 'assets/emoji/81.png' },
            { name: ' :82.png: ', path: 'assets/emoji/82.png' },
            { name: ' :83.png: ', path: 'assets/emoji/83.png' },
            { name: ' :84.png: ', path: 'assets/emoji/84.png' },
            { name: ' :85.png: ', path: 'assets/emoji/85.png' },
            { name: ' :86.png: ', path: 'assets/emoji/86.png' },
            { name: ' :87.png: ', path: 'assets/emoji/87.png' },
            { name: ' :88.png: ', path: 'assets/emoji/88.png' },
            { name: ' :89.png: ', path: 'assets/emoji/89.png' },
            { name: ' :90.png: ', path: 'assets/emoji/90.png' },
            { name: ' :91.png: ', path: 'assets/emoji/91.png' },
            { name: ' :92.png: ', path: 'assets/emoji/92.png' },
            { name: ' :93.png: ', path: 'assets/emoji/93.png' },
            { name: ' :94.png: ', path: 'assets/emoji/94.png' },
            { name: ' :95.png: ', path: 'assets/emoji/95.png' },
            { name: ' :96.png: ', path: 'assets/emoji/96.png' },
            { name: ' :97.png: ', path: 'assets/emoji/97.png' },
            { name: ' :98.png: ', path: 'assets/emoji/98.png' },
            { name: ' :99.png: ', path: 'assets/emoji/99.png' },
            { name: ' :100.png: ', path: 'assets/emoji/100.png' },
            { name: ' :101.png: ', path: 'assets/emoji/101.png' },
            { name: ' :102.png: ', path: 'assets/emoji/102.png' },
            { name: ' :103.png: ', path: 'assets/emoji/103.png' },
            { name: ' :104.png: ', path: 'assets/emoji/104.png' },
            { name: ' :105.png: ', path: 'assets/emoji/105.png' },
            { name: ' :106.png: ', path: 'assets/emoji/106.png' },
            { name: ' :107.png: ', path: 'assets/emoji/107.png' },
            { name: ' :108.png: ', path: 'assets/emoji/108.png' },
            { name: ' :109.png: ', path: 'assets/emoji/109.png' },
            { name: ' :110.png: ', path: 'assets/emoji/110.png' },
            { name: ' :111.png: ', path: 'assets/emoji/111.png' },
            { name: ' :112.png: ', path: 'assets/emoji/112.png' },
            { name: ' :113.png: ', path: 'assets/emoji/113.png' },
            { name: ' :114.png: ', path: 'assets/emoji/114.png' },
            { name: ' :115.png: ', path: 'assets/emoji/115.png' },
            { name: ' :116.png: ', path: 'assets/emoji/116.png' },
            { name: ' :117.png: ', path: 'assets/emoji/117.png' },
            { name: ' :118.png: ', path: 'assets/emoji/118.png' },
            { name: ' :119.png: ', path: 'assets/emoji/119.png' },
            { name: ' :120.png: ', path: 'assets/emoji/120.png' },
            { name: ' :121.png: ', path: 'assets/emoji/121.png' },
            { name: ' :122.png: ', path: 'assets/emoji/122.png' },
            { name: ' :123.png: ', path: 'assets/emoji/123.png' },
            { name: ' :124.png: ', path: 'assets/emoji/124.png' },
            { name: ' :125.png: ', path: 'assets/emoji/125.png' },
            { name: ' :126.png: ', path: 'assets/emoji/126.png' },
            { name: ' :127.png: ', path: 'assets/emoji/127.png' },
            { name: ' :128.png: ', path: 'assets/emoji/128.png' },
            { name: ' :129.png: ', path: 'assets/emoji/129.png' },
            { name: ' :130.png: ', path: 'assets/emoji/130.png' },
            { name: ' :131.png: ', path: 'assets/emoji/131.png' },
            { name: ' :132.png: ', path: 'assets/emoji/132.png' },
            { name: ' :133.png: ', path: 'assets/emoji/133.png' },
            { name: ' :134.png: ', path: 'assets/emoji/134.png' },
            { name: ' :135.png: ', path: 'assets/emoji/135.png' },
            { name: ' :136.png: ', path: 'assets/emoji/136.png' },
            { name: ' :137.png: ', path: 'assets/emoji/137.png' },
            { name: ' :138.png: ', path: 'assets/emoji/138.png' },
            { name: ' :139.png: ', path: 'assets/emoji/139.png' },
            { name: ' :140.png: ', path: 'assets/emoji/140.png' },
            { name: ' :141.png: ', path: 'assets/emoji/141.png' },
            { name: ' :142.png: ', path: 'assets/emoji/142.png' },
            { name: ' :143.png: ', path: 'assets/emoji/143.png' },
            { name: ' :144.png: ', path: 'assets/emoji/144.png' },
            { name: ' :145.png: ', path: 'assets/emoji/145.png' },
            { name: ' :146.png: ', path: 'assets/emoji/146.png' },
            { name: ' :147.png: ', path: 'assets/emoji/147.png' },
            { name: ' :148.png: ', path: 'assets/emoji/148.png' },
            { name: ' :149.png: ', path: 'assets/emoji/149.png' },
            { name: ' :150.png: ', path: 'assets/emoji/150.png' },
            { name: ' :151.png: ', path: 'assets/emoji/151.png' },
            { name: ' :152.png: ', path: 'assets/emoji/152.png' },
            { name: ' :153.png: ', path: 'assets/emoji/153.png' },
            { name: ' :154.png: ', path: 'assets/emoji/154.png' },
            { name: ' :155.png: ', path: 'assets/emoji/155.png' }
        ];
        this.emoji = ab;
        localStorage["chat_enable"] = 1;
        this.emoji_enable = false;
        this.loader = this.loadingCtrl.create();
        this.productList = [];
        this.http = http;
        this.image = this.navParams.get('image');
        this.enable_view_msg = true;
        var a = ENV.api + "/public/frontend/img/profile/" + this.image;
        this.sender_name = this.navParams.get('name');
        this.myimage = localStorage['profile_pic'];
        this.image = a;
    }
    ChatPage.prototype.scroll = function () {
        this.content.scrollToBottom(0);
    };
    ChatPage.prototype.addEmoji = function (value) {
        this.content.scrollToBottom(0);
        document.getElementById('messageBox').innerHTML = document.getElementById('messageBox').innerHTML + " <img src='" + value.path + "' class='chat_inbox'> ";
        document.getElementById('messageBox').scrollLeft = document.getElementById('messageBox').scrollWidth;
    };
    ChatPage.prototype.checkbrTag = function () {
        var text = document.getElementById('messageBox').innerHTML;
        document.getElementById('messageBox').innerHTML = text.replace(/^\&nbsp\;|<br?\>*/gi, "").replace(/\&nbsp\;|<br?\>$/gi, "").trim();
    };
    ChatPage.prototype.handleMessageBoxInput = function () {
        document.getElementById('messageBox').innerHTML == ' ' ? document.getElementById('messageBox').innerHTML = '' : '';
        var text = document.getElementById('messageBox').innerHTML;
        // console.log(text.replace(/^\&nbsp\;|<br?\>*/gi, "").replace(/\&nbsp\;|<br?\>$/gi, "").trim());
    };
    ChatPage.prototype.ionViewDidEnter = function () {
        this.events.publish('enablePopup', false);
        this.receiver_id = this.navParams.get('receiver_id');
        this.sender_id = localStorage['user_id'];
        this.loader.present();
        this.refreash_msg(0);
    };
    ChatPage.prototype.ionViewWillLeave = function () {
        this.events.publish('enablePopup', true);
        this.enable_view_msg = false;
        localStorage["chat_enable"] = 0;
    };
    ChatPage.prototype.refreash_msg = function (value) {
        var _this = this;
        var link = ENV.api + '/webserviceview_message';
        var data = { sender_id: this.sender_id, receiver_id: this.receiver_id };
        this.http.post(link, data)
            .subscribe(function (data) {
            _this.data = JSON.parse(data._body).chat;
            _this.data.reverse();
            if (_this.enable_view_msg) {
                var a = _this.productList.length;
                var b = _this.data.length;
                // if(this.productList.length!=this.data.length){
                // if(this.firstOrNot){
                _this.firstOrNot = false;
                _this.productList = _this.data;
                // }else{
                // this.productList.push(this.data[this.data.length-1])
                // }
                if (a != b) {
                    setTimeout(function () { _this.content.scrollToBottom(0); }, 100);
                }
                // }
                if (value == 0) {
                    _this.loader.dismiss();
                }
                setTimeout(function () { _this.refreash_msg(1); }, 5000);
            }
        }, function (err) {
            // alert(JSON.stringify('error'+err));
            setTimeout(function () { _this.refreash_msg(0); }, 5000);
        });
    };
    ChatPage.prototype.sendmsg = function () {
        var _this = this;
        this.emoji_enable ? '' : document.getElementById('messageBox').focus();
        if (document.getElementById('messageBox').innerHTML != '' && document.getElementById('messageBox').innerHTML != ' ') {
            var text = document.getElementById('messageBox').innerHTML;
            text = text.replace(/^\&nbsp\;|<br?\>*/gi, "").replace(/\&nbsp\;|<br?\>$/gi, "").trim();
            console.log(text);
            var msg = text;
            this.productList.push({ sender_id: this.sender_id, receiver_id: this.receiver_id, message: msg, time: null });
            setTimeout(function () {
                _this.content.scrollToBottom(0);
            }, 100);
            document.getElementById('messageBox').innerHTML = '';
            // this.myInput.setFocus();
            var link = ENV.api + '/webservicesend_message';
            var data = {
                message: msg,
                sender_id: this.sender_id,
                receiver_id: this.receiver_id
            };
            this.http.post(link, data).subscribe(function (data) {
            }, function (err) { });
        }
    };
    __decorate([
        ViewChild('chatinput'),
        __metadata("design:type", Object)
    ], ChatPage.prototype, "myInput", void 0);
    __decorate([
        ViewChild(Content),
        __metadata("design:type", Content)
    ], ChatPage.prototype, "content", void 0);
    ChatPage = __decorate([
        Component({
            selector: 'page-chat',
            templateUrl: 'chat.html'
        }),
        __metadata("design:paramtypes", [Events, LoadingController, NavController, NavParams, Http])
    ], ChatPage);
    return ChatPage;
}());
export { ChatPage };
//# sourceMappingURL=chat.js.map