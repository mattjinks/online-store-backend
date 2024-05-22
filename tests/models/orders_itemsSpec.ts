import { Product, ProductDB } from '../../src/models/products';
import { OrderItem, OrderItemDB } from '../../src/models/orders_items';
import { Order, OrderDB } from '../../src/models/orders';
import { seedTestData, cleanUp } from './setup/seedTestData';

const db = new OrderItemDB();
const order_db = new OrderDB();
const product_db = new ProductDB();

let id: Number | undefined = undefined;
let product_id: Number | undefined = undefined;
let order_id: Number | undefined = undefined;


describe("Order Item Model", () => {

    beforeAll(async () => {
        await seedTestData();
    });

    it('should have an index method', () => {
        expect(db.index).toBeDefined();
    });

    it('should have a create method', () => {
        expect(db.create).toBeDefined();
    });

    it('should have a delete method', () => {
        expect(db.delete).toBeDefined();
    });

    it('create method should create an item for an order', async () => {
        const products = await product_db.index();
        const orders = await order_db.index();

        const product = products[0];
        const order = orders[0];

        const result = await db.create({
            order_id: order.id as Number,
            product_id: product.id as Number,
            quantity: 3
        });
        expect(result.order_id).toEqual(order.id as Number);
        expect(result.product_id).toEqual(product.id as Number);
        expect(result.quantity).toEqual(3);
        id = result.id;
        product_id = result.product_id;
        order_id = result.order_id;
    });

    it('index method should return a list of orders items', async () => {
        const result = await db.index();
        expect(result.length).toBeGreaterThan(0);
    });

    it('delete method should remove the orders item', async () => {
        const result = await db.delete(String(id));
        expect(result).toEqual({
            id: id,
            order_id: order_id as Number,
            product_id: product_id as Number,
            quantity: 3
        });
    });

    afterAll(async () => {
        await cleanUp();
    });
});
