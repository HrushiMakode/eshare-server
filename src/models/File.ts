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
		expire_at: {
			type: Date,
			default: Date.now(),
			expires: 604800,
		},
		sender: String,
		receiver: String,
	},
	{
		timestamps: true,
	}
);

export default model("File", FileSchema);
