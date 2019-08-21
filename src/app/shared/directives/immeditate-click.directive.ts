import { Directive, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { PlatformService } from 'src/app/core/platform-detector/platform-detector.service';

@Directive({selector: '[immediateClick]'})
export class ImmediateClickDirective implements OnInit {
    constructor(private el: ElementRef<any>,
                private platformService: PlatformService) {}
    ngOnInit(): void {
        // tslint:disable-next-line: no-unused-expression
        this.platformService.isPlatformBrowser &&
            this.el.nativeElement.click();
    }
}
