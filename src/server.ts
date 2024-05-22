import express, { Request, Response } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { Product } from './models/products'
import products_routes from './handlers/products'
import orders_routes from './handlers/orders'
import users_routes from './handlers/users'

const app: express.Application = express()
const address: string = "http://localhost:3000"

app.use(bodyParser.json());

app.use(cors());

products_routes(app);

orders_routes(app);

users_routes(app);

app.listen(3000, function () {
    console.log(`starting app on: ${address}`)
})