const express = require('express');
const connectDb = require('./config/db');
const app = express();

// lets heroku get the port
const PORT = process.env.PORT || 5000;

//connect to mongo
connectDb()

// initialize the middleware
// parse incoming JSON payloads
app.use(express.json({ extended: false }));

// just a test route for now (removed once other routes added)
// app.get('/', (req,res) => res.send('API Running'));

// add auth route
app.use('/api/auth', require('./routes/api/auth'));
// add api/users route
app.use('/api/users', require('./routes/api/users'));

// must come after the routes
if ( process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req,res) => {
        res.sendFile(path.resolve(__dirname,'client','build','index.html'));
    });
}

app.listen(PORT, () => console.log(`Server stated on port ${PORT}`));
