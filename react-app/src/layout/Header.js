
const Header = function({user}){
  const userStyle = {
    background: '#393939',
    alignItems: 'center',
    display: 'flex',
    borderRadius: '40px',
    margin: '-5px',
    padding: '3px',
    paddingRight: '20px',
  }
  console.log(user , "<<UER")
  return( 
  
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
  <div className="container-fluid">
    <a className="navbar-brand" href="/">Chat Now</a>
    <div>
      <div className="d-flex" style={userStyle}>
        
          <div className="" style={{width:"50px"}}>
                <img alt="user" className="rounded-circle" style={{width: "50px", height:"50px"}} src={user?.avatar} />
            </div>
            <div className="w-75 ps-2">
                <p className="mb-0 text-white" style={{ fontSize:"14px",lineHeight:"0px" }}>{user?.name}</p>
                
            </div>
        
      </div>
    </div>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarText">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item pt-2">
          <span className="badge bg-info ">5% Memory used</span>
        </li>
        <li className="nav-item">
          <a className="nav-link active" aria-current="page" href="/help">Help</a>
        </li>
        
        
      </ul>
      <span className="navbar-text">
        A app to chat with anyone as anonymous
      </span>
    </div>
  </div>
</nav>
 )


}
export default Header