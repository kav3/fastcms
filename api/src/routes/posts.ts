import { Router } from "express";
import * as postController from "../controllers/post";
import { tokenUser } from "../utils/auth"

const routes = Router();

routes.get("/id/:id", postController.getById);
routes.get("/url/:url", postController.getByUrl);

routes.get("/", [tokenUser()], postController.getPosts);
routes.post("/", postController.post);

export default routes

