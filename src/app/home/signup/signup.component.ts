import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { lowerCaseValidator } from 'src/app/shared/validators/lower-case.validator';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { NewUser } from './newUser';
import { SignUpService } from './signup.service';
import { Router } from '@angular/router';

@Component({
    // selector: 'ap-signup', n eh declarado pois n utilizamos em outro lugar
    templateUrl: './signup.component.html'
})
export class SignUpComponent implements OnInit {
    signupForm: FormGroup;
    constructor(private formBuilder: FormBuilder,
                private userValidatorService: UserNotTakenValidatorService,
                private signUpService: SignUpService,
                private router: Router) {}
    ngOnInit(): void {
        this.signupForm = this.formBuilder.group({
            // o 1 param eh o valor padrao
            // o 2 param sao as validacoes
            // o 3 param eh para o validadores assincronos
            email: [
                '',
                [
                    Validators.required,
                    Validators.email
                ]
            ],
            fullName: [
                '',
                [
                    Validators.required,
                    Validators.minLength(2),
                    Validators.maxLength(40)
                ]
            ],
            userName: [
                '',
                [
                    Validators.required,
                    lowerCaseValidator,
                    Validators.minLength(2),
                    Validators.maxLength(30)
                ],
                this.userValidatorService.checkUserNameTaken()
            ],
            password: [
                '',
                [
                    Validators.required,
                    Validators.minLength(8),
                    Validators.maxLength(14)
                ]
            ]
        });
    }

    signup() {
        const newUser = this.signupForm.getRawValue() as NewUser; // o getRawValue retorna todos os campos do formulario com seus valores
        this.signUpService
                .signup(newUser) // realiza cadastro de novo usuario
                .subscribe(
                    () => this.router.navigate(['']), // redireciona novo usuario para pagina de login
                    err => console.log(err)
                );
    }
}
