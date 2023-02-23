import { Router } from 'express';
import { AddJoke, GetJokes, LikeJoke } from '../controller/joke';

const githubRouter = Router();

githubRouter.get('/getJokes', GetJokes);
githubRouter.put('/addJoke', AddJoke);
githubRouter.post('/likeJoke', LikeJoke);

export default githubRouter;
