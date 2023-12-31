const express = require("express")
const url = require("url")
const router = express.Router();

const API_BASE_URL = process.env.API_BASE_URL
const API_KEY_NAME = process.env.API_KEY_NAME
const API_KEY_VALUE = process.env.API_KEY_VALUE

router.get("/", async (req, res) => {
    try {
        const appKey = new URLSearchParams({
            [API_KEY_NAME]: API_KEY_VALUE,
            ...url.parse(req.url,true).query
        })
        const apiRes = await needle("get", `${API_BASE_URL}?${appKey}`)
        const data = apiRes.body
        if(process.env.NODE_ENV !== "production"){
            console.log(`${API_BASE_URL}?${appKey}`)
        }
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router;