import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { lowerCaseValidator } from 'src/app/shared/validators/lower-case.validator';
import { UserNotTakenValidatorService } from './user-not-taken.validator.service';
import { NewUser } from './newUser';
import { SignUpService } from './signup.service';
import { Router } from '@angular/router';
import { PlatformService } from 'src/app/core/platform-detector/platform-detector.service';
import { userNamePasswordValidator } from './username-password.validator';

@Component({
    // selector: 'ap-signup', n eh declarado pois n utilizamos em outro lugar
    templateUrl: './signup.component.html',
    providers: [UserNotTakenValidatorService]
})
export class SignUpComponent implements OnInit {
    
    @ViewChild('emailInput', {static: true}) emailInput: ElementRef<HTMLInputElement>;
    signupForm: FormGroup;
    
    constructor(private formBuilder: FormBuilder,
                private userValidatorService: UserNotTakenValidatorService,
                private signUpService: SignUpService,
                private router: Router,
                private platformeService: PlatformService) {}
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
        },
        {
            validator: userNamePasswordValidator
        });

        // tslint:disable-next-line: no-unused-expression
        this.platformeService.isPlatformBrowser() &&
            this.emailInput.nativeElement.focus();
    }

    signup() {
        const newUser = this.signupForm.getRawValue() as NewUser; // o getRawValue retorna todos os campos do formulario com seus valores
        if (this.signupForm.valid && !this.signupForm.pending) {
            this.signUpService
                    .signup(newUser) // realiza cadastro de novo usuario
                    .subscribe(
                        () => this.router.navigate(['']), // redireciona novo usuario para pagina de login
                        err => console.log(err)
                    );
        }
    }
}
