import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { AlunoController } from './controllers/aluno.controller';
import { AlunoService } from './services/aluno.service';
import { CursoController } from './controllers/curso.controller';
import { CursoService } from './services/curso.service';
import { AutorService } from './services/autor.service';
import { AutorController } from './controllers/autor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import Aluno from './domain/aluno.entity';
import Autor from './domain/autor.entity';
import Curso from './domain/curso.entity';
const ormconfig = require('../ormconfig.js');

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig),
    TypeOrmModule.forFeature([Aluno]),
    TypeOrmModule.forFeature([Autor]),
    TypeOrmModule.forFeature([Curso]),
  ],
  controllers: [AppController, AlunoController, AutorController, CursoController],
  providers: [AppService, AlunoService, AutorService, CursoService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
