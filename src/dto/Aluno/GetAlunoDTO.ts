export default class GetAlunoDTO {
    readonly nome: string;
    readonly idade: number;

    constructor(nome: string, idade: number) {
        this.nome = nome;
        this.idade = idade;
    }
}