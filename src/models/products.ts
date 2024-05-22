import Client from '../database'

export type Product = {
    id? : number; //Database autogenerates for create()
    name : string;
    price : number;
    category : string;
    url: string;
    description: string;
}

export class ProductDB {
    async index(): Promise<Product[]> {
        try {
            const conn = await Client.connect()
            const sql = `SELECT * FROM products`
            const result = await conn.query(sql)
            conn.release()
            // console.log('Query Successful!!!')
            return result.rows
        } catch (err) {
            throw new Error(`Cannot get products ${err}`)
        } 
    }

    async create(p: Product): Promise<Product> {
        try {
            const priceAsString = String(p.price);
            const conn = await Client.connect()
            const sql = `INSERT INTO products (name, price, category, url, description) VALUES('${p.name}', ${p.price}, '${p.category}', '${p.url}', '${p.description}') RETURNING *`;
            const result = await conn.query(sql)
            const product = result.rows[0]
            conn.release()
            // console.log('Query Successful!!!')
            return product
        } catch (err) {
            throw new Error(`Cannot add new product ${p.name}. Error: ${err}`)
        }
    }

    async show(id: string): Promise<Product> {
        try {
            const conn = await Client.connect()
            const sql = 'SELECT * FROM products WHERE id=($1)'
            const result = await conn.query(sql, [id]);
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Cannot find product ${id}. Error: ${err}`)
        }
    }

    async indexCategory(category: string): Promise<Product[]> {
        try {
            const conn = await Client.connect()
            const sql = 'SELECT * FROM products WHERE category=($1)'
            const result = await conn.query(sql, [category]);
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Cannot get ${category} products. Error: ${err}`)
        }
    }

    async indexTopFive(): Promise<Product[]> {
        try {
            const conn = await Client.connect()
            const sql = `SELECT
                p.id
                p.name
                SUM(oi.quantity) AS total_quantity_sold
            FROM
                products p
            JOIN
                orders_items oi ON p.id = oi.product_id
            JOIN
                orders o ON oi.order_id = o.id
            WHERE
                o.status = 'complete'
            GROUP BY
                p.id
            ORDER BY
                total_quantity_sold DESC
            LIMIT 5;`
            
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Cannot get top 5 products. Error: ${err}`)
        }
    }

    async delete(id: string): Promise<Product> {
        try {
            const conn = await Client.connect()
            const sql = 'DELETE FROM products WHERE id=($1) RETURNING *'
            const result = await conn.query(sql, [id]);
            conn.release()
            if (result.rows.length) {
                // console.log('Product deleted successfully!!!')
                return result.rows[0]
            } else {
                throw new Error(`Product not found with ID: ${id}`)
            }
        } catch (err) {
            throw new Error(`Could not delete product with ID: ${id}. Error: ${err}`)
        }
    }

}