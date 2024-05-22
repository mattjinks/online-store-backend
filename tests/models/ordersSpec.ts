import { Order, OrderDB } from '../../src/models/orders';
import { User, UserDB } from '../../src/models/users';
import { seedTestData, cleanUp } from './setup/seedTestData';
const db = new OrderDB()
const users_db = new UserDB();

let id: Number | undefined = undefined;
let user_id: Number | undefined = undefined;

describe("Order Model", () => {
    beforeAll(async () => {
        await seedTestData();
    });

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

    it('create method should add an order', async () => {
        const users: User[] = await users_db.index();
        const user: User = users[0];
        const result = await db.create({
            user_id: user.id as Number,
            status: 'complete',
        });
        expect(result.user_id).toEqual(user.id as Number);
        expect(result.status).toEqual('complete');
        id = result.id;
        user_id = result.user_id;
    });

    it('indexCompletedOrders method should return a list of completed orders', async () => {
        const result = await db.indexCompletedOrders(String(user_id));
        expect(result.length).toBeGreaterThan(0);
    });

    it('showCurrentOrder method should return an active order', async () => {
        const result = await db.showCurrentOrder(String(user_id));
        expect(result.status).toEqual('active');
    });

    it('delete method should remove the product', async () => {
        const result = await db.delete(String(id));
        expect(result).toEqual({
            id: id,
            user_id: user_id as Number,
            status: 'complete',
        });
    });

    afterAll(async () => {
        await cleanUp();
    });
});
