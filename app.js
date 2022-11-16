require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');

const session = require('express-session');



const app = express();




//BodyParser
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({extended: true}));
//Express Session
app.use(session({
    secret: 'keyboard',
    resave: true,
    saveUninitialized: true
}));



//Routes
app.use('/', require('./routes/index'));
app.use('/transactions', require('./routes/transactions'));
app.use('/users', require('./routes/users'));
//app.use('/transaction', require('./routes/transactions'));


const myPort = process.env.PORT || 8000;

// app.listen(PORT, console.log(`Server started on port ${PORT}`));

app.listen(myPort, (req, res) => {
    console.log(`App is on port ${myPort}`);
});

