import express from 'express';
import cors from 'cors';
import router from './routes/router.js';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use('/api', router);

export default app;
