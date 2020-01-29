// Possui os mesmos dados do ClienteDTO do back end java
export interface ClienteDTO {
    id : string;
    nome : string;
    email : string;
    //atributo opcional possui ?
    imageUrl? : string;
}