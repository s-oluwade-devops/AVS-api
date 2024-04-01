import express from 'express';
import { readFileSync, writeFileSync } from 'fs';
import cors from 'cors';
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static('public'));
app.use(cors());
app.get('/', (req, res) => {
    res.send('Hello World');
});
// get all conversations
app.get('/conversations', (req, res) => {
    const data = readFileSync('src/conversations.json', 'utf8');
    res.json(JSON.parse(data.toString()));
});
// gets a conversation thread
app.get('/conversations/:threadId', (req, res) => {
    const threadId = req.params.threadId;
    const data = readFileSync('src/conversations.json', 'utf8');
    console.log(JSON.parse(data.toString()));
    const filtered = (JSON.parse(data.toString())).filter((item) => item.thread_id == threadId);
    console.log(filtered);
    res.json(filtered);
});
// creates conversation under new thread
// for now we are just going to create a new thread for every conversation
app.post('/conversations', (req, res) => {
    const threadId = Math.random().toString(36).substring(3);
    const payload = req.body;
    const data = readFileSync('src/conversations.json', 'utf8');
    const parsed = JSON.parse(data.toString()); // convert buffer to string and try to parse array
    if (typeof parsed === 'object') {
        payload["id"] = parsed.length;
        payload["thread_id"] = threadId;
        parsed.push(payload);
        const updated = JSON.stringify(parsed, null, 4);
        writeFileSync('src/conversations.json', updated);
        res.json(updated);
    }
    else {
        res.json(data);
    }
});
// creates a conversation
// NOT CURRENTLY BEING USED BY CLIENT
app.post('/conversations/:threadId', (req, res) => {
    const threadId = req.params.threadId;
    const payload = req.body;
    const data = readFileSync('src/conversations.json', 'utf8');
    const parsed = JSON.parse(data.toString()); // convert buffer to string and try to parse array
    if (typeof parsed === 'object') {
        payload["id"] = parsed.length;
        payload["thread_id"] = threadId;
        parsed.push(payload);
        const updated = JSON.stringify(parsed, null, 4);
        writeFileSync('src/conversations.json', updated);
        res.json(updated);
    }
    else {
        res.json(data);
    }
});
app.listen(PORT, () => {
    console.log('listening on http://localhost:3000');
});
