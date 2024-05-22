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
const products_1 = require("../../src/models/products");
const orders_items_1 = require("../../src/models/orders_items");
const orders_1 = require("../../src/models/orders");
const seedTestData_1 = require("./setup/seedTestData");
const db = new orders_items_1.OrderItemDB();
const order_db = new orders_1.OrderDB();
const product_db = new products_1.ProductDB();
let id = undefined;
let product_id = undefined;
let order_id = undefined;
describe("Order Item Model", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, seedTestData_1.seedTestData)();
    }));
    it('should have an index method', () => {
        expect(db.index).toBeDefined();
    });
    it('should have a create method', () => {
        expect(db.create).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(db.delete).toBeDefined();
    });
    it('create method should create an item for an order', () => __awaiter(void 0, void 0, void 0, function* () {
        const products = yield product_db.index();
        const orders = yield order_db.index();
        const product = products[0];
        const order = orders[0];
        const result = yield db.create({
            order_id: order.id,
            product_id: product.id,
            quantity: 3
        });
        expect(result.order_id).toEqual(order.id);
        expect(result.product_id).toEqual(product.id);
        expect(result.quantity).toEqual(3);
        id = result.id;
        product_id = result.product_id;
        order_id = result.order_id;
    }));
    it('index method should return a list of orders items', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db.index();
        expect(result.length).toBeGreaterThan(0);
    }));
    it('delete method should remove the orders item', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db.delete(String(id));
        expect(result).toEqual({
            id: id,
            order_id: order_id,
            product_id: product_id,
            quantity: 3
        });
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, seedTestData_1.cleanUp)();
    }));
});
