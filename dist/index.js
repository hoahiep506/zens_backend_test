"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const joke_1 = __importDefault(require("./router/joke"));
const cors = require('cors');
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use(cors());
const port = process.env.PORT;
app.use(express_1.default.json());
app.use('/api', joke_1.default);
app.listen(port, () => {
    console.log(`Express running → ${port}`);
});
