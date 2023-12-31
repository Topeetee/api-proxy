const express = require("express");
const cors = require("cors");
require ("dotenv").env
const rateLimit = require("express-rate-limit");
const app = express()
const appRouter = require("./routes/app")
const apicache = require("apicache");

const port = process.env.PORT || 3000
const cache = apicache.middleware
app.use(cors);

//limit to 200 request in 1 hour
const limiter = rateLimit({
    max: 200,
    windowMs: 60 * 60 * 1000,
    message: "Too many request from this IP"
});
app.use(limiter)

app.get("/api",cache("1minutes"),appRouter)
app.listen(port,()=>{
    console.log(`server dey work for port ${port}`)
})