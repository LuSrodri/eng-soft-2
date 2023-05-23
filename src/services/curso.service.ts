import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import Curso from 'src/domain/curso.entity';
import Aluno from 'src/domain/aluno.entity';
import GetCursoDTO from 'src/dto/Curso/GetCursoDTO';
import PostCursoDTO from 'src/dto/Curso/PostCursoDTO';
import GetCursoVerboseDTO from 'src/dto/Curso/GetCursoVerboseDTO';
import GetAlunoDTO from 'src/dto/Aluno/GetAlunoDTO';
import Autor from 'src/domain/autor.entity';
import GetAutorDTO from 'src/dto/Autor/GetAutorDTO';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class CursoService {
  constructor(@InjectRepository(Curso) private cursosRepository: Repository<Curso>, @InjectRepository(Aluno) private alunosRepository: Repository<Aluno>, @InjectRepository(Autor) private autoresRepository: Repository<Autor>) { }

  async createCurso(newCurso: PostCursoDTO): Promise<string> {
    try {
      const autor: Autor | undefined = (await this.autoresRepository.find()).find(autor => autor.getId() === newCurso.autorId);
      if (!autor) {
        throw new HttpException('Autor não encontrado', HttpStatus.NOT_FOUND);
      }
      const cursoCriado = await this.cursosRepository.save(Curso.create(newCurso.nome, newCurso.descricao, newCurso.cargaHoraria, autor));

      autor.cursosCriados = [cursoCriado];
      await this.autoresRepository.save(autor);

      return cursoCriado.getId();
    }
    catch (e) {
      throw e;
    }
  }

  async getCursos(): Promise<GetCursoDTO[]> {
    let allCursos: GetCursoDTO[] = [];

    (await this.cursosRepository.find()).forEach(curso => {
      allCursos.push(new GetCursoDTO(curso.getId(), curso.getNome().getValue(), curso.getDescricao().getValue(), curso.getCargaHoraria().getValue()));
    });

    return allCursos;
  }

  async getCursoById(id: string): Promise<GetCursoVerboseDTO | Error> {
    const curso: Curso | undefined = (await this.cursosRepository.find({relations: {autor: true, alunos: true}})).find(curso => curso.getId() === id);

    if (!curso) {
      throw new HttpException('Curso não encontrado', HttpStatus.NOT_FOUND);
    }

    const alunos: GetAlunoDTO[] = curso.alunos.map<GetAlunoDTO>(aluno => { return new GetAlunoDTO(aluno.getId(), aluno.getNome().getValue(), aluno.getIdade().getValue()) });

    const autor: GetAutorDTO = new GetAutorDTO(curso.autor.getId(), curso.autor.getNome().getValue(), curso.autor.getIdade().getValue());

    return new GetCursoVerboseDTO(curso.getNome().getValue(), curso.getDescricao().getValue(), curso.getCargaHoraria().getValue(), autor, alunos);
  }

  async matricularAluno(idCurso: string, idAluno: string): Promise<boolean> {
    const curso: Curso | undefined = (await this.cursosRepository.find({ relations: {autor: true, alunos: true} })).find(curso => curso.getId() === idCurso);

    if (!curso) {
      throw new HttpException('Curso não encontrado', HttpStatus.NOT_FOUND);
    }

    const aluno: Aluno | undefined = (await this.alunosRepository.find({ relations: {cursosMatriculados: true} })).find(aluno => aluno.getId() === idAluno);
    
    if (!aluno) {
      throw new HttpException('Aluno não encontrado', HttpStatus.NOT_FOUND);
    }

    if (curso.alunos.find(aluno => aluno.getId() === idAluno)) {
      throw new HttpException('Aluno já matriculado no curso', HttpStatus.BAD_REQUEST);
    }

    curso.alunos = [...curso.alunos, aluno];
    aluno.cursosMatriculados = [...aluno.cursosMatriculados, curso];
    this.cursosRepository.save(curso);
    this.alunosRepository.save(aluno);

    return true;
  }
}
