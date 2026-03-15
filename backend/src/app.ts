import express from 'express'
import cors from 'cors'
import authRoutes from './authentication/authRoutes.js'
import taskRoutes from './tasks/taskRoutes.js'
import { authenticateToken } from './middleware/mdws.js'
const app = express();
app.use(cors());
app.use(express.json());
app.use('/api/auth',authRoutes);
app.use('/api/tasks', authenticateToken, taskRoutes);
app.get('/', (req, res) => {
    res.send('base url')
    // return { status: 'ok',  }
})

export default app;