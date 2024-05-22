import { Product, ProductDB } from '../../src/models/products'
import { seedTestData, cleanUp } from './setup/seedTestData';
const db = new ProductDB()

let id: Number | undefined = undefined;
let price: Number | undefined = undefined;


describe("Product Model", () => {

    beforeAll(async () => {
        await seedTestData();
    });

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

    it('create method should add a product', async () => {
        const result = await db.create({
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
        price = result.price
    });

    it('index method should return a list of products', async () => {
        const result = await db.index();
        expect(result.length).toBeGreaterThan(0);
    });

    it('show method should return a single product identified by ID', async () => {
        const result = await db.show(String(id));
        // expect(result).toEqual({
        //     id: id as number,
        //     name: 'item',
        //     price: 12.34,
        //     category: 'test'
        // });
        expect(result.id).toEqual(id as number);
        expect(result.name).toEqual('item');
        expect(result.price).toEqual(price as number);
        expect(result.category).toEqual('test');
    });

    it('show indexCategory should return list of products identified by category', async () => {
        let result = await db.indexCategory('category1');
        let correctCategory = result.every(item => item.category === 'category1');
        expect(correctCategory).toBe(true);

        result = await db.indexCategory('category2');
        correctCategory = result.every(item => item.category === 'category2');
        expect(correctCategory).toBe(true);
    });
    

    it('delete method should remove the product', async () => {
        const result = await db.delete(String(id));
        // expect(result).toEqual({
        //     id: id as number,
        //     name: 'item',
        //     price: 12.34,
        //     category: 'test'
        // });
        expect(result.name).toEqual('item');
        expect(result.price).toEqual(price as number);
        expect(result.category).toEqual('test');
    });

    afterAll(async () => {
        await cleanUp();
    });
});
