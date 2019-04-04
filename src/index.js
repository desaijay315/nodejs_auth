const express     = require('express')
require('./db/mongoose');
const userRouter = require('./router/user')
const PostRouter = require('./router/post')

const app = express();
const port  =  process.env.PORT || 3005

app.use(express.json())

app.use(userRouter)
app.use(PostRouter)


app.listen(port,() =>{
    console.log('server is up on ' + port);
})


