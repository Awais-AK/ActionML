var express = require('express');
// var bodyParser = require('body-parser');
var app = express();
var request = require("request")
app.set('view engine','ejs');

app.get('/actionML',function(req,res){
    res.render('index',{qs:req.query});
});

// -> events

var data1 = { 
    "event": "read",
    "entityType": "user",
    "entityId": "Rando Norris",
    "targetEntityType": "item",
    "targetEntityId": "6575",
    "eventTime": "2019-10-05T21:02:49.228Z",  
}

url = "http://localhost:9090/engines/tp_ur/events"

request({
    url: url,
    method: "POST",
    headers: {
        "content-type": "application/json",
        },
    json: data1,
}, function (error, response, body) {
    if (!error && response.statusCode === 201) { // created
        console.log(body)
        console.log("response.statusCode: " + response.statusCode)
        console.log("response.statusText: " + response.statusMessage)
    }
    else {

        console.log("error: " + error)
        console.log("response.statusCode: " + response.statusCode)
        console.log("response.statusText: " + response.statusMessage)
    }
})

data2 = {
    "event": "$set",
    "entityItem": "item",
    "entityId": ["54523","6868"],   
    "properties": {
         "category" : ["elctronics", "covid"]
     },
     "eventTime": "2019-10-05T21:02:49.228Z" 

}

request({
    url: url,
    method: "POST",
    headers: {
        "content-type": "application/json",
        },
    json: data2,
}, function (error, response, body) {
    if (!error ) { 
        console.log(body)
        console.log("response.statusCode: " + response.statusCode)
        console.log("response.statusText: " + response.statusMessage)
    }
    else {

        console.log("error: " + error)
        console.log("response.statusCode: " + response.statusCode)
        console.log("response.statusText: " + response.statusMessage)
    }
})


// -> Empty json for training
var time = 0;
var timer = setInterval(function(){
    console.log(time + "seconds ")
    time += 3;
    request({
        url: "http://localhost:9090/engines/tp_ur/jobs",
        method: "POST",
        json: {},
    }, function (error, response, body) {
        if (!error ) {
            console.log(body)
            console.log("response.statusCode: " + response.statusCode)
            console.log("response.statusText: " + response.statusMessage)
        }
        else {
    
            console.log("error: " + error)
        }
    })    
},3000);

// -> Query 

request({
    url: "http://localhost:9090/engines/tp_ur/queries",
    method: "POST",
    json: {
        "user" : "Spark job"
    },
}, function (error, response, body) {
    if (!error ) {
        console.log(body)
        console.log("response.statusCode: " + response.statusCode)
        console.log("response.statusText: " + response.statusMessage)
    }
    else {

        console.log("error: " + error)
    }
})



app.listen(3000);

