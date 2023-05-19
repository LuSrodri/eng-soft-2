import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { AlunoService } from '../services/aluno.service';
import GetAlunoDTO from 'src/dto/Aluno/GetAlunoDTO';
import PostAlunoDTO from 'src/dto/Aluno/PostAlunoDTO';
import GetAlunoVerboseDTO from 'src/dto/Aluno/GetAlunoVerboseDTO';

@Controller('alunos')
export class AlunoController {
  constructor(private readonly alunoService: AlunoService) { }

  @Get()
  getAlunos(): GetAlunoDTO[] {
    return this.alunoService.getAlunos();
  }

  @Get(':id')
  getAlunoById(@Param() params: any): GetAlunoVerboseDTO | Error {
    try {
      return this.alunoService.getAlunoById(params.id);
    }
    catch (error) {
      throw error;
    }
  }

  @Post()
  createAluno(@Body() newAluno: PostAlunoDTO): { id: string } {
    try {
      const id = this.alunoService.createAluno(newAluno);
      return { id };
    }
    catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
