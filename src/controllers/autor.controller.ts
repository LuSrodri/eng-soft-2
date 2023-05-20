import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import GetAutorDTO from 'src/dto/Autor/GetAutorDTO';
import GetAutorVerboseDTO from 'src/dto/Autor/GetAutorVerboseDTO';
import PostUsuarioDTO from 'src/dto/Usuario/PostUsuarioDTO';
import { AutorService } from 'src/services/autor.service';

@Controller('autores')
export class AutorController {
  constructor(private readonly autorService: AutorService) { }

  @Get()
  getAutor(): GetAutorDTO[] {
    return this.autorService.getAutor();
  }

  @Get(':id')
  getAutorById(@Param() params: any): GetAutorVerboseDTO | Error {
    try {
      return this.autorService.getAutorById(params.id);
    }
    catch (error) {
      throw error;
    }
  }

  @Post()
  createAutor(@Body() newAutor: PostUsuarioDTO): { id: string } {
    try {
      const id = this.autorService.createAutor(newAutor);
      return { id };
    }
    catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
