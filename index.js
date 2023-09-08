const express = require("express");
const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;
const app = express();
var cors = require("cors");
require('dotenv').config();
const PORT = 5000;
app.use(express.json());
app.use(cors());
const MONGO_URL = process.env.MONGO_URL;
 "mongodb://127.0.0.1:27017";
// "mongodb://127.0.0.1:27017";
// "mongodb://localhost:27017";

let db;

const users = [
  {
    name: "john",
    age: 20
  },
  {
    name: "peter",
    age: 30
  },
  {
    name :"sam",
    age: 25
  }
];

// 

app.get('/', function (req, res) {
  res.send("Hello World");
});

app.get('/userList', function (req, res) {
  res.send(users);
});

//to get location
app.get('/locationList', function (req, res) {
  db.collection("location").find().toArray((err, result) =>{
    if(err) console.log("error");
    res.send(result);
  });
});

//to get mealtypes
app.get('/QuickSearch', function (req, res) {
  db.collection("mealType").find().toArray((err, result) =>{
    if(err) console.log("error");
    res.send(result);
  });
});

//to get restaurant types with state id and meal id
app.get('/RestaurantData', function (req, res) {
  let query = {};
  let stateId = Number(req.query.state_id);
  let mealId = Number(req.query.mealId);
  if (stateId) {
    query = { state_id: stateId };
  } else if (mealId) {
    query = { "mealTypes.mealtype_id": mealId };
  }
  db.collection("restaurant").find(query).toArray((err, result) =>{
    if(err) throw err;
    res.send(result);
  });
});

//to get filter
app.get("/filter/:mealId", function (req, res) {
  let query = {};
  let mealId = Number(req.params.mealId);
  let cuisineId = Number(req.query.cuisineId);
  let lcost = Number(req.query.lcost);
  let hcost = Number(req.query.hcost);
  let sort = {cost : 1};
  // 1 => ascending , -1 => descending
  if (req.query.sort){
    sort = {cost : req.query.sort};
  }
  if (cuisineId) {
    query = { 
      "mealTypes.mealtype_id": mealId ,
      "cuisines.cuisine_id" : cuisineId,
    };
  }
  else if (lcost && hcost){
    query = {
      "mealTypes.mealtype_id": mealId ,
      $and: [{ cost:{$gt: lcost , $lt: hcost}}]
    }
  }
  // else if (cuisineId && lcost && hcost){
  //   query = {
  //     "mealTypes.mealtype_id": mealId ,
  //     "cuisines.cuisine_id" : cuisineId,
  //     $and: [{ cost:{$gt: lcost , $lt: hcost}}]
  //   }
  // }
  db.collection("restaurant")
  .find(query)
  .sort(sort)
  .toArray((err, result) =>{
    if(err) throw err;
    res.send(result);
  });
});

//details

app.get("/details/:id", function (req,res){
    let id = Number(req.params.id);

  db.collection("restaurant").find({restaurant_id:id}).toArray((err, result) => {
    if(err) throw err;
    res.send(result);
  })
})


//restaurant menu

app.get("/menu/:id", function (req,res){
  let id = Number(req.params.id);

db.collection("menu")
.find({restaurant_id:id})
.toArray((err, result) => {
  if(err) throw err;
  res.send(result);
})
})

//menu details

app.post("/menuItems", express.json(),function (req,res){
  if (Array.isArray(req.body)){
    db.collection("menu")
    .find({menu_id : {$in: req.body }})
    .toArray((err, result) => {
    if(err) throw err;
    res.send(result);
    });
  }
  else {
    res.send("Invalid Input");
  }
})


//orders

app.get("/orders" , function (req, res) {
  let query = {}
  let email = req.query.email;
  if(email){
      query = {email};
  }

  db.collection("orders")
  .find(query).
  toArray((err,result) => {
    if (err)
    throw err;
    res.send(result);
  });
});

//place orders

app.post("/ordersPlaced",function(req,res){
  
  console.log(req.body);

  db.collection("orders")
  .insertOne(req.body,(err,result) =>{
    if (err)
    throw err;
    res.send("order placed successfully!!!!");
  });
});

//update placed orders

app.put("/updateOrder/:id" , function(req,res) {

  let oId = Number(req.params.id);

  db.collection("orders").updateOne(
      {orderId : oId},
      {
        $set: {
          status: req.body.status,
          bank_name : req.body.bank_name,
          date : req.body.date,
        },
      },
      (err, result) => {
        if(err) throw err;
        res.send("Order Updated Successfully");
      });
});


//delete orders

app.delete("/deleteOrder/:id" , function(req,res) {

  let oId = Number(req.params.id);

  db.collection("orders").deleteOne(
      {orderId : oId},
      (err, result) => {
        if(err) throw err;
        res.send("Order deleted Successfully");
      });
});

//to get mongodb connection
MongoClient.connect(MONGO_URL, (err, client) => {
  console.log("Mongodb is connected");
  if (err) console.log("Error while connecting");
  db = client.db("ed-may-intern");
  app.listen(PORT, () => console.log("Server started on the port", PORT));
});

