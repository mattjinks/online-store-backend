import express, { Request, Response } from 'express';
import { User, UserDB } from '../models/users';
import jwt from 'jsonwebtoken'

const user_db = new UserDB;

const index = async (req: Request, res: Response) => {

    const users: User[] = await user_db.index();    
    
    try {

        res.json({
            message: 'this is the INDEX USERS route',
            data: users
        });        
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
}

const create = async (req: Request, res: Response) => {
    const product: User = {
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        password: req.body.password
    }
    const newUser = await user_db.create(product);
    try {
        var token = jwt.sign({ user: newUser }, process.env.TOKEN_SECRET as string)
        res.json({
            message: 'CREATE USERS ROUTE',
            token: token
        });
    }
    catch (err) {
        console.log("ERROR WITH CREATE")
        res.status(400);
        res.json(err);
    }
}

const show = async (req: Request, res: Response) => {
    const user = await user_db.show(req.params.id);
    try {
        res.json({
            message: 'this is the SHOW USER route',
            data: user
        });
    }
    catch (err) {
        res.status(400);
        res.json(err);
    }
}

const users_routes = (app: express.Application) => {
    app.get('/users', index);
    app.get('/users/:id', show);
    app.post('/users', create);
}

export default users_routes;