import connectDB from './db';
import routes from './routes';
const express = require("express")
const dotenv = require("dotenv")
const cors = require('cors')

dotenv.config()
const PORT = process.env.PORT || 4000
const app = express()

connectDB()

app.use(cors())
app.use((req: any, res: any, next: any) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});
app.use('/api', routes)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`)
}); 
