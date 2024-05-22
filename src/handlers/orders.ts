import express, { Request, Response } from 'express';
import { Order, OrderDB } from '../models/orders';


const order_db = new OrderDB;

const index = async (req: Request, res: Response) => {
    let orders: Order[] = [];

    if (typeof req.query.status === 'string' && req.query.user_id === 'active') {
        const order = await order_db.showCurrentOrder(req.params.id);
        orders.push(order)
        console.log("INDEX ACTIVE ORDERS")
    } else {
        orders = await order_db.indexCompletedOrders(req.params.id);
        console.log("INDEX COMPLETE ORDERS")
    }
    
    try {
        res.json({
            message: 'this is the INDEX ORDER route',
            data: orders
        });        
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
}

const show = async (req: Request, res: Response) => {
    const order = await order_db.showCurrentOrder(req.params.user_id);
    try {
        res.json({
            message: 'this is the SHOW ORDER route',
            data: order
        });
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
}

const orders_routes = (app: express.Application) => {
    app.get('/orders/:id', index);
    app.get('/orders/:id', show);
}

export default orders_routes;