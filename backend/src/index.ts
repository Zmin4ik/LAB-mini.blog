// backend/src/index.ts
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authorsRouter from './controllers/authors.controller';
import postsRouter from './controllers/posts.controller';
import userRouter from './controllers/user.controller';
import { logger } from './logger';

dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

app.use(express.json());

app.use('/api/authors', authorsRouter);
app.use('/api/posts', postsRouter);
app.use('/api/user', userRouter);

app.get('/api/health', (req, res) => {
    res.json({ ok: true });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    logger.info(`Backend listening on http://localhost:${PORT}`);
        logger.success('Test success');
    logger.error('Test error');
});