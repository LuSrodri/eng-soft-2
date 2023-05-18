import { v4 as uuidv4 } from 'uuid';

export default class Aluno {
    private id: string;
    private nome: Nome;
    private email: Email;
    private idade: Idade;

    constructor(nome: string, email: string, idade: number) {
        if (!nome || !email || !idade) {
            throw new Error("Não foi possível criar um aluno. Falta:" + (!nome ? " Nome" : "") + (!email ? " Email" : "") + (!idade ? " Idade" : "") + ".");
        }

        try {
            this.id = uuidv4();
            this.nome = new Nome(nome);
            this.email = new Email(email);
            this.idade = new Idade(idade);
        }
        catch (e) {
            throw e;
        }
    }

    getId(): string {
        return this.id;
    }

    getNome(): Nome {
        return this.nome;
    }

    getEmail(): Email {
        return this.email;
    }

    getIdade(): Idade {
        return this.idade;
    }
}

export class Nome {
    private nome: string;

    constructor(nome: string) {
        if (nome.trim().length < 3) {
            throw new Error('Nome inválido');
        }
        this.nome = nome;
    }

    getValue(): string {
        return this.nome;
    }
}

export class Email {
    private email: string;

    constructor(email: string) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(email)) {
            throw new Error('Email inválido');
        }
        this.email = email;
    }

    getValue(): string {
        return this.email;
    }
}

export class Idade {
    private idade: number;

    constructor(idade: number) {
        if (idade < 0) {
            throw new Error('Idade inválida');
        }
        this.idade = idade;
    }

    getValue(): number {
        return this.idade;
    }
}