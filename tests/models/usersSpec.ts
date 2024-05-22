import { User, UserDB } from '../../src/models/users'
import { seedTestData, cleanUp } from './setup/seedTestData';
const db = new UserDB()

let id: Number | undefined = undefined;

describe("User Model", () => {

    beforeAll(async () => {
        await seedTestData();
    });

    it('should have an index method', () => {
        expect(db.index).toBeDefined();
    });

    it('should have a show method', () => {
        expect(db.show).toBeDefined();
    })

    it('should have a create method', () => {
        expect(db.create).toBeDefined();
    })

    it('should have a delete method', () => {
        expect(db.delete).toBeDefined();
    })

    it('create method should add a user', async () => {
        const result = await db.create({
            firstname: 'Matthew',
            lastname: 'Jinks',
            password: '1234'
        });
        expect(result.firstname).toEqual('Matthew');
        expect(result.lastname).toEqual('Jinks');
        expect(result.password).toEqual('1234');
        id = result.id;
    });

    it('index method should return a list of users', async () => {
        const result = await db.index();
        expect(result.length).toBeGreaterThan(0);
    });

    it('show method should return a single user identified by ID', async () => {
        const result = await db.show(String(id));
        expect(result).toEqual({
            id: id,
            firstname: 'Matthew',
            lastname: 'Jinks',
            password: '1234'
        });
    });

    it('delete method should remove the user', async () => {
        const result = await db.delete(String(id));
        expect(result).toEqual({
            id: id,
            firstname: 'Matthew',
            lastname: 'Jinks',
            password: '1234'
        });
    });

    afterAll(async () => {
        await cleanUp();
    });

});

