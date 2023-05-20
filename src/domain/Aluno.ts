import Curso from './Curso';
import Usuario from './Usuario';

export default class Aluno extends Usuario{
    private cursosMatriculados: Curso[] = [];

    getCursosMatriculados(): Curso[] {
        return this.cursosMatriculados;
    }

    matricula(curso: Curso): number {
        return this.cursosMatriculados.push(curso);
    }
}