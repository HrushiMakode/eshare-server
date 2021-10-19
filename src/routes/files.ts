import { Router } from "express";
import { UploadApiResponse, v2 as cloundinary } from "cloudinary";
import multer from "multer";
import File from "../models/File";

import https from "https";

const router = Router();

const storage = multer.diskStorage({});

let upload = multer({
	storage,
});

router.post("/upload", upload.single("file"), async (req, res) => {
	try {
		if (!req.file)
			return res.status(400).json({
				message: "File is not uploaded by client",
				file: req.file,
			});
		let uploadedFile: UploadApiResponse;
		try {
			uploadedFile = await cloundinary.uploader.upload(req.file.path, {
				folder: "eshare",
				resource_type: "auto",
			});
		} catch (error) {
			return res.status(500).json(error);
		}

		const { originalname } = req.file;
		const { secure_url, bytes, format } = uploadedFile;
		try {
			let file = new File({
				filename: originalname,
				sizeInBytes: bytes,
				secure_url: secure_url,
				format: format || originalname.split(".").pop(),
			});

			const data = await file.save();
			return res.status(201).json({
				id: data._id,
				downloadPageLink: `${process.env.API_BASE}/download/${data._id}`,
			});
		} catch (error) {
			return res.status(500).json(error);
		}
	} catch (error) {
		return res.status(500).json(error);
	}
});

router.get("/:id", async (req, res) => {
	try {
		const id = req.params.id;
		const file = await File.findById(id);
		if (!file)
			return res.status(404).json({
				msg: "File not Found",
			});

		const { filename, format, sizeInBytes } = file;

		return res.json({
			name: filename,
			sizeInBytes,
			format,
			id,
		});
	} catch (error) {
		return res.status(500).json({
			msg: "Server Error :(",
			error: error,
		});
	}
});

router.get("/:id/download", async (req, res) => {
	try {
		const id = req.params.id;
		const file = await File.findById(id);
		if (!file)
			return res.status(404).json({
				msg: "File not Found",
			});
		https.get(file.secure_url, (fileStream) => fileStream.pipe(res));
	} catch (error) {
		return res.status(500).json({
			msg: "Server Error :(",
			error: error,
		});
	}
});

router.post("/email", async (req, res) => {
	// Todo 1.Validate Request

	const { id, emailFrom, emailTo } = req.body;

	if (emailFrom === "" || emailTo === "")
		return res.status(400).json("Need email to send");

	// Todo 2.Check if the file exists

	try {
		const file = await File.findById(id);
		if (!file)
			return res.status(404).json({
				msg: "File not Found",
			});
	} catch (error) {
		return res.status(500).json({
			msg: "File not found",
			error,
		});
	}

	// Todo 3.create transporter
	// Todo 4.prepare the e-mail data
	// Todo 5.send mail using the transporter
	// Todo 6.save the data and send the response
});

export default router;
