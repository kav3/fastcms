// const express = require('express');
import {Router} from "express";

const routes = Router();

routes.get('/', (req, res) => {
  res.json(['😀', '😳', '🙄']);
});

export default routes