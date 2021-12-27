import { Router } from "express";
import * as postController from "../controllers/post";

const routes = Router();

routes.get("/id/:id", postController.getById);
routes.get("/url/:url", postController.getByUrl);

routes.get("/", postController.getPosts);
routes.post("/", postController.post);

export default routes

