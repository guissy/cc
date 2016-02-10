import { createStore,applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'
import answer from './reducerAnswer';
import pause from './reducerPause';
import start from './reducerStart';
import end from './reducerEnd';

import Immutable from 'immutable';
import flow_data from './flow_data';

const nodes = flow_data.split("\n");
nodes.shift();
nodes.pop();

const flowNodes = Immutable.List(nodes);
const nodeMap = [], flowMap = [];
flowNodes.forEach(function (node) {
    if (node.includes("=>")) {
        //说明是节点定义
        var arr = node.split("=>");
        var key = arr[0].trim();
        var defs = arr[1].split(":");
        var type = defs[0].trim();
        nodeMap[key] = {type: type, word: defs[1].trim()};
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

const actionFnMap = {answer,start,pause,end};
const state = Immutable.Map({nodeMap,flowMap,
    info:flowMap['start'].word,
    showModal:false
});
let reducers = (state, action)=>{
    var fn = actionFnMap[action.type];
    if(typeof fn === 'function') {
        return fn(state,action);
    } else {
        console.dir(state);
        console.info(action.type);
        return state;
    }
};
export default applyMiddleware(thunkMiddleware)(createStore)(reducers, state);