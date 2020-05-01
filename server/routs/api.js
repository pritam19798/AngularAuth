const express=require('express')
const jwt=require('jsonwebtoken')
const mongoose=require('mongoose')
const db="mongodb://127.0.0.1:27017/pritamdb"
const User=require('../models/user')


const router=express.Router()



function verifytoken(req,res,next){

  if(!req.headers.authorization){
    return res.status(401).send('unauthorized access')
  }
  let token=req.headers.authorization.split(' ')[1]
  if(token=='null'){
    return res.status(401).send('unauthorized access')
  }
  let payload=jwt.verify(token,'secrect')
  console.log(payload.subject)
  if(!payload){
    return res.status(401).send('unauthorized access')
  }
  id=payload.subject
  User.findOne({_id: id},(err,user)=>{
    if(!user){
      console.log('no user exist')
      return res.status(401).send('unauthorized access')
    }else{
      req.userId=payload.subject
      next()
    }
  })
  

}


mongoose.connect(db,err=>{
    if(err){
        console.log(err)
    }else{
        console.log('connected to mongo db')
    }

})

router.get('/',(req,res)=>{
    res.send('API router')
})


router.get('/events', (req,res) => {
    let events = [
      {
        "_id": "1",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "2",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "3",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "4",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "5",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "6",
        "name": "Auto Expo",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      }
    ]
    res.json(events)
  })
  
  router.get('/special', verifytoken,(req, res) => {
    let specialEvents = [
      {
        "_id": "1",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "2",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "3",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "4",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "5",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      },
      {
        "_id": "6",
        "name": "Auto Expo Special",
        "description": "lorem ipsum",
        "date": "2012-04-23T18:25:43.511Z"
      }
    ]
    res.json(specialEvents)
  })



router.post('/register',(req,res)=>{
    let userData=req.body
    let user=new User(userData)
    user.save((error,registeredUser)=>{
        if(error){
            console.log(error)
        }else{
          let payload={subject: registeredUser._id}
          let token=jwt.sign(payload,'secrect')
          res.status(200).send({token})

        }
    })
})


router.post('/login',(req,res)=> {
    let userData=req.body
    User.findOne({email: userData.email},(err,user)=>{
        if(err){
          console.log(err)
        }else{
            if(!user){
               res.status(401).send('email not ound')
            }else{
                if(user.password!==userData.password){
                   res.status(401).send('invalid password')
                }else{
                  let payload={subject: user._id}
                  let token=jwt.sign(payload,'secrect')
                  res.status(200).send({token})
                }
            }
        }
    })
})





module.exports=router