import { NgModule } from '@angular/core';
import { SignInComponent } from './signin/signin.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { VMessageModule } from '../shared/components/vmessage/vmessage.module';
import { RouterModule } from '@angular/router';
import { SignUpComponent } from './signup/signup.component';



@NgModule({
    declarations: [ SignInComponent, SignUpComponent ],
    imports: [  CommonModule,
                FormsModule,
                ReactiveFormsModule,
                VMessageModule,
                // eh so uma boa pratica add o RouterModule aqui
                RouterModule ]
})
export class HomeModule {}
