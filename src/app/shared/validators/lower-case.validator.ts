import { AbstractControl } from '@angular/forms';

/**
 *
 * Todo Validator recebe como parametro um AbstractControl,
 * tendo que Control seria a parte do input do formulario,
 * com a qual o usuario interage. A ideia e que,
 * caso nao haja erros de validacao, o retorno seja nulo.
 * Caso contrario, o retorno sera de um objeto JavaScript
 * com uma propriedade lowerCase, que recebera um valor true e
 * sera acessada no template.
 */
export function lowerCaseValidator(control: AbstractControl) {
    if (control.value.trim() && !/^[a-z0-9_\-]+$/.test(control.value)) {
        return { lowerCase: true }; // este eh o nome do validador utilizado nos templates
    }
    return null;
}
