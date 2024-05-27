import { Controller, Get, Logger, Query } from "@nestjs/common";
import { MensagemService } from "./mensagem.service";
import { CanalMensagem, Mensagem, TipoMensagem } from "@prisma/client";
import { MessagePattern, Payload, Ctx, RmqContext } from '@nestjs/microservices'
import DadosMensagem from "./tipos/tipoMensagem";


@Controller('mensagem')
export class MensagemController {
    constructor(private readonly mensagemService: MensagemService) { }

    private readonly logger = new Logger(MensagemController.name);

    @Get('capturar')
    async capturarMensagem(@Query('idUsuario') idUsuario: string): Promise<Mensagem[] | null> {
        return await this.mensagemService.pegarMensagemPorIdUsuario(idUsuario);
    }

    @MessagePattern('registro')
    async leRegistroPagamento(
        @Payload() payload: any,
        @Ctx() context: RmqContext
    ) {
        try {
            this.logger.log(`Registro: ${JSON.stringify(payload)}`);
            
            const dadosMensagem: DadosMensagem = JSON.parse(payload.dados.notificacao);
            const canalRmq = context.getChannelRef();
            const mensagemOriginal = context.getMessage();

            canalRmq.ack(mensagemOriginal);

            await this.mensagemService.enviarMensagem(dadosMensagem, TipoMensagem.confirmacaoDePedido);
            await this.mensagemService.persistirMensagem(dadosMensagem, TipoMensagem.confirmacaoDepagamento, CanalMensagem.email);

        } catch (error) {
            this.logger.error(error);
        }
    }

    @MessagePattern('confirmacao')
    async leConfirmacaoPagamento(
        @Payload() payload: any,
        @Ctx() context: RmqContext
    ) { 
        try {
            this.logger.log(`Confirmação:  ${JSON.stringify(payload)}`);

            const dadosMensagem: DadosMensagem = JSON.parse(payload.dados.notificacao);
            const canalRmq = context.getChannelRef();
            const mensagemOriginal = context.getMessage();

            canalRmq.ack(mensagemOriginal);

            await this.mensagemService.enviarMensagem(dadosMensagem, TipoMensagem.confirmacaoDePedido);
            await this.mensagemService.persistirMensagem(dadosMensagem, TipoMensagem.confirmacaoDepagamento, CanalMensagem.email);


        } catch (error) {
            this.logger.error(error);
        }
    }
}