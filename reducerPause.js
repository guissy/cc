import Immutable from 'immutable'

export default function pause(data) {
    data = data.set('showModal',false);
    data = data.set('info','你还没有回答完整, 继续...');
    return data;
}