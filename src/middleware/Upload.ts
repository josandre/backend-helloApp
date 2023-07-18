import { Request } from "express";
import { FileFilterCallback } from "multer";
import multer, { StorageEngine } from "multer";

const imageFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new Error("Please upload only images."));
  }
};

const storage: StorageEngine = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb: Function) => {
    cb(null,  "Images");
  },
  filename: (req: Request, file: Express.Multer.File, cb: (error: Error | null, filename: string) => void) => {
    cb(null, Date.now()+file.originalname);
  },
});

const uploadFile = multer({ storage, fileFilter: imageFilter });

export = uploadFile;
