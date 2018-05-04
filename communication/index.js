var express = require("express");
var app = express();
var port = 4500;
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
var SerialPort = require('serialport');
var hexToDec = require('hex-to-dec');
const readline = require('readline');
const Readline = SerialPort.parsers.Readline;
const parser = new Readline('\r\n');

var serialport = new SerialPort('COM25', {
    baudRate: 250000,

});
serialport.pipe(parser);



var mongoose = require("mongoose");
mongoose.Promise = global.Promise;mongoose.connect("mongodb://localhost:27017/node-demo");

var captSchema = new mongoose.Schema({
    temperature: Number,
    rain:Number,
    humidity: Number,
    outdoor:Number,
    indoor:Number,
    alarm:Number,
    coffer:Number,
    light:Number,
    Terasse:Number,
    window:Number
   });

var Capteur = mongoose.model("Capteur", captSchema);

app.get("/addcapt", (req, res) => {
   Capteur.findById('5ab6ddc71274641be4b5e0cd', function(err, ress) {
    try {
        res.json(ress)
        console.log(typeof(ress.ValueCapt));
    console.log("----------")
    } catch (err) {
          console.log (err);
     }
   })
});


app.get("/actionFromIonic", (req, res) => {
    try {
        //console.log(req.query);
        if(Object.keys(req.query)[0] === 'indoor'){
            
            if(req.query[Object.keys(req.query)[0]] == 1){
                //console.log(req.query[Object.keys(req.query)[0]] == 1)
                    serialport.write("OPENINDOOR", function(err, results) {
                        if(err)console.log('err ' + err);
                        else console.log('results ' + results);
                    });
            }
            if(req.query[Object.keys(req.query)[0]] == 0){
                //console.log(req.query[Object.keys(req.query)[0]] == 0)
                    serialport.write("CLOSEINDOOR", function(err, results) {
                        if(err)console.log('err ' + err);
                        else console.log('results ' + results);
                    });
            }
            
        }
        if(Object.keys(req.query)[0] === 'outdoor'){
            
            if(req.query[Object.keys(req.query)[0]] == 1){
                //console.log(req.query[Object.keys(req.query)[0]] == 1)
                    serialport.write("OPENOUTDOOR", function(err, results) {
                        if(err)console.log('err ' + err);
                        else console.log('results ' + results);
                    });
            }
            if(req.query[Object.keys(req.query)[0]] == 0){
                //console.log(req.query[Object.keys(req.query)[0]] == 0)
                    serialport.write("CLOSEOUTDOOR", function(err, results) {
                        if(err)console.log('err ' + err);
                        else console.log('results ' + results);
                    });
            }
            
        }
        if(Object.keys(req.query)[0] === 'coffre'){
            
            if(req.query[Object.keys(req.query)[0]] == 1){
                //console.log(req.query[Object.keys(req.query)[0]] == 1)
                    serialport.write("HIDE", function(err, results) {
                        if(err)console.log('err ' + err);
                        else console.log('results ' + results);
                    });
            }
            if(req.query[Object.keys(req.query)[0]] == 0){
                //console.log(req.query[Object.keys(req.query)[0]] == 0)
                    serialport.write("SHOW", function(err, results) {
                        if(err)console.log('err ' + err);
                        else console.log('results ' + results);
                    });
            }
            
        }

        if(Object.keys(req.query)[0] === 'alarm'){
            
            if(req.query[Object.keys(req.query)[0]] == 1){
                //console.log(req.query[Object.keys(req.query)[0]] == 1)
                    serialport.write("ALARMON", function(err, results) {
                        if(err)console.log('err ' + err);
                        else console.log('results ' + results);
                    });
            }
            if(req.query[Object.keys(req.query)[0]] == 0){
                //console.log(req.query[Object.keys(req.query)[0]] == 0)
                    serialport.write("ALARMOFF", function(err, results) {
                        if(err)console.log('err ' + err);
                        else console.log('results ' + results);
                    });
            }
            
        }
        if(Object.keys(req.query)[0] === 'light'){
            
            if(req.query[Object.keys(req.query)[0]] == 1){
                //console.log(req.query[Object.keys(req.query)[0]] == 1)
                    serialport.write("LIGHTON", function(err, results) {
                        if(err)console.log('err ' + err);
                        else console.log('results ' + results);
                    });
            }
            if(req.query[Object.keys(req.query)[0]] == 0){
                //console.log(req.query[Object.keys(req.query)[0]] == 0)
                    serialport.write("LIGHTOFF", function(err, results) {
                        if(err)console.log('err ' + err);
                        else console.log('results ' + results);
                    });
            }
            
        }

            if(Object.keys(req.query)[0] === 'window'){
            //console.log(req.query[Object.keys(req.query)[0]] == 1)
                serialport.write("WINDOW"+('000' + req.query[Object.keys(req.query)[0]]).substr(-3), function(err, results) {
                    if(err)console.log('err ' + err);
                    else console.log('results ' + results);
                });
        
            }
            if(Object.keys(req.query)[0] === 'light'){
                //console.log(req.query[Object.keys(req.query)[0]] == 1)
                    serialport.write("LIIGHT"+('000' + req.query[Object.keys(req.query)[0]]).substr(-3), function(err, results) {
                        if(err)console.log('err ' + err);
                        else console.log('results ' + results);
                    });
            }
            if(Object.keys(req.query)[0] === 'terass'){
            console.log("TERASS"+('000' + req.query[Object.keys(req.query)[0]]).substr(-3))
                serialport.write("TERASS"+('000' + req.query[Object.keys(req.query)[0]]).substr(-3), function(err, results) {
                    if(err)console.log('err ' + err);
                    else console.log('results ' + results);
                });
            }
        res.send("ok")
        // serialport.write(req.query);
        
    } catch (err) {
        console.log(err)
        res.send(err)
    }
 });
app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html");
   });
    
   app.listen(port, () => {
    console.log("Server listening on port " + port);
   });

//Serial from Arduino
serialport.on('data', (data)=>{
    try{
        console.log( JSON.parse(data.toString()));
        var structuredData = JSON.parse(data.toString());
        //5ab6ddc71274641be4b5e0cd
        //var myData = new Capteur(structuredData);
        Capteur.findOneAndUpdate({_id : "5ab6ddc71274641be4b5e0cd"}, {
            ...structuredData
        } ,{
            new : true
        },(err, todo) => {
        // Handle any possible database errors
            if (err) {
                console.log(err) 
            }
            else{
                console.log("success")
            }
        })
    }
    catch(err){
      ;
    }
});

serialport.on('open', function(){
  console.log('Serial Port Opend'); 
});

