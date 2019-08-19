import { NgModule } from '@angular/core';
import { VMessageComponent } from './vmessage.component';

@NgModule({
    declarations: [VMessageComponent],
    exports: [VMessageComponent] // pois sera utilziado em outros componentes
})
export class VMessageModule {}