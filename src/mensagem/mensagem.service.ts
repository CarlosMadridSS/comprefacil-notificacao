import { Injectable } from "@nestjs/common";
import { CanalMensagem, Mensagem, TipoMensagem } from "@prisma/client";
import { PrismaService } from "src/prisma.service";
import DadosMensagem from "./tipos/tipoMensagem";

@Injectable()
export class MensagemService {
    constructor(private prisma: PrismaService) { }

    async pegarMensagemPorIdUsuario(idUsuario: string): Promise<Mensagem[] | null> { 
        return await this.prisma.mensagem.findMany({where: {idUsuario}})
    }

    async enviarMensagem(conteudo: DadosMensagem, tipo: string) {
        console.log("-----------------MENSAGEM------------------");
        console.table({
            tipo: tipo,
            idUsuario: JSON.stringify(conteudo.idUsuario),
            numeroDoPedido: JSON.stringify(conteudo.numeroPedido),
            valorDoPedido: JSON.stringify(conteudo.valorPedido),
            tipoPagamento: JSON.stringify(conteudo.tipoPagamento),
        });
    }

    async persistirMensagem(conteudo: DadosMensagem, tipo: TipoMensagem, canal: CanalMensagem){
        const dados = {
            idUsuario: conteudo.idUsuario,
            destinacaoDeMensagem: this.capturarDestinacao(conteudo.idUsuario),
            conteudoDeMensagem: '',
            tipoMensagem: tipo,
            canalMensagem: canal
        };

        await this.prisma.mensagem.create({data: {...dados}});
    }

    capturarDestinacao (idUsuario: string) {
        if (idUsuario === '10') {
            return 'usuario.10@email.com';
        }
    }

    formatarConteudo (numeroPedido: number, valorPedido: number) {

        return `Numero do pedido: ${numeroPedido}\nValor do pedido: ${valorPedido} R$`;
    }
}
