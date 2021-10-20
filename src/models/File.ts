import { Document, model, Schema } from "mongoose";

export interface IFile extends Document {
	filename: string;
	secure_url: string;
	sizeInBytes: string;
	format: string;
	sender?: string;
	receiver?: string;
	expire_at: number | undefined;
}

const fileSchema = new Schema<IFile>(
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

fileSchema.index({ createdAt: 1 }, { expireAfterSeconds: 604800 });

export default model("File", fileSchema);
