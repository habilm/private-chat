import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Header from './layout/Header';
import UsersList from './layout/usersList';
import ChatScreen from './layout/ChatScreen'; 
import Footer from './layout/Footer'; 
import reportWebVitals from './reportWebVitals';


let wsc = new WebSocket("ws://192.168.1.46:2212")

wsc.addEventListener("open", (e) =>{
  
  let peerID = localStorage.getItem( "peerID" );
  console.log( peerID, "<<PEER ID" )
  if(peerID && typeof peerID !== 'undefined' ){
    wsc.send(JSON.stringify({"type":"reJoin","id":peerID}));
  }else{
    wsc.send(`{"type":"join"}`);
  }

  wsc.addEventListener("message",function({data}){
    try{
      let dataObj = JSON.parse(  data );
      console.log( dataObj)
      if(dataObj.type === "accept" ){
        console.log( dataObj.id , typeof dataObj.id, "<<ID" )
        localStorage.setItem( "peerID", dataObj.id )
      }else if( dataObj.type === "peers" ){
        
      }
      
      
    }catch( e ){
      console.log( e )
    }
    
  })
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Header />
    <div className='container-fluid'>
    <div className='row' style={{height:'calc(100vh - 56px)'}}>
      <div className='col-4 h-100 p-1 pe-0'>
        <UsersList  />
      </div>
      <div className='col-8  h-100 bg-success'>
      
    <ChatScreen />
      </div>
      </div>
    </div>
    <Footer />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
