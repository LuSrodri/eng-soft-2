import GetAlunoDTO from "../Aluno/GetAlunoDTO";
import GetAutorDTO from "../Autor/GetAutorDTO";

export default class GetCursoVerboseDTO {
    readonly nome: string;
    readonly descricao: string;
    readonly cargaHoraria: number;
    readonly autor: GetAutorDTO;
    readonly alunos: GetAlunoDTO[];

    constructor(nome: string, descricao: string, cargaHoraria: number, autor: GetAutorDTO, alunos: GetAlunoDTO[]) {
        this.nome = nome;
        this.descricao = descricao;
        this.cargaHoraria = cargaHoraria;
        this.autor = autor;
        this.alunos = alunos;
    }
}