export default class EmailUsuario {
    value: string;

    constructor(value: string = "") {
        this.value = value;
    }

    public static create(value: string): EmailUsuario {
        if (value.length < 3 || value.length > 200) {
            throw new Error("Nome de usuário deve ser entre 3 e 200 caracteres");
        }

        return new EmailUsuario(value);
    }

    public getValue(): string {
        return this.value;
    }
}