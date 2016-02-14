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

