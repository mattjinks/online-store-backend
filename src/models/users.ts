import Client from '../database'
import bcrypt from 'bcrypt'
import { config } from 'dotenv'
import jwt from 'jsonwebtoken'

export type User = {
    id? : Number; //Database autogenerates for create()
    firstname : string;
    lastname : string;
    password : string;
}

export class UserDB {
    async index(): Promise<User[]> {
        try {
            const conn = await Client.connect()
            const sql = `SELECT * FROM users`
            const result = await conn.query(sql)
            conn.release()
            // console.log('Query Successful!!!')
            return result.rows
        } catch (err) {
            throw new Error(`Cannot get users ${err}`)
        } 
    }

    async create(u: User): Promise<User> {
        try {
            const saltRounds = bcrypt.genSaltSync(parseInt(process.env.SALT_ROUNDS as string));
            const hash = bcrypt.hashSync(u.password, parseInt(saltRounds));
            const conn = await Client.connect()
            const sql = 'INSERT INTO users (firstName, lastName, password) VALUES($1, $2, $3) RETURNING *'
            const result = await conn.query(sql, [u.firstname, u.lastname, u.password])
            const user = result.rows[0]
            conn.release()
            // console.log('Query Successful!!!')
            return user
        } catch (err) {
            throw new Error(`Cannot add new user ${u.firstname}. Error: ${err}`)
        }
    }

    async show(id: string): Promise<User> {
        try {
            const conn = await Client.connect()
            const sql = 'SELECT * FROM users WHERE id=($1)'
            const result = await conn.query(sql, [id]);
            conn.release()
            return result.rows[0]
        } catch (err) {
            throw new Error(`Cannot find user ${id}. Error: ${err}`)
        }
    }

    async delete(id: string): Promise<User> {
        try {
            const conn = await Client.connect()
            // Assuming 'id' is of type NUMBER in your database, but it's a STRING here. We convert it as necessary.
            const sql = 'DELETE FROM users WHERE id=($1) RETURNING *'
            const result = await conn.query(sql, [id]);
            conn.release()
            if (result.rows.length) {
                // console.log('User deleted successfully!!!')
                return result.rows[0]
            } else {
                throw new Error(`User not found with ID: ${id}`)
            }
        } catch (err) {
            throw new Error(`Could not delete user with ID: ${id}. Error: ${err}`)
        }
    }

    //change this query by username instead of firstname
    async authenticate(firstname: string, password: string): Promise<User | null> {
        const conn = await Client.connect();
        const sql = 'SELECT password FROM users WHERE firstname=($1)'
        const result = await conn.query(sql, [firstname])
        if(result.rows.length) {
            const user = result.rows[0]
            if (bcrypt.compareSync(password, user.password)) {
                return user
            }
        }
        return null
    }

}

