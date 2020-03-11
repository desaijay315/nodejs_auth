const express     = require('express')
require('./db/mongoose');
const userRoutes = require('./router/user')
const PostRoutes = require('./router/post')

const app   = express();
const port  =  process.env.PORT || 5000;

app.use(express.json())

app.use(userRoutes)
app.use(PostRoutes)

app.get('/', function (req, res) {
 res.send('hello world!');
});


app.listen(port,() =>{
    console.log('server is up on ' + port);
})
