import { Router, Request, Response } from "express";
import { uploadImages, imageName } from "../../services/uploadImages";

const uploadRoutes = Router();

uploadRoutes.post("/", uploadImages, (req: Request, res: Response) => {
  try {
    if (req.files?.length) {
      const img = `${req.protocol}://${req.get(
        "host"
      )}/uploads/images/${imageName}`;

      res.json({ img });
    } else {
      throw new Error("This is not an image");
    }
  } catch (err) {
    res.status(406).json(`${err}`);
  }
});

export default uploadRoutes;
