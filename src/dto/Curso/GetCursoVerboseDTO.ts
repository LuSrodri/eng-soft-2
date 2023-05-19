import Aluno from "src/domain/Aluno";

export default class GetCursoVerboseDTO {
    readonly nome: string;
    readonly descricao: string;
    readonly cargaHoraria: number;
    readonly alunos: Aluno[];

    constructor(nome: string, descricao: string, cargaHoraria: number, alunos: Aluno[]) {
        this.nome = nome;
        this.descricao = descricao;
        this.cargaHoraria = cargaHoraria;
        this.alunos = alunos;
    }
}