import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { filter, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private titleService: Title) {} 
  
  /*
  * Ficaremos atentos na navegacao de rotas routers.events.subscribe()
  * escolheremos apenas a ultima rota da navegacao por meio do filtro para NavigationEnd
  * qnd estiver na rota correta pega o observable da rota
  * se inscreve no observable e informa o titulo da pagina de acordo com o valor definido na rota
  * 
  * Uma instancia de Router possui a propriedade events, 
  * um Observable que nos permite saber a fase atual da rota acessada pela aplicacao.
  * 
  * Um evento do tipo NavigationEnd eh aquele disparado quando a rota termina com sucesso.
  */
  ngOnInit(): void {
      this.router.events
                  .pipe(filter(event => event instanceof NavigationEnd))
                  .pipe(map(() => this.activatedRoute))
                  .pipe(map(route => {
                    while (route.firstChild) { route = route.firstChild; }
                    return route; // captura apenas a rota correta
                  }))
                  .pipe(switchMap(route => route.data))
                  .subscribe(event => this.titleService.setTitle(event.title));
    }
  }
