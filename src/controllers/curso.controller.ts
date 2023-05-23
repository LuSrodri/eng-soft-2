import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { CursoService } from '../services/curso.service';
import GetCursoDTO from 'src/dto/Curso/GetCursoDTO';
import PostCursoDTO from 'src/dto/Curso/PostCursoDTO';
import GetCursoVerboseDTO from 'src/dto/Curso/GetCursoVerboseDTO';

@Controller('cursos')
export class CursoController {
  constructor(private readonly cursoService: CursoService) { }

  @Get()
  async getCursos(): Promise<GetCursoDTO[]> {
    return await this.cursoService.getCursos();
  }

  @Get(':id')
  async getCursoById(@Param() params: any): Promise<GetCursoVerboseDTO | Error> {
    try {
      return await this.cursoService.getCursoById(params.id);
    }
    catch (error) {
      throw error;
    }
  }

  @Post()
  async createCurso(@Body() newAluno: PostCursoDTO): Promise<{ id: string; }> {
    try {
      const id = await this.cursoService.createCurso(newAluno);
      return { id };
    }
    catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post(':idCurso/matricular/:idAluno')
  async matricularAluno(@Param() params: any): Promise<void> {
    try {
      await this.cursoService.matricularAluno(params.idCurso, params.idAluno);
    }
    catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
