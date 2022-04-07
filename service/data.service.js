//import db
const db=require('../db')

const jwt=require('jsonwebtoken')



// database={
//     1000:{uid:1000,uname:"Neer",pass:1000},
//     1001:{uid:1001,uname:"Vyom",pass:1001},
//     1002:{uid:1002,uname:"Laisha",pass:1002}
//   }
//register
const register=(uname,uid,pass)=>{
    // if(uid in database)
    // {
    //     return false
    // }
    // else
    // {
        
    //     database[uid]={
            
    //         uid,
    //         uname,
    //         pass
    //     }
    //     console.log(database);

    //     return true
    // }

    return db.Reminder.findOne({uid})
    .then(data=>{
        if(data)
        {
            return{
                statusCode:422,
                status:false,
                message:"Already Exist ..PLease Login again..."
            }
        }
        else
        {
            const newReminder=new db.Reminder({         //database Key: req key
                uname,
                uid,
                pass,
                event:[]
            })
            newReminder.save()
            return{
                statusCode:200,
                status:true,
                message:"Successfully Registered..."
            }

            
        }
    })
}

//login
const login=(uid,pass)=>{
    // if(uid in database)
    // {
    //     if(pass==database[uid].pass){
    //         return true
    //     }
    //     else{
    //         return false
    //     }
       
    // }
    // else
    // {
        
    //     return false
    // }

    //asynchronous
    return db.Reminder.findOne({
        uid,pass
    })
    .then(data=>{
        if(data)
        {
            cUid=uid
            console.log(data);
            currentUser=data.uname

            //token generation
            const token=jwt.sign({
                cUid:uid
            },'privatekey123')
///////////////////////////
            // console.log(jwt);

            return {
                statusCode: 200,
                status: true,
                message: "Log in Successfully!!!!",
                cUid, 
                currentUser,
                token
              }
        }
        else{
            return {
                statusCode: 422,
                status: false,
                message: "Invalid Account Number/Password"
              }
        }
    })
}

//add event
const addEvent=(uid,date,desc)=>{
    //asynchronous
    return db.Reminder.findOne({uid})
    .then(data=>{
        if(data){
            data.event.push({
                date,
                desc

            })
            data.save()
            return {
                statusCode: 200,
                status: true,
                message: "Reminder Added Successfully..",
              } 
        }
        else{
            return {
                statusCode: 422,
                status: false,
                message: "Invalid Account Number/Password"
              }
        }
    })
}

// history
const history=(uid)=>{
    return db.Reminder.findOne({uid})
    .then(user=>{
        if(user){
            return {
                statusCode: 200,
                status: true,
                history: user.event,
          
              }
        }else{
            return {
                statuCode: 422,
                status: false,
                message: "User Doesn't Exist...!!"
          
              }
        }     
    })
}


module.exports={
    register,
    login,
    addEvent,
    history
}