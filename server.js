const express = require('express')

const app=express()

app.get('/', (req,res)=>{
    res.send("this is working")
})

app.listen(30030,()=>{
    console.log("app is running on port 3000")
})