import express, { Request, Response } from 'express';
import { Product, ProductDB } from '../models/products';
import jwt from 'jsonwebtoken'

const product_db = new ProductDB;

const index = async (req: Request, res: Response) => {
    let products: Product[];
    console.log('this is the INDEX PRODUCTS route');
    if (typeof req.query.category === 'string') {
        products = await product_db.indexCategory(req.query.category);
        // console.log("INDEX CATEGORY")
    } else {
        products = await product_db.index();
        // console.log("INDEX")
    }
    
    try {
        res.json({
            message: 'this is the INDEX PRODUCTS route',
            data: products
        });        
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
}

const create = async (req: Request, res: Response) => {
    const product: Product = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        url: req.body.url,
        description: req.body.description
    }
    const newProduct = await product_db.create(product);
    // try {
    //     jwt.verify(req.body.token, process.env.TOKEN_SECRET as string);
    // } catch (err) {
    //     res.status(401)
    //     res.json(`Invalid token ${err}`)
    //     return
    // }
    
    try {
        res.json({
            message: 'this is the CREATE PRODUCTS route',
            data: newProduct
        });
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
}

const show = async (req: Request, res: Response) => {
    const product = await product_db.show(req.params.id);
    try {
        res.json({
            message: 'this is the SHOW PRODUCT route',
            data: product
        });
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
}

// const indexCategory = async (category: string) => {

//     console.log("INDEX CATEGORY!!!");

//     const products = await product_db.indexCategory(category as string);
//     return products;
// }

const products_routes = (app: express.Application) => {
    app.get('/products', index);
    app.post('/products', create);
    app.get('/products/:id', show);
}

export default products_routes;