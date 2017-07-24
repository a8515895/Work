import { Directive, HostBinding, HostListener } from '@angular/core';

@Directive({ selector: '[collapse]', exportAs: 'collapse' })
export class CollapseDirective {
    @HostBinding('class.isCollapse') isCollapse: boolean = false;
    @HostListener('click',['$event.target.id']) toggle(element) {
        if(element==="btnSlide")
        this.isCollapse = !this.isCollapse;
    }
}