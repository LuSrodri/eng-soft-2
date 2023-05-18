import { Nome, Email, Idade } from "src/domain/Aluno";

export default class CriarAlunoDTO {
    readonly nome: Nome;
    readonly email: Email;
    readonly idade: Idade;

    constructor(nome: string, email: string, idade: number) {
        this.nome = new Nome(nome);
        this.email = new Email(email);
        this.idade = new Idade(idade);
    }
}