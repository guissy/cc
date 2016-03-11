import {Directive, ElementRef, Injectable, Input, Output} from "angular2/core";
import {AnimationBuilder} from "angular2/src/animate/animation_builder";
import * as _ from "lodash";
import {EventEmitter} from 'angular2/core';


// require('angular2/src/animate/animation_builder');
// require('angular2/core');

// directive
// selector:"[my-fade]",
// injectables:[AnimationBuilder,ElementRef]
@Directive({
    selector:"[my-fade]",
    exportAs:"mf"
})

@Injectable()
export class MyFade {
    // @Input() end:Function;
    @Output() ended:any = new EventEmitter();
    constructor(private _ab: AnimationBuilder, private _e: ElementRef) {
        _e.nativeElement.style.backgroundColor = "#222222";
    }
    toggle(isVisible:boolean=false){
        const animation = this._ab.css();
        animation.setDuration(1000);
        console.log(isVisible,'isVisible');
        if(isVisible){
            animation.setFromStyles({opacity:0}).setToStyles({opacity:1})
            animation.start(this._e.nativeElement);
        } else {
            animation.setFromStyles({opacity:1}).setToStyles({opacity:0})
            animation.start(this._e.nativeElement).onComplete(()=>this.ended.emit(null));
        }
    }
}