export default class GetCursoDTO {
    readonly id: string;
    readonly nome: string;
    readonly descricao: string;
    readonly cargaHoraria: number;

    constructor(id: string, nome: string, descricao: string, cargaHoraria: number) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.cargaHoraria = cargaHoraria;
    }
}