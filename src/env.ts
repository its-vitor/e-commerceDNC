import { config } from "dotenv";

/**
 * Configurar as variáveis de ambiente para o arquivo `.env` na raiz
 * do projeto.
 */
config()

export const mongoDb = process.env.MONGODB ?? '';
export const port = ((): string => {
    /* Converte para número. */
    const portNumber = Number(process.env.PORT ?? '3000');

    /* Verifica se a porta é um número. */
    if (isNaN(portNumber)) {
        throw new Error('Porta para servidor inválida.');
    }
    return portNumber.toString();
})();
