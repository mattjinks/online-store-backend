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
const orders_1 = require("../../src/models/orders");
const users_1 = require("../../src/models/users");
const seedTestData_1 = require("./setup/seedTestData");
const db = new orders_1.OrderDB();
const users_db = new users_1.UserDB();
let id = undefined;
let user_id = undefined;
describe("Order Model", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, seedTestData_1.seedTestData)();
    }));
    // it('should have an index method', () => {
    //     expect(db.index).toBeDefined();
    // });
    it('should have an indexCompletedOrders method', () => {
        expect(db.indexCompletedOrders).toBeDefined();
    });
    it('should have a showCurrentOrder method', () => {
        expect(db.showCurrentOrder).toBeDefined();
    });
    it('should have a create method', () => {
        expect(db.create).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(db.delete).toBeDefined();
    });
    it('create method should add an order', () => __awaiter(void 0, void 0, void 0, function* () {
        const users = yield users_db.index();
        const user = users[0];
        const result = yield db.create({
            user_id: user.id,
            status: 'complete',
        });
        expect(result.user_id).toEqual(user.id);
        expect(result.status).toEqual('complete');
        id = result.id;
        user_id = result.user_id;
    }));
    it('indexCompletedOrders method should return a list of completed orders', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db.indexCompletedOrders(String(user_id));
        expect(result.length).toBeGreaterThan(0);
    }));
    it('showCurrentOrder method should return an active order', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db.showCurrentOrder(String(user_id));
        expect(result.status).toEqual('active');
    }));
    it('delete method should remove the product', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db.delete(String(id));
        expect(result).toEqual({
            id: id,
            user_id: user_id,
            status: 'complete',
        });
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, seedTestData_1.cleanUp)();
    }));
});
