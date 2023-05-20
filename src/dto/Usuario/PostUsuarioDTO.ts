export default class PostUsuarioDTO {
    readonly nome: string;
    readonly email: string;
    readonly idade: number;

    constructor(nome: string, email: string, idade: number) {
        this.nome = nome;
        this.email = email;
        this.idade = idade;
    }
}