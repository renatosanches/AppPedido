import { Injectable } from "@angular/core";
import { STORAGE_KEYS } from "../config/storage_keys.config";
import { LocalUser } from "../models/local_user";
/* 
* App Pedido - XP IT Tecnologia - Front End
* Typescript
* classe de serviço StorageService para salvar e obter o usuário logado
* Dev: Renato Sanches
*/


@Injectable()
export class StorageService {

    // retorna usuario logado LocalUser
    getLocalUser() : LocalUser {
        let usr = localStorage.getItem(STORAGE_KEYS.localUser);
        if (usr == null) {
            return null;
        }
        else {
            return JSON.parse(usr);
        }
    }

    // recebe o LocalUser e armazena no STORAGE_KEYS.localUser
    setLocalUser(obj : LocalUser) {
        if (obj == null) {
            localStorage.removeItem(STORAGE_KEYS.localUser);
        }
        else {
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
        }
    }
}