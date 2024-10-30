const express=require("express");
const morgan=require("morgan");
const pg=require("pg");
const cors=require("cors");
const bodyParser=require("body-parser");
require("dotenv").config();
const app=express();
app.use(morgan("tiny"));
app.use(bodyParser.urlencoded({extended:true}));
const db=new pg.Client({
    host:"localhost",
    port:5433,
    database:"finance_tracker",
    user:"postgres",
    password:"shiny"


});
db.connect().then(()=>{
    console.log("database Connected");
});

app.get("/",(req,res)=>{
    res.send("Hello Shiny");
});

app.post("/add",async(req,res)=>{
    const data=req.body;
    await db.query(`INSERT INTO history(description,mode,amount) values($1,$2,$3)`,[data.description,data.mode,data.amount])
    res.status(201).send("Record Inserted successfully");
});
app.get("/transactions",async(req,res)=>{
    const result=await db.query(
        "SELECT * from history"
    );
    res.send(result.rows);
})

app.listen(3001,()=>{
    console.log("Server started at port 3001");
});