var express = require('express');
var app = express();
var request = require("request")

app.get('/reportview',function(req,res){  // <- Recieve request like http://localhost:3000/reportview?userId=3123&page=44342
    console.log(req.query);
    var isoDate = new Date().toISOString()
    console.log(isoDate);
    //events

    var data1 = { 
        "event": "read",
        "entityType": "user",
        "entityId": "Rando Norris",
        "targetEntityType": "item",
        "targetEntityId": req.query.page,
        "eventTime": isoDate,  
    }

    console.log(data1);

    url = "http://localhost:9090/engines/test/events"

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

    var data2 = {
        "event": "$set",
        "entityItem": "item",
        "entityId": req.query.page,  
        "properties": {
             "category" : ["elctronics","covid"]
         },
         "eventTime": isoDate
    }

    console.log(data2);

    request({
        url: url,
        method: "POST",
        headers: {
            "content-type": "application/json",
            },
        json: data2,
    }, function (error, response, body) {
        if (!error ) { // created
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


    // -> Train before query

    request({
        url: "http://localhost:9090/engines/test/jobs",
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
    });

    // -> Query 

    request({
        url: "http://localhost:9090/engines/test/queries",
        method: "POST",
        json: {
            "user" : "Rando Norris"
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
    res.end(JSON.stringify(data1)+JSON.stringify(data2));
});

// -> Empty json for training
var time = 0;
var timer = setInterval(function(){
    console.log(time + "seconds ")
    time += 3;
    request({
        url: "http://localhost:9090/engines/test/jobs",
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


app.listen(3000);

