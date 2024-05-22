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
exports.OrderItemDB = void 0;
const database_1 = __importDefault(require("../database"));
class OrderItemDB {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `SELECT * FROM orders_items`;
                const result = yield conn.query(sql);
                conn.release();
                // console.log('Query Successful!!!')
                return result.rows;
            }
            catch (err) {
                throw new Error(`Cannot get order's items. Error: ${err}`);
            }
        });
    }
    create(oi) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                // Corrected table name from `products` to `orders_items`
                const sql = 'INSERT INTO orders_items (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *';
                // Ensuring parameters match expected types; no changes needed if types are corrected as above
                const result = yield conn.query(sql, [oi.order_id, oi.product_id, oi.quantity]);
                const orderItem = result.rows[0];
                conn.release();
                // console.log('Insertion Successful!!!');
                return orderItem;
            }
            catch (err) {
                throw new Error(`Cannot create order item. Error: ${err}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'DELETE FROM orders_items WHERE id=($1) RETURNING *';
                const result = yield conn.query(sql, [id]);
                conn.release();
                if (result.rows.length) {
                    // console.log('Order Item deleted successfully!!!')
                    return result.rows[0];
                }
                else {
                    throw new Error(`Order Item not found with ID: ${id}`);
                }
            }
            catch (err) {
                throw new Error(`Could not delete order item with ID: ${id}. Error: ${err}`);
            }
        });
    }
}
exports.OrderItemDB = OrderItemDB;
