import express from 'express';
import cors from 'cors';
import path from 'path';
import * as url from 'url';
import dotenv from 'dotenv';
import { gemini_run } from './gemini.js';
import { llama_run } from './llama.js';

dotenv.config();

const app = express();

let corsOptions = {
  origin: true
}

// Set filePath
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));

/* middleware */
//app.use('요청 경로', express.static('실제 경로'));
app.use('/', express.static(path.join(__dirname, 'reactapp/build')));
app.use(express.static(path.join(__dirname, 'reactapp/build/static')));
// Set corsOptions
app.use(cors(corsOptions));
// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

/* route */
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
  //res.sendFile(path.join(path.join(__dirname, 'index.js')));
  //res.send('nodejs server opened');
});

app.post('/post', (req, res) => {
  const msg = req.body.message;
  console.log("req.body.message", msg);
  res.send({'return' : msg});
});

app.post('/gemini', async (req, res) => {
  const userPrompt = req.body.message;
  console.log("userPrompt", userPrompt);
  const geminiRes = await gemini_run(userPrompt);
  res.send({'geminiRes' : geminiRes});
});


app.get('/llama/:id', async (req,res) => {

  console.log("req.params.id :::" + req.params.id);

  const says = await llama_run(req.params.id);
  
  console.log("says :::" + says);

  res.send({ 'llama says' : says});
});




app.get('/gemini/:id', async (req,res) => {

  console.log("req.params.id :::" + req.params.id);

  const says = await gemini_run(req.params.id);
  
  console.log("says :::" + says);

  res.send({ 'gemini says' : says});
});


export default app;
