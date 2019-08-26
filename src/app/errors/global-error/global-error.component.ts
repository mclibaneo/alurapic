import { Component, OnInit } from '@angular/core';

@Component({
    templateUrl: './global-error.component.html'
})
export class GlobalErrorComponent implements OnInit {
    public pageTitle = 'Ops! An error has ocurred!';    
    ngOnInit(): void {
        
    }

}
