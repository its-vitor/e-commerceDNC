import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import rateLimit from 'express-rate-limit';
import cookieParser from 'cookie-parser';

import * as env from "./env";

const app = express();

/**
 * `express.json()` nos permite fazer uma leitura do body de uma
 * requisição que segue o padrão JSON.
 */
app.use(express.json());

/**
 * Com o Cors, dizemos ao nosso serviço para aceitar solicitações de
 * todas as portas independente de qual seja. Desta maneira, sites podem
 * ser alimentados com a Api.
 */
app.use(cors());

/**
 * Esse pacote permite enxergarmos as requisições feitas para nosso
 * servidor.
 */
app.use(morgan('dev'))

/**
 * rateLimit serve para limitar o número de requisições enviados para
 * o servidor Express. No método abaixo, cinco representa a quantidade
 * em minutos, sendo multiplicado por sessenta e mil, resultando então
 * na formatação correta para que o limite de requisições a cada cinco
 * minutos seja de trezentos pedidos.
 */
app.use(rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 300,
}))

/**
 * `cookieParser()` faz uma análise dos cabeçalhos (Headers) que são
 * enviados para o nosso serviço.
 */
app.use(cookieParser())

const connectApp = () => {
    /* Cria conexão com o banco de dados. */
    const server = app.listen(env.port, () => console.log(`Server on! Port: ${env.port}`))

    /* Verifica caso tenha se conectado. */
    server.on('error', (err) => console.error(`Server off: ${err}`))
    return server;
}

export default connectApp;