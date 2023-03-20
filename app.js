const express = require("express")
const mongoose=require('mongoose')
const path=require('path')
const user=require('./model/user.js')
const trip=require('./model/trip.js')
const requ=require('./model/req.js')
const event=require('./model/event.js')
const question=require('./model/question.js')
const app = express();
const port=2345;
app.use(express.urlencoded())
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.get('/',(req,res)=>{
    res.render('home')
})
app.post('/registration',(req,res)=>{
    const {name,email,number,pwd}=req.body;
    user({
        username:name,
        email_id:email,
        mobile_number:number,
        password:pwd,
    }).save().then(()=>{
        res.render('login')
    })
})
app.get('/login',(req,res)=>{
    res.render('login')
})
app.get('/registration',(req,res)=>{
    res.render('registration')
})
app.post('/login',async(req,res)=>{
    const {email,pwd}=req.body;
    let arr=await user.find({email_id:email});
    let trips=await trip.find({members:{$elemMatch:{$eq:'sanya'}}})
    console.log(arr)
    if(arr.length!=0){
        res.render('dashboard',{arr,trips})
    }
    else{
        const s='User Does not exist! Do register'
        res.render('login',{s})
    }
})
app.get('/dashboard',async(req,res)=>{
    let trips=await trip.find({members:{$elemMatch:{$eq:'sanya'}}})
    res.render('dashboard',trips);
})
app.get('/trip',(req,res)=>{
     res.render('trip');
})
app.get('/add',(req,res)=>{
    res.render('add');
})
app.post('/add',async(req,res)=>{
    let tripname=(req.body.tripname);
    let member=req.body.member;
   await trip.updateOne({
        trip_name:tripname,
    },{
        $push:{members:member}
    })
   let  trips=await trip.find({trip_name:tripname})
   console.log(trips);
    res.redirect('dashboard')
})
app.post('/trip',(req,res)=>{
     trip({
        trip_name:req.body.tname,
     }).save().then(()=>{
        console.log('saved');
     });
     res.redirect('dashboard');
})
app.get('/ps',async(req,res)=>{
    let questions=await question.find({trip_name:'Riders'});
    res.render('ps',{questions})
})
app.post('/dashboard',async (req,res)=>{
   let questions=await question.find({trip_name:req.body.tripname});
   console.log(questions);
    res.render('ps',{questions});
})
app.get('/addq',(req,res)=>{
    res.render('addq');
})
app.get('/addo',(req,res)=>{
    res.render('addo');
})
app.post('/addq',(req,res)=>{
    question({
       trip_name:req.body.tripname,
       question:req.body.ques,
    }
    ).save().then((result)=>{
        console.log(result);
    })
    res.redirect('ps')
})
app.post('/addo',async(req,res)=>{
     await  question.updateOne({
         question:req.body.ques,
    },{$push:{
        options:req.body.option,
    }})
    console.log('hi');
    res.redirect('ps')
})
app.get('/itenerary',async(req,res)=>{
   var  events=await event.find({trip_name:'Riders'})
   console.log(events);
   var  reqs=await requ.find({trip_name:'Riders'})
    res.render('itenerary',{events,reqs})
})
app.get('/event',(req,res)=>{
    res.render('event')
})
app.get('/req',(req,res)=>{
    res.render('req')
})
app.post('/req',(req,res)=>{
    req({
        trip_name:req.body.tn,
        requires:req.body.req,
    }).save();
    res.redirect('itenerary')
})
app.post('/event',(req,res)=>{
    requ({
        trip_name:req.body.tn,
        events:req.body.eve,
        date:req.body.date,
    }).save().then((result)=>{
        console.log('result')
    });
    res.redirect('itenerary')
})
mongoose.connect('mongodb://127.0.0.1:27017/Avengers',{useNewUrlParser:true}).then(()=>{console.log('Connected')});
app.listen(port,()=>{ 
    console.log(`successful on port ${port}`);
});
