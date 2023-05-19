import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { AlunoController } from './controllers/aluno.controller';
import { AlunoService } from './services/aluno.service';
import { CursoController } from './controllers/curso.controller';
import { CursoService } from './services/curso.service';

@Module({
  imports: [],
  controllers: [AppController, AlunoController, CursoController],
  providers: [AppService, AlunoService, CursoService],
})
export class AppModule { }
