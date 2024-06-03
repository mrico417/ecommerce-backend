const pg = require('pg');
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/ecommerce_db');


const createTables = async () => {

    try {
        
        await client.connect();
        console.log("Connected to database:",client.database);

        const sql = `
                DROP TABLE IF EXISTS cart_product;
                DROP TABLE IF EXISTS product;
                DROP TABLE IF EXISTS account;
                CREATE TABLE product(
                    id UUID PRIMARY KEY,
                    name VARCHAR(150) UNIQUE NOT NULL,
                    description VARCHAR(255),
                    price DECIMAL NOT NULL,
                    image_url VARCHAR(255),
                    created TIMESTAMP NOT NULL DEFAULT now(),
                    updated TIMESTAMP NOT NULL DEFAULT now()
                );
                CREATE TABLE account(
                    id UUID PRIMARY KEY,
                    email VARCHAR(255) UNIQUE NOT NULL,
                    password VARCHAR,
                    created TIMESTAMP NOT NULL DEFAULT now(),
                    updated TIMESTAMP NOT NULL DEFAULT now(),
                    account_type VARCHAR(4) DEFAULT 'CUST'
                );
                CREATE TABLE cart_product(
                    id UUID PRIMARY KEY,
                    account_id UUID REFERENCES account(id) NOT NULL,
                    product_id UUID REFERENCES product(id) NOT NULL,
                    quantity INTEGER NOT NULL DEFAULT 1,
                    created TIMESTAMP NOT NULL DEFAULT now(),
                    CONSTRAINT unique_account_id_product_id UNIQUE(account_id,product_id)
                );
            `
        ;

        await client.query(sql);
      

    } catch (error) {
        console.log(error);
    }
};

(async() => {
    await createTables();
    console.log("Created tables...");
})();

module.exports = {
    client
};
