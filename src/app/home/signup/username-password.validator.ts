import { ValidatorFn, FormGroup } from '@angular/forms';

export const userNamePasswordValidator: ValidatorFn = (formGroup: FormGroup) => {
    const userName = formGroup.get('userName').value;
    const password = formGroup.get('password').value;
    if (userName.trim() + password.trim()) {
        // retorna vazio caso nao haja erro, ou se houver, retorna um obj json
        return userName !== password ? null : {userNamePassword: true};
    } else { return null; }
}



