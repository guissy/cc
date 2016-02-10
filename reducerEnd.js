import Immutable from 'immutable'

export default function end(data) {
    data = data.set('showModal',false);
    data = data.set('info',"辞职吧!Good Luck!");
    return data;
}