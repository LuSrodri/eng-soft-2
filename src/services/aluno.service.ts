import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import Aluno from 'src/domain/Aluno';
import GetAlunoDTO from 'src/dto/Aluno/GetAlunoDTO';
import GetAlunoVerboseDTO from 'src/dto/Aluno/GetAlunoVerboseDTO';
import PostAlunoDTO from 'src/dto/Aluno/PostAlunoDTO';

@Injectable()
export class AlunoService {
  readonly alunos: Aluno[] = [];

  createAluno(newAluno: PostAlunoDTO): string {
    if (this.alunos.find(x => x.getEmail().getValue() === newAluno.email)) {
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

    return new GetAlunoVerboseDTO(aluno.getNome().getValue(), aluno.getEmail().getValue(), aluno.getIdade().getValue(), aluno.getCursos());
  }

}
