import actions from "../actions";
import chai,{expect} from "chai";
import Immutable from "immutable";
import storm from "../store";
import _ from "lodash";

describe("store",()=>{
    it("#init",()=>{
        expect(storm.getState().toArray()).to.length(4);
        expect(storm.getState().toObject()).all.keys(["flowMap","nodeMap","info","showModal"]);
        expect(storm.getState().get('info')).to.contain("该不该辞职呢？");
        expect(storm.getState().get('showModal')).to.be.false;
    });
    it("#dispatch(start|pause)",()=>{
        expect(storm.getState().get("showModal")).to.be.false;
        storm.dispatch(actions.start());
        expect(storm.getState().get("showModal")).to.be.true;
        storm.dispatch(actions.pause());
        expect(storm.getState().get("showModal")).to.be.false;
    });

    it("#firstNode",()=>{
        const firstNode = storm.getState().get("nodeMap")['st'];
        const fn = actions.answerAll({curState:"yes"});
        const promise = fn(storm.dispatch);
        storm.dispatch(fn);
        return promise.then(()=>{
            const curNode = storm.getState().get('curNode');
            console.log(storm.getState().get("curNode"));
            expect(firstNode).to.be.deep.equal(curNode);
            expect(firstNode).to.be.exist;
            expect(curNode).to.be.exist;
        });
    });

    it("#lastNode",()=>{
        const lastNode = storm.getState().get("nodeMap").pop();
        let btn = "next";
        const max = 9999;
        let curNode = null;
        for(let i = 0; i<max; i++) {
            const n = _.sample(1,3);
            switch (n) {
                case 1:
                    btn = "yes";
                    break;
                case 2:
                    btn = "no";
                    break;
                default:
                    btn = "next";
            }
            storm.dispatch(actions.answerAll({curState:btn}));
            curNode = storm.getState().get('curNode');
            if(Immutable.Map(lastNode).equals(curNode)){
                break;
            }
        }
        //console.log(storm.getState().toJS())
        if(Immutable.Map(lastNode).equals(curNode)){
            console.info("点击了 "+i+" 次到结束了");
            expect(i).to.within(1,2);
        } else {
            expect(lastNode).to.deep.equal(curNode);
            //console.log(curNode)
            //console.log(lastNode)
            expect(curNode).to.exist;
            expect(lastNode).to.exist;
            expect(lastNode.type).to.contain('end');
        }

    });

});

