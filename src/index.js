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
var myFlow_1 = require("./myFlow");
// console.log(css);
var BoardStatus;
(function (BoardStatus) {
    BoardStatus[BoardStatus["todo"] = 0] = "todo";
    BoardStatus[BoardStatus["doing"] = 1] = "doing";
    BoardStatus[BoardStatus["done"] = 2] = "done";
})(BoardStatus || (BoardStatus = {}));
var CcApp = (function () {
    function CcApp() {
        this.showModal = false;
        this.boardStatus = BoardStatus.todo;
        this.BOARD_STATUS = BoardStatus;
    }
    CcApp.prototype.toggleModal = function (show, status) {
        if (show === void 0) { show = true; }
        if (status === void 0) { status = BoardStatus.todo; }
        var prev = this.showModal;
        if (!this.showModal)
            this.showModal = show;
        // debugger;
        _.defer(function (context) {
            if (!_.isNil(context.mf)) {
                context.mf.toggle(!prev);
            }
        }, this);
    };
    CcApp.prototype.removeModal = function () {
        this.showModal = false;
    };
    CcApp.prototype.pauseModal = function () {
        this.boardStatus = BoardStatus.doing;
    };
    CcApp.prototype.finishModal = function () {
        this.boardStatus = BoardStatus.done;
        this.toggleModal(false, this.boardStatus);
    };
    CcApp.prototype.ngAfterViewInit = function () {
        console.log("" + ('\u2665\u2661').repeat(30), this.BOARD_STATUS);
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
            template: "\n        <div>\n            <button id=\"question-btn\" (click)=\"toggleModal()\" class=\"center main_box\">\n                <span [ngSwitch]=\"boardStatus\">\n                    <span *ngSwitchWhen = \"BOARD_STATUS.done\"> \u8F9E\u804C\u5427!Good Luck! </span>\n                    <span *ngSwitchWhen = \"BOARD_STATUS.doing\"> \u4F60\u8FD8\u6CA1\u6709\u56DE\u7B54\u5B8C\u6574, \u7EE7\u7EED... </span>\n                    <span *ngSwitchDefault> \u8BE5\u4E0D\u8BE5\u8F9E\u804C\u5462? </span>\n                </span>\n            </button>\n        </div>\n        <div id=\"modal-overlay\" *ngIf=\"showModal\" my-fade #modal=\"mf\" (ended)=\"removeModal()\">\n            <div class=\"modal-data\" id=\"modal-data\" \n                my-flow #flow=\"theflow\" \n                (pause)=\"pauseModal()\" (finish)=\"finishModal()\">\n                <button id=\"x\" (click)=\"toggleModal(false,boardStatus)\" class=\"close\">&times;</button>\n                <p id=\"title\">\u786E\u5B9A\u5417?</p><p>{{flow.waitingResult}}</p>\n    \n                <p class=\"btn-group\" *ngIf=\"!flow.waitingResult\">\n                    <button id=\"yes\" (click)=\"flow.yes()\" class=\"yes\">\u662F\u7684</button>\n                    <span>&nbsp;&nbsp;&nbsp;</span>\n                    <button id=\"no\" (click)=\"flow.no()\" class=\"no\">\u4E0D\u662F</button>\n                    <button id=\"next\" (click)=\"flow.next()\" style=\"display: none\" class=\"yes\">\u4E0B\u4E00\u6B65</button>\n                </p>\n            </div>\n        </div>\n    ",
            directives: [myFade_1.MyFade, myFlow_1.MyFlow],
        }), 
        __metadata('design:paramtypes', [])
    ], CcApp);
    return CcApp;
})();
exports.CcApp = CcApp;
browser_1.bootstrap(CcApp).catch(function (err) { return console.error(err); });
//# sourceMappingURL=index.js.map