import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs/Rx'; // IMPORTANTE: IMPORT ATUALIZADO
import { StorageService } from '../services/storage.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { FieldMessage } from '../models/fieldmessage';

/* 
* App Pedido - XP IT Tecnologia - Front End
* Typescript
* Classe: ErrorInterceptor - Interceptador de erros - retorna apenas o objeto de erro devolvido pelo back end
* Dev: Renato Sanches
*/

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService, public alertCtrl: AlertController) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
        .catch((error, caught) => {

            let errorObj = error;
            if (errorObj.error) {
                errorObj = errorObj.error;
            }
            if (!errorObj.status) {
                errorObj = JSON.parse(errorObj);
            }

            console.log("Erro detectado pelo interceptor:");
            console.log(errorObj);
            
            switch(errorObj.status) {
                // Tratamento do Erro 401
                case 401:
                this.handle401();
                break;

                // Tratamento do Erro 403
                case 403:
                this.handle403();
                break;

                // Tratamento do Erro 422 unprocessable Entity do back end
                case 422:
                this.handle422(errorObj);
                break;

                //erros gerais
                default:
                this.handleDefaultEror(errorObj);
            }

            return Observable.throw(errorObj);
        }) as any;
    }

    // funcao auxiliar (metodo da classe ErrorInterceptor) - forca a limpeza do local storage
    handle403() {
        this.storage.setLocalUser(null);
    }

    // funcao auxiliar erro 401 - autenticação
    handle401() {
        let alert = this.alertCtrl.create({
            title: 'Erro 401: falha de autenticação',
            message: 'Email ou senha incorretos',
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        alert.present();
    }

    // funcao auxiliar erro 422 - Validação
    handle422(errorObj) {
        let alert = this.alertCtrl.create({
            title: 'Erro 422: Validação',
            message: this.listErrors(errorObj.errors),
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        alert.present();
    }

    // Tratamento de outros erros
    handleDefaultEror(errorObj) {
        let alert = this.alertCtrl.create({
            title: 'Erro ' + errorObj.status + ': ' + errorObj.error,
            message: errorObj.message,
            enableBackdropDismiss: false,
            buttons: [
                {
                    text: 'Ok'
                }
            ]
        });
        alert.present();        
    }

    //lista de erros de validacao do formulario para o alert 
    private listErrors(messages : FieldMessage[]) : string {
        let s : string = '';
        for (var i=0; i<messages.length; i++) {
            s = s + '<p><strong>' + messages[i].fieldName + "</strong>: " + messages[i].message + '</p>';
        }
        return s;
    }

}

// Declaracao provider do interceptor 
export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};