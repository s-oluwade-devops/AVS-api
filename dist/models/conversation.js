"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const myschema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    inquiry: String,
    title: String,
    message: String,
    thread_id: String,
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Conversation', myschema);
