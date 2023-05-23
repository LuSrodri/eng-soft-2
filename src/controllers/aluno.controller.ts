import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { AlunoService } from '../services/aluno.service';
import GetAlunoDTO from 'src/dto/Aluno/GetAlunoDTO';
import GetAlunoVerboseDTO from 'src/dto/Aluno/GetAlunoVerboseDTO';
import PostUsuarioDTO from 'src/dto/Usuario/PostUsuarioDTO';

@Controller('alunos')
export class AlunoController {
  constructor(private readonly alunoService: AlunoService) { }

  @Get()
  async getAlunos(): Promise<GetAlunoDTO[]> {
    return await this.alunoService.getAlunos();
  }

  @Get(':id')
  async getAlunoById(@Param() params: any): Promise<GetAlunoVerboseDTO | Error> {
    try {
      return await this.alunoService.getAlunoById(params.id);
    }
    catch (error) {
      throw error;
    }
  }

  @Post()
  async createAluno(@Body() newAluno: PostUsuarioDTO): Promise<{ id: string; }> {
    try {
      const id = await this.alunoService.createAluno(newAluno);
      return { id };
    }
    catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
