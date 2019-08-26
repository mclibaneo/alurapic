import { Directive, OnInit, ElementRef, Renderer2 } from '@angular/core';
import { UserService } from 'src/app/core/user/user.service';

@Directive({
    selector: '[showIfLogged]'
})
export class ShowIfLoggedDirective implements OnInit {

    currentDsiplay: string;

    constructor(private el: ElementRef,
                private userService: UserService,
                private renderer: Renderer2) {}

    ngOnInit(): void {
        this.currentDsiplay = getComputedStyle(this.el.nativeElement).display; // pega o estilo atual do elemento html
        this.userService.getUser().subscribe(user => {
            if (!user) {
                this.currentDsiplay = getComputedStyle(this.el.nativeElement).display;
                this.renderer.setStyle(this.el.nativeElement, 'display', 'none');
            } else {
                this.renderer.setStyle(this.el.nativeElement, 'display', this.currentDsiplay);
            }
        });
    }
}
/**
 * foi necessario alterar esta classe para evitar que os componentes
 * que nao recarregam apos inicio da aplicacao (por exemplo: header)
 * de mostrar conteudo no qual usuario nao logado nao pode ver
 */
