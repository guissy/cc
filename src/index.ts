
import {Component,Injectable,provide,ViewChild,AfterViewInit} from "angular2/core";
import {bootstrap} from "angular2/platform/browser";
import {NgIf,NgFor,NgModel,NgSwitch} from "angular2/common";
import {MyFade} from "./myFade";
// const Rx = require('rx');
import * as _ from "lodash";
import './assets/style.scss';
// console.log(css);
@Component({
    selector: "#container",
    template: `
        <div>
            <button id="question-btn" (click)="toggleModal()" class="center main_box">
                该不该辞职呢?
            </button>
        </div>
    <div id="modal-overlay" *ngIf="showModal" my-fade #modal="mf" (ended)="showModal=false">
        <div class="modal-data" id="modal-data">
            <button id="x" (click)="toggleModal()" class="close">&times;</button>
            <p id="title">确定吗?</p>

            <p class="btn-group">
                <button id="yes" onclick="yes()" class="yes">是的</button>
                <span>&nbsp;&nbsp;&nbsp;</span>
                <button id="no" onclick="no()" class="no">不是</button>
                <button id="next" onclick="next()" style="display: none" class="yes">下一步</button>
            </p>
        </div>
    </div>
    `,
    directives:[MyFade]
})

export class CcApp implements AfterViewInit{
    @ViewChild(MyFade) mf:MyFade;
    showModal:boolean = false;
    toggleModal(){
        var prev = this.showModal;
        if(!this.showModal) 
            this.showModal = true;
        // debugger;
        _.defer(function (context) {
            if(!_.isNil(context.mf)) {
                context.mf.toggle(!prev);
            }
        }, this);
    }
    ngAfterViewInit() {
    }
    ngAfterViewChecked() {
    }
}

bootstrap(CcApp).catch(err=>console.error(err));
