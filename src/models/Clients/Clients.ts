import mongoose from "mongoose";
import { v4 } from "uuid";

interface IClient {
    _id: string;

    name: string;
    city: string | undefined;
    createdAt: Date;
}

const ClientSchema = new mongoose.Schema<IClient>({
    _id: { type: String, required: true, default: () => v4(), unique: true },
    name: { type: String, required: true },
    city: { type: String || undefined, default: undefined },
    createdAt: { type: Date, required: true, default: Date.now() }
});

export default mongoose.model('Client', ClientSchema, 'Clients')