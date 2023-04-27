const express=require("express");
const app=express();
const path=require("path");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
const cookieparser=require("cookie-parser");
const sessions=require("express-session");
app.use(cookieparser());
app.use(sessions({
    secret:'asdas#343',
    saveUninitialized:true,
    resave:false,
    cookie:{maxAge:100000}
}))
app.set("view engine","ejs");

app.get("/",(req,res)=>{
    res.render("index");
    
})

app.use(express.static("public"));

app.get("/login",(req,res)=>{

   // res.sendFile(path.join(__dirname,"./public/login.html"));
   res.render("login",{msg:''});


});
app.post("/login",(req,res)=>{

 //   res.sendFile(path.join(__dirname,"./public/login.html"));
 if(req.body.username==req.body.password)
 {
    req.session.username=req.body.username;

    res.redirect("/dashboard");
 }
 else
 //res.redirect("/login");
 res.render("login",{msg:'Invalid user/password'});


});

app.get("/dashboard",(req,res)=>{
    res.render("dashboard",{user:req.session.username});

})
app.get("/test",(req,res)=>{

    res.render("home",{yourname:"TestCode",courses:["course1","course2","course3"]});


})

app.listen(3000,(err)=>{

        if(err)
        console.log("Server Error...",err);
        else
        console.log("Server Started");

});