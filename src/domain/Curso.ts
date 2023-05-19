import { v4 } from "uuid";
import Aluno from "./Aluno";

export default class Curso {
    private id: string;
    private nome: Nome;
    private descricao: Descricao;
    private cargaHoraria: CargaHoraria;
    private alunos: Aluno[] = [];

    constructor(nome: string, descricao: string, cargaHoraria: number) {
        if (!nome || !descricao || !cargaHoraria) {
            throw new Error("Nome, descrição e carga horária são obrigatórios.");
        }

        try {
            this.id = v4();
            this.nome = new Nome(nome);
            this.descricao = new Descricao(descricao);
            this.cargaHoraria = new CargaHoraria(cargaHoraria);
        }
        catch (e) {
            throw e;
        }
    }

    getId(): string {
        return this.id;
    }

    getNome() {
        return this.nome;
    }

    getDescricao() {
        return this.descricao;
    }

    getCargaHoraria() {
        return this.cargaHoraria;
    }

    getAlunos(): Aluno[] {
        return this.alunos;
    }

    addAluno(aluno: Aluno): number {
        return this.alunos.push(aluno);
    }
}

export class Nome {
    private nome: string;

    constructor(nome: string) {
        if (nome.trim().length < 10) {
            throw new Error("O nome deve ter 10 ou mais carácteres");
        }

        this.nome = nome;
    }

    getValue(): string {
        return this.nome;
    }
}

export class Descricao {
    private descricao: string;

    constructor(descricao: string) {
        if (descricao.trim().length < 100) {
            throw new Error("O nome deve ter 100 ou mais carácteres");
        }

        this.descricao = descricao;
    }

    getValue(): string {
        return this.descricao;
    }
}

export class CargaHoraria {
    private cargaHoraria: number;

    constructor(cargaHoraria: number) {
        if (cargaHoraria < 0) {
            throw new Error("Carga Horária inválida");
        }

        this.cargaHoraria = cargaHoraria;
    }

    getValue(): number {
        return this.cargaHoraria;
    }
} 