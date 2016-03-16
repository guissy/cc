import {Directive, ElementRef, Injectable, Input, Output, AfterViewInit, OnDestroy} from "angular2/core";
import {AnimationBuilder} from "angular2/src/animate/animation_builder";
import * as _ from "lodash";
import {EventEmitter} from 'angular2/core';
import flow_data from './flow_data';
import Typing from "./typing";

@Directive({
    selector: "[my-flow]",
    exportAs: "theflow"
})
export class MyFlow implements AfterViewInit, OnDestroy{
    nodeMap:NodeLike[];
    flowMap:NodeLike[];
    curNode:NodeLike;
    curState:string;

    @Output() pause:any = new EventEmitter();
    @Output() finish:any = new EventEmitter();

    constructor() {
        this.initFlowData();
    }

    initFlowData() {
        const nodes = flow_data.split("\n");
        nodes.shift();
        nodes.pop();

        const flowNodes = nodes;
        const nodeMap = [], flowMap = [];
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
                                } else if (nodeMap[key2].type == "condition" && isNo) {
                                    nodeMap[key2].no = arr[index + 1];
                                    if (flow.indexOf("|") > 0) {
                                        nodeMap[key2].noWord = flow.split("|").pop().replace(")", "");
                                    }
                                } else {
                                    nodeMap[key2].next = arr[index + 1]
                                }
                            }
                        }
                    }
                });
            }
        });
        this.nodeMap = nodeMap;
        this.flowMap = flowMap;
    }
    yes(){
        this.curState = "yes";
        this.answer()
    }
    no(){
        this.curState = "no";
        this.answer()
    }
    next(){
        this.curState = "next";
        this.answer()
    }

    answer() {
        var nextNode:NodeLike = null;
        //console.log(curNode,action);
        if (!!this.curNode) {
            //console.log(curNode.type,curState);
            if (this.curNode.type == "condition" && this.curState == "yes") {
                nextNode = this.nodeMap[this.curNode.yes];
            } else if (this.curNode.type == "condition" && this.curState == "no") {
                nextNode = this.nodeMap[this.curNode.no];
            } else if (this.curNode.type == "condition" && (this.curState == "" || this.curState == null)) {
                nextNode = this.curNode; //重复当前
            } else {
                nextNode = this.nodeMap[this.curNode.next]; //直接下一步 即curState == "next"
                this.curState = "";
            }
        } else {
            nextNode = this.flowMap["start"];
        }
        this.curNode = this.updateNode(nextNode);
    }

    updateNode(nextNode:NodeLike) {
        var curNode = null;
        if (nextNode.type == "end") {
            // debugger;
            new Promise(function (resolve) {
                new Typing(document.querySelector("#title")).dooot(resolve);
                this.waitingResult=true;
            }).then(() => {
                this.finish.emit(null);
                _.delay(()=>{
                    this.curNode = null;
                    // promise && promise.resolve("end");
                    document.body.style.height = window.outerHeight + "px";
                    document.querySelector('body').className = 'result';
                },20);
            });
        } else {
            // console.log(document.querySelector("#title"));
            new Typing(document.querySelector("#title")).start(nextNode.word,
                ()=>{
                    this.pause.emit(null);
                }//promise && promise.resolve("")
            );
            curNode = nextNode;
        }
        console.log(curNode);
        return curNode;
    }
    ngAfterViewInit() {
        this.next();
    }
    ngAfterViewChecked() {
    }
    ngOnDestroy(){
    }
}

class NodeLike {
    type:string;
    word:string;
    yes:string;
    no:string;
    next:string;
    yesWord:string;
    noWord:string;

    constructor(type:string, word:string) {
        this.type = type;
        this.word = word;
    }
}


