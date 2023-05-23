import { Column, PrimaryColumn } from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import NomeUsuario from './vo/NomeUsuario';
import EmailUsuario from './vo/EmailUsuario';
import IdadeUsuario from './vo/IdadeUsuario';

export default abstract class Usuario {
    @PrimaryColumn()
    id: string = uuidv4();

    @Column({
        type: 'varchar',
        length: 255,
        transformer: {
            to(nome: NomeUsuario): string {
                return nome.getValue();
            },
            from(nome: string): NomeUsuario {
                return new NomeUsuario(nome);
            }
        }
    })
    nome: NomeUsuario;

    @Column({
        type: 'varchar',
        length: 255,
        transformer: {
            to(email: EmailUsuario): string {
                return email.getValue();
            },
            from(email: string): EmailUsuario {
                return new EmailUsuario(email);
            }
        }
    })
    email: EmailUsuario;

    @Column({
        type: 'varchar',
        length: 255,
        transformer: {
            to(idade: IdadeUsuario): number {
                return idade.getValue();
            },
            from(idade: number): IdadeUsuario {
                return new IdadeUsuario(idade);
            }
        }
    })
    idade: IdadeUsuario;

    constructor(nome: string = "", email: string = "", idade: number = 0) { 
        this.nome = new NomeUsuario(nome);
        this.email = new EmailUsuario(email);
        this.idade = new IdadeUsuario(idade);
    }

    getId(): string {
        return this.id;
    }

    getNome(): NomeUsuario {
        return this.nome;
    }

    getEmail(): EmailUsuario {
        return this.email;
    }

    getIdade(): IdadeUsuario {
        return this.idade;
    }
}