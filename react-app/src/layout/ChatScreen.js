
const Footers = ( {userName}) =>{
    return (<div>
        <div className="row border-b-1 py-3" style={{backgroundColor: "#3a3a3a" }}>
            <div className="col-6">{userName}</div>
            <div className="col-6 text-end">
                Online
            </div>
        </div>
    </div>)
}
export default Footers