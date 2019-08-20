import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';
import { Router } from '@angular/router';
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
    @ViewChild('userNameInput', {static: false}) userNameInput: ElementRef<HTMLInputElement>;
    loginForm: FormGroup; // indica o formulario q estamos trabalhando

    /**
     *
     * @param formBuilder // auxilia na manipulacao do formulario,
     *                          validacao e buscar os campos
     */
    constructor(private formBuilder: FormBuilder,
                private authService: AuthService,
                private router: Router,
                private platformService: PlatformService) {}
    ngOnInit(): void {
        this.loginForm = this.formBuilder.group({
            userName: ['', Validators.required], // propriedade do component formControlName
            password: ['', Validators.required],
        });
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
                    () => this.router
                            .navigate(['user', userName]),
                            // .navigateByUrl('/user/' + userName),
                    err => {
                        console.log(err);
                        this.loginForm.reset();
                        this.platformService.isPlatformBrowser() &&
                            this.userNameInput.nativeElement.focus(); // direciona o focus para elemento html
                        alert('Invalid username or password!');
                    }
                );
    }
}
