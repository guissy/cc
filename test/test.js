import {expect} from 'chai';
import React from 'react';
import sd from 'skin-deep';
import {jsdom} from 'jsdom';
jsdom
import Main from '../main.jsx';
// init jsdom

document = global.document = jsdom();
global.window = global.document.defaultView;
global.navigator = global.window.navigator;

describe("Main",()=>{
   it("#state.flowNodes not null", ()=>{
       const main = sd.shallowRender(React.createElement(Main,{}));
       console.dir(main.text())
       //expect(main.state).to.exist();
       //expect(Object.size(main.state)).to.be(2);
       //expect(main.state).to.have.property('nodeMap').with.length.above(1);
       //expect(main.state).to.have.property('flowMap').with.length.above(1);
   })

});


