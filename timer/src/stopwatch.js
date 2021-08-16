import React from "react"
import Split from "./splits"
class Time extends React.Component{
    constructor(props){
        super(props)
        this.state = {time:props.lasttime,parsedTime:0}
        this.parseSecToFormat = this.parseSecToFormat.bind(this);
    }
    componentDidMount(){
        this.timerID = setInterval(()=>this.IncreaseTime(),10)
    }
    parseSecToFormat(){
        var milisec = this.state.time % 100;
        var sec = parseInt(this.state.time / 100);
        var min = parseInt(this.state.time / (1000*60));
        var hour = parseInt(this.state.time / (1000*60*60));
        milisec = milisec < 10 ? "0"+milisec : milisec; 
        sec = sec < 10 ? "0"+sec : sec;
        min = min < 10 ? "0"+min : min;
        const parsed = hour+":"+min+":"+sec+"."+milisec;
        this.setState({
            parsedTime:parsed
        })
    }
    IncreaseTime(){
        this.setState({
            time:this.state.time+1
        })
        this.parseSecToFormat()
    }
    componentDidUnMount(){
        clearInterval(this.timerID);
    }
    componentWillUnmount(){
        clearInterval(this.timerID);
        return
    }
    render(){
        return(
            <span id="timeCount">
                {this.state.parsedTime}
            </span>
        )
    }
}




class StopWatch extends React.Component{
    constructor(props){
        super(props)
        this.toggleStopWatch = this.toggleStopWatch.bind(this);
        this.resetStopWatch = this.resetStopWatch.bind(this);
        this.makeSplit = this.makeSplit.bind(this);
        this.state = {isStarted:false, timer:null, lastTime:0,lastParsedTime:"0:00:00.00",splits:[]}
        this.lastSplitNumber = 0;
    }
    makeSplit(){
        this.state.splits.push(<Split number={this.lastSplitNumber++} id={parseInt(Math.random()*10000+1000)} time=
        {
            this.state.isStarted ? document.getElementById("timeCount").innerHTML : this.state.lastParsedTime
        }
        key={Math.random()*10}/>)
        const newSplits = this.state.splits
        this.setState({
            splits:newSplits
        })
    }
    fetchTime(data){
        const arr = data.split(":")
        const last = arr[2].split(".")
        const newarr = arr.map((e) => (parseInt(e))).slice(0,arr.length-1).concat(last.map((e) => parseInt(e)))
        return parseInt(newarr[0]*60*60*1000+newarr[1]*60*1000+newarr[2]*100+newarr[3])
    } 
    resetStopWatch(){
         this.setState({
             lastTime: 0,
             lastParsedTime: "0:00:00.00"
         });
    }
    toggleStopWatch(){
        this.setState({
            isStarted:!this.state.isStarted,
            lastTime: this.state.isStarted ? this.fetchTime(document.getElementById("timeCount").innerHTML) : this.state.lastTime,
            lastParsedTime:this.state.isStarted ? document.getElementById("timeCount").innerHTML : this.state.lastParsedTime
        });
    }
    render(){
        return(
        <div className="timer">
            <div className="container">
                <div className="timerCounter">
                    {
                        this.state.isStarted ? <Time lasttime={this.state.lastTime}/> : this.state.lastParsedTime
                    }
                    s
                </div>
                <div className="buttons">
                    <div className={"toggleButton "+ (this.state.isStarted ? "started" : "")} onClick={this.toggleStopWatch} defaultChecked={this.state.isStarted}>
                        {!this.state.isStarted ? this.state.lastTime > 0 ? "Continue" : "Start" : "Pause"}
                    </div>
                    <div className="splitButton" onClick={this.makeSplit}>Split</div>
                    <div className="resetButton" onClick={this.resetStopWatch}>Reset</div>

                </div>

                <hr width="80%" color="black"/>
                <div className="lastsplits">
                    Last splits:
                    {this.state.splits.map(split=>(split))}
                </div>
            </div>
        </div>
        )



    }



}

export default StopWatch;