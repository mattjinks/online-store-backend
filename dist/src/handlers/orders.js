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
const orders_1 = require("../models/orders");
const order_db = new orders_1.OrderDB;
const index = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let orders = [];
    if (typeof req.query.status === 'string' && req.query.user_id === 'active') {
        const order = yield order_db.showCurrentOrder(req.params.id);
        orders.push(order);
        console.log("INDEX ACTIVE ORDERS");
    }
    else {
        orders = yield order_db.indexCompletedOrders(req.params.id);
        console.log("INDEX COMPLETE ORDERS");
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
});
const show = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_db.showCurrentOrder(req.params.user_id);
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
});
const orders_routes = (app) => {
    app.get('/orders/:id', index);
    app.get('/orders/:id', show);
};
exports.default = orders_routes;
