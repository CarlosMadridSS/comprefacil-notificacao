import { Module } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import { MensagemController } from "./mensagem.controller";
import { MensagemService } from "./mensagem.service";


@Module({
    controllers: [MensagemController],
    providers: [PrismaService, MensagemService],
})
export class MensagemModule {

}