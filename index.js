let express = require("express");
let app = express();
let fs = require("fs");
let bodyparser = require("body-parser");
const { json } = require("body-parser");



app.use(bodyparser.json({limit:'50mb'}));
app.use(bodyparser.urlencoded({limit:'50mb', express: true}));
app.use(express.json());

app.get("/", (req, res)=>{
    res.end("WelCome to API");
})

app.get("/user", (req, res)=>{
    let users = JSON.parse(fs.readFileSync("users.json").toString());
    res.end(JSON.stringify({data:users}));
})

app.get("/user/:id", (req, res)=>{
    let users = JSON.parse(fs.readFileSync("users.json").toString());
    res.end(JSON.stringify({data:users["user" + req.params.id]}));
   
})

app.post("/user", (req, res)=>{
    let body = req.body;
    let users = JSON.parse(fs.readFileSync("users.json").toString());
    users["user" + req.body.id] = body;
    fs.writeFileSync("users.json", JSON.stringify(users));
    res.end(JSON.stringify({status:"success"}));
})
app.put("/user/:id", (req, res)=>{
    let body = req.body;
    let users = JSON.parse(fs.readFileSync("users.json").toString());
    users["user" + req.params.id] = body;
    fs.writeFileSync("users.json", JSON.stringify(users));
    res.end(JSON.stringify({status:"success"}));
})
app.delete("/user/:id", (req, res)=>{
    let body = req.body;
    let users = JSON.parse(fs.readFileSync("users.json").toString());
    delete users["user" + req.body.id]
    fs.writeFileSync("users.json", JSON.stringify(users));
    res.end(JSON.stringify({status:"success"}));
})

app.listen(8081, ()=>{
    console.log("API running on http://localhost:8081/");
})
