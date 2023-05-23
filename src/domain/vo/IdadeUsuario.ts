export default class IdadeUsuario {
    value: number;

    constructor(value: number = 0) {
        this.value = value;
    }

    public static create(value: number): IdadeUsuario {
        if (value < 0) {
            throw new Error("Idade do usuário deve ser maior que 0");
        }

        return new IdadeUsuario(value);
    }

    public getValue(): number {
        return this.value;
    }
}