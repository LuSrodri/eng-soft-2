import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { AlunoController } from './controllers/aluno.controller';
import { AlunoService } from './services/aluno.service';
import { CursoController } from './controllers/curso.controller';
import { CursoService } from './services/curso.service';
import { AutorService } from './services/autor.service';
import { AutorController } from './controllers/autor.controller';

@Module({
  imports: [],
  controllers: [AppController, AlunoController, AutorController, CursoController],
  providers: [AppService, AlunoService, AutorService, CursoService],
})
export class AppModule { }
