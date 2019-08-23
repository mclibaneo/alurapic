import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';
import { LoginGuard } from '../core/auth/login.guard';

const routes: Routes = [
  {
    path: '', // ja vem da rota pai como /home
    component: HomeComponent,
    canActivate: [LoginGuard],
    children: [ // rotas filhas para utilziar o rout-outlet no template
        {
            path: '', // ja eh a propria home
            component: SignInComponent,
            data: { title: 'Sign In'}
        },
        {
            path: 'signup',
            component: SignUpComponent,
            data: { title: 'Sign Up'}
        },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // sempre no code splinting de routes eh utilizado o forChild
  exports: [RouterModule]
})
/**
 * Uso do carregamento preguicoso
 * estamos dividindo as rotas em dois arquivos distintos
 * este sera carregado em um momento posterior na app
 */
export class HomeRoutingModule { }
