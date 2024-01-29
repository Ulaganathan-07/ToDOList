const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');


require("dotenv").config();

const app = express();
const port = process.env.PORT || 6001;

app.set('view engine','ejs');
app.use(express.static('public'));
app.use(cors());

const sqlServer = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database : "To_Do_Lists"
})

app.use(express.json());

app.get("/retrieveTasks",(req,res) =>{
    sqlServer.getConnection((err,connection) => {
        connection.release();
    if(err){
        console.log("Error in the connection");
    }
    else{
     connection.query("select * from Tasks;",(error,response) =>{
        if(error){
            console.log("Error in the query statement");
        }
        else{
            res.json(response);
        }
     })   
    }
  })
})

app.post("/deleteTask",(req,res) =>{
   let query = "delete from Tasks where T_No = " + req.body.ID;
    sqlServer.getConnection((err,connection) => {
    connection.release();
    if(err){
        console.log("Error in the connection");
    }
    else{
     connection.query(query,(error,response) =>{
        if(error){
            console.log("Error in the query statement");
        }
        else{
            res.json({task: "done"});
        }
     })   
    }
  })
})

app.listen(port, () => console.log("Server is running in the port : " + port));