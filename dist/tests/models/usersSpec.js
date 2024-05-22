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
const users_1 = require("../../src/models/users");
const seedTestData_1 = require("./setup/seedTestData");
const db = new users_1.UserDB();
let id = undefined;
describe("User Model", () => {
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
    it('create method should add a user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db.create({
            firstname: 'Matthew',
            lastname: 'Jinks',
            password: '1234'
        });
        expect(result.firstname).toEqual('Matthew');
        expect(result.lastname).toEqual('Jinks');
        expect(result.password).toEqual('1234');
        id = result.id;
    }));
    it('index method should return a list of users', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db.index();
        expect(result.length).toBeGreaterThan(0);
    }));
    it('show method should return a single user identified by ID', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db.show(String(id));
        expect(result).toEqual({
            id: id,
            firstname: 'Matthew',
            lastname: 'Jinks',
            password: '1234'
        });
    }));
    it('delete method should remove the user', () => __awaiter(void 0, void 0, void 0, function* () {
        const result = yield db.delete(String(id));
        expect(result).toEqual({
            id: id,
            firstname: 'Matthew',
            lastname: 'Jinks',
            password: '1234'
        });
    }));
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, seedTestData_1.cleanUp)();
    }));
});
