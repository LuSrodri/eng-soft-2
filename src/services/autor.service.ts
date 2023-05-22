import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import GetCursoDTO from 'src/dto/Curso/GetCursoDTO';
import Curso from 'src/domain/curso.entity';
import PostUsuarioDTO from 'src/dto/Usuario/PostUsuarioDTO';
import Autor from 'src/domain/autor.entity';
import GetAutorDTO from 'src/dto/Autor/GetAutorDTO';
import GetAutorVerboseDTO from 'src/dto/Autor/GetAutorVerboseDTO';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Aluno from 'src/domain/aluno.entity';

@Injectable()
export class AutorService {
  constructor(@InjectRepository(Autor) private autoresRepository: Repository<Autor>, @InjectRepository(Aluno) private alunosRepository: Repository<Aluno>, @InjectRepository(Curso) private cursosRepository: Repository<Curso>) { }

  async createAutor(newAutor: PostUsuarioDTO): Promise<string> {
    if ((await this.autoresRepository.find()).find(x => x.getEmail().getValue() === newAutor.email) || (await this.alunosRepository.find()).find(x => x.getEmail().getValue() === newAutor.email)) {
      throw new Error("Já existe um autor com esse email");
    }

    try {
      const autor = Autor.create(newAutor.nome, newAutor.email, newAutor.idade);
      await this.autoresRepository.save(autor);
      return autor.getId();
    }
    catch (e) {
      throw e;
    }
  }

  async getAutor(): Promise<GetAutorDTO[]> {
    let allAutor: GetAutorDTO[] = [];

    (await this.autoresRepository.find()).forEach(autor => {
      allAutor.push(new GetAutorDTO(autor.getId(), autor.getNome().getValue(), autor.getIdade().getValue()));
    });

    return allAutor;
  }

  async getAutorById(id: string): Promise<GetAutorVerboseDTO> {
    const autor: Autor | undefined = (await this.autoresRepository.find({relations: { cursosCriados: true }})).find(autor => autor.getId() === id);

    if (!autor) {
      throw new HttpException('Autor não encontrado', HttpStatus.NOT_FOUND);
    }

    const cursosCriados: GetCursoDTO[] = autor.cursosCriados.map<GetCursoDTO>(curso => { return new GetCursoDTO(curso.getId(), curso.getNome().getValue(), curso.getDescricao().getValue(), curso.getCargaHoraria().getValue()) });

    return new GetAutorVerboseDTO(autor.getNome().getValue(), autor.getEmail().getValue(), autor.getIdade().getValue(), cursosCriados);
  }

}
