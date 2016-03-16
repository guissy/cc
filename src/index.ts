
import {Component,Injectable,provide,ViewChild,AfterViewInit} from "angular2/core";
import {bootstrap} from "angular2/platform/browser";
import {NgIf,NgFor,NgModel,NgSwitch,NgSwitchDefault,NgSwitchWhen} from "angular2/common";
import {MyFade} from "./myFade";
// const Rx = require('rx');
import * as _ from "lodash";
import './assets/style.scss';
import {MyFlow} from "./myFlow";
// console.log(css);

enum BoardStatus {
    todo=0,
    doing=1,
    done=2
}
@Component({
    selector: "#container",
    template: `
        <div>
            <button id="question-btn" (click)="toggleModal()" class="center main_box">
                <span [ngSwitch]="boardStatus">
                    <span *ngSwitchWhen = "BOARD_STATUS.done"> 辞职吧!Good Luck! </span>
                    <span *ngSwitchWhen = "BOARD_STATUS.doing"> 你还没有回答完整, 继续... </span>
                    <span *ngSwitchDefault> 该不该辞职呢? </span>
                </span>
            </button>
        </div>
        <div id="modal-overlay" *ngIf="showModal" my-fade #modal="mf" (ended)="removeModal()">
            <div class="modal-data" id="modal-data" 
                my-flow #flow="theflow" 
                (pause)="pauseModal()" (finish)="finishModal()">
                <button id="x" (click)="toggleModal(false,boardStatus)" class="close">&times;</button>
                <p id="title">确定吗?</p><p>{{flow.waitingResult}}</p>
    
                <p class="btn-group" *ngIf="!flow.waitingResult">
                    <button id="yes" (click)="flow.yes()" class="yes">是的</button>
                    <span>&nbsp;&nbsp;&nbsp;</span>
                    <button id="no" (click)="flow.no()" class="no">不是</button>
                    <button id="next" (click)="flow.next()" style="display: none" class="yes">下一步</button>
                </p>
            </div>
        </div>
    `,
    directives:[MyFade,MyFlow],
})
export class CcApp implements AfterViewInit{
    @ViewChild(MyFade) mf:MyFade;
    showModal:boolean = false;
    boardStatus:BoardStatus = BoardStatus.todo;
    BOARD_STATUS:typeof BoardStatus = BoardStatus;
    toggleModal(show:boolean = true, status:BoardStatus = BoardStatus.todo){
        var prev = this.showModal;
        if(!this.showModal)
            this.showModal = show;
        // debugger;
        _.defer(function (context) {
            if(!_.isNil(context.mf)) {
                context.mf.toggle(!prev);
            }
        }, this);
    }

    removeModal(){
        this.showModal=false;
    }
    pauseModal(){
        this.boardStatus=BoardStatus.doing;
    }
    finishModal(){
        this.boardStatus=BoardStatus.done;
        this.toggleModal(false,this.boardStatus)
    }
    ngAfterViewInit() {
        console.log(`${('\u2665\u2661').repeat(30)}`, this.BOARD_STATUS);
    }
    ngAfterViewChecked() {
    }
}

bootstrap(CcApp).catch(err=>console.error(err));
