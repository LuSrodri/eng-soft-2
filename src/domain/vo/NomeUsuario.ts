export default class NomeUsuario {
    value: string;

    constructor(value: string = "") {
        this.value = value;
    }

    public static create(value: string): NomeUsuario {
        if (value.length < 3 || value.length > 200) {
            throw new Error("Nome de usuário deve ser entre 3 e 200 caracteres");
        }

        return new NomeUsuario(value);
    }

    public getValue(): string {
        return this.value;
    }
}