import Curso from "src/domain/Curso";

export default class GetAlunoVerboseDTO {
    readonly nome: string;
    readonly email: string;
    readonly idade: number;
    readonly cursos: Curso[];

    constructor(nome: string, email: string, idade: number, cursos: Curso[]) {
        this.nome = nome;
        this.email = email;
        this.idade = idade;
        this.cursos = cursos;
    }
}