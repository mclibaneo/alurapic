import { PipeTransform, Pipe } from '@angular/core';
import { Photo } from '../photo/photo';

/**
 * Pipe eh um elemento que realiza 
 * algum tipo de processamento em um componente
 * o pipe eh necessario ser declarado no module
 */
@Pipe({name: 'filterByDescription'})
export class FilterByDescription implements PipeTransform {
    
    constructor() {}

    // o primeiro parametro eh o elemento que sofrera o processamento
    // o segundo parametro sao os filtros a serem aplicados
    transform(photos: Photo[], descriptionQuery: string) {
        descriptionQuery = descriptionQuery.trim().toLowerCase();
        // verifica se a busca nao esta em branco
        if (descriptionQuery) {
            // retorna um filtro com photos[] que atende
            // a busca de descriptionQuery
            return photos.filter(
                    photo => photo.description
                                    .toLowerCase()
                                    .includes(descriptionQuery)
                );
        } else {
            return photos;
        }
    }

}
