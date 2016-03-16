"use strict";
var Typing = (function () {
    function Typing(output) {
        this.count = 0;
        this.textAlign = "";
        this.output = output;
    }
    Typing.prototype.start = function (words, callback) {
        var _this = this;
        if ("innerText" in this.output) {
            this.output.style.textAlign = "center";
            this.word = words ? words.split("") : [];
            this.count = 0;
            this.output.innerText = "";
            var animate = function () {
                var text = _this.output.innerText;
                if (_this.count % 5 == 0) {
                    _this.output.innerText = text + _this.word.shift();
                }
                if (_this.word.length > 0) {
                    requestAnimationFrame(animate);
                }
                else {
                    callback && callback();
                }
                _this.count++;
            };
            requestAnimationFrame(animate);
        }
    };
    Typing.prototype.dooot = function (callback) {
        var _this = this;
        this.textAlign = this.output.style.textAlign;
        this.output.style.textAlign = "left";
        this.count = 0;
        this.output.innerText = "";
        var animate = function () {
            var str = new Array(_this.count / 3 + 1 >> 0).join(". ");
            _this.output.innerText = "请稍候 " + str;
            if (_this.count < 50) {
                requestAnimationFrame(animate);
            }
            else {
                callback && callback();
            }
            _this.count++;
        };
        requestAnimationFrame(animate);
    };
    return Typing;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Typing;
//# sourceMappingURL=typing.js.map