if(process.env.NODE_ENV !== "production"){
    require('dotenv').config()
}
const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get('/',(req,res)=>{
    res.send('hey')
})
app.listen(port,()=>{
    console.log(`listeniefng ${port}`)
})