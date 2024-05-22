import { Product, ProductDB } from '../../../src/models/products'
import { Order, OrderDB } from '../../../src/models/orders'
import { OrderItem, OrderItemDB } from '../../../src/models/orders_items'
import { User, UserDB } from '../../../src/models/users'

const product_db = new ProductDB();
const user_db = new UserDB();
const order_db = new OrderDB();
const orderItem_db = new OrderItemDB();

export async function seedTestData() {

    const user: User = { firstname: "Matt", lastname: "Jinks", password: "1234" };
    const createdUser = await user_db.create(user);
    const userId = createdUser.id as Number;

    let products: Product[] = [
        { name: 'item0', price: 12.34, category: 'category1', url: '', description: '' },
        { name: 'item1', price: 56.78, category: 'category1', url: '', description: '' },
        { name: 'item2', price: 90.12, category: 'category1', url: '', description: '' },
        { name: 'item3', price: 34.56, category: 'category1', url: '', description: '' },
        { name: 'item4', price: 78.90, category: 'category1', url: '', description: '' },
        { name: 'item5', price: 12.34, category: 'category2', url: '', description: '' },
        { name: 'item6', price: 56.78, category: 'category2', url: '', description: '' },
        { name: 'item7', price: 90.12, category: 'category2', url: '', description: '' },
        { name: 'item8', price: 34.56, category: 'category2', url: '', description: '' },
        { name: 'item9', price: 78.90, category: 'category2', url: '', description: '' },
    ];

    let orders: Order[] = [
        { user_id: userId, status: 'complete' },
        { user_id: userId, status: 'complete' },
        { user_id: userId, status: 'complete' },
        { user_id: userId, status: 'complete' },
        { user_id: userId, status: 'complete' },
        { user_id: userId, status: 'active' }
    ];

    for (const product of products) {
        await product_db.create(product);
    }

    for (const order of orders) {
        await order_db.create(order);
    }

    products = await product_db.index();
    orders = await order_db.indexCompletedOrders(String(userId));

    let quantity = 1;
    const o_id = orders[0].id as Number

    for (const product of products) {
        const p_id = product.id as Number
        await orderItem_db.create({ 
            order_id: o_id, 
            product_id: p_id, 
            quantity: quantity 
        });
        quantity += 1;
    }
}

export async function cleanUp() {
    try {
        const products = await product_db.index();
        const users = await user_db.index();
        let userId = users[0].id as Number;
        const orders = await order_db.index(); 
        // console.log(users);
        const orders_items = await orderItem_db.index();

        await Promise.all(orders_items.map(order_item => orderItem_db.delete(String(order_item.id))));

        await Promise.all(orders.map(order => order_db.delete(String(order.id))));

        await Promise.all(products.map(product => product_db.delete(String(product.id))));
        const finalOrders = await order_db.index(); 
        console.log(`Final Orders Count: ${finalOrders.length}`);

        await Promise.all(users.map(user => user_db.delete(String(user.id))));

        const finalProducts = await product_db.index();
        const finalUsers = await user_db.index();
        const finalOrdersItems = await orderItem_db.index();

        console.log(`Final Products Count: ${finalProducts.length}`);
        console.log(`Final Users Count: ${finalUsers.length}`);
        console.log(`Final Orders Items Count: ${finalOrdersItems.length}`);
        console.log(`Final Orders Count: ${finalOrders.length}`);
    } catch (err) {
        console.error('Error during cleanup:', err);
    }
}


