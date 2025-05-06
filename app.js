const express = require('express');
const app = express();
app.use(express.json())
require('dotenv').config();
const cors = require('cors')
app.use(cors())
const PORT = process.env.PORT;
const authRoutes = require('./routes/authRoutes')
const productRoutes = require('./routes/productRoutes')


const sequelize = require('./config/sql');
const mongo = require('./config/mongo')

app.use('/api/auth/', authRoutes)
app.use('/api/products/', productRoutes)


sequelize.sync();
mongo();

app.listen(PORT, () => {
    console.log(`server running on port ${PORT} `)
})