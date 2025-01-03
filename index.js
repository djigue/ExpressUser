const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const jwt = require('jsonwebtoken');
const secretKey = 'bon';
const session = require('express-session');
const flashMiddleware = require('./middlewares/flashMiddleware');

const db = require ('./db/db');
const traitLogout = require('./controllers/userController');
const userRouter = require('./routes/userRoute');
const produitRouter = require('./routes/panierRoute');
const annonceRouter = require('./routes/annonceRoute');
const adminRouter = require('./routes/adminRoute');

const port = 3000;
const app = express();
app.use(session({
    secret: 'key', 
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } 
}));
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-store');
    next();
});
app.use(cookieParser());
app.use(flashMiddleware);
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname)));
app.use(userRouter);
app.use(produitRouter);
app.use(annonceRouter);
app.use(adminRouter);
app.use('/scripts', express.static(path.join(__dirname, 'public/scripts')));
app.use('/images', express.static('images'));

app.post('/logout', (req, res) => {
    traitLogout (req,res);
});

app.listen(port,()=>{
    console.log('Serveur en écoute sur le port 3000');
})
