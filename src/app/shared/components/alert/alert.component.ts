import { Component, Input } from '@angular/core';
import { AlertService } from './alert.service';
import { Alert, AlertType } from './alert';

@Component({
    selector: 'ap-alert',
    templateUrl: './alert.component.html'
})
export class AlertComponent {

    @Input() timeout = 3000;
    alerts: Alert[] = [];

    constructor(private alertService: AlertService) {
        this.alertService.getAlert().subscribe(alert => {
            if (!alert) {
                this.alerts = [];
                return; // se nao subscribers de alert retorna array vazio e nada acontece
            }
            this.alerts.push(alert);
            setTimeout(() => this.removeAlert(alert), this.timeout);
        });
    }

    removeAlert(alertToRemove: Alert): void {
        // cria um novo array o qual nao tera o array que sera removido pelo param
        this.alerts = this.alerts.filter(alert => alert !== alertToRemove);
    }

    getAlertClass(alert: Alert) {
        if (!alert) { return ''; }
        switch (alert.alertType) {
            case AlertType.SUCCESS:
                return 'alert alert-success';
            case AlertType.WARNING:
                return 'alert alert-warning';
            case AlertType.DANGER:
                return 'alert alert-danger';
            case AlertType.INFO:
                return 'alert alert-info';
            default:
                return 'alert';
        }
    }
}
/** * Variáveis de template podem ser utilizadas para realizar a comunicação entre elementos irmãos na hierarquia de componentes.
    Componentes que declaram variáveis de template guardam nessas variáveis uma referência para eles. 
    Essas referências podem ser acessadas em qualquer lugar do template, 
    inclusive serem passadas como parâmetros de métodos chamados por eventos.
    Comunicação entre elemento filho e pai pode ser realizada por meio de output properties.
    As propriedades são criadas através de propriedades decoradas com o decorator Output cujo o valor é um instância de EventEmitter.
    Comunicação entre um elemento pai e um filho pode ser realizada través de inbound properties.
    Essas propriedades são decoradas com o decorator Input.
 */