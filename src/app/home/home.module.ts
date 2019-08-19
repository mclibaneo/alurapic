import { NgModule } from '@angular/core';
import { SignInComponent } from './auth/signin.component';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { VMessageModule } from '../shared/components/vmessage/vmessage.module';
import { RouterModule } from '@angular/router';


@NgModule({
    declarations: [ SignInComponent ],
    imports: [  CommonModule,
                ReactiveFormsModule,
                VMessageModule,
                // eh so uma boa pratica add o RouterModule aqui
                RouterModule ]
})
export class HomeModule {}
