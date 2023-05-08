const express = require('express')
const userRouter = require('./routes/user')
const amarengaRouter=require('./routes/amarenga')
const announcementRouter = require('./routes/announcement')
const publicationsRouter = require('./routes/publications')
const cookieParser = require('cookie-parser');
var cors = require('cors');


require('dotenv').config();
const port = process.env.PORT
require('./db/db')




const app = express()

app.use(express.json())

app.use(cors({
    origin: '*', // allow requests from any domain
}
    ));
app.use(cookieParser());
app.use(userRouter)
app.use(amarengaRouter)
app.use(announcementRouter)
app.use(publicationsRouter)

app.get('/', (req, res) => {
    res.sendStatus(200)
  })
app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})