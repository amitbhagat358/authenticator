import express from "express"
import path from 'path'
import connectDB from './db.js'
import { loginUser, registerUser, logoutUser} from "./userController.js";
import {fileURLToPath} from 'url';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser'
import authMiddleware from "./authMiddleware.js";

const app = express();
const PORT = 5500;

dotenv.config();
connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.get('/', authMiddleware, (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'login.html'));
})

app.post('/login', loginUser);

app.get('/register', (req, res) => {
  res.sendFile(path.join(__dirname, "register.html")); 
})

app.post ('/register', registerUser);

app.post('/logout', logoutUser);

app.listen(PORT, () => {
  console.log(`Listening on port : ${PORT}`);
})