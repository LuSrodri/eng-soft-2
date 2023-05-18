import { Controller, Get, Param, Post, Req } from '@nestjs/common';
import { AlunoService } from '../services/aluno.service';
import GetAlunoDTO from 'src/dto/Aluno/GetAlunoDTO';
import { Request } from 'express';
import PostAlunoDTO from 'src/dto/Aluno/PostAlunoDTO';

@Controller('alunos')
export class AlunoController {
  constructor(private readonly alunoService: AlunoService) {}

  @Get()
  getAlunos(): GetAlunoDTO[] {
    return this.alunoService.getAlunos();
  }

  @Get(':id')
  getAlunoById(@Param() params: any): GetAlunoDTO | Error {
    try{
      return this.alunoService.getAlunoById(params.id);
    }
    catch(error){
      throw error;
    }
  }

  @Post()
  createAluno(@Req() request: Request): { id: string } {
    const { nome, email, idade } = request.body;
    const id = this.alunoService.createAluno(new PostAlunoDTO(nome, email, idade));
    return { id };
  }
}
