require('dotenv').config();
const express = require('express')
const app = express()
const mongoose = require('mongoose')
const PORT = process.env.PORT || 5000
// oKYYAfdtXxI5IgWS password of username = praffulkumar121 on mongodb
const {MONGOURI} = process.env.MONGOURI || require('./keys').MONGOURI;
const cors = require('cors');
const keys = require('./keys');


// to solve cors error
app.use(cors({
    origin:"*",
    methods:["GET", "POST", "PUT", "DELETE"]
}))

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => console.log('connected to mongo'));


// mongoose.connect(keys.MONGOURI)

// mongoose.connection.on('connected', ()=>{
//     console.log("connected to mongos ")
// })
// mongoose.connection.on('error', (err)=>{
//     console.log("err connecting", err)
// })

require('./models/user')
require('./models/post')

app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/post'))
app.use(require('./routes/user'))

const customMiddleware = (req, res, next)=>{
    console.log("middleware executed!")
    next()
}

app.get('/',(req,res)=>{
    res.send("hello world")
    console.log("in home")
})

app.get('/about',customMiddleware,(req, res)=>{
    res.send("about page")
    console.log("in about page")
})

app.listen(PORT, ()=>{
    console.log("server is running on ", PORT)
})
