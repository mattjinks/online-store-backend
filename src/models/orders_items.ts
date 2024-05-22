import Client from '../database'

export type OrderItem = {
    id? : Number;
    order_id : Number;
    product_id : Number;
    quantity : Number;
}

export class OrderItemDB {
    async index(): Promise<OrderItem[]> {
        try {
            const conn = await Client.connect()
            const sql = `SELECT * FROM orders_items`
            const result = await conn.query(sql)
            conn.release()
            // console.log('Query Successful!!!')
            return result.rows
        } catch (err) {
            throw new Error(`Cannot get order's items. Error: ${err}`)
        } 
    }

    async create(oi: OrderItem): Promise<OrderItem> {
        try {
            const conn = await Client.connect();
            // Corrected table name from `products` to `orders_items`
            const sql = 'INSERT INTO orders_items (order_id, product_id, quantity) VALUES($1, $2, $3) RETURNING *';
            // Ensuring parameters match expected types; no changes needed if types are corrected as above
            const result = await conn.query(sql, [oi.order_id, oi.product_id, oi.quantity]);
            const orderItem = result.rows[0];
            conn.release();
            // console.log('Insertion Successful!!!');
            return orderItem;
        } catch (err) {
            throw new Error(`Cannot create order item. Error: ${err}`);
        }
    }

    async delete(id: string): Promise<OrderItem> {
        try {
            const conn = await Client.connect()
            const sql = 'DELETE FROM orders_items WHERE id=($1) RETURNING *'
            const result = await conn.query(sql, [id]);
            conn.release()
            if (result.rows.length) {
                // console.log('Order Item deleted successfully!!!')
                return result.rows[0]
            } else {
                throw new Error(`Order Item not found with ID: ${id}`)
            }
        } catch (err) {
            throw new Error(`Could not delete order item with ID: ${id}. Error: ${err}`)
        }
    }
}
