import { Component, OnInit } from '@angular/core';
import { PhotoService } from './photos/photo/photo.service';
import { Photo } from './photos/photo/photo';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'alurapic';
  name = 'flavio';
  photos: Photo[] = [];

  // estamos fazendo uma injecao de dependencia aqui
  constructor(private photoService: PhotoService) {}
  
  /**
   * Ao implementar a intercae OnInit
   * precisamos implementar tbm o metodo OnInit
   * Este metodo faz parte do ciclo de vida de um componente
   * quando o component eh criado o metodo onInit
   * eh executado logo apos sua cricao 
   */
  ngOnInit(): void {
    this.photoService
          .listFromUser(this.name)
          // somente com o .subscribe eh realizado 
          // o processamento do objeto da requiscao 
          // com httpClient.get()
          .subscribe(photos => this.photos = photos);
  }
}
