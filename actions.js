const actionNames = 'start pause answer end endAll', actionMap = {};
actionNames.split(' ').forEach((v)=>{actionMap[v]=(data)=>({type:v, data:data})});

actionMap.answerAll = (data)=>(dispatch,getState)=>Promise.resolve().then(()=>{
        data.promise = Promise.defer();
        dispatch(actionMap.answer(data));
        return data.promise.promise;
    }
).then((data)=>{
    console.log(data);
    return data==="end"?dispatch(actionMap.endAll()):dispatch(actionMap.end())
});
export default actionMap;
