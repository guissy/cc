import Immutable from 'immutable';
import Typing from './typing';
//const typing = new Typing(document.querySelector("#title"));
export default function answer(data,action) {
    var nextNode = null;
    var curNode = data.get('curNode');
    var nodeMap = data.get('nodeMap');
    console.log(curNode,action);
    if(!!curNode) {
        var curState = action.data['curState'];
        console.log(curNode.type,curState);
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
            //questionBtn.style.backgroundColor = "#FEF2A6";
            //questionBtn.style.color = "#FF0000";
            //questionBtn.style.opacity = 0;
            //modalPromise.resolve(nextNode.word);
            //document.body.className = "result";
        });
        document.querySelector('#modal-overlay .btn-group').style.display = 'none';
    } else {
        promise && promise.resolve("");
        document.querySelector("#title").innerText = "";//nextNode.word;
        new Typing(document.querySelector("#title")).start(nextNode.word);
        document.querySelector('#modal-overlay .btn-group').style.display = 'block';

        document.querySelector('#next').style.display = nextNode.type == "condition" ? 'none' : '';
        document.querySelector('#yes').style.display = nextNode.type == "condition" ? '' : 'none';
        document.querySelector('#no').style.display = nextNode.type == "condition" ? '' : 'none';

        document.querySelector('#yes').innerText = nextNode.yesWord || "Yes";
        document.querySelector('#no').innerText = nextNode.noWord || "No";
        curNode = nextNode;
    }
    return curNode;
}