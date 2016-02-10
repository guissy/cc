const actionNames = 'start pause answer end', actionMap = {};
actionNames.split(' ').forEach((v)=>{actionMap[v]=(data)=>({type:v, data:data})});

actionMap.answerAll = (data)=>(dispatch)=>Promise.resolve().then(()=>{
        data.promise = Promise.defer();
        dispatch(actionMap.answer(data));
        return data.promise.promise;
    }
).then((data)=>data==="end"?dispatch(actionMap.end()):console.log("完成: "+data));
export default actionMap;
