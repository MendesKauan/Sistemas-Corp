// ./controller/productController.js

class productController {
    constructor(productService) {
        this.productService = productService;
    }

    async create(req, res) {
        const {name, active} = req.body;

        try {
            const newProduct = await this.productService.create(name, active);
            
            res.status(200).json(newProduct);
            
        } catch (error) {
            if(error.message === 'Produto já existe') {
                res.status(400).json({ error: error.message });
            }
            else {
                res.status(500).json({error:'erro ao inserir novo produto'});
            }
        }
    }

    async update(req, res) {
        const {nameProduct, updates} = req.body;

        try {
            const updateProduct = await this.productService.update(nameProduct, updates);
            res.status(200).json(updateProduct);
            
        } catch (error) {
            res.status(500).json({error:'erro ao atualizar produto'});    
        }
    }
    
    async getAllProduct(req, res) {
        try {
            const AllProducts = await this.productService.getAllProduct();
            res.status(200).json(AllProducts);    

        } catch (error) {
            res.status(400).json({error:'produtos não localizados'})
        }
    }

    async getProductByName(req, res) {

        const {nameProduct} = req.body;

        try {
            const Product = await this.productService.getProductByName(nameProduct);
            res.status(200).json(Product);    

        } catch (error) {
            res.status(400).json({error:'produto não localizado'})
        }
    }
}

module.exports = productController;