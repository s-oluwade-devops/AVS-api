import express from 'express';
import { readFileSync, writeFileSync } from 'fs';
const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(express.static('public'));
app.get('/', (req, res) => {
    res.send('Hello World');
});
// gets all correspondence
app.get('/correspondence', (req, res) => {
    const data = readFileSync('src/correspondence.json', 'utf8');
    res.json(JSON.parse(data));
});
// creates a new correspondence
app.post('/correspondence', (req, res) => {
    const response = req.body;
    const data = readFileSync('src/correspondence.json', 'utf8');
    // update data
    writeFileSync('src/correspondence.json', data);
    res.json(JSON.parse(data));
});
app.listen(PORT, () => {
    console.log('listening on http://localhost:3000');
});
