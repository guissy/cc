import Immutable from 'immutable';
import Typing from './typing';
//const typing = new Typing(document.querySelector("#title"));
export default function answer(data,action) {
    var nextNode = null;
    var curNode = data.get('curNode');
    var nodeMap = data.get('nodeMap');
    //console.log(curNode,action);
    if(!!curNode) {
        var curState = action.data['curState'];
        //console.log(curNode.type,curState);
        if (curNode.type == "condition" && curState == "yes") {
            nextNode = nodeMap[curNode.yes];
        } else if (curNode.type == "condition" && curState == "no") {
            nextNode = nodeMap[curNode.no];
        } else if (curNode.type == "condition" && (curState == ""||curState == null)) {
            nextNode = curNode; //重复当前
        } else {
            nextNode = nodeMap[curNode.next]; //直接下一步 即curState == "next"
            curState = "";
        }
    } else {
        nextNode = data.get('flowMap')["start"];
    }
    curNode = updateNode(nextNode,action.data ? action.data.promise : {});
    data = data.set('curNode', curNode);
    data = data.set('typed', false);//正在输出中
    return data;
}
function updateNode(nextNode,promise) {
    var curNode = null;
    if (nextNode.type == "end") {
        new Promise(function (resolve) {
            new Typing(document.querySelector("#title")).dooot(resolve);
        }).then(function () {
            curNode = null;
            promise && promise.resolve("end");
            document.body.style.height = window.outerHeight + "px";
            document.querySelector('body').className = 'result';
        });
    } else {
        console.log(document.querySelector("#title"))
        new Typing(document.querySelector("#title")).start(nextNode.word,()=>promise && promise.resolve(""));
        curNode = nextNode;
    }
    console.log(curNode)
    return curNode;
}