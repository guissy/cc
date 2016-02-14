import actions from "./actions"
export default function start(data) {
    //
    //console.dir(data);
    data = data.set('showModal',true);
    data = data.set('result',{
        mainBoxStyle: {color: "#FF0000",opacity:0},
        bodyClassName: "result"
    });
    return data;
}