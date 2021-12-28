import { Router } from "express";
import * as userController from "../controllers/user";

const routes = Router();

// routes.get("/auth", userController.get);
routes.post("/auth", userController.post);

routes.get("/", userController.getUsers);

export default routes

