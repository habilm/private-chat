import express from "express";

import  * as WebSocket from "ws";

import avatars from "./userAvatar.js"

let wss =  new WebSocket.WebSocketServer({port: 2212})
let peers = [];


wss.on( "connection", function( ws ){

    wss.clients.forEach( client => {
        if( 1 ){
            let {id, name, avatar } = peers
            client.send( JSON.stringify( { peers: peers.map( v => {
                return {
                    id: v.id,
                    name : v.name,
                    avatar: v.avatar
                }
            } ) , ...{ type: "peers" } } ) )
        }
        
    } )

    ws.on( "message",function(data ){
      
        try{
            let message = JSON.parse(data)
            console.log( message )
            
            if( message.type == "join" ){
                let mathRand = Math.random();
                let rand = parseInt( mathRand * 10 )
                let id  = parseInt( mathRand* 10000);
               
                let oldIndex =peers.findIndex( v => v.ws == ws );
                
                if( oldIndex >= 0 ){
                    delete peers[oldIndex]
                }

                peers.push( {...avatars[ rand ], ...{id, ws} } );
                
                ws.send( JSON.stringify( {...avatars[ rand ], ...{id,type:"accept"}} ) )
            }else if( message.type == "reJoin") {

                let user = peers.find( v => v.id == message.id )
                if( ! user ){
                    let mathRand = Math.random();
                    let rand = parseInt( mathRand * 10 )
                    let id  = parseInt( mathRand* 10000);

                    let oldIndex =peers.findIndex( v => v.ws == ws );
                    console.log( oldIndex )
                    if( oldIndex >= 0 ){
                        delete peers[oldIndex]
                    }

                    peers.push( {...avatars[ rand ], ...{id, ws} } );
                    ws.send( JSON.stringify({user, ...{id,type:"accept"} }) );
                }else{
                    ws.send( JSON.stringify({user, ...{id:message.id,type:"accept"} }) );
                }
                

            }
        }catch(e){
            console.log(e , "<<ERROR" )
        }
        
    } )

    ws.on("close", () => {
        console.log("the client has disconnect");
    });
} )


let app = express();

app.use( "/", express.static("./react-app/build/") )

app.get( "/chat",function(req,res){
    res.send( "Chat now" );
} )

app.listen( 2121, function(){
    console.log( "Chat now" );
} )