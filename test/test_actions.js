import actions from "../actions";
import chai,{expect} from "chai";
import Immutable from "immutable";
import storm from "../store"

describe("action creator",()=>{
    it("#size",()=>{
        expect(Object.keys(actions)).to.with.length(5);
    });
    it("#type",()=>{
        const arr = Immutable.Map(actions).map((v,k)=>
            typeof v()==='object'?
            k===v().type //直接返回 typelike
                :v()(storm.dispatch) instanceof Promise //返回function,而不是typelike
        );
        expect(arr.toArray().every(v=>v)).to.be.true;
    });

});

