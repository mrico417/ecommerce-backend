const express = require('express');
const router = express.Router();
const {addProduct,fetchProducts,deleteProductByID,getProductByID} = require('../controllers/products-controller');

router.get('/', fetchProducts);

router.get('/:product_id', async(req, res)=>{
    try {
        const response= await getProductByID({
            id: req.params.product_id
        });
        res.send(response.rows[0]);
    } catch (error) {
        
    }
});

router.post('/', addProduct);

router.delete('/:id',async(req,res)=>{
    try {
        const response = await deleteProductByID( {
            id: req.params.id
        });

        res.status(204).send();
    } catch (error) {
        
    }
});


module.exports = router;

