import express from "express";
import session from "express-session";

const app = express();

app.set("view engine",'ejs')
app.use(express.urlencoded({extended:true})) //used to make requested body in readable form

app.set('views', './view') //custome folder

app.use(session({
    secret:'apple',
}))

app.get('/login',(req,res)=>{
    res.render('login')
})


app.post('/profile',(req,res)=>{
    req.session.data = req.body;
    //  console.log(req.session.data)
    res.render('profile')
})

app.get('/',(req,res)=>{
   const data = req.session.data;
//    console.log("data",data)
    res.render('home',{data})
})



app.listen(3200)