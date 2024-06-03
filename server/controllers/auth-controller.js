const { client } = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { secret } = require('../secrets');

const authenticate = async (req,res,next) => {
    try {
        
        const sql = `
            SELECT id, password 
            FROM account
            WHERE email=$1;`
        ;

        const response = await client.query(sql,[req.body.email]);
        if(!response.rows.length){
            const error = Error('Cannot find user.');
            error.status = 401;
            throw error;
        }
        const account = response.rows[0];
        const checkedPassword = await bcrypt.compare(req.body.password,account.password);

        if(!checkedPassword){
            const error = Error('Invalid credentials.');
            error.status = 401;
            throw error;
        }

        const  token  = jwt.sign({ id: account.id }, secret);

        res.json({"token" : token});
    } catch (error) {
        console.log(error);
        next(error);
    }
};

const fetchAccountByToken = async (token) =>{
    try {

        const tokenDecoded = jwt.verify(token,secret);
        const accountID = tokenDecoded.id;
        const sql=`
            SELECT id, email
            FROM account
            WHERE id=$1;`
        ;
        const response = await client.query(sql,[accountID]);

        if(!response.rows.length){
            const error = Error('Error fetching account.');
            error.status = 401;
            throw error;
        }

        return response.rows[0];

    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    authenticate,
    fetchAccountByToken
}
