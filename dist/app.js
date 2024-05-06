"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs_1 = require("fs");
const cors_1 = __importDefault(require("cors"));
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
const conversation_1 = __importDefault(require("./models/conversation"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(express_1.default.json());
app.use(express_1.default.static('public'));
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.send('Hello World ' + process.env.MONGODB_CONNECTION_STRING);
});
// get all conversations
app.get('/conversations', (req, res) => {
    const data = (0, fs_1.readFileSync)('src/conversations.json', 'utf8');
    res.json(JSON.parse(data.toString()));
});
// gets a conversation thread
app.get('/conversations/:threadId', (req, res) => {
    const threadId = req.params.threadId;
    const data = (0, fs_1.readFileSync)('src/conversations.json', 'utf8');
    console.log(JSON.parse(data.toString()));
    const filtered = JSON.parse(data.toString()).filter((item) => item.thread_id == threadId);
    console.log(filtered);
    res.json(filtered);
});
// creates conversation under new thread
// for now we are just going to create a new thread for every conversation
app.post('/conversations', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
    const convo = yield conversation_1.default.create(req.body);
    res.json(convo);
}));
// creates a conversation
// NOT CURRENTLY BEING USED BY CLIENT
app.post('/conversations/:threadId', (req, res) => {
    const threadId = req.params.threadId;
    const payload = req.body;
    const data = (0, fs_1.readFileSync)('src/conversations.json', 'utf8');
    const parsed = JSON.parse(data.toString()); // convert buffer to string and try to parse array
    if (typeof parsed === 'object') {
        payload['id'] = parsed.length;
        payload['thread_id'] = threadId;
        parsed.push(payload);
        const updated = JSON.stringify(parsed, null, 4);
        (0, fs_1.writeFileSync)('src/conversations.json', updated);
        res.json(updated);
    }
    else {
        res.json(data);
    }
});
mongoose_1.default
    .connect(process.env.MONGODB_CONNECTION_STRING)
    .then(() => {
    console.log('connected to Mongo');
    app.listen(PORT, () => {
        console.log('listening on http://localhost:3000');
    });
})
    .catch(() => {
    console.log('Failed to connect to Mongo');
});
