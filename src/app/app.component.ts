import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'alurapic';
  photos = [
    {
        description: 'menina no trem com fantasma',
        url: 'https://i.pinimg.com/originals/9a/61/e0/9a61e0715e1ab281c08b9aec48c6d3fe.jpg'
    },
    {
        description: 'menina e totoro com guarda-chuva no pasto',
        url: 'https://i2.wp.com/geekiss.xpg.com.br/wp-content/uploads/2017/05/geekisspinturas11.jpg?'
    }    
];    
}
