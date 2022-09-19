const express = require('express')
const userRouter = require('./routes/user')
const amarengaRouter=require('./routes/amarenga')
const announcementRouter=require('./routes/announcement')
const cookieParser = require('cookie-parser');
var cors = require('cors');


require('dotenv').config();
const port = process.env.PORT
require('./db/db')




const app = express()
app.use(cors())
app.use(express.json())
app.use(cookieParser());
app.use(userRouter)
app.use(amarengaRouter)
app.use(announcementRouter)

app.listen(port, () => {
    console.log(`Server running on port ${port}`)
})