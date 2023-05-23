import { Entity, Column, ManyToOne, ManyToMany, JoinTable, PrimaryColumn } from "typeorm";
import { v4 as uuidv4 } from 'uuid';

import Aluno from "./aluno.entity";
import Autor from "./autor.entity";
import NomeCurso from "./vo/NomeCurso";
import DescricaoCurso from "./vo/DescricaoCurso";
import CargaHorariaCurso from "./vo/CargaHorariaCurso";

@Entity()
export default class Curso {

    @PrimaryColumn()
    id: string = uuidv4();

    @Column({
        type: 'varchar',
        length: 255,
        transformer: {
            to(nome: NomeCurso): string {
                return nome.getValue();
            },
            from(nome: string): NomeCurso {
                return new NomeCurso(nome);
            }
        }
    })
    nome: NomeCurso;

    @Column({
        type: 'varchar',
        length: 255,
        transformer: {
            to(descricao: DescricaoCurso): string {
                return descricao.getValue();
            },
            from(descricao: string): DescricaoCurso {
                return new DescricaoCurso(descricao);
            }
        }
    })
    descricao: DescricaoCurso;

    @Column({
        type: 'varchar',
        length: 255,
        transformer: {
            to(cargaHoraria: CargaHorariaCurso): number {
                return cargaHoraria.getValue();
            },
            from(cargaHoraria: number): CargaHorariaCurso {
                return new CargaHorariaCurso(cargaHoraria);
            }
        }
    })
    cargaHoraria: CargaHorariaCurso;

    @ManyToOne(() => Autor, (autor) => autor.cursosCriados)
    autor: Autor;

    @ManyToMany(() => Aluno)
    @JoinTable()
    alunos: Aluno[];

    constructor(nome: string = "", descricao: string = "", cargaHoraria: number = 0, autor: Autor = new Autor()) { 
        this.nome = new NomeCurso(nome);
        this.descricao = new DescricaoCurso(descricao);
        this.cargaHoraria = new CargaHorariaCurso(cargaHoraria);
        this.autor = autor;
    }

    public static create(nome: string, descricao: string, cargaHoraria: number, autor: Autor): Curso {
        if (!nome || !descricao || !cargaHoraria || !autor) {
            throw new Error("Nome, descrição, carga horária e autor são obrigatórios.");
        }

        try {
            const curso = new Curso();
            curso.nome = NomeCurso.create(nome);
            curso.descricao = DescricaoCurso.create(descricao);
            curso.cargaHoraria = CargaHorariaCurso.create(cargaHoraria);
            curso.autor = autor;

            return curso;
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

    getAutor() {
        return this.autor;
    }

    getAlunos(): Aluno[] {
        return this.alunos;
    }
}