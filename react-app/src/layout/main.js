import { useEffect, useState } from 'react';
import Header from './Header';
import UsersList from './usersList';
import ChatScreen from './ChatScreen'; 
import Footer from './Footer'; 

let wsc = new WebSocket("ws://192.168.70.232:2212")

wsc.addEventListener("open", (e) =>{
  console.log("open")
  let peerID = localStorage.getItem( "peerID" );
  console.log( peerID, "<<PEER ID" )
  if(peerID && typeof peerID !== 'undefined' ){
    wsc.send(JSON.stringify({"type":"reJoin","id":peerID}));
  }else{
    wsc.send(`{"type":"join"}`);
  }

  
});

const Main = ()=>{
    let [ peers, setPeers ] = useState( [] );
    let [ userName, setUserName ] = useState( "" );
    useEffect( () => {
        
        

        wsc.addEventListener("message",function({data}){
          try{
            let dataObj = JSON.parse(  data );
            console.log( dataObj)
            if(dataObj.type === "accept" ){
              console.log( dataObj.id , typeof dataObj.id, "<<ID" )
              localStorage.setItem( "peerID", dataObj.id )
              setUserName(dataObj?.user?.name)
            }else if( dataObj.type === "peers" ){
              setPeers( dataObj.peers )
            }
            
            
          }catch( e ){
            console.log( e )
          }
          
        })
    }, [] )
  

    return(  <>
    <Header />
<div className='container-fluid'>
<div className='row' style={{height:'calc(100vh - 56px)'}}>
  <div className='col-4 h-100 p-1 pe-0'>
    <UsersList peers={peers}  />
  </div>
  <div className='col-8  h-100 bg-success'>
  
<ChatScreen userName={userName} />
  </div>
  </div>
</div>
<Footer /></> )
}
export default Main