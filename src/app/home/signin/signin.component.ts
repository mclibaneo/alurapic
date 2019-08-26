import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { PlatformService } from 'src/app/core/platform-detector/platform-detector.service';

@Component({
    // nao possui selector pois so vai ser usado uma unica vez
    templateUrl: './signin.component.html'
})
export class SignInComponent implements OnInit {
    /**
     * O ElementRef é o que chamamos de wrapper,
     * uma "embalagem" que o Angular usa nos elementos do DOM
     * a serem trabalhados.
     * Usando o ViewChild estamos manipulando o DOM diretamente,
     * o que nao eh uma boa pratica
     */
    @ViewChild('userNameInput', {static: true}) userNameInput: ElementRef<HTMLInputElement>;
    loginForm: FormGroup; // indica o formulario q estamos trabalhando
    fromUrl: string // url enviada pelo queryParams

    /**
     *
     * @param formBuilder // auxilia na manipulacao do formulario,
     *                          validacao e buscar os campos
     */
    constructor(private formBuilder: FormBuilder,
                private authService: AuthService,
                private router: Router,
                private platformService: PlatformService,
                private activetedRoute: ActivatedRoute) {}
    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            userName: ['', Validators.required], // propriedade do component formControlName
            password: ['', Validators.required],
        });

        // obtem valor da queryParam ['fromUrl'] e a insere em this.fromUrl
        this.activetedRoute.queryParams.subscribe(params => this.fromUrl = params.fromUrl);

        // para colocar o autofocus no input do formulario
        // tslint:disable-next-line: no-unused-expression
        this.platformService.isPlatformBrowser() &&
            this.userNameInput.nativeElement.focus();
    }

    /**
     * atraves do event binding do template (submit)
     * chamamos este metodo e o executamos
     */
    login() {
        const userName = this.loginForm.get('userName').value;
        const password = this.loginForm.get('password').value;
        /**
         * se o usuario for autenticado com sucesso realizad o subscribe login
         * caso nao de certo o segundo parametro do subscribe eh uma funcao de callback
         * informando o erro
         */
        this.authService
                .authenticate(userName, password)
                .subscribe(
                    () => {
                        if (this.fromUrl) {
                            this.router.navigateByUrl(this.fromUrl);
                        } else {
                            this.router.navigate(['user', userName]); // .navigateByUrl('/user/' + userName),
                        }
                    },
                    err => {
                        console.log(err);
                        this.loginForm.reset();
                        // tslint:disable-next-line: no-unused-expression
                        this.platformService.isPlatformBrowser() &&
                            this.userNameInput.nativeElement.focus(); // direciona o focus para elemento html
                        alert('Invalid username or password!');
                    }
                );
    }
}
