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
var _ = require("lodash");
var core_2 = require('angular2/core');
var flow_data_1 = require('./flow_data');
var typing_1 = require("./typing");
var MyFlow = (function () {
    function MyFlow() {
        this.pause = new core_2.EventEmitter();
        this.finish = new core_2.EventEmitter();
        this.initFlowData();
    }
    MyFlow.prototype.initFlowData = function () {
        var nodes = flow_data_1.default.split("\n");
        nodes.shift();
        nodes.pop();
        var flowNodes = nodes;
        var nodeMap = [], flowMap = [];
        flowNodes.forEach(function (node) {
            if (node.includes("=>")) {
                //说明是节点定义
                var arr = node.split("=>");
                var key = arr[0].trim();
                var defs = arr[1].split(":");
                var type = defs[0].trim();
                nodeMap[key] = new NodeLike(type, defs[1].trim());
                if (type == "start")
                    flowMap["start"] = nodeMap[key];
                else if (type == "end")
                    flowMap["end"] = nodeMap[key];
            }
        });
        flowNodes.forEach(function (node) {
            if (node.indexOf("->") != -1) {
                //说明是节点流程
                var arr = node.split("->");
                arr.forEach(function (flow, index) {
                    var key1 = flow.split("(").shift().trim();
                    var isYes = flow.split("(").pop().indexOf("yes") != -1;
                    var isNo = flow.split("(").pop().indexOf("no") != -1;
                    if (index + 1 < arr.length) {
                        for (var key2 in nodeMap) {
                            if (key1 == key2) {
                                if (nodeMap[key2].type == "condition" && isYes) {
                                    nodeMap[key2].yes = arr[index + 1];
                                    if (flow.indexOf("|") > 0) {
                                        nodeMap[key2].yesWord = flow.split("|").pop().replace(")", "");
                                    }
                                }
                                else if (nodeMap[key2].type == "condition" && isNo) {
                                    nodeMap[key2].no = arr[index + 1];
                                    if (flow.indexOf("|") > 0) {
                                        nodeMap[key2].noWord = flow.split("|").pop().replace(")", "");
                                    }
                                }
                                else {
                                    nodeMap[key2].next = arr[index + 1];
                                }
                            }
                        }
                    }
                });
            }
        });
        this.nodeMap = nodeMap;
        this.flowMap = flowMap;
    };
    MyFlow.prototype.yes = function () {
        this.curState = "yes";
        this.answer();
    };
    MyFlow.prototype.no = function () {
        this.curState = "no";
        this.answer();
    };
    MyFlow.prototype.next = function () {
        this.curState = "next";
        this.answer();
    };
    MyFlow.prototype.answer = function () {
        var nextNode = null;
        //console.log(curNode,action);
        if (!!this.curNode) {
            //console.log(curNode.type,curState);
            if (this.curNode.type == "condition" && this.curState == "yes") {
                nextNode = this.nodeMap[this.curNode.yes];
            }
            else if (this.curNode.type == "condition" && this.curState == "no") {
                nextNode = this.nodeMap[this.curNode.no];
            }
            else if (this.curNode.type == "condition" && (this.curState == "" || this.curState == null)) {
                nextNode = this.curNode; //重复当前
            }
            else {
                nextNode = this.nodeMap[this.curNode.next]; //直接下一步 即curState == "next"
                this.curState = "";
            }
        }
        else {
            nextNode = this.flowMap["start"];
        }
        this.curNode = this.updateNode(nextNode);
    };
    MyFlow.prototype.updateNode = function (nextNode) {
        var _this = this;
        var curNode = null;
        if (nextNode.type == "end") {
            // debugger;
            new Promise(function (resolve) {
                new typing_1.default(document.querySelector("#title")).dooot(resolve);
                this.waitingResult = true;
            }).then(function () {
                _this.finish.emit(null);
                _.delay(function () {
                    _this.curNode = null;
                    // promise && promise.resolve("end");
                    document.body.style.height = window.outerHeight + "px";
                    document.querySelector('body').className = 'result';
                }, 20);
            });
        }
        else {
            // console.log(document.querySelector("#title"));
            new typing_1.default(document.querySelector("#title")).start(nextNode.word, function () {
                _this.pause.emit(null);
            } //promise && promise.resolve("")
             //promise && promise.resolve("")
            );
            curNode = nextNode;
        }
        console.log(curNode);
        return curNode;
    };
    MyFlow.prototype.ngAfterViewInit = function () {
        this.next();
    };
    MyFlow.prototype.ngAfterViewChecked = function () {
    };
    MyFlow.prototype.ngOnDestroy = function () {
    };
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MyFlow.prototype, "pause", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], MyFlow.prototype, "finish", void 0);
    MyFlow = __decorate([
        core_1.Directive({
            selector: "[my-flow]",
            exportAs: "theflow"
        }), 
        __metadata('design:paramtypes', [])
    ], MyFlow);
    return MyFlow;
})();
exports.MyFlow = MyFlow;
var NodeLike = (function () {
    function NodeLike(type, word) {
        this.type = type;
        this.word = word;
    }
    return NodeLike;
})();
//# sourceMappingURL=myFlow.js.map