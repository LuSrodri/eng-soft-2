import GetCursoDTO from "../Curso/GetCursoDTO";

export default class GetAlunoVerboseDTO {
    readonly nome: string;
    readonly email: string;
    readonly idade: number;
    readonly cursos: GetCursoDTO[];

    constructor(nome: string, email: string, idade: number, cursos: GetCursoDTO[]) {
        this.nome = nome;
        this.email = email;
        this.idade = idade;
        this.cursos = cursos;
    }
}