import React from 'react';

class GameComponent extends React.Component{

    constructor(){
        super();
        this.state = {
            update : false,
            gameover : false,
            gameWon : false
        }
    }

    handleClick = (e) => {
      e.preventDefault();
      e.target.classList.toggle('isActive');
      let totalActiveSpans = document.querySelectorAll('.isActive').length;
      if(totalActiveSpans === 0){
          this.setState({
              ...this.state,
              gameWon : true
          })
      }
    }
    
    componentDidMount(){
        let totalSpans = this.props.cols * this.props.cols;
        let spans = document.querySelectorAll('.element');
        let randoms = Array.from({length : this.props.colored},() => Math.floor(Math.random()*totalSpans))
        randoms.forEach(function(item){
            spans[item].classList.add('isActive')
        })
        this.setState({
            ...this.state,
            update : true
        })
    }

    componentDidUpdate(){
        if(!this.state.gameWon){
            let totalSpans = this.props.cols * this.props.cols;
            let spans = document.querySelectorAll('.element');
            var that = this;
            var interval = setInterval(function(){
                if(document.getElementsByClassName('isActive').length === totalSpans){
                    that.setState({
                        ...that.state,
                        gameover : true
                    })
                }
                else {
                    let randomSpans = Math.floor(Math.random()*totalSpans);
                    let randoms = Array.from({length : randomSpans},() => Math.floor(Math.random()*totalSpans));
                    randoms.forEach(function(item){
                       if(!(spans[item].classList.contains('isActive'))){
                        spans[item].classList.add('isActive');
                       }
                    });
                }
                
            },this.props.time)
        }

        if(this.state.gameover || this.state.gameWon){
            clearInterval(interval)
        }
        
    }

    render(){
        let columns = this.props.cols;
        return(
            
                this.state.gameover ? <div>Game Over</div> : 
                this.state.gameWon ? <div>Congratulations.. You Won..!!</div> : 
                <div className="mainDiv">
                {Array.from({length:columns}, (e, i) => {
                    return <div key={i} className="row">{
                         Array.from({length:columns},(e,i) => {
                            return <span key={i} className="element" onClick={this.handleClick}></span>
                         })
                         }</div>
                }
                )}
               </div>
            
        )
    }
}

export default GameComponent;