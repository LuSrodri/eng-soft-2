import GetAutorDTO from "../Autor/GetAutorDTO";

export default class GetCursoDTO {
    readonly id: string;
    readonly nome: string;
    readonly descricao: string;
    readonly cargaHoraria: number;
    readonly autor?: GetAutorDTO;

    constructor(id: string, nome: string, descricao: string, cargaHoraria: number, autor?: GetAutorDTO) {
        this.id = id;
        this.nome = nome;
        this.descricao = descricao;
        this.cargaHoraria = cargaHoraria;
        this.autor = autor;
    }
}