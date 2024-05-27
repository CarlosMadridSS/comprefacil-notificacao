import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MensagemModule } from './mensagem/mensagem.module';

@Module({
  imports: [MensagemModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
