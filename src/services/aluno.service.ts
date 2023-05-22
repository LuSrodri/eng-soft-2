import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import Aluno from 'src/domain/aluno.entity';
import GetAlunoDTO from 'src/dto/Aluno/GetAlunoDTO';
import GetAlunoVerboseDTO from 'src/dto/Aluno/GetAlunoVerboseDTO';
import GetCursoDTO from 'src/dto/Curso/GetCursoDTO';
import Curso from 'src/domain/curso.entity';
import PostUsuarioDTO from 'src/dto/Usuario/PostUsuarioDTO';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Autor from 'src/domain/autor.entity';

@Injectable()
export class AlunoService {
  constructor(@InjectRepository(Aluno) private alunosRepository: Repository<Aluno>, @InjectRepository(Autor) private autoresRepository: Repository<Autor>, @InjectRepository(Curso) private cursoRepository: Repository<Curso>) { }

  async createAluno(newAluno: PostUsuarioDTO): Promise<string> {
    if ((await this.alunosRepository.find()).find(x => x.getEmail().getValue() === newAluno.email) || (await this.autoresRepository.find()).find(x => x.getEmail().getValue() === newAluno.email)) {
      throw new Error("Já existe um aluno com esse email");
    }

    try {
      const aluno = Aluno.create(newAluno.nome, newAluno.email, newAluno.idade);
      await this.alunosRepository.save(aluno);
      return aluno.getId();
    }
    catch (e) {
      throw e;
    }
  }

  async getAlunos(): Promise<GetAlunoDTO[]> {
    let allAlunos: GetAlunoDTO[] = [];

    (await this.alunosRepository.find()).forEach(aluno => {
      allAlunos.push(new GetAlunoDTO(aluno.getId(), aluno.getNome().getValue(), aluno.getIdade().getValue()));
    });

    return allAlunos;
  }

  async getAlunoById(id: string): Promise<Error | GetAlunoVerboseDTO> {
    const aluno: Aluno | undefined = (await this.alunosRepository.find({ relations: { cursosMatriculados: true } })).find(aluno => aluno.getId() === id);

    if (!aluno) {
      throw new HttpException('Aluno não encontrado', HttpStatus.NOT_FOUND);
    }

    const cursosMatriculados: GetCursoDTO[] = aluno.cursosMatriculados.map<GetCursoDTO>(curso => { return new GetCursoDTO(curso.getId(), curso.getNome().getValue(), curso.getDescricao().getValue(), curso.getCargaHoraria().getValue()) });

    return new GetAlunoVerboseDTO(aluno.getNome().getValue(), aluno.getEmail().getValue(), aluno.getIdade().getValue(), cursosMatriculados);
  }

}
