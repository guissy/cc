import answer from './reducerAnswer';
import pause from './reducerPause';
import start from './reducerStart';
import end,{endAll} from './reducerEnd';
const actionFnMap = {answer,start,pause,end,endAll};
export default (state, action)=>{
    var fn = actionFnMap[action.type];
    if(typeof fn === 'function') {
        return fn(state,action);
    } else {
        //console.dir(state);
        console.info(action.type);
        return state;
    }
};