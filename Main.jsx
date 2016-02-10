import React from 'react';
import { createSelector } from 'reselect';
import actions from './actions';
import { connect } from 'react-redux';

//显示问题区
const Main = ({info,dispatch})=>(
    <div id="container">
        <div onClick={e=>{dispatch(actions.start());dispatch(actions.answerAll({}))}} className="mainbox-wrap">
            <MainBox info={info}/>
        </div>
        <ModalBox />
    </div>
);
Main.propTypes = {info: React.PropTypes.string.isRequired};
Main.defaultProps = {info: "默认:该不该辞职呢?"};
const MainBox = (props)=>React.DOM.button({className: "center main_box"}, props.info);
const selector =
        state => ({
            info: state ? state.get('info') : '流动性比利润更重要！'
        });
export default connect(selector)(Main)



//弹出框
const _modalBox = ({showModal,curNode,dispatch})=>(
    <div id="modal-overlay" style={{display:!!showModal?'block':'none',opacity:!!showModal?1:0,transition:'all 1s'}}>
        <div className="modal-data" id="modal-data">
            <button id="x" onClick={e=>dispatch(actions.pause())} className="close">&times;</button>
            <p id="title">{curNode.title}</p>
            <p className="btn-group">
                <button id="yes" onClick={e=>dispatch(actions.answerAll({curState:'yes'}))} className="yes">是的</button>
                <span>&nbsp;&nbsp;&nbsp;</span>
                <button id="no" onClick={e=>dispatch(actions.answerAll({curState:'no'}))} className="no">不是</button>
                <button id="next" onClick={e=>dispatch(actions.answerAll({curState:'next'}))} style={{display: 'none'}} className="yes">下一步</button>
            </p>
        </div>
    </div>
);
const selectorModal =
        state => ({
            showModal: state ? state.get('showModal') : false,
            curNode: state ? state.get('curNode') || {title:""} : {title:""}
        });
const ModalBox = connect(selectorModal)(_modalBox);