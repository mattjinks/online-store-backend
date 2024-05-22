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
exports.UserDB = void 0;
const database_1 = __importDefault(require("../database"));
const bcrypt_1 = __importDefault(require("bcrypt"));
class UserDB {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `SELECT * FROM users`;
                const result = yield conn.query(sql);
                conn.release();
                // console.log('Query Successful!!!')
                return result.rows;
            }
            catch (err) {
                throw new Error(`Cannot get users ${err}`);
            }
        });
    }
    create(u) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const saltRounds = bcrypt_1.default.genSaltSync(parseInt(process.env.SALT_ROUNDS));
                const hash = bcrypt_1.default.hashSync(u.password, parseInt(saltRounds));
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO users (firstName, lastName, password) VALUES($1, $2, $3) RETURNING *';
                const result = yield conn.query(sql, [u.firstname, u.lastname, u.password]);
                const user = result.rows[0];
                conn.release();
                // console.log('Query Successful!!!')
                return user;
            }
            catch (err) {
                throw new Error(`Cannot add new user ${u.firstname}. Error: ${err}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM users WHERE id=($1)';
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Cannot find user ${id}. Error: ${err}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                // Assuming 'id' is of type NUMBER in your database, but it's a STRING here. We convert it as necessary.
                const sql = 'DELETE FROM users WHERE id=($1) RETURNING *';
                const result = yield conn.query(sql, [id]);
                conn.release();
                if (result.rows.length) {
                    // console.log('User deleted successfully!!!')
                    return result.rows[0];
                }
                else {
                    throw new Error(`User not found with ID: ${id}`);
                }
            }
            catch (err) {
                throw new Error(`Could not delete user with ID: ${id}. Error: ${err}`);
            }
        });
    }
    //change this query by username instead of firstname
    authenticate(firstname, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const conn = yield database_1.default.connect();
            const sql = 'SELECT password FROM users WHERE firstname=($1)';
            const result = yield conn.query(sql, [firstname]);
            if (result.rows.length) {
                const user = result.rows[0];
                if (bcrypt_1.default.compareSync(password, user.password)) {
                    return user;
                }
            }
            return null;
        });
    }
}
exports.UserDB = UserDB;
