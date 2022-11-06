import express from "express";


let app = express();

app.use( "/", express.static("./react-app/build/") )

app.get( "/chat",function(req,res){
    res.send( "Chat now" );
} )



app.listen( 2121, function(){
    console.log( "Chat now" );
} )