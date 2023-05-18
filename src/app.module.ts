import { Module } from '@nestjs/common';
import { AppController } from './controllers/app.controller';
import { AppService } from './services/app.service';
import { AlunoController } from './controllers/aluno.controller';
import { AlunoService } from './services/aluno.service';

@Module({
  imports: [],
  controllers: [AppController, AlunoController],
  providers: [AppService, AlunoService],
})
export class AppModule {}
