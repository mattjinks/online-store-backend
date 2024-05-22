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
const seedTestData_1 = require("./setup/seedTestData");
const db = new products_1.ProductDB();
let id = undefined;
let price = undefined;
describe("Product Model", () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, seedTestData_1.seedTestData)();
    }));
    it('should have an index method', () => {
        expect(db.index).toBeDefined();
    });
    it('should have a show method', () => {
        expect(db.show).toBeDefined();
    });
    it('should have a create method', () => {
        expect(db.create).toBeDefined();
    });
    it('should have a delete method', () => {
        expect(db.delete).toBeDefined();
    });
    it('create method should add a product', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db.create({
            name: 'item',
            price: 12.34,
            category: 'test',
            url: '',
            description: ''
        });
        expect(result.name).toEqual('item');
        //expect(result.price).toEqual(price);
        expect(result.category).toEqual('test');
        id = result.id;
        price = result.price;
    }));
    it('index method should return a list of products', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db.index();
        expect(result.length).toBeGreaterThan(0);
    }));
    it('show method should return a single product identified by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db.show(String(id));
        // expect(result).toEqual({
        //     id: id as number,
        //     name: 'item',
        //     price: 12.34,
        //     category: 'test'
        // });
        expect(result.id).toEqual(id);
        expect(result.name).toEqual('item');
        expect(result.price).toEqual(price);
        expect(result.category).toEqual('test');
    }));
    it('show indexCategory should return list of products identified by category', () => __awaiter(void 0, void 0, void 0, function* () {
        let result = yield db.indexCategory('category1');
        let correctCategory = result.every(item => item.category === 'category1');
        expect(correctCategory).toBe(true);
        result = yield db.indexCategory('category2');
        correctCategory = result.every(item => item.category === 'category2');
        expect(correctCategory).toBe(true);
    }));
    it('delete method should remove the product', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db.delete(String(id));
        // expect(result).toEqual({
        //     id: id as number,
        //     name: 'item',
        //     price: 12.34,
        //     category: 'test'
        // });
        expect(result.name).toEqual('item');
        expect(result.price).toEqual(price);
        expect(result.category).toEqual('test');
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, seedTestData_1.cleanUp)();
    }));
});
