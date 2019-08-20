import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';
import { AuthGuard } from '../core/auth/auth.guard';
import { SignInComponent } from './signin/signin.component';
import { SignUpComponent } from './signup/signup.component';

const routes: Routes = [
  {
    path: '', // ja vem da rota pai como /home
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [ // rotas filhas para utilziar o rout-outlet no template
        {
            path: '', // ja eh a propria home
            component: SignInComponent,
        },
        {
            path: 'signup',
            component: SignUpComponent,
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
