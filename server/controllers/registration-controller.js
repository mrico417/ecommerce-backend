const { v4:uuidv4} = require('uuid');
const { client } = require('../db');
const bcrypt = require('bcrypt');

// {
// 	"email": "my@amazon.com",
// 	"password": "mysimplepass"
// }

const addRegistration = async (req,res,next)  => {
    try {

        hashedPassword = await bcrypt.hash(req.body.password,2);
        
        const sql=`
            INSERT INTO account(id,email,password)
            VALUES ($1,$2,$3)
            RETURNING id;`
        ;

        await client.query(sql,[uuidv4(),req.body.email,hashedPassword]);
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
};

module.exports = {
    addRegistration
};
