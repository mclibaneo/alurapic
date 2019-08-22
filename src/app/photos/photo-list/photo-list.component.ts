import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Photo } from '../photo/photo';
import { PhotoService } from '../photo/photo.service';

@Component({
  selector: 'ap-photo-list',
  templateUrl: './photo-list.component.html',
  styleUrls: ['./photo-list.component.css']
})
export class PhotoListComponent implements OnInit {
 
  photos: Photo[] = [];
  filter: string = '';  
  hasMore: boolean = true;
  currentPageNumber: number = 1;
  userName: string = '';


  // estamos fazendo uma injecao de dependencia aqui
  constructor(private activedRoute: ActivatedRoute,
              private service: PhotoService) {}
  
  /**
   * Ao implementar a intercae OnInit
   * precisamos implementar tbm o metodo OnInit
   * Este metodo faz parte do ciclo de vida de um componente
   * quando o component eh criado o metodo onInit
   * eh executado logo apos sua cricao 
   */
  ngOnInit(): void {    
     this.userName = this.activedRoute
                                .snapshot
                                .params
                                .userNameParam;    
      /*
      this.photoService
          .listFromUser(userNameParam)
          // somente com o .subscribe eh realizado 
          // o processamento do objeto da requiscao 
          // com httpClient.get()
          .subscribe(photos => this.photos = photos);
     */

     // foi substituido por
     // this.photos = this.activedRoute.snapshot.data.photos;
     // para mudar a rota qnd usuario clica no botao voltar do navegador
     this.activedRoute.params.subscribe(params => {
       this.userName = params.userName;
       this.photos = this.activedRoute.snapshot.data['photos'];
     });

     /**
      * A grande sacada eh que, 
      * com esta alteracao chamada de Lettable operators no RxJS,
      * por usarmos o debounceTime, 
      * quando emitimos um valor no evento keyup, 
      * todas as emissoes serao ignoradas, 
      * sendo consideradas apos 300ms. 
      * E eh isso que sera repassado ao subscribe().  
          
     this.debounce
            .pipe(debounceTime(300))
            .subscribe(filter => this.filter = filter);
    */
  }

  /**
   * executado ao final do ciclo de vida do componente
   * ira parar de ouvir o filtro de busca
   
  ngOnDestroy(): void {
    this.debounce.unsubscribe();
  }
  */

  load(): void{
    this.service
          .listFromUserPaginated(this.userName, ++this.currentPageNumber)
          .subscribe(photos => {
            this.filter = '';
            this.photos = this.photos.concat(photos);
            if (!photos.length) { this.hasMore = false; }
          });
  }
}
