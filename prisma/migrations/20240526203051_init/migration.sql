-- CreateEnum
CREATE TYPE "TipoMensagem" AS ENUM ('confirmacaoDePedido', 'confirmacaoDepagamento');

-- CreateEnum
CREATE TYPE "CanalMensagem" AS ENUM ('email', 'sms');

-- CreateTable
CREATE TABLE "Mensagem" (
    "id" TEXT NOT NULL,
    "idUsuario" TEXT NOT NULL,
    "destinacaoDeMensagem" TEXT NOT NULL,
    "conteudoDeMensagem" TEXT NOT NULL,
    "tipoMensagem" "TipoMensagem" NOT NULL,
    "canalMensagem" "CanalMensagem" NOT NULL,

    CONSTRAINT "Mensagem_pkey" PRIMARY KEY ("id")
);
