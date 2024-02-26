import Products from "../models/Products/Products";
import Clients from "../models/Clients/Clients";
import Requests from "../models/Requests/Requests";
import Sales from "../models/Sales/Sales";
import Stock from "../models/Stock/Stock";
import { Request, Response } from "express";
import * as errors from '../utilities/errors'

export async function registerProduct(req: Request, res: Response): Promise<Response> {
    const { name, description, price, stock } = req.body;

    const newProduct = new Products({
        name, description, price
    });

    const product = await newProduct.save();

    if (stock && typeof stock === 'number' && stock > 0) {
        const newStock = new Stock({ associatedPID: product._id, stock });
        await newStock.save();
    }

    if (product) {
        return res.send({ message: "Produto registrado!" })
    } else {
        throw new errors.ActionNotAllowed();
    }
}

export async function buyProduct(req: Request, res: Response) {
    const { name, clientId, productId } = req.body;

    const newRequest = new Requests({
        name, clientId, productId
    });

    if (await newRequest.save()) {
        return res.send({ message: "Seu pedido foi registrado!" })
    }
}

export async function approvedPurchase(req: Request, res: Response) {
    const ids: Array<String> = req.body.ids;

    if (ids) {
        for (let i = 0; i < ids.length; i++) {
            const request = await Requests.findById(ids[i])
            const stock = await Stock.findOne({ associatedPID: ids[i] });
            if (request && stock) {
                request.finished = true;
                await request.save();
                
                stock.stock -= 1;
                await stock.save();

                const newSale = new Sales({
                    requestId: request.id,
                    clientId: request.clientId,
                    productId: request.productId,
                });

                await newSale.save();
            }
        }
    }

    return res.send({ message: "Pedidos aprovados com sucesso!" });
}

export async function declinePurchase(req: Request, res: Response) {
    const ids: Array<String> = req.body.ids;

    if (ids) {
        for (let i = 0; i < ids.length; i++) {
            const request = await Requests.findById(ids[i])
            if (request) {
                await request.deleteOne();
            }
        }
    }

    return res.send({ message: "Pedidos foram recusados." });
}

export async function createClient(req: Request, res: Response) {
    const { name, city } = req.body;

    const newClient = new Clients({
        name, city
    });

    await newClient.save();
    return res.send({ message: "Cliente criado com sucesso!" })
}