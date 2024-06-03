const {v4:uuidv4} = require('uuid');
const { client } = require('../db');

const addProductToCart = async(req,res,next) => {
       
    try {
        const sql = `
            INSERT INTO cart_product(id,account_id,product_id,quantity)
            VALUES($1,$2,$3,$4)
            RETURNING *;`
        ;
        const response = await client.query(sql,[uuidv4(),req.params.account_id,req.body.product_id,req.body.quantity]);
        res.send(response.rows[0]);
    } catch (error) {
        console.log(error);
        next(error);
    }

};

const fetchCartProducts = async(req,res,next) => {
    try {
        const sql = `
            SELECT c.id as cart_product_id, c.product_id, p.name, p.description, p.image_url, c.quantity
            FROM cart_product as c
            INNER JOIN product as p ON p.id = c.product_id
            WHERE c.account_id=$1
            ORDER BY c.created ASC;`
        ;

        const response = await client.query(sql,[req.params.account_id]);
        res.send(response.rows);
    } catch (error) {
        console.log(error);
        next(error);
    }

};

module.exports = {
    addProductToCart,
    fetchCartProducts
};
