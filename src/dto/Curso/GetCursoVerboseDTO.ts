import GetAlunoDTO from "../Aluno/GetAlunoDTO";

export default class GetCursoVerboseDTO {
    readonly nome: string;
    readonly descricao: string;
    readonly cargaHoraria: number;
    readonly alunos: GetAlunoDTO[];

    constructor(nome: string, descricao: string, cargaHoraria: number, alunos: GetAlunoDTO[]) {
        this.nome = nome;
        this.descricao = descricao;
        this.cargaHoraria = cargaHoraria;
        this.alunos = alunos;
    }
}