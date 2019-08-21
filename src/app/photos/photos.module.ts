import { NgModule } from '@angular/core';
import { PhotoModule } from './photo/photo.module';
import { PhotoFormModule } from './photo-form/photo-form.module';
import { PhotoListModule } from './photo-list/photo-list.module';
import { VMessageComponent } from '../shared/components/vmessage/vmessage.component';



/**
 * Modulo necessario para o componente funcionar
 * Exporta o componente PhotoComponent
 * Importa o component HttpClient
 */
@NgModule({
    // necessario para o uso do HttpClient
    // o commomModule eh onde estao as diretivas *ngFor, *ngIf...
    imports: [
                PhotoModule,
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
