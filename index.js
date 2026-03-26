import express from "express";
import session from "express-session";
import nodemailer from "nodemailer"

const app = express();

const transporter = nodemailer.createTransport({
    service:'gmail',
    auth:{
        user:'devaman2508@gmail.com',
        pass:'bkyi fqlo cypd svzq'
    }
});

app.set("view engine",'ejs')
app.use(express.urlencoded({extended:false})) //used to make requested body in readable form
app.use(express.json())

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

app.get('/mail',(req,res)=>{
    res.render('mail')
})


app.post('/submit-email',(req,res)=>{
    console.log(req.body)

    const mailOptions = {
        from:'devaman2508@gmail.com',
        to:'aman.vns98@gmail.com',
        subject:req.body.subject,
        text:req.body.message
    }
    transporter.sendMail(mailOptions,(error,info)=>{
        if(error)
        {
            req.send('something went wrong')
        }else{
            req.send('mail sent')
        }
    })
    res.send('Email sent')
})


app.post('/submit-email',(req,res)=>{
    console.log(req.body)

    const mailOptions = {
        from:'devaman2508@gmail.com',
        to:'aman.vns98@gmail.com',
        subject:req.body.subject,
        text:req.body.message
    }
    transporter.sendMail(mailOptions,(error,info)=>{
        if(error)
        {
            req.send('something went wrong')
        }else{
            req.send('mail sent')
        }
    })
    res.send('Email sent')
})

app.listen(3200)