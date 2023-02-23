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
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddJoke = exports.LikeJoke = exports.GetJokes = void 0;
const firestore_1 = require("firebase/firestore");
const config_1 = require("../config");
const GetJokes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const querySnapshot = yield (0, firestore_1.getDocs)(config_1.Jokes);
        let jokesData = [];
        querySnapshot.forEach((doc) => jokesData.push(Object.assign({ id: doc.id }, doc.data())));
        return res.status(200).json(jokesData);
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.GetJokes = GetJokes;
const LikeJoke = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const jokeId = req.body.jokeId;
        const isLike = req.body.isLike;
        console.log(isLike);
        const jokeData = yield (0, firestore_1.getDoc)((0, firestore_1.doc)(config_1.Jokes, jokeId));
        if (!jokeData.exists()) {
            return res.status(404).json({ error: 'Jokes not found' });
        }
        if (isLike) {
            yield (0, firestore_1.updateDoc)((0, firestore_1.doc)(config_1.Jokes, jokeId), {
                total_like: jokeData.data().total_like + 1,
            });
        }
        else {
            yield (0, firestore_1.updateDoc)((0, firestore_1.doc)(config_1.Jokes, jokeId), {
                total_dislike: jokeData.data().total_dislike + 1,
            });
        }
        return res.status(200).json({ message: 'Action Success' });
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.LikeJoke = LikeJoke;
const AddJoke = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const content = yield req.body.content;
        yield (0, firestore_1.addDoc)(config_1.Jokes, {
            content: content,
            total_like: 0,
            total_dislike: 0,
        }).then(() => {
            return res.status(200).json({ message: 'Add joke success' });
        });
    }
    catch (err) {
        return res.status(500).json({ error: err.message });
    }
});
exports.AddJoke = AddJoke;
