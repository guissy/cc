import React from 'react';
import {TransitionMotion,StaggeredMotion, Motion, spring, presets} from 'react-motion';
export default React.createClass({
    getInitialState() {
        return {
            curNode:{word:"流动性比利润更重要！"},
            items: [{key: 'a', size: 10}, {key: 'b', size: 20}],
        };
    },
    componentDidMount() {
        this.setState({
            curNode:{word:"恭喜你答对了！！"},
            items: [{key: 'a', size: 60}, {key: 'b', size: 20}], // remove c.
        });
    },
    willLeave() {
        // triggered when c's gone. Keeping c until its width/height reach 0.
        console.log("fun")
        return {width: spring(0), height: spring(0)};
    },
    render() {
        let curNode = this.state.curNode;
        return (
            <div>
                <TransitionMotion
                    willEnter={()=>console.log('okkkkkkk')}
                    willLeave={()=>({color:'#00f',n:1})}
                    defaultStyles={[{key:curNode.word,style:{n:0}}]}
                    styles={[{
          key: curNode.word,
          style: {n: spring(curNode.word.length)}
        }]}>
                    {values => <span>
                                {values.map( value=>
                                    <span key={value.key}>{curNode.word?curNode.word.substr(0,(value.style.n+0.5)>>0):''}</span>
                                )}
                            </span>}
                </TransitionMotion>
                <StaggeredMotion
                    defaultStyles={[{h: 0}, {h: 0}, {h: 0}]}
                    styles={prevInterpolatedStyles => prevInterpolatedStyles.map((_, i) => {
    return i === 0
      ? {h: spring(100)}
      : {h: spring(prevInterpolatedStyles[i - 1].h)}
  })}>
                    {interpolatingStyles =>
                        <div>
                            {interpolatingStyles.map((style, i) =>
                                <div key={i} style={{border: '1px solid', height: style.h}} />)
                            }
                        </div>
                    }
                </StaggeredMotion>
            <TransitionMotion
                willLeave={()=>console.log('ok')}
                styles={this.state.items.map(item => ({
          key: item.key,
          style: {width: item.size, height: item.size},
        }))}>
                {interpolatedStyles =>
                    // first render: a, b, c. Second: still a, b, c! Only last one's a, b.
                    <div>
                        {interpolatedStyles.map(config => {
                            return <div key={config.key} style={Object.assign({},config.style,{border: '1px solid'})} ></div>
                        })}
                    </div>
                }
            </TransitionMotion>
                </div>
        );
    },
});