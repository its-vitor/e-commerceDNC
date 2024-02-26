import mongoose from "mongoose";
import { v5, v4 } from "uuid";
import crypto from 'crypto';
import Products from "../Products/Products";
import * as errors from '../../utilities/errors'

interface IStock {
    _id: string;
    
    associatedPID: string;
    stock: number;
}

const StockSchema = new mongoose.Schema<IStock>({
    _id: { 
        type: String, 
        required: true, 
        unique: true, 
        default: () => v5(crypto.randomBytes(12).toString('hex'), v4()),
    },
    associatedPID: { type: String, required: true },
    stock: { type: Number, required: true }
});

StockSchema.pre('save', async function(next) {
    if (
        this.isModified('associatedPID') 
        && !await Products.findById(this.associatedPID)) {
            throw new errors.ActionNotAllowed();
    }

    if (this.stock <= 0) {
        throw new errors.ActionNotAllowed();
    }

    next();
});

export default mongoose.model<IStock>('Stock', StockSchema, 'Stocks');