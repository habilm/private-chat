
const ChatScreen = ( {peers}) =>{

console.log( peers , "PEERs" )
    return (
        <div className="w-100" >
            { peers.map( ( item ) => {
                if( item == null ) return;
            return (<a key={item.id} href="/" style={{borderBottom:"1px solid rgb(72 72 72) "}} className="d-flex ps-2 w-100 text-decoration-none align-items-center py-2">
                <div className="" style={{width:"50px"}}>
                    <img alt="user" className="rounded-circle" style={{width: "50px", height:"50px"}} src={item?.avatar} />
                </div>
                <div className="w-75 ps-2">
                    <p className="mb-0 text-white" style={{ fontSize:"14px",lineHeight:"0px" }}>{item?.name}</p>
                    <span className="" style={{ fontSize:"12px", color: "#838383" }}>Hi there. How are You {item?.id}</span>
                    
                </div>
            </a> ) }  ) }
        </div>
      )
}
export default ChatScreen