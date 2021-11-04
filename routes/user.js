const express = require('express');
const router = express.Router();
const IsLogged = require('../isLogged');
const User = require('../models/User');


//UPDATE
router.put('/:id', IsLogged, async (req,res) => {
    const user = await User.findById(req.params.id)
    if(user._id === req.user._id){
        try {
            User.findByIdAndUpdate(req.params.id, req.body)
            res.status(200).json('user updated with success')
        } catch (error) {
            res.status(500).json(error)
        }
    }
})
//DELETE
router.delete('/:id', IsLogged, async (req,res) => {
    const user = await User.findById(req.params.id)
    if(user._id === req.user._id){
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json('user has been deleted')
        } catch (error) {
            res.status(500).json(error)
        }
    }
})
//get user
router.get('/find/:id', IsLogged, async (req,res) => {
        try {
            const user = await User.findById(req.params.id)
            res.status(200).json(user)
        } catch (error) {
            res.status(500).json(error)
        }
})

//get alluser
router.get("/",  async (req, res) => {
    const query = req.query.new;
    try {
      const users = query
        ? await User.find().sort({ _id: -1 }).limit(5)
        : await User.find();
      res.status(200).json(users);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//get user stats
router.get("/stats", async (req, res) => {
  const date = new Date();
  const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));

  try {
    const data = await User.aggregate([
      { $match: { createdAt: { $gte: lastYear } } },
      {
        $project: {
          month: { $month: "$createdAt" },
        },
      },
      {
        $group: {
          _id: "$month",
          total: { $sum: 1 },
        },
      },
    ]);
    res.status(200).json(data)
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;