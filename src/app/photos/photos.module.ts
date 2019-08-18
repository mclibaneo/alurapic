import { NgModule } from '@angular/core';
import { PhotoComponent } from './photo/photo.component';
import { PhotoModule } from './photo/photo.module';
import { PhotoFormModule } from './photo-form/photo-form.module';
import { PhotoListModule } from './photo-list/photo-list.module';

/**
 * Modulo necessario para o componente funcionar
 * Exporta o componente PhotoComponent
 * Importa o component HttpClient
 */
@NgModule({
    declarations: [],
    exports: [ PhotoComponent ],
    // necessario para o uso do HttpClient
    // o commomModule eh onde estao as diretivas *ngFor, *ngIf...
    imports: [  PhotoModule,
                PhotoFormModule,
                PhotoListModule
            ]
})
export class PhotosModule {
    /** 
     * Todo componente precisa estar associado a um module
     * nosso PhotoComponent esta associado ao PhotosModule
     * 
     * Este modulo exporta o PhotoComponent, mas para 
     * funcionar precisa do HttpClientModule
    */
}
