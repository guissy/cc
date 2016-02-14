import Immutable from 'immutable'

export function endAll(data) {
    data = data.set('showModal',false);
    data = data.set('info',"辞职吧!Good Luck!");
    data = data.set('result',{
        mainBoxStyle: {color: "#FF0000",opacity:1},
        bodyClassName: "result"
    });
    return data;
}
export default function end(data) {
    data = data.set('typed',true);
    console.log("dispatched end!!!!");
    return data;
}