import express from 'express'
import cors from 'cors'
import authRoutes from './authentication/authRoutes.js'
import taskRoutes from './tasks/taskRoutes.js'
import { authenticateToken } from './middleware/mdws.js'
const app = express();
// app.use(cors());


app.use(express.json());
app.use(cors({
    origin: function (origin, callback) {
        // allow requests with no origin (like mobile apps, Postman)
        if (!origin) return callback(null, true);

        if (
            origin === "http://localhost:3000" ||
            origin.endsWith(".vercel.app")
        ) {
            return callback(null, true);
        }

        return callback(new Error("Not allowed by CORS"));
    },
    credentials: true,
}));

app.use('/api/auth',authRoutes);
app.use('/api/tasks', authenticateToken, taskRoutes);
app.get('/', (req, res) => {
    res.send('base url')
    // return { status: 'ok',  }
})

export default app;