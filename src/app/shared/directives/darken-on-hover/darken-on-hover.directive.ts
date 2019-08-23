/**
 * Todo componente é uma diretiva. 
 * A diferença é que @Component, por exemplo, 
 * está atrelado a um template, 
 * o que não ocorre com a diretiva.
 */
import { Directive, ElementRef, HostListener, Renderer, Input } from '@angular/core';

@Directive({
    selector: '[apDarkenOnHover]'
})
export class DarkenOnHoverDirective {

    @Input() brightness = '70%'; // parametro da diretiva

    /**
     * 
     * @param el indica qual elemento queremos trabalhar
     * @param render eh utilizado
     */
    constructor(    private el: ElementRef,
                    private render: Renderer) {}

    @HostListener('mouseover') // escuta o event do elemento indicado por el
    darkenOn() {
        this.render.setElementStyle(this.el.nativeElement, 'filter', `brightness(${this.brightness})`);
    }

    @HostListener('mouseleave')
    darkenOff() {
        this.render.setElementStyle(this.el.nativeElement, 'filter', 'brightness(100%)');
    }
}
