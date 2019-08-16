import { Component, OnChanges, SimpleChanges, Input } from '@angular/core';
import { Photo } from '../../photo/photo';

@Component({
  selector: 'ap-photos',
  templateUrl: './photos.component.html',
  styleUrls: ['./photos.component.css']
})
export class PhotosComponent implements OnChanges {
  
  @Input() photos: Photo[] = [];
  rows: any[] = [];

  constructor() { }
  /*
  * este metodo eh executavo toda vez que ha uma mudanca 
  * o metodo OnInit eh executado apenas uma unica vez no inicio 
  */
  ngOnChanges(changes: SimpleChanges): void {
    // toda propriedade SimpleChanges possui uma propriedade
    // @Input() da classe vinculada
    if (changes.photos) {
      this.rows = this.groupColumns(this.photos);
    }
  }
  groupColumns(photos: Photo[]): any[] {
    const newRows = [];

    for (let index = 0; index < photos.length; index += 3) {
      newRows.push(photos.slice(index, index + 3));
      // o slice fatia o array, da primeira posicao (inclusa)
      // ate proxima posicao (exclusa)
    }

    return newRows;
  }
}

