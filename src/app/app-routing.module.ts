import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PhotoListComponent } from './photos/photo-list/photo-list.component';
import { PageNotFoundComponent } from './errors/page-not-found/page-not-found.component';
import { PhotoFormComponent } from './photos/photo-form/photo-form.component';
import { PhotoListResolver } from './photos/photo-list/photo-list.resolver';
import { SignInComponent } from './home/auth/signin.component';


const routes: Routes = [
  { path: '', component: SignInComponent }, // para index
  { path: 'user/:userNameParam',
    component: PhotoListComponent,
    resolve: {
      photos: PhotoListResolver // indica para caregar o objeto photos ja na rota
    }},
  { path: 'p/add', component: PhotoFormComponent  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
