const express = require('express')
const cors=require('cors')
const bodyParser=require('body-parser')
const signin=require('./controllers/signin')
const bcrypt=require('bcrypt-nodejs')
const register=require('./controllers/register')
const items=require('./controllers/items')

const app=express()
app.use(cors())
app.use(bodyParser.json())

const knex = require('knex')({
    client: 'pg',
    version: '7.2',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'postgre',
      database : 'smart-brain'
    }
  });

console.log(knex.select().from('users').then(data=>{
    // console.log(data)
}))


app.get('/', (req,res)=>{
    res.send("this is working")
})

app.post('/signin',(req,res)=>{
    signin.handleSignIn(req,res,knex,bcrypt)
})

app.post('/register',(req,res)=>{
    register.handleRegister(req,res,knex,bcrypt)
})

app.get('/items',(req,res)=>{
    items.handleItems(req,res,knex)
})

app.listen(3000,()=>{
    console.log("app is running on port 3000")
})