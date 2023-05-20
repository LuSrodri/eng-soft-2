export default class GetAutorDTO {
    readonly id: string;
    readonly nome: string;
    readonly idade: number;

    constructor(id: string, nome: string, idade: number) {
        this.id = id;
        this.nome = nome;
        this.idade = idade;
    }
}