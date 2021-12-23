import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    allAmount: { type: Number, required: true }
})

export interface User extends mongoose.Document {
    readonly _id: mongoose.Schema.Types.ObjectId
    readonly email: string;
    readonly password: string;
    allAmount: number;
}