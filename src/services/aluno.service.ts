import { HttpException, HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import Aluno from 'src/domain/Aluno';
import GetAlunoDTO from 'src/dto/Aluno/GetAlunoDTO';
import GetAlunoVerboseDTO from 'src/dto/Aluno/GetAlunoVerboseDTO';
import { CursoService } from './curso.service';
import GetCursoDTO from 'src/dto/Curso/GetCursoDTO';
import Curso from 'src/domain/Curso';
import PostUsuarioDTO from 'src/dto/Usuario/PostUsuarioDTO';
import { AutorService } from './autor.service';

@Injectable()
export class AlunoService {
  readonly alunos: Aluno[] = [];

  constructor(@Inject(forwardRef(() => AutorService)) private autorService: AutorService, @Inject(forwardRef(() => CursoService)) private cursoService: CursoService) { }

  createAluno(newAluno: PostUsuarioDTO): string {
    if (this.alunos.find(x => x.getEmail().getValue() === newAluno.email) || this.autorService.autores.find(x => x.getEmail().getValue() === newAluno.email)) {
      throw new Error("Já existe um aluno com esse email");
    }

    try {
      const aluno = new Aluno(newAluno.nome, newAluno.email, newAluno.idade);
      this.alunos.push(aluno);
      return aluno.getId();
    }
    catch (e) {
      throw e;
    }
  }

  getAlunos(): GetAlunoDTO[] {
    let allAlunos: GetAlunoDTO[] = [];

    this.alunos.forEach(aluno => {
      allAlunos.push(new GetAlunoDTO(aluno.getId(), aluno.getNome().getValue(), aluno.getIdade().getValue()));
    });

    return allAlunos;
  }

  getAlunoById(id: string): GetAlunoVerboseDTO | Error {
    const aluno: Aluno | undefined = this.alunos.find(aluno => aluno.getId() === id);

    if (!aluno) {
      throw new HttpException('Aluno não encontrado', HttpStatus.NOT_FOUND);
    }

    const gotCursosMatriculados: Curso[] = this.cursoService.cursos.filter(
      curso => curso.getAlunos().find(aluno => aluno.getId() == id)
    );

    const cursosMatriculados: GetCursoDTO[] = gotCursosMatriculados.map<GetCursoDTO>((curso: Curso) => { return new GetCursoDTO(curso.getId(), curso.getNome().getValue(), curso.getDescricao().getValue(), curso.getCargaHoraria().getValue()) } );

    return new GetAlunoVerboseDTO(aluno.getNome().getValue(), aluno.getEmail().getValue(), aluno.getIdade().getValue(), cursosMatriculados);
  }

}
