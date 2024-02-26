import mongoose from "mongoose";
import crypto from 'crypto';
import * as errors from '../../utilities/errors'

interface IProduct {
    _id: string;

    name: string;
    description: string;
    price: number;
}

const ProductSchema = new mongoose.Schema<IProduct>({
    _id: { 
        type: String, 
        default: () => crypto.randomBytes(16).toString('hex'), 
        unique: true 
    },
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true }
});

ProductSchema.pre('save', async function(next) {
    if (this.name.length > 80) {
        throw new errors.ProductNameTooBig();
    }
    
    if (this.description.length > 3000) {
        throw new errors.ProductDescriptionTooBig();
    }

    if (this.price <= 0) {
        throw new errors.ProductPriceNotAllowed();
    }

    next();
})

export default mongoose.model('Product', ProductSchema, 'Products')