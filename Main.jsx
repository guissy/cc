import React from 'react';

export default class Main extends React.Component {
    construct(){
        const flowNodes = ("st=>start: 该不该辞职呢？\n" +
        "e=>end: 不要再想了, 辞职吧! Good Luck!\n" +
        "hasFound=>condition: 找到新工作了吗\n" +
        "hasMoney=>condition: 你有没足够的资金维持自己下半生的生活\n" +
        "trueMoney=>condition: 你肯定\n" +
        "hasGanDei=>condition: 有没人养你下半生\n" +
        "trueGanDei=>condition: 信得过\n" +
        "enjoyJob=>condition: 真的想做\n" +
        "wouldRegret=>condition: 辞职了会后悔吗\n" +
        "later=>condition: 再做几个月看看\n" +
        "howAbout=>condition: 做得怎么样\n" +
        "whyHere=>operation: 为何又绕到这里呢\n" +
        "askWhyQuit=>operation: 老实说为什么要辞职\n" +
        "whyQuit=>operation: 人工不够高；做得不开心；纯粹想走；追梦想\n" +
        "continueQuit=>condition: 还要辞职吗\n" +
        "talkBoss=>operation: 跟老板谈一下\n" +
        "talkBossResult=>condition: 谈得怎么样\n" +
        "st->hasMoney\n" +
        "hasMoney(yes|有)->trueMoney\n" +
        "hasMoney(no|无)->hasGanDei\n" +
        "trueMoney(yes)->e\n" +
        "trueMoney(no)->hasFound\n" +
        "hasGanDei(yes)->trueGanDei\n" +
        "hasGanDei(no)->hasFound\n" +
        "trueGanDei(yes)->e\n" +
        "trueGanDei(no)->hasFound\n" +
        "hasFound(yes)->enjoyJob\n" +
        "hasFound(no)->askWhyQuit->whyQuit\n" +
        "enjoyJob(yes)->wouldRegret\n" +
        "enjoyJob(no)->e\n" +
        "wouldRegret(yes)->later\n" +
        "wouldRegret(no)->e\n" +
        "later(yes|好吧)->howAbout\n" +
        "later(no|决不)->e\n" +
        "howAbout(yes|还好)->whyHere->whyQuit\n" +
        "howAbout(no|不好)->continueQuit\n" +
        "whyQuit->talkBoss\n" +
        "talkBoss->talkBossResult\n" +
        "talkBossResult(yes|还好)->continueQuit\n" +
        "talkBossResult(no|不要提了)->hasFound\n" +
        "continueQuit(yes)->wouldRegret\n" +
        "continueQuit(no)->later\n").split("\n"),
            nodeMap = [], flowMap = [];
        flowNodes.forEach(function (node) {
            if (node.indexOf("=>") != -1) {
                //说明是节点定义
                var arr = node.split("=>");
                var defs = arr[1].split(":");
                var type = defs[0].trim();
                nodeMap[arr[0].trim()] = {type: type, word: defs[1].trim()};
                if (type == "start")
                    flowMap["start"] = nodeMap[arr[0].trim()];
                else if (type == "end")
                    flowMap["end"] = nodeMap[arr[0].trim()];
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
        this.state = {nodeMap, flowMap};
    }

    openModal(){

    }

    render(){
        return (
            <MainBox onClick={this.openModal}></MainBox>
        )
    }
}