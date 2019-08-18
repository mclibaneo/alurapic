import { NgModule } from '@angular/core';
import { PhotoComponent } from './photo.component';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
    declarations: [ PhotoComponent ],
    exports: [ PhotoComponent ],
    imports: [ CommonModule, HttpClientModule ] //eh uma boa pratica importar CommonModule nos Modulos
})
export class PhotoModule {}