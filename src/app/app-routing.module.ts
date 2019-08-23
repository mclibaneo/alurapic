import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhotoListComponent } from './photos/photo-list/photo-list.component';
import { PageNotFoundComponent } from './errors/page-not-found/page-not-found.component';
import { PhotoFormComponent } from './photos/photo-form/photo-form.component';
import { PhotoListResolver } from './photos/photo-list/photo-list.resolver';
import { AuthGuard } from './core/auth/auth.guard';
import { PhotoDetailsComponent } from './photos/photo-details/photo-details.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full', // match integral com a url passsada
    redirectTo: 'home'
  },
  {
    path: 'home',
    loadChildren: './home/home.module#HomeModule'
    // Assim, quando a rota 'home' for acessada, o Angular carregará o módulo HomeModule com todas as suas definições de rotas.
  },
  { path: 'user/:userNameParam',
    component: PhotoListComponent,
    resolve: {
      photos: PhotoListResolver // indica para caregar o objeto photos ja na rota
    }},
  {
      path: 'p/:photoID',
      component: PhotoDetailsComponent
  },
  {
    path: 'photo/add',
    component: PhotoFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'not-found',
    component: PageNotFoundComponent
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})], // o usehash eh utilizado p/ maior compatibilidade entre navegadores
  exports: [RouterModule]
})
export class AppRoutingModule { }
