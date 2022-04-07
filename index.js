const express = require('express');

const dataService=require('./service/data.service')

const jwt = require('jsonwebtoken')


//cors
const cors=require('cors')



//app using express
const app=express()

//use cors to specify the origin
app.use(cors({
    origin:'http://localhost:4200'
}))

//set up the post number
app.listen(3000,()=>{
    console.log("server started at PORT:3000");
})

//to parse json
app.use(express.json())


const JWTMiddileware=(req,res,next)=>{

    try{  
        //   const token=req.body.token // token put in body
          const token=req.headers["x-access-token"] // token put in headers
    
        //verify token
       const data= jwt.verify(token,'privatekey123')
       req.currentUid = data.cUid
       next()}
       catch{
           res.status(422).json({
               status:false,
               message:"Please Login in"
           })
       }
    
}

//Register API
app.post('/register',(req,res)=>{
    dataService.register(req.body.uname,req.body.uid,req.body.pass)
//b    const rest= dataService.register(req.body.uname,req.body.uid,req.body.pass)

//     if(rest)
//     {
//         res.send("Registered Successfully")
//     }
//     else
//     {
//         res.send("Please Login")
//     }
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})

//Login API
app.post('/login',(req,res)=>{
    dataService.login(req.body.uid,req.body.pass)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})


//Add-Event  API
app.post('/dashboard',JWTMiddileware,(req,res)=>{
    dataService.addEvent(req.body.uid,req.body.date,req.body.desc)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})

//GetHistory   API
app.post('/history',(req,res)=>{
    dataService.history(req.body.uid)
    .then(result=>{
        res.status(result.statusCode).json(result)
    })
})