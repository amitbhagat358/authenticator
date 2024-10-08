import express from "express"
import path from 'path'
import connectDB from './db.js'
import {fileURLToPath} from 'url';
import dotenv from 'dotenv';

const app = express();
const PORT = 5500;

dotenv.config();
connectDB();

app.use(express.json());

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "index.html")); 
})

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, "register.html")); 
})


app.listen(PORT, () => {
  console.log(`Listening on port : ${PORT}`);
})