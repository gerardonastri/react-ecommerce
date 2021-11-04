require('dotenv').config()
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local');
const User = require('./models/User');
const session = require('express-session');
const cors = require('cors');


//database
const mongoConnect = process.env.MONGO_URI;
mongoose.connect(mongoConnect, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('mongoDB connected');
});

//middleware
app.use(cors())
app.use(express.urlencoded({extended: false}));
app.use(express.json());
//session
const sessionConfig = {
    secret: 'thisshouldbeabettersecret!',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
  }
app.use(session(sessionConfig));
//passport
app.use(passport.initialize());
app.use(passport.session())
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
})

//routes/request
const userRoutes = require('./routes/user');
const authRoutes = require('./routes/auth');
const ProductRoutes = require('./routes/product');
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/order");
const stripeRoute = require("./routes/stripe");



app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/products', ProductRoutes)
app.use("/api/carts", cartRoute);
app.use("/api/orders", orderRoute);
app.use("/api/checkout", stripeRoute);

app.use(express.static(path.join(__dirname, "/client/build")))
app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, "/client/build", "index.html"))
})


const PORT = process.env.PORT || 8000;
app.listen(PORT , () => {
    console.log(`server listening on port ${PORT}`);
})