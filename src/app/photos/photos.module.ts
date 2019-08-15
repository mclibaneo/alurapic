import { NgModule } from '@angular/core';
import { PhotoComponent } from './photo/photo.component';
import { HttpClientModule } from '@angular/common/http';

/**
 * Modulo necessario para o componente funcionar
 * Exporta o componente PhotoComponent
 * Importa o component HttpClient
 */
@NgModule({
    declarations: [ PhotoComponent ],
    exports: [ PhotoComponent ],
    imports: [ HttpClientModule ] // necessario para o uso do HttpClient
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
