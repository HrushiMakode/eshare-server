import { Document, model, Schema } from "mongoose";

export interface IFile extends Document {
    filename: string;
    secure_url: string;
    sizeInBytes: string;
    format: string;
    sender?: string;
    receiver?: string;
}

const FileSchema = new Schema<IFile>(
    {
        filename: {
            type: String,
            required: true,
        },
        secure_url: {
            type: String,
            required: true,
        },
        format: {
            type: String,
            required: true,
        },
        sizeInBytes: {
            type: String,
            required: true,
        },
        sender: String,
        receiver: String,
    },
    {
        timestamps: true,
    }
);

export default model("File", FileSchema);
