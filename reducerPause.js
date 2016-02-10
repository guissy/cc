import Immutable from 'immutable'

export default function pause(data) {
    data = data.set('showModal',false);
    return data;
}