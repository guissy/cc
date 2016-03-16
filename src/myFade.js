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
var animation_builder_1 = require("angular2/src/animate/animation_builder");
var core_2 = require('angular2/core');
// require('angular2/src/animate/animation_builder');
// require('angular2/core');
// directive
// selector:"[my-fade]",
// injectables:[AnimationBuilder,ElementRef]
var MyFade = (function () {
    function MyFade(_ab, _e) {
        this._ab = _ab;
        this._e = _e;
        // @Input() end:Function;
        this.ended = new core_2.EventEmitter();
        this.waitingResult = false;
        _e.nativeElement.style.backgroundColor = "#222222";
    }
    MyFade.prototype.toggle = function (isVisible) {
        var _this = this;
        if (isVisible === void 0) { isVisible = false; }
        var animation = this._ab.css();
        animation.setDuration(1000);
        console.log(isVisible, 'isVisible');
        if (isVisible) {
            animation.setFromStyles({ opacity: 0 }).setToStyles({ opacity: 1 });
            animation.start(this._e.nativeElement);
        }
        else {
            animation.setFromStyles({ opacity: 1 }).setToStyles({ opacity: 0 });
            animation.start(this._e.nativeElement).onComplete(function () { return _this.ended.emit(null); });
        }
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MyFade.prototype, "ended", void 0);
    MyFade = __decorate([
        core_1.Directive({
            selector: "[my-fade]",
            exportAs: "mf"
        }),
        core_1.Injectable(), 
        __metadata('design:paramtypes', [animation_builder_1.AnimationBuilder, core_1.ElementRef])
    ], MyFade);
    return MyFade;
}());
exports.MyFade = MyFade;
//# sourceMappingURL=myFade.js.map