const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors')
const connectDB = require('./src/config/dbConnection');
const userRouter = require('./src/routes/user.route');
const momentRouter = require('./src/routes/moment.route')

dotenv.config();
const app = express();

//connect to mongodb database
connectDB();
app.use(cors())

app.options('*', cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", '*' ); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  })
app.use(express.json())

app.use('/api', userRouter)
app.use('/api', momentRouter)
const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => res.send({"hello": "world"}))

//starting the server
app.listen(PORT,() => console.log(`Server is running on PORT: ${PORT}`))