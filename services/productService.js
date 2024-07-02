// ../services/productService

const { where } = require("sequelize");

class productService {
    // construtor da classe recebe a User da model
    constructor(productModel) {
        this.ProductModel = productModel;
    }

    async create(name, active) {
        try {

            const existingProduct = await this.ProductModel.findOne({
                where: {
                    name: name
                }
            });

            if(existingProduct) {
                throw new Error('Produto já existe');
            }
        
            const newProduct = await this.ProductModel.create(
                {
                    name: name,
                    active: active
                }
            )

            return newProduct ? newProduct : null;
            
        } catch (error) {
            throw error
        }
    }

    async update(nameProduct, updates) {
        try {
            const product = await this.ProductModel.findOne({
                where: {
                    name: nameProduct
                }
            });

            await product.update(updates);
            return product;
            
        } catch (error) {
            
        }
    }

    async getAllProduct(limit = 10, offset = 0, order = [['createdAt', 'DESC']]) {
        try {
            const AllProducts = this.ProductModel.findAll({
                limit: limit,
                offset: offset,
                order: order
            });

            return AllProducts ? AllProducts : null;

        } catch (error) {
            throw error;
        }
    }

    async getProductByName(nameProduct) {
        try {
            const ProductById = this.ProductModel.findOne({
                where: {
                    name: nameProduct
                }
            })

            return ProductById ? ProductById : null;

        } catch (error) {
            throw error;
        }
    }

}

module.exports = productService;
