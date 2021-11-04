const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const isLogged = require('../isLogged')

//create
router.post('/', isLogged,  async (req,res) => {
    const newProduct = new Product(req.body);
    try {
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct)
    } catch (error) {
        res.status(500).json(error)
    }
})

//update
router.put('/:id', isLogged,  async (req,res) => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json(error)
    }
})
//delete
router.delete('/:id', isLogged,  async (req,res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("product has been deleted")
    } catch (error) {
        res.status(500).json(error)
    }
})

//get product
router.get('/:id', async (req,res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json(error)
    }
})
//get all product
router.get("/", async (req, res) => {
    const qNew = req.query.new;
    const qCategory = req.query.category;
    try {
      let products;
  
      if (qNew) {
        products = await Product.find().sort({ createdAt: -1 }).limit(1);
      } else if (qCategory) {
        products = await Product.find({
          categories: {
            $in: [qCategory],
          },
        });
      } else {
        products = await Product.find();
      }
  
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json(err);
    }
  });



module.exports = router;