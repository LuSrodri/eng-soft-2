export default class PostCursoDTO {
    readonly nome: string;
    readonly descricao: string;
    readonly cargaHoraria: number;
    readonly autorId: string;

    constructor(nome: string, descricao: string, cargaHoraria: number, autorId: string) {
        this.nome = nome;
        this.descricao = descricao;
        this.cargaHoraria = cargaHoraria;
        this.autorId = autorId;
    }
}