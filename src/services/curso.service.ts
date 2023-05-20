import { HttpException, HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import Curso from 'src/domain/Curso';
import Aluno from 'src/domain/Aluno';
import { AlunoService } from './aluno.service';
import GetCursoDTO from 'src/dto/Curso/GetCursoDTO';
import PostCursoDTO from 'src/dto/Curso/PostCursoDTO';
import GetCursoVerboseDTO from 'src/dto/Curso/GetCursoVerboseDTO';
import GetAlunoDTO from 'src/dto/Aluno/GetAlunoDTO';
import { AutorService } from './autor.service';
import Autor from 'src/domain/Autor';
import GetAutorVerboseDTO from 'src/dto/Autor/GetAutorVerboseDTO';
import GetAutorDTO from 'src/dto/Autor/GetAutorDTO';

@Injectable()
export class CursoService {
  readonly cursos: Curso[] = [];

  constructor(@Inject(forwardRef(() => AlunoService)) private alunoService: AlunoService, @Inject(forwardRef(() => AutorService)) private autorService: AutorService) { }

  createCurso(newCurso: PostCursoDTO): string {
    try {
      const autor: GetAutorVerboseDTO = this.autorService.getAutorById(newCurso.autorId);
      const autorCurso: Autor = new Autor(autor.nome, autor.email, autor.idade);
      const curso = new Curso(newCurso.nome, newCurso.descricao, newCurso.cargaHoraria, autorCurso);
      this.autorService.autores.find(autor => autor.getId() === newCurso.autorId)?.criaCurso(curso);
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

    const gotAlunosMatriculados: Aluno[] = this.alunoService.alunos.filter(
      aluno => aluno.getCursosMatriculados().find(curso => curso.getId() === id)
    );

    const alunosMatriculados: GetAlunoDTO[] = gotAlunosMatriculados.map<GetAlunoDTO>(aluno => { return new GetAlunoDTO(aluno.getId(), aluno.getNome().getValue(), aluno.getIdade().getValue()) });

    const autor: Autor = this.autorService.autores.find( autor => autor.getCursosCriados().find( cursoCriado => cursoCriado.getId() === id))!;

    const autorCurso: GetAutorDTO = new GetAutorDTO(autor.getId(), autor.getNome().getValue(), autor.getIdade().getValue());

    return new GetCursoVerboseDTO(curso.getNome().getValue(), curso.getDescricao().getValue(), curso.getCargaHoraria().getValue(), autorCurso, alunosMatriculados);
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

    if (curso.getAlunos().find(alunoId => aluno.getId() === idAluno)) {
      throw new HttpException('Aluno já matriculado no curso', HttpStatus.BAD_REQUEST);
    }

    curso.addAluno(aluno);
    aluno.matricula(curso);

    return true;
  }
}
