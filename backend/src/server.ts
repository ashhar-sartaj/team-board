import app from './app.js'
import http from 'http';
import dotenv from 'dotenv';
import dbConnection from './database/db.js';
import dns from 'node:dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);
const httpServer = http.createServer(app);
dotenv.config()
const PORT = process.env.PORT || 5000;
dbConnection();
httpServer.listen(PORT, () => {
    console.log('Server is running on port ', PORT);
})
