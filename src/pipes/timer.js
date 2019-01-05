var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { Injectable, Pipe } from '@angular/core';
var Timer = /** @class */ (function () {
    function Timer() {
    }
    Timer.prototype.transform = function (value, format) {
        if (format === void 0) { format = "hh:mm a"; }
        var a = Date.parse(value) + 24 * 60 * 60 * 1000;
        var b = Date.parse(new Date().toString());
        if (a > b == false) {
            return '00h 00m';
        }
        else {
            var c = (a - b) / 1000;
            return (Math.floor(c / (60 * 60))).toString() + 'h ' + (Math.floor((c % (60 * 60)) / 60)).toString() + 'm';
        }
    };
    Timer = __decorate([
        Pipe({
            name: 'timer'
        }),
        Injectable()
    ], Timer);
    return Timer;
}());
export { Timer };
var StartingTime = /** @class */ (function () {
    function StartingTime() {
    }
    StartingTime.prototype.transform = function (value, format) {
        if (format === void 0) { format = "hh:mm a"; }
        var val = value.split('|');
        val[1] = val[1] + ':00.000000';
        var a = val[0].split('-');
        var b = '20' + a[2] + '-' + a[1] + '-' + a[0] + ' ' + val[1];
        var x = Date.parse(b);
        var y = Date.parse(new Date().toString());
        if (x > y == false) {
            return 'Waiting...';
        }
        else {
            var c = (x - y) / 1000;
            var day = (Math.floor((c / (60 * 60)) / 24));
            var hr = (Math.floor((c / (60 * 60)) % 24));
            var mint = (Math.floor((c % (60 * 60)) / 60));
            return (day != 0 ? day.toString() + 'd ' : '') + hr.toString() + 'h ' + mint.toString() + 'm ';
        }
    };
    StartingTime = __decorate([
        Pipe({
            name: 'startingTime'
        }),
        Injectable()
    ], StartingTime);
    return StartingTime;
}());
export { StartingTime };
//# sourceMappingURL=timer.js.map