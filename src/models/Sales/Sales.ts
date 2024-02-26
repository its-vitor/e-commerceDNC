import mongoose from "mongoose";
import { v4 } from "uuid";

interface ISales {
    _id: string;

    requestId: string;
    productId: string;
    clientId: string;
    purchaseDate: Date;
}

const SalesSchema = new mongoose.Schema<ISales>({
    _id: { type: String, required: true, default: () => v4() },
    requestId: { type: String, required: true },
    productId: { type: String, required: true },
    clientId: { type: String, required: true },
    purchaseDate: { type: Date, required: true, default: () => Date.now() },
});

export default mongoose.model('Sales', SalesSchema, 'Sales');