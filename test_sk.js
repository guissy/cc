var React = require('react');
var ReactDOMServer = require('react-dom/server');
var sd = require('skin-deep');
var TestUtils = require('react-addons-test-utils');
// init jsdom
var Div = React.createClass({
    render:function(){
        return (
            React.DOM.div({className:"div"},"流动性比利润更重要！")
        )
    }

});
var Img = React.createClass({
    render:()=>
        React.DOM.img({className:"img"},"流动性比利润更重要！")
});

var ss = React.createElement(Div, null, 'content');
const main = sd.shallowRender(ss);
console.log(ReactDOMServer.renderToString(main.getRenderOutput()));
const instance = main.reRender(ss);
console.log(ReactDOMServer.renderToString(main.getRenderOutput()));
console.log(instance)
var sub = main.subTree("img");
setTimeout(console.log,1000,sub)
setTimeout(console.log,1500,main.findNode("img"))
setTimeout(console.log,2000,333)

