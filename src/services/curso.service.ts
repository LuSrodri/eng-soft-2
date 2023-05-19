import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import Curso from 'src/domain/Curso';
import Aluno from 'src/domain/Aluno';
import { AlunoService } from './aluno.service';
import GetCursoDTO from 'src/dto/Curso/GetCursoDTO';
import PostCursoDTO from 'src/dto/Curso/PostCursoDTO';
import GetCursoVerboseDTO from 'src/dto/Curso/GetCursoVerboseDTO';

@Injectable()
export class CursoService {
  readonly cursos: Curso[] = [];

  constructor(private alunoService: AlunoService) { }

  createCurso(newCurso: PostCursoDTO): string {
    try {
      const curso = new Curso(newCurso.nome, newCurso.descricao, newCurso.cargaHoraria);
      this.cursos.push(curso);
      return curso.getId();
    }
    catch (e) {
      throw e;
    }
  }

  getCursos(): GetCursoDTO[] {
    let allCursos: GetCursoDTO[] = [];

    this.cursos.forEach(curso => {
      allCursos.push(new GetCursoDTO(curso.getId(), curso.getNome().getValue(), curso.getDescricao().getValue(), curso.getCargaHoraria().getValue()));
    });

    return allCursos;
  }

  getCursoById(id: string): GetCursoVerboseDTO | Error {
    const curso: Curso | undefined = this.cursos.find(curso => curso.getId() === id);

    if (!curso) {
      throw new HttpException('Curso não encontrado', HttpStatus.NOT_FOUND);
    }

    return new GetCursoVerboseDTO(curso.getNome().getValue(), curso.getDescricao().getValue(), curso.getCargaHoraria().getValue(), curso.getAlunos());
  }

  matricularAluno(idCurso: string, idAluno: string): boolean {
    const curso: Curso | undefined = this.cursos.find(curso => curso.getId() === idCurso);
    const aluno: Aluno | undefined = this.alunoService.alunos.find(aluno => aluno.getId() === idAluno);

    if (!curso) {
      throw new HttpException('Curso não encontrado', HttpStatus.NOT_FOUND);
    }

    if (!aluno) {
      throw new HttpException('Aluno não encontrado', HttpStatus.NOT_FOUND);
    }

    if (curso.getAlunos().find(aluno => aluno.getId() === idAluno)) {
      throw new HttpException('Aluno já matriculado no curso', HttpStatus.BAD_REQUEST);
    }

    curso.addAluno(aluno);
    aluno.addCurso(curso);

    return true;
  }
}
