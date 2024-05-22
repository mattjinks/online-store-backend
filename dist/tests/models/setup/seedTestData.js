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
exports.cleanUp = exports.seedTestData = void 0;
const products_1 = require("../../../src/models/products");
const orders_1 = require("../../../src/models/orders");
const orders_items_1 = require("../../../src/models/orders_items");
const users_1 = require("../../../src/models/users");
const product_db = new products_1.ProductDB();
const user_db = new users_1.UserDB();
const order_db = new orders_1.OrderDB();
const orderItem_db = new orders_items_1.OrderItemDB();
function seedTestData() {
    return __awaiter(this, void 0, void 0, function* () {
        const user = { firstname: "Matt", lastname: "Jinks", password: "1234" };
        const createdUser = yield user_db.create(user);
        const userId = createdUser.id;
        let products = [
            { name: 'item0', price: 12.34, category: 'category1', url: '', description: '' },
            { name: 'item1', price: 56.78, category: 'category1', url: '', description: '' },
            { name: 'item2', price: 90.12, category: 'category1', url: '', description: '' },
            { name: 'item3', price: 34.56, category: 'category1', url: '', description: '' },
            { name: 'item4', price: 78.90, category: 'category1', url: '', description: '' },
            { name: 'item5', price: 12.34, category: 'category2', url: '', description: '' },
            { name: 'item6', price: 56.78, category: 'category2', url: '', description: '' },
            { name: 'item7', price: 90.12, category: 'category2', url: '', description: '' },
            { name: 'item8', price: 34.56, category: 'category2', url: '', description: '' },
            { name: 'item9', price: 78.90, category: 'category2', url: '', description: '' },
        ];
        let orders = [
            { user_id: userId, status: 'complete' },
            { user_id: userId, status: 'complete' },
            { user_id: userId, status: 'complete' },
            { user_id: userId, status: 'complete' },
            { user_id: userId, status: 'complete' },
            { user_id: userId, status: 'active' }
        ];
        for (const product of products) {
            yield product_db.create(product);
        }
        for (const order of orders) {
            yield order_db.create(order);
        }
        products = yield product_db.index();
        orders = yield order_db.indexCompletedOrders(String(userId));
        let quantity = 1;
        const o_id = orders[0].id;
        for (const product of products) {
            const p_id = product.id;
            yield orderItem_db.create({
                order_id: o_id,
                product_id: p_id,
                quantity: quantity
            });
            quantity += 1;
        }
    });
}
exports.seedTestData = seedTestData;
function cleanUp() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const products = yield product_db.index();
            const users = yield user_db.index();
            let userId = users[0].id;
            const orders = yield order_db.index();
            // console.log(users);
            const orders_items = yield orderItem_db.index();
            yield Promise.all(orders_items.map(order_item => orderItem_db.delete(String(order_item.id))));
            yield Promise.all(orders.map(order => order_db.delete(String(order.id))));
            yield Promise.all(products.map(product => product_db.delete(String(product.id))));
            const finalOrders = yield order_db.index();
            console.log(`Final Orders Count: ${finalOrders.length}`);
            yield Promise.all(users.map(user => user_db.delete(String(user.id))));
            const finalProducts = yield product_db.index();
            const finalUsers = yield user_db.index();
            const finalOrdersItems = yield orderItem_db.index();
            console.log(`Final Products Count: ${finalProducts.length}`);
            console.log(`Final Users Count: ${finalUsers.length}`);
            console.log(`Final Orders Items Count: ${finalOrdersItems.length}`);
            console.log(`Final Orders Count: ${finalOrders.length}`);
        }
        catch (err) {
            console.error('Error during cleanup:', err);
        }
    });
}
exports.cleanUp = cleanUp;
