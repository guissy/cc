"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("angular2/core");
var browser_1 = require("angular2/platform/browser");
var myFade_1 = require("./myFade");
// const Rx = require('rx');
var _ = require("lodash");
require('./assets/style.scss');
// console.log(css);
var CcApp = (function () {
    function CcApp() {
        this.showModal = false;
    }
    CcApp.prototype.toggleModal = function () {
        var prev = this.showModal;
        if (!this.showModal)
            this.showModal = true;
        // debugger;
        _.defer(function (context) {
            if (!_.isNil(context.mf)) {
                context.mf.toggle(!prev);
            }
        }, this);
    };
    CcApp.prototype.ngAfterViewInit = function () {
    };
    CcApp.prototype.ngAfterViewChecked = function () {
    };
    __decorate([
        core_1.ViewChild(myFade_1.MyFade), 
        __metadata('design:type', myFade_1.MyFade)
    ], CcApp.prototype, "mf", void 0);
    CcApp = __decorate([
        core_1.Component({
            selector: "#container",
            template: "\n        <div>\n            <button id=\"question-btn\" (click)=\"toggleModal()\" class=\"center main_box\">\n                \u8BE5\u4E0D\u8BE5\u8F9E\u804C\u5462?\n            </button>\n        </div>\n    <div id=\"modal-overlay\" *ngIf=\"showModal\" my-fade #modal=\"mf\" (ended)=\"showModal=false\">\n        <div class=\"modal-data\" id=\"modal-data\">\n            <button id=\"x\" (click)=\"toggleModal()\" class=\"close\">&times;</button>\n            <p id=\"title\">\u786E\u5B9A\u5417?</p>\n\n            <p class=\"btn-group\">\n                <button id=\"yes\" onclick=\"yes()\" class=\"yes\">\u662F\u7684</button>\n                <span>&nbsp;&nbsp;&nbsp;</span>\n                <button id=\"no\" onclick=\"no()\" class=\"no\">\u4E0D\u662F</button>\n                <button id=\"next\" onclick=\"next()\" style=\"display: none\" class=\"yes\">\u4E0B\u4E00\u6B65</button>\n            </p>\n        </div>\n    </div>\n    ",
            directives: [myFade_1.MyFade]
        }), 
        __metadata('design:paramtypes', [])
    ], CcApp);
    return CcApp;
}());
exports.CcApp = CcApp;
browser_1.bootstrap(CcApp).catch(function (err) { return console.error(err); });
//# sourceMappingURL=index.js.map