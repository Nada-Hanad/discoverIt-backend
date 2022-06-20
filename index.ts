import express, { Application, Request, Response, Router } from 'express';
import postsRoute from './routers/locationRouter';
import cors from 'cors';
import userRouter from './routers/usersRoute';
import eventRouter from './routers/eventRoute';

const db = require('./config/db');
const app: Application = express();
const router: Router = express.Router();

app.use(express.json());
userRouter(router);
postsRoute(router);
eventRouter(router);

app.use(cors());
app.use(router);
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello world' });
});

const port = 3000;
app.listen(port, () => {
  console.log('Server is running on port ' + port);
});
