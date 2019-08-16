import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../photo/photo.service';
import { Photo } from '../photo/photo';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'ap-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {
  name = 'flavio';
  photos: Photo[] = [];

  // estamos fazendo uma injecao de dependencia aqui
  constructor(private photoService: PhotoService,
              private activedRoute: ActivatedRoute) {}
  
  /**
   * Ao implementar a intercae OnInit
   * precisamos implementar tbm o metodo OnInit
   * Este metodo faz parte do ciclo de vida de um componente
   * quando o component eh criado o metodo onInit
   * eh executado logo apos sua cricao 
   */
  ngOnInit(): void {
    const userNameParam = this.activedRoute
                                .snapshot
                                .params
                                .userNameParam;
    this.photoService
          .listFromUser(userNameParam)
          // somente com o .subscribe eh realizado 
          // o processamento do objeto da requiscao 
          // com httpClient.get()
          .subscribe(photos => this.photos = photos);
  }
}
