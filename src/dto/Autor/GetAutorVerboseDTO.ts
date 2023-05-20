import GetCursoDTO from "../Curso/GetCursoDTO";

export default class GetAutorVerboseDTO {
    readonly nome: string;
    readonly email: string;
    readonly idade: number;
    readonly cursosCriados: GetCursoDTO[];

    constructor(nome: string, email: string, idade: number, cursosCriados: GetCursoDTO[]) {
        this.nome = nome;
        this.email = email;
        this.idade = idade;
        this.cursosCriados = cursosCriados;
    }
}