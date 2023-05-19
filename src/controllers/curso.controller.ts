import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import { CursoService } from '../services/curso.service';
import GetCursoDTO from 'src/dto/Curso/GetCursoDTO';
import PostCursoDTO from 'src/dto/Curso/PostCursoDTO';
import GetCursoVerboseDTO from 'src/dto/Curso/GetCursoVerboseDTO';

@Controller('cursos')
export class CursoController {
  constructor(private readonly cursoService: CursoService) { }

  @Get()
  getAlunos(): GetCursoDTO[] {
    return this.cursoService.getCursos();
  }

  @Get(':id')
  getCursoById(@Param() params: any): GetCursoVerboseDTO | Error {
    try {
      return this.cursoService.getCursoById(params.id);
    }
    catch (error) {
      throw error;
    }
  }

  @Post()
  createAluno(@Body() newAluno: PostCursoDTO): { id: string } {
    try {
      const id = this.cursoService.createCurso(newAluno);
      return { id };
    }
    catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Post(':idCurso/matricular/:idAluno')
  matricularAluno(@Param() params: any): void {
    try {
      this.cursoService.matricularAluno(params.idCurso, params.idAluno);
    }
    catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
