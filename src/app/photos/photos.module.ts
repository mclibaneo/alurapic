import { NgModule } from '@angular/core';
import { PhotoComponent } from './photo/photo.component';
import { HttpClientModule } from '@angular/common/http';
import { PhotoListComponent } from './photo-list/photo-list.component';
import { PhotoFormComponent } from './photo-form/photo-form.component';
import { CommonModule } from '@angular/common';
import { PhotosComponent } from './photo-list/photos/photos.component';
import { FilterByDescription } from './photo-list/filter-by-description.pipe';
import { LoadButtonComponent } from './photo-list/load-button/load-button.component';

/**
 * Modulo necessario para o componente funcionar
 * Exporta o componente PhotoComponent
 * Importa o component HttpClient
 */
@NgModule({
    declarations: [ PhotoComponent,
                    PhotoListComponent,
                    PhotoFormComponent,
                    PhotosComponent,
                    FilterByDescription,
                    LoadButtonComponent
                ],
    exports: [ PhotoComponent ],
    // necessario para o uso do HttpClient
    // o commomModule eh onde estao as diretivas *ngFor, *ngIf...
    imports: [ HttpClientModule, CommonModule ]
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
