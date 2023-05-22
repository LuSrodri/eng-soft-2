export default class NomeCurso {
    value: string;

    constructor(value: string = "") {
        this.value = value;
    }

    public static create(value: string): NomeCurso {
        if (value.length < 10 || value.length > 200) {
            throw new Error("Nome de curso deve ser entre 10 e 200 caracteres");
        }

        return new NomeCurso(value);
    }

    public getValue(): string {
        return this.value;
    }
}