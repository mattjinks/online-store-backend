"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const products_1 = require("../models/products");
const product_db = new products_1.ProductDB;
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let products;
    console.log('this is the INDEX PRODUCTS route');
    if (typeof req.query.category === 'string') {
        products = yield product_db.indexCategory(req.query.category);
        // console.log("INDEX CATEGORY")
    }
    else {
        products = yield product_db.index();
        // console.log("INDEX")
    }
    try {
        res.json(products);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = {
        name: req.body.name,
        price: req.body.price,
        category: req.body.category,
        url: req.body.url,
        description: req.body.description
    };
    const newProduct = yield product_db.create(product);
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
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_db.show(req.params.id);
    try {
        res.json(product);
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
});
// const indexCategory = async (category: string) => {
//     console.log("INDEX CATEGORY!!!");
//     const products = await product_db.indexCategory(category as string);
//     return products;
// }
const products_routes = (app) => {
    app.get('/products', index);
    app.post('/products', create);
    app.get('/products/:id', show);
};
exports.default = products_routes;
