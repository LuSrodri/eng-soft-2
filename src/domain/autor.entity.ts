import { Entity, OneToMany } from 'typeorm';
import Curso from './curso.entity';
import Usuario from './usuario.entity';
import NomeUsuario from './vo/NomeUsuario';
import EmailUsuario from './vo/EmailUsuario';
import IdadeUsuario from './vo/IdadeUsuario';

@Entity()
export default class Autor extends Usuario{
    @OneToMany(() => Curso, (cursoCriado) => cursoCriado.autor)
    cursosCriados: Curso[];

    public static create(nome: string, email: string, idade: number): Autor {
        if (!nome || !email || !idade) {
            throw new Error("Nome, Email e Idade são obrigatórios.");
        }

        try {
            const autor = new Autor();
            autor.nome = NomeUsuario.create(nome);
            autor.email = EmailUsuario.create(email);
            autor.idade = IdadeUsuario.create(idade);

            return autor;
        }
        catch (e) {
            throw e;
        }
    }

    getCursosCriados(): Curso[] {
        return this.cursosCriados;
    }
}