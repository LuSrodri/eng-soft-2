import { Nome, Idade } from "src/domain/Aluno";

export default class GetAlunoDTO {
    readonly nome: Nome;
    readonly idade: Idade;

    constructor(nome: string, idade: number) {
        this.nome = new Nome(nome);
        this.idade = new Idade(idade);
    }
}