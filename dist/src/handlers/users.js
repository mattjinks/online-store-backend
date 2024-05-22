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
const users_1 = require("../models/users");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const user_db = new users_1.UserDB;
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield user_db.index();
    try {
        res.json({
            message: 'this is the INDEX USERS route',
            data: users
        });
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password
    };
    const newUser = yield user_db.create(product);
    try {
        var token = jsonwebtoken_1.default.sign({ user: newUser }, process.env.TOKEN_SECRET);
        res.json({
            message: 'CREATE USERS ROUTE',
            token: token
        });
    }
    catch (err) {
        console.log("ERROR WITH CREATE");
        res.status(400);
        res.json(err);
    }
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_db.show(req.params.id);
    try {
        res.json({
            message: 'this is the SHOW USER route',
            data: user
        });
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const users_routes = (app) => {
    app.get('/users', index);
    app.get('/users/:id', show);
    app.post('/users', create);
};
exports.default = users_routes;
