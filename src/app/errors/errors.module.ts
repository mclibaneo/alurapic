import { NgModule, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { GlobalErrorHandler } from './global-error-handler/global-error-handler';
import { GlobalErrorComponent } from './global-error/global-error.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations:
    [
      PageNotFoundComponent,
      GlobalErrorComponent,
    ],
  imports: [ CommonModule, RouterModule ],
  providers:
    [
      {
        provide: ErrorHandler, // utilizaremos a classe ErrorHandler
        useClass: GlobalErrorHandler // mas a classe Error Handler sera substituida pela GlobalErrorHandler
      }
    ]
})
export class ErrorsModule { }
