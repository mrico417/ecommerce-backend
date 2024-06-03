const {v4:uuidv4} = require('uuid');
const { client } = require('../db');

// {
// 	"name": "show",
// 	"description": "red",
// 	"price": 150.0,
// 	"image_url": "http://myimage"
// }

const addProduct = async(req,res,next) => {
    try {
        const sql = `
            INSERT INTO product(id,name,description,price,image_url)
            VALUES ($1,$2,$3,$4,$5)
            RETURNING *;`
        ;

        const response = await client.query(sql,[uuidv4(),req.body.name,req.body.description,req.body.price,req.body.image_url]);
        res.send(response.rows[0]);
    } catch (error) {
        console.log(error);
    }
};

const fetchProducts = async(req,res,next) => {
    try {
        const sql = `
            SELECT id, name, description, image_url FROM product
            ORDER BY name ASC;`
        ;

        const response = await client.query(sql);
        res.send(response.rows);
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const deleteProductByID = async ({id}) => {
    try {
        const sql = `
            DELETE FROM product
            WHERE id=$1;`
        ;

        return await client.query(sql,[id]);
    } catch (error) {
        
    }
};

const getProductByID = async({id}) => {
    try {
        const sql = `
            SELECT name, description, price, image_url FROM product
            WHERE id=$1;`
        ;

        return await client.query(sql,[id]);
    } catch (error) {
        
    }
};

module.exports = {
    addProduct,
    fetchProducts,
    deleteProductByID,
    getProductByID
};
