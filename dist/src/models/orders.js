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
exports.OrderDB = void 0;
const database_1 = __importDefault(require("../database"));
class OrderDB {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `SELECT * FROM orders`;
                const result = yield conn.query(sql);
                conn.release();
                // console.log('Query Successful!!!')
                return result.rows;
            }
            catch (err) {
                throw new Error(`Cannot get all orders ${err}`);
            }
        });
    }
    showCurrentOrder(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `SELECT * FROM orders WHERE user_id=($1) AND status = 'active'`;
                const result = yield conn.query(sql, [user_id]);
                conn.release();
                // console.log('Query Successful!!!')
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Cannot get current order. Error: ${err}`);
            }
        });
    }
    indexCompletedOrders(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `SELECT * FROM orders WHERE user_id=($1) AND status = 'complete'`;
                const result = yield conn.query(sql, [user_id]);
                conn.release();
                // console.log('Query Successful!!!')
                return result.rows;
            }
            catch (err) {
                throw new Error(`Cannot get completed orders. Error: ${err}`);
            }
        });
    }
    create(o) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *';
                const result = yield conn.query(sql, [String(o.user_id), o.status]);
                const order = result.rows[0];
                conn.release();
                // console.log('Insertion Successful!!!');
                return order;
            }
            catch (err) {
                throw new Error(`Cannot create order. Error: ${err}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *';
                const result = yield conn.query(sql, [id]);
                conn.release();
                if (result.rows.length) {
                    // console.log('Order deleted successfully!!!')
                    return result.rows[0];
                }
                else {
                    throw new Error(`Order not found with ID: ${id}`);
                }
            }
            catch (err) {
                throw new Error(`Could not delete order with ID: ${id}. Error: ${err}`);
            }
        });
    }
}
exports.OrderDB = OrderDB;
