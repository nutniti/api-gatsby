const dotenv = require("dotenv")
dotenv.config()

const {MongoClient, CURSOR_FLAGS} = require('mongodb');

var url = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/`


var express = require("express");
var app = express();
var port = 3000;
var bodyParser = require("body-parser")

 
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
  });
 
app.use(bodyParser.urlencoded({extended: false})) //Post Body Parser


app.post("/action", (req, res) => {

  MongoClient.connect(url,function(err,client){
    if (err) throw err;
    var db = client.db('gatsby');

    const data = { email: req.body.email , name: req.body.name , topic :req.body.topic };
    // Find some documents in our collection
    db.collection('chat').insertOne(data, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      client.close();
    });
    
    // Declare success
});


});



app.listen(port, () => {
  console.log("Server listening on port " + port);
});