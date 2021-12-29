import { Router } from "express";
import { Request, Response, NextFunction } from "express";
import multer from "multer"
import path from "path"

var upload = multer({
    storage: new multer.diskStorage({
      destination: path.resolve(__dirname, "../../", "files", "img"),
      filename: function (req, file, callback) {
        callback(null, file.originalname)
      }
    })
  })

const routes = Router();

// auth.verify
routes.post("/", upload.single('file'), async function (req: Request, res: Response) {
    const { filename } = req["file"]

    res.send({filename: filename});
})

export default routes
