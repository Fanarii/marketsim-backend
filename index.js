import express from "express";
import session from "express-session";
import lisenceRoutes from './routes/lisenceRoutes.js'
import productRoutes from './routes/productRoutes.js'
import authRouters from './routes/authRoutes.js'
import transactionRoutes from './routes/transactionRoutes.js'

const app = express()
const port = 5001


app.use(express.json())
app.use(session({
    secret: 'djwkjdkajsdoij10isfd0141',
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false}
}))

app.use(lisenceRoutes)
app.use(productRoutes)
app.use(authRouters)
app.use(transactionRoutes)

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})