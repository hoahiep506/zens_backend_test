"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const joke_1 = require("../controller/joke");
const githubRouter = (0, express_1.Router)();
githubRouter.get('/getJokes', joke_1.GetJokes);
githubRouter.put('/addJoke', joke_1.AddJoke);
githubRouter.post('/likeJoke', joke_1.LikeJoke);
exports.default = githubRouter;
