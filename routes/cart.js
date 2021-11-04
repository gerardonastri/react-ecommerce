const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const isLogged = require('../isLogged')

//create
router.post('/', isLogged, async (req,res) => {
    const newCart = new Cart(req.body);
    try {
        const savedCart = await newCart.save();
        res.status(200).json(savedCart)
    } catch (error) {
        res.status(500).json(error)
    }
})

//update
router.put('/:id', isLogged, async (req,res) => {
    try {
        const cart = await Cart.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json(error)
    }
})
//update
router.delete('/:id', isLogged, async (req,res) => {
    try {
        const cart = await Cart.findByIdAndDelete(req.params.id);
        res.status(200).json('cart has been deleted')
    } catch (error) {
        res.status(500).json(error)
    }
})

//get cart
router.get('/:userId', isLogged, async (req,res) => {
    try {
        const cart = await Cart.findOne({userId: req.params.userId});
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json(error)
    }
})
/*
//get all 
router.get('/', isLogged, async (req,res) => {
    try {
        const cart = await Cart.findOne({userId: req.params.userId});
        res.status(200).json(cart)
    } catch (error) {
        res.status(500).json(error)
    }
})
*/


module.exports = router;