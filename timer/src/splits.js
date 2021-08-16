
function Split(props){
    return(
        <div className="splitRow">
            <div className="splitNumber">{props.number+1}.</div>
            <div className="splitID">#{props.id}</div>
            <div className="splitTime">{props.time}</div>
        </div>
    )
}

export default Split;