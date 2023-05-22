import { Entity, ManyToMany, JoinTable } from 'typeorm';
import Curso from './curso.entity';
import Usuario from './usuario.entity';
import NomeUsuario from './vo/NomeUsuario';
import EmailUsuario from './vo/EmailUsuario';
import IdadeUsuario from './vo/IdadeUsuario';

@Entity()
export default class Aluno extends Usuario{
    @ManyToMany(() => Curso)
    @JoinTable()
    cursosMatriculados: Curso[];

    public static create(nome: string, email: string, idade: number): Aluno {
        if (!nome || !email || !idade) {
            throw new Error("Nome, Email e Idade são obrigatórios.");
        }

        try {
            const aluno = new Aluno();
            aluno.nome = NomeUsuario.create(nome);
            aluno.email = EmailUsuario.create(email);
            aluno.idade = IdadeUsuario.create(idade);

            return aluno;
        }
        catch (e) {
            throw e;
        }
    }

    getCursosMatriculados(): Curso[] {
        return this.cursosMatriculados;
    }
}