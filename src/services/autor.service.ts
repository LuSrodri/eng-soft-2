import { HttpException, HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import { CursoService } from './curso.service';
import GetCursoDTO from 'src/dto/Curso/GetCursoDTO';
import Curso from 'src/domain/Curso';
import PostUsuarioDTO from 'src/dto/Usuario/PostUsuarioDTO';
import Autor from 'src/domain/Autor';
import GetAutorDTO from 'src/dto/Autor/GetAutorDTO';
import GetAutorVerboseDTO from 'src/dto/Autor/GetAutorVerboseDTO';
import { AlunoService } from './aluno.service';

@Injectable()
export class AutorService {
  readonly autores: Autor[] = [];

  constructor(@Inject(forwardRef(() => AlunoService)) private alunoService: AlunoService, @Inject(forwardRef(() => CursoService)) private cursoService: CursoService) { }

  createAutor(newAutor: PostUsuarioDTO): string {
    if (this.autores.find(x => x.getEmail().getValue() === newAutor.email) || this.alunoService.alunos.find(x => x.getEmail().getValue() === newAutor.email)) {
      throw new Error("Já existe um autor com esse email");
    }

    try {
      const autor = new Autor(newAutor.nome, newAutor.email, newAutor.idade);
      this.autores.push(autor);
      return autor.getId();
    }
    catch (e) {
      throw e;
    }
  }

  getAutor(): GetAutorDTO[] {
    let allAutor: GetAutorDTO[] = [];

    this.autores.forEach(autor => {
      allAutor.push(new GetAutorDTO(autor.getId(), autor.getNome().getValue(), autor.getIdade().getValue()));
    });

    return allAutor;
  }

  getAutorById(id: string): GetAutorVerboseDTO {
    const autor: Autor | undefined = this.autores.find(autor => autor.getId() === id);

    if (!autor) {
      throw new HttpException('Autor não encontrado', HttpStatus.NOT_FOUND);
    }

    const gotCursosCriados: Curso[] = this.cursoService.cursos.filter(curso => curso.getAutor().getId() === id);

    const cursosCriados: GetCursoDTO[] = gotCursosCriados.map<GetCursoDTO>((curso: Curso) => { return new GetCursoDTO(curso.getId(), curso.getNome().getValue(), curso.getDescricao().getValue(), curso.getCargaHoraria().getValue()) });

    return new GetAutorVerboseDTO(autor.getNome().getValue(), autor.getEmail().getValue(), autor.getIdade().getValue(), cursosCriados);
  }

}
