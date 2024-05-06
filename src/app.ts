import {json} from 'body-parser';
import express, {Request, Response} from 'express';
import {readFileSync, writeFileSync} from 'fs';
import path from 'path';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import ConversationType from './models/conversation';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));
app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World ');
});

// get all conversations
app.get('/conversations', async (req: Request, res: Response) => {
  // const data = readFileSync('src/conversations.json', 'utf8');
  // res.json(JSON.parse(data.toString()));
  const conversations = await ConversationType.find({}).exec();
  // else get all products that match the query parameters
  res.status(200).json(conversations);
});

// gets a conversation thread
app.get('/conversations/:threadId', (req: Request, res: Response) => {
  // const threadId = req.params.threadId;
  // const data = readFileSync('src/conversations.json', 'utf8');
  // console.log(JSON.parse(data.toString()));
  // const filtered = JSON.parse(data.toString()).filter((item: any) => item.thread_id == threadId);
  // console.log(filtered);
  // res.json(filtered);
  res.json(null);
});

// creates conversation under new thread
// for now we are just going to create a new thread for every conversation
app.post('/conversations', async (req: Request, res: Response) => {
  //   const threadId = Math.random().toString(36).substring(3);
  //   const payload = req.body;
  //   const data = readFileSync('src/conversations.json', 'utf8');
  //   const parsed = JSON.parse(data.toString()); // convert buffer to string and try to parse array

  //   if (typeof parsed === 'object') {
  //     payload['id'] = parsed.length;
  //     payload['thread_id'] = threadId;
  //     parsed.push(payload);
  //     const updated = JSON.stringify(parsed, null, 4);
  //     writeFileSync('src/conversations.json', updated);
  //     res.json(updated);
  //   } else {
  //     res.json(data);
  //   }
  const convo = await ConversationType.create(req.body);

  res.json(convo);
});

// creates a conversation
// NOT CURRENTLY BEING USED BY CLIENT
app.post('/conversations/:threadId', (req: Request, res: Response) => {
  const threadId = req.params.threadId;
  const payload = req.body;
  const data = readFileSync('src/conversations.json', 'utf8');
  const parsed = JSON.parse(data.toString()); // convert buffer to string and try to parse array

  if (typeof parsed === 'object') {
    payload['id'] = parsed.length;
    payload['thread_id'] = threadId;
    parsed.push(payload);
    const updated = JSON.stringify(parsed, null, 4);
    writeFileSync('src/conversations.json', updated);
    res.json(updated);
  } else {
    res.json(data);
  }
});

mongoose
  .connect(process.env.ME_CONFIG_MONGODB_URL!)
  .then(() => {
    console.log('connected to Mongo');
    app.listen(PORT, () => {
      console.log('listening on http://localhost:3000');
    });
  })
  .catch(() => {
    console.log('Failed to connect to Mongo');
  });
