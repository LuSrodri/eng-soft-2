import Curso from './Curso';
import Usuario from './Usuario';

export default class Autor extends Usuario{
    private cursosCriados: Curso[] = [];

    getCursosCriados(): Curso[] {
        return this.cursosCriados;
    }

    criaCurso(curso: Curso): number {
        return this.cursosCriados.push(curso);
    }
}