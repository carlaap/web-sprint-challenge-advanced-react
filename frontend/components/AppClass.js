import React from 'react'
import axios from 'axios'

const url = `http://localhost:9000/api/result`

export default class AppClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    x: 2,
    y: 2,
    youMoved: 0,
    currentIdx: 4,
    errorMessage: "",
    stepMessage: "You moved 0 times",
    grid: ['','','','','B','','','',''],
    email: "",
  }
  
    
  }
//email
  handleInput = (e) => {
    e.preventDefault();
    this.setState({ ...this.state, email: [e.target.value]})

  };

  getStepMessage() {
    let newStepMessage = `You moved ${this.state.youMoved + 1} time` 
    if (this.state.youMoved +1 !==1) {
      newStepMessage = newStepMessage + 's'
    }
    return newStepMessage
  }

  handleDirectionalInput = async (e) => {
    e.preventDefault();
    switch (e.target.id) {
      case "up":
        if(this.state.y > 1) {
          document.getElementById("grid").children[
            this.state.currentIdx
          ].classList = "square";
          document.getElementById("grid").children[
            this.state.currentIdx - 3
          ].classList += " active";
          document.getElementById("grid").children[
            this.state.currentIdx
          ].textContent = "",
          document.getElementById("grid").children[
            this.state.currentIdx - 3
          ].textContent = "B";
          this.setState({
            ...this.state,
            y:this.state.y - 1,
            youMoved: this.state.youMoved + 1,
            currentIdx: this.state.currentIdx - 3,
            stepMessage: this.getStepMessage()
          });
          } else {
            this.setState({ ...this.state, errorMessage: "You can't go up" });
          }
          break;
          case "down":
            if (this.state.y < 3) {
              document.getElementById("grid").children[
                this.state.currentIdx
              ].classList = "square";
              document.getElementById("grid").children[
                this.state.currentIdx + 3
              ].classList += " active";
              document.getElementById("grid").children[
                this.state.currentIdx
              ].textContent = "";
              document.getElementById("grid").children[
                this.state.currentIdx + 3
              ].textContent = "B";
              this.setState({
                 ...this.state,
                 y: this.state.y + 1,
                 youMoved: this.state.youMoved + 1,
                 currentIdx: this.state.currentIdx + 3,
                 stepMessage: this.getStepMessage()
              });
            } else {
              this.setState({ ...this.state, errorMessage: "You can't go down" });
            }
             break;
            case "left":
            if (this.state.x > 1) {
              document.getElementById("grid").children[
                this.state.currentIdx
              ].classList = "square";
              document.getElementById("grid").children[
                this.state.currentIdx -1 
              ].classList += " active";
              document.getElementById("grid").children[
                this.state.currentIdx
              ].textContent = "";
              document.getElementById("grid").children[
                this.state.currentIdx - 1
              ].textContent = "B";
              this.setState({
                 ...this.state,
                 x: this.state.x - 1,
                 youMoved: this.state.youMoved + 1,
                 currentIdx: this.state.currentIdx - 1,
                 stepMessage: this.getStepMessage()
              });
            } else {
              this.setState({ ...this.state, errorMessage: "You can't go left" });
        }
        break
        case "right":
          if (this.state.x < 3) {
            document.getElementById("grid").children[
              this.state.currentIdx
            ].classList = "square";
            document.getElementById("grid").children[
              this.state.currentIdx + 1 
            ].classList += " active";
            document.getElementById("grid").children[
              this.state.currentIdx
            ].textContent = "";
            document.getElementById("grid").children[
              this.state.currentIdx + 1
            ].textContent = "B";
            this.setState({
               ...this.state,
               x: this.state.x + 1,
               youMoved: this.state.youMoved + 1,
               currentIdx: this.state.currentIdx + 1,
               stepMessage: this.getStepMessage()
            });
          } else {
            this.setState({ 
              ...this.state, 
            errorMessage: "You can't go right",
            });
    }
    break;
    default:
    break;
  }
};

//reset
  handleReset = (e) =>  {
    document.getElementById("grid").children[
      this.state.currentIdx
    ].classList = "square";
    document.getElementById("grid").children[4].classList = "square active";
    document.getElementById("grid").children[
      this.state.currentIdx
    ].textContent = "";
    document.getElementById("grid").children[4].textContent = "B";
    this.setState({
      ...this.state,
      x: 2,
      y: 2,
      youMoved: 0,
      currentIdx: 4,
      errorMessage: "",
      stepMessage: "You moved 0 times",
      grid: ['','','','','B','','','',''],
      email: "",

    });
  };

//submit email required
handleSubmit = (e) => {
  e.preventDefault();
  if (this.state.email === "") {
    this.setState({
      ...this.state,
      errorMessage: 'Ouch: email is required',
    });
    return;
  }

  axios 
  .post(url, {
    email: this.state.email.toString(),
    steps: this.state.youMoved,
    x: this.state.x,
    y: this.state.y,
  })
  .then((res) => {

    this.setState({
      ...this.state,
      email:"",
      errorMessage: res.data.message,
    });
  })
  .catch((error) => {
    if(error.message === 'lady win #49') {
      this.setState({
        ...this.state,
        email:"",
      errorMessage: 'foo@bar.baz failure #71'
      });

    } else {
      this.setState({
        ...this.state,
        email:"",
        errorMessage: 'Ouch: email is required',
      });
    }

  });
};






  render() {
    const { className } = this.props
    return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">{`Coordinates (${this.state.x} ${this.state.y})`} </h3>
          <h3 id="steps">{`You moved ${this.state.youMoved} times`}</h3>
        </div>
        <div id="grid">
          {this.state.grid.map((value, idx) => (
            <div key={idx} className="square">
              {value}
              
              </div>
          ))}
        </div>
        <div className="info">
          <h3 id="message"> {[this.state.errorMessage]}</h3>
        </div>
        <div id="keypad">
          <button onClick={this.handleDirectionalInput} id="left">
            LEFT
            </button>
          <button onClick={this.handleDirectionalInput}id="up">
            UP
            </button>
          <button onClick={this.handleDirectionalInput}id="right">
            RIGHT
            </button>
          <button onClick={this.handleDirectionalInput}id="down">
            DOWN
            </button>
          <button onClick={this.handleReset} id="reset">
            reset
            </button>
        </div>
        <form>
          <input 
          id="email" 
          type="email" 
          placeholder="type email"
          value={this.state.email}
          onChange={this.handleInput}
          ></input>
          <input id="submit" type="submit" onClick={this.handleSubmit}></input>
        </form>
      </div>
    );
  }
}
