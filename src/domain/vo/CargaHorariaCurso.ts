export default class CargaHorariaCurso {
    value: number;

    constructor(value: number = 0) {
        this.value = value;
    }

    public static create(value: number): CargaHorariaCurso {
        if (value < 0) {
            throw new Error("Carga horária do curso deve ser maior que 0");
        }

        return new CargaHorariaCurso(value);
    }

    public getValue(): number {
        return this.value;
    }
}