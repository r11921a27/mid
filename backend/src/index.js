import express from 'express';
import rootRouter from './routes/index.js';

const port = process.env.PORT || 8000;
const app = express();

app.use(rootRouter);

app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
