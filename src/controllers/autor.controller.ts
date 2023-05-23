import { Body, Controller, Get, HttpException, HttpStatus, Param, Post } from '@nestjs/common';
import GetAutorDTO from 'src/dto/Autor/GetAutorDTO';
import GetAutorVerboseDTO from 'src/dto/Autor/GetAutorVerboseDTO';
import PostUsuarioDTO from 'src/dto/Usuario/PostUsuarioDTO';
import { AutorService } from 'src/services/autor.service';

@Controller('autores')
export class AutorController {
  constructor(private readonly autorService: AutorService) { }

  @Get()
  async getAutor(): Promise<GetAutorDTO[]> {
    return await this.autorService.getAutor();
  }

  @Get(':id')
  async getAutorById(@Param() params: any): Promise<GetAutorVerboseDTO | Error> {
    try {
      return await this.autorService.getAutorById(params.id);
    }
    catch (error) {
      throw error;
    }
  }

  @Post()
  async createAutor(@Body() newAutor: PostUsuarioDTO): Promise<{ id: string; }> {
    try {
      const id = await this.autorService.createAutor(newAutor);
      return { id };
    }
    catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }
}
