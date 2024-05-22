import Client from '../database'

export type Order = {
    id? : Number;
    user_id : Number;
    status : string;
}

export class OrderDB {

    async index(): Promise<Order[]> {
        try {
            const conn = await Client.connect()
            const sql = `SELECT * FROM orders`
            const result = await conn.query(sql)
            conn.release()
            // console.log('Query Successful!!!')
            return result.rows
        } catch (err) {
            throw new Error(`Cannot get all orders ${err}`)
        } 
    }

    async showCurrentOrder(user_id: string): Promise<Order> {
        try {
            const conn = await Client.connect()
            const sql = `SELECT * FROM orders WHERE user_id=($1) AND status = 'active'`
            const result = await conn.query(sql, [user_id])
            conn.release()
            // console.log('Query Successful!!!')
            return result.rows[0]
        } catch (err) {
            throw new Error(`Cannot get current order. Error: ${err}`)
        } 
    }

    async indexCompletedOrders(user_id: string): Promise<Order[]> {
        try {
            const conn = await Client.connect()
            const sql = `SELECT * FROM orders WHERE user_id=($1) AND status = 'complete'`
            const result = await conn.query(sql, [user_id])
            conn.release()
            // console.log('Query Successful!!!')
            return result.rows
        } catch (err) {
            throw new Error(`Cannot get completed orders. Error: ${err}`)
        }
    }

    async create(o: Order): Promise<Order> {
        try {
            const conn = await Client.connect();
            const sql = 'INSERT INTO orders (user_id, status) VALUES($1, $2) RETURNING *';
            const result = await conn.query(sql, [String(o.user_id), o.status]);
            const order = result.rows[0];
            conn.release();
            // console.log('Insertion Successful!!!');
            return order;
        } catch (err) {
            throw new Error(`Cannot create order. Error: ${err}`);
        }
    }

    async delete(id: string): Promise<Order> {
        try {
            const conn = await Client.connect()
            const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *'
            const result = await conn.query(sql, [id]);
            conn.release()
            if (result.rows.length) {
                // console.log('Order deleted successfully!!!')
                return result.rows[0]
            } else {
                throw new Error(`Order not found with ID: ${id}`)
            }
        } catch (err) {
            throw new Error(`Could not delete order with ID: ${id}. Error: ${err}`)
        }
    }
}