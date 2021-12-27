import {Router} from "express";
import emojis from "./emojis"
import users from "./users"
import posts from "./posts"

const routes = Router();

routes.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

// routes.use('/emojis', emojis);
routes.use('/users', users);
routes.use('/posts', posts);

export default routes;
