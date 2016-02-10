import chai,{expect} from 'chai';
import React from 'react';
import sd from 'skin-deep';
import {jsdom} from 'jsdom';
import Main,{MainBox} from '../main.jsx';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import colors from 'colors/safe';
import TestUtils from 'react-addons-test-utils';
import ReactDOMServer from 'react-dom/server';
import ReactElement from 'react/lib/ReactElement';


// init jsdom
chai.should();
chai.use(sinonChai);
document = global.document = jsdom();
global.window = global.document.defaultView;
global.navigator = global.window.navigator;
// take all properties of the window object and also attach it to the
// mocha global object
propagateToGlobal(global.window);

// from mocha-jsdom https://github.com/rstacruz/mocha-jsdom/blob/master/index.js#L80
function propagateToGlobal (window) {
    for (let key in window) {
        if (!window.hasOwnProperty(key)) continue
        if (key in global) continue

        global[key] = window[key]
    }
}

describe("Main", ()=> {
    let mainElement, main, mainSD, sandbox,data={info:'你应该辞职吗?'};
    before(()=> {
        mainElement = React.createElement(Main, data);
        main = TestUtils.renderIntoDocument(mainElement);
    });
    beforeEach(() => {
        sandbox = sinon.sandbox.create();
    });
    afterEach(() => {
        sandbox.restore();
    });
    it("#main is a element created", ()=>{
        expect(TestUtils.isElement(mainElement)).to.be.true; //ReactElement
        expect(TestUtils.isElementOfType(mainElement,Main)).to.be.true;
        expect(TestUtils.isDOMComponent(mainElement)).to.be.false;
        expect(TestUtils.isDOMComponentElement(mainElement)).to.be.false;
        expect(TestUtils.isCompositeComponent(mainElement)).to.be.false;
        expect(TestUtils.isCompositeComponentWithType(mainElement,Main)).to.be.false;


        expect(TestUtils.isElement(main)).to.be.false; //渲染后为 ReactCompoment
        expect(TestUtils.isElementOfType(main,Main)).to.be.false;
        expect(TestUtils.isDOMComponent(main)).to.be.false; //可以ReactText
        expect(TestUtils.isDOMComponentElement(main)).to.be.false; //仅tagName

        expect(TestUtils.isDOMComponent(TestUtils.findRenderedDOMComponentWithTag(main, "div"))).to.be.true;
        expect(TestUtils.isDOMComponent(TestUtils.findRenderedDOMComponentWithTag(main, "button"))).to.be.true;
        expect(TestUtils.isCompositeComponent(TestUtils.findRenderedComponentWithType(main, MainBox))).to.be.true;
        expect(TestUtils.isCompositeComponentWithType(TestUtils.findRenderedComponentWithType(main, MainBox),MainBox)).to.be.true;

        expect(TestUtils.isCompositeComponent(main)).to.be.true;
        expect(TestUtils.isCompositeComponentWithType(main,Main)).to.be.true;
    });
    it("#props info must be a string", ()=> {
        expect(main).to.have.property('props');
        expect(main.props).to.contain({'info': data.info});
        expect(main.props.info).to.be.a('string');
        expect(main.props.info.length).to.within(1,30);
        expect(main.props).to.have.property('info',data.info);
        expect(Object.keys(main.props)).with.length(1);
    });
    it("#button has same string", ()=> {
        var mainBox = TestUtils.findRenderedComponentWithType(main, MainBox);
        var button = React.findDOMNode(mainBox);
        expect(mainBox).to.be.an('object');
        expect(button.innerHTML).to.equal(data.info);
        expect(TestUtils.isDOMComponent(button)).to.be.true;
    });
    it("#button click", ()=> {
        var div = TestUtils.findRenderedDOMComponentWithTag(main, "div");
        //console.log(button)
        let sessionStub = sandbox.stub(main._reactInternalInstance._instance, "openModal");
        TestUtils.Simulate.click(div);
        TestUtils.Simulate.click(div);
        expect(sessionStub).to.have.been.calledOnce;
    });



});
describe("Main shadow", ()=> {
    let instance, tree, mainbox, sandbox;
    before(()=> {
    });
    beforeEach(() => {
        sandbox = sinon.sandbox.create();
        tree = sd.shallowRender(React.createElement(Main,Object.assign({info:'辞职'},global.window)));
        mainbox = sd.shallowRender(React.createElement(MainBox,Object.assign({info:'辞职'},global.window)));
        instance = tree.getMountedInstance();
    });
    afterEach(() => {
        sandbox.restore();
    });

    it("#subTree.text", ()=> {
        //instance 可直接访问state 和直接调用方法
        expect(mainbox.subTree('button').text()).to.be.equal('辞职');
    });

    it("#instance.state", ()=> {
        //instance 可直接访问state 和直接调用方法
        expect(instance.state).to.be.an('object');
        expect(instance.state).not.to.be.empty;
    });

    it("#instance.call()", ()=> {
        //instance 可直接访问state 和直接调用方法
        expect(instance.openModal()).to.be.undefined;
    });

    it("#instance no MainBox", ()=> {
        //instance 只有Main自己,没有MainBox
        const div = TestUtils.scryRenderedComponentsWithType(instance, MainBox);
        expect(div).to.with.length(0);
        const doms = TestUtils.findAllInRenderedTree(instance, ()=>true);
        expect(doms.pop()).to.be.null;
        expect(doms).to.with.length(1);
    });

    it("#output is a Element, not Rendered", ()=> {
        //tree 只能返回一个 Element
        const output = tree.getRenderOutput();
        expect(TestUtils.isElement(output)).to.be.true;
        expect(TestUtils.isDOMComponent(output)).to.be.false;
        expect(TestUtils.isDOMComponentElement(output)).to.be.false;
    });


});
function checkType(src,type){
    var result = [];
    if(!!src && TestUtils.isElement(src)) {
        result.push("Element");
    }
    if(!!src && TestUtils.isDOMComponent(src)) {
        result.push("DOMComponent");
    }
    if(!!src && TestUtils.isDOMComponentElement(src)) {
        result.push("DOMComponentElement");
    }
    if(!!type && TestUtils.isElementOfType(src,type)) {
        result.push(Type + "Element");
    }
    if (!!src && TestUtils.isCompositeComponent(src)) {
        result.push("CompositeComponent");
        result.push(TestUtils.findAllInRenderedTree(src,()=>true));
    }
    if (!!type && TestUtils.isCompositeComponentWithType(src,type)) {
        result.push(type + "CompositeComponent");
    }
    if (!!type && TestUtils.isCompositeComponentElementWithType(src, type)) {
        result.push(type + "CompositeComponentElement");
    }
    var list = TestUtils.getRenderedChildOfCompositeComponent(src);
    if (!!type && list.length>0) {
        result.push(list);
    }
    return result;
}

