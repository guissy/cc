import actions from "./actions"
export default function start(data) {
    //
    console.dir(data);
    data = data.set('showModal',true);
    return data;
}