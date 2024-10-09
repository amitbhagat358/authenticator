import express from "express"
import path from 'path'
import connectDB from './db.js'
import { loginUser } from "./userController.js";
import {registerUser} from "./userController.js";
import {fileURLToPath} from 'url';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'

const app = express();
const PORT = 5500;

dotenv.config();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "index.html")); 
})

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, "register.html")); 
})

app.post ('/register', registerUser);

app.post('/submit', loginUser);


app.listen(PORT, () => {
  console.log(`Listening on port : ${PORT}`);
})