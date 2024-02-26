import mongoose from "mongoose";
import { v3, v4 } from "uuid";
import crypto from 'crypto';
import Products from "../Products/Products";
import Clients from "../Clients/Clients";
import * as errors from '../../utilities/errors'

interface IRequests {
    _id: string;

    name: string;
    clientId: string;
    productId: string;

    finished: boolean;
}

const RequestSchema = new mongoose.Schema<IRequests>({
    _id: { 
        type: String, 
        required: true, 
        default: () => v3(crypto.randomBytes(6).toString('hex'), v4()), 
        unique: true 
    },
    name: { type: String, required: true },
    clientId: { type: String },
    productId: { type: String },
    finished: { type: Boolean, required: true, default: false }
});

RequestSchema.pre('save', async function(next) {
    const existsProd = await Products.findOne({ _id: this.productId });
    const existsClient = await Clients.findOne({ _id: this.clientId });

    if ( existsClient && existsProd ) {
        next()
    } else {
        throw new errors.ActionNotAllowed();
    }
});

export default mongoose.model('Request', RequestSchema, 'Requests');