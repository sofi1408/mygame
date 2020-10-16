import React from 'react';
import GameComponent from './GameComponent'

class GameInput extends React.Component{
    constructor(){
        super();
        this.state={
            noOfCols : null,
            colored : null,
            time : null,
            displayGame : false
        }
        this.totalRef = React.createRef();
        this.coloredRef = React.createRef();
        this.timeRef = React.createRef();
    }

    handleSubmit = (e) => {
       e.preventDefault();
       if(this.timeRef.current.value > 5 || this.timeRef.current.value < 1){
           alert("Please enter correct time value between 1 and 5");
           return;
       }
       if(this.totalRef.current.value > 2000 || this.totalRef.current.value < 1 ){
           alert("Total boxes value should be between 1 and 2000");
           return;
       }
       if(this.coloredRef.current.value > (this.totalRef.current.value * this.totalRef.current.value - 1) ){
           alert("Please enter correct value for colored boxes");
           return;
       }
       this.setState({
           ...this.state,
           noOfCols : this.totalRef.current.value,
           colored : this.coloredRef.current.value,
           time : this.timeRef.current.value*1000,
           displayGame : true
       })
    }

    render(){
        return(
            
            
                this.state.displayGame ? 
                <GameComponent 
                cols={this.state.noOfCols} 
                colored = {this.state.colored}
                time = {this.state.time} />

                :
            <>   
            <label>Total Boxes : </label>
            <input type="text" className="totalBoxes" ref={this.totalRef}/>
            <label>Colored Boxes : </label>
            <input type="text" className="coloredBoxes" ref={this.coloredRef}/>
            <label>Select Time : </label>
            <input type="text" className="time" ref={this.timeRef}/>
            <button type="submit" onClick={this.handleSubmit}>Submit</button>
            </>
            
        )
    }
}

export default GameInput;