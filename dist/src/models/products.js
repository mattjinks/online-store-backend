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
exports.ProductDB = void 0;
const database_1 = __importDefault(require("../database"));
class ProductDB {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `SELECT * FROM products`;
                const result = yield conn.query(sql);
                conn.release();
                // console.log('Query Successful!!!')
                return result.rows;
            }
            catch (err) {
                throw new Error(`Cannot get products ${err}`);
            }
        });
    }
    create(p) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const priceAsString = String(p.price);
                const conn = yield database_1.default.connect();
                const sql = `INSERT INTO products (name, price, category, url, description) VALUES('${p.name}', ${p.price}, '${p.category}', '${p.url}', '${p.description}') RETURNING *`;
                const result = yield conn.query(sql);
                const product = result.rows[0];
                conn.release();
                // console.log('Query Successful!!!')
                return product;
            }
            catch (err) {
                throw new Error(`Cannot add new product ${p.name}. Error: ${err}`);
            }
        });
    }
    show(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM products WHERE id=($1)';
                const result = yield conn.query(sql, [id]);
                conn.release();
                return result.rows[0];
            }
            catch (err) {
                throw new Error(`Cannot find product ${id}. Error: ${err}`);
            }
        });
    }
    indexCategory(category) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'SELECT * FROM products WHERE category=($1)';
                const result = yield conn.query(sql, [category]);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Cannot get ${category} products. Error: ${err}`);
            }
        });
    }
    indexTopFive() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = `SELECT
                p.id
                p.name
                SUM(oi.quantity) AS total_quantity_sold
            FROM
                products p
            JOIN
                orders_items oi ON p.id = oi.product_id
            JOIN
                orders o ON oi.order_id = o.id
            WHERE
                o.status = 'complete'
            GROUP BY
                p.id
            ORDER BY
                total_quantity_sold DESC
            LIMIT 5;`;
                const result = yield conn.query(sql);
                conn.release();
                return result.rows;
            }
            catch (err) {
                throw new Error(`Cannot get top 5 products. Error: ${err}`);
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const conn = yield database_1.default.connect();
                const sql = 'DELETE FROM products WHERE id=($1) RETURNING *';
                const result = yield conn.query(sql, [id]);
                conn.release();
                if (result.rows.length) {
                    // console.log('Product deleted successfully!!!')
                    return result.rows[0];
                }
                else {
                    throw new Error(`Product not found with ID: ${id}`);
                }
            }
            catch (err) {
                throw new Error(`Could not delete product with ID: ${id}. Error: ${err}`);
            }
        });
    }
}
exports.ProductDB = ProductDB;
