import { Directive, Input, ElementRef, Renderer2, OnInit } from '@angular/core';
import { Photo } from '../../photo/photo';
import { UserService } from 'src/app/core/user/user.service';

@Directive({
    selector: '[photoOwnerOnly]'
})
export class PhotoOwnerOnlyDirective implements OnInit {
    @Input() ownerPhoto: Photo;
    constructor(private el: ElementRef,
                private userService: UserService,
                private renderer: Renderer2) {}
    ngOnInit(): void {
        this.userService
                .getUser()
                .subscribe(user => {
                    if (!user || user.id !== this.ownerPhoto.userId ) {
                        this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
                    }
                });
    }

}
