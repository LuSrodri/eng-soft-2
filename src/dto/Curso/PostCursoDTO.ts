export default class PostCursoDTO {
    readonly nome: string;
    readonly descricao: string;
    readonly cargaHoraria: number;

    constructor(nome: string, descricao: string, cargaHoraria: number) {
        this.nome = nome;
        this.descricao = descricao;
        this.cargaHoraria = cargaHoraria;
    }
}