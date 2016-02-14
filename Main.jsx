import React from 'react';
import { createSelector } from 'reselect';
import actions from './actions';
import { connect } from 'react-redux';
import Typing  from './typing';

//显示问题区
const Main = ({info,result,dispatch})=>(
    <div id="container">
        <div onClick={e=>{dispatch(actions.start());dispatch(actions.answerAll({}))}} className="mainbox-wrap">
            <MainBox info={info} className={result.mainBoxStyle}/>
        </div>
        <ModalBox />
    </div>
);
Main.propTypes = {info: React.PropTypes.string.isRequired};
Main.defaultProps = {info: "默认:该不该辞职呢?"};
const MainBox = (props)=>React.DOM.button({className: "center main_box"}, props.info);
const selector =
        state => ({
            info: state ? state.get('info') : '流动性比利润更重要！',
            result: state ? state.get('result') : {mainBoxStyle:''}
        });
export default connect(selector)(Main)



//弹出框
class _modalBox extends React.Component {

    render(){
        const { showModal, typed, curNode, dispatch } = this.props;
        //new Typing(this.refs.title).start(this.props.curNode.word,()=>this.props.dispatch(actions.end()));
        return (
            <div id="modal-overlay"
                 style={{display:!!showModal?'block':'none',opacity:!!showModal?1:0,transition:'all 1s'}}>
                <div className="modal-data" id="modal-data">
                    <button id="x" onClick={e=>dispatch(actions.pause())} className="close">&times;</button>
                    <p id="title" style={{'textAlign':curNode.type==='end'?'left':'center'}}>
                    </p>
                    <p className="btn-group">
                        <button id="yes" onClick={e=>dispatch(actions.answerAll({curState:'yes'}))}
                                className="yes" disabled={!typed}
                                style={{display:curNode.type == "condition" ? 'inline' : 'none'}}>
                            {curNode.yesWord || "Yes"}
                        </button>
                        <span>&nbsp;&nbsp;&nbsp;</span>
                        <button id="no" onClick={e=>dispatch(actions.answerAll({curState:'no'}))}
                                className="no" disabled={!typed}
                                style={{display:curNode.type == "condition" ? 'inline' : 'none'}}>
                            {curNode.noWord || "No"}
                        </button>
                        <button id="next" onClick={e=>dispatch(actions.answerAll({curState:'next'}))}
                                style={{display: 'none'}}
                                className="yes" disabled={!typed}
                                style={{display:curNode.type == "condition" ? 'none' : 'inline'}}>下一步
                        </button>
                    </p>
                </div>
            </div>
        );
    }
};
const selectorModal =
        state => ({
            showModal: state ? state.get('showModal') : false,
            curNode: state ? state.get('curNode') || {title:""} : {title:""},
            typed: state && state.get('typed')
        });
const ModalBox = connect(selectorModal)(_modalBox);