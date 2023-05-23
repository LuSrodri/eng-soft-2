export default class DescricaoCurso {
    value: string;

    constructor(value: string = "") {
        this.value = value;
    }

    public static create(value: string): DescricaoCurso {
        if (value.length < 100 || value.length > 200) {
            throw new Error("Descrição do curso deve ser entre 100 e 200 caracteres");
        }

        return new DescricaoCurso(value);
    }

    public getValue(): string {
        return this.value;
    }
}