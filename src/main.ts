import express from 'express';
import imageRoute from './routes/getImage';

//create server
const app = express();
const port = 3000;

//use Routes
//main route
app.use('/image', imageRoute);

app.get('/', (_req: express.Request, res: express.Response): void => {
  res.send('Main route');
});

app.listen(port, (): void => {
  console.log(`Server started at port ${port}`);
});

export default app;
