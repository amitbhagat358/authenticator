import express from "express"
import path from 'path'
import {fileURLToPath} from 'url';

const app = express();
const PORT = 5500;

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