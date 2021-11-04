const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const isLogged = require('../isLogged')
const isAdmin = require('../isLogged')


//create
router.post('/', isLogged, async (req,res) => {
    const newOrder = new Order(req.body);
    try {
        const savedOrder = await newOrder.save();
        res.status(200).json(savedOrder)
    } catch (error) {
        res.status(500).json(error)
    }
})

//update
router.put('/:id', isLogged, async (req,res) => {
    try {
        const Order = await Order.findByIdAndUpdate(req.params.id, req.body);
        res.status(200).json(Order)
    } catch (error) {
        res.status(500).json(error)
    }
})
//update
router.delete('/:id', isLogged, async (req,res) => {
    try {
        const Order = await Order.findByIdAndDelete(req.params.id);
        res.status(200).json('Order has been deleted')
    } catch (error) {
        res.status(500).json(error)
    }
})

//get user  Orders
router.get('/:userId', async (req,res) => {
    try {
        const Order = await Order.find({userId: req.params.userId});
        res.status(200).json(Order)
    } catch (error) {
        res.status(500).json(error)
    }
})

// //GET ALL

router.get("/", async (req, res) => {
    try {
      const orders = await Order.find();
      res.status(200).json(orders);
    } catch (err) {
      res.status(500).json(err);
    }
  });

// GET MONTHLY INCOME

router.get("/income", async (req, res) => {
    const productId = req.query.pid;
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth() - 1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth() - 1));
  
    try {
      const income = await Order.aggregate([
        {
          $match: {
            createdAt: { $gte: previousMonth },
            ...(productId && {
              products: { $elemMatch: { productId } },
            }),
          },
        },
        {
          $project: {
            month: { $month: "$createdAt" },
            sales: "$amount",
          },
        },
        {
          $group: {
            _id: "$month",
            total: { $sum: "$sales" },
          },
        },
      ]);
      res.status(200).json(income);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router;