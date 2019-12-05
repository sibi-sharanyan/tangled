import React, { Component } from "react";
import axios from "axios";
import Tile from "./Tile";
import Box from "./Box";
import Button from "./Button";
import Swal from 'sweetalert2'

import ReactLoading from "react-loading";
import { Line, Circle } from 'rc-progress';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.currentSequence = {};

    this.state = {
      
      levelno: -1,
      isLoading: true
    };
  }

  componentDidMount() {
    this.nextWord();
  }

  onSubmit = () => {
    var isCorrect = true;
    for (var i = 0; i < this.state.word.length; i++) {
      if (this.currentSequence[i] !== this.state.word[i]) {
        isCorrect = false;
      }
    }
    if (isCorrect) {
 this.nextWord();
    } else {
     
      this.setState({wrong: true});
      setTimeout(() => {
        this.setState({wrong: false})
      } , 150 );
      // this.nextWord();
    }
  };

  componentDidUpdate = () => {
    if(this.state.time < 0 && this.state.isLoading !== true) 
    {
      
      clearInterval(this.timer);
    
      Swal.fire({
        title: `<h1> You Scored ${this.state.levelno} Points!  </h1>` ,
        text: "",
        icon: 'error',
        showCancelButton: false,
        confirmButtonColor: 'Green',
        confirmButtonText: "<h1>Restart</h1>",
        width: '50rem',
        padding: '4rem' ,
        allowOutsideClick: false,
        allowEscapeKey: false,
        
      }).then((result) => {
        if (result.value) {
          this.nextWord(true);
        }
      })
      
      
    }
  }

  nextWord = (isNew) => {
    if(isNew) {
      clearInterval(this.timer);
      this.setState({ isLoading: true  });
      axios.get("https://tangledup-backend.herokuapp.com/randomword").then(response => {
        console.log(response);
        this.currentSequence = {};
        this.setState({
          levelno: 1,
          img: response.data.img,
          word: response.data.word,
          jumbled: response.data.jumbled,
          imgLink: response.data.imgLink,
          user: response.data.user,
          userLink: response.data.userLink,
          isLoading: false,
          time: response.data.word.length * 3,
          fullTime: response.data.word.length * 3
        });
       this.timer = setInterval(() => {
          this.setState({ time: this.state.time - 1 });
        }, 1000);
      });

    }else {
      clearInterval(this.timer);
      this.setState({ isLoading: true });
      axios.get("https://tangledup-backend.herokuapp.com/randomword").then(response => {
        console.log(response);
        this.currentSequence = {};
        this.setState({
          levelno: this.state.levelno + 1,
          img: response.data.img,
          word: response.data.word,
          jumbled: response.data.jumbled,
          imgLink: response.data.imgLink,
          user: response.data.user,
          userLink: response.data.userLink,
          isLoading: false,
          time: response.data.word.length *3,
          fullTime: response.data.word.length * 3
        });
       this.timer = setInterval(() => {
          this.setState({ time: this.state.time - 1 });
        }, 1000);
      });
    }


   

  };

  onDrop = (boxno, letter) => {
    console.log(boxno, letter);
    var myObj = this.currentSequence;
    myObj[boxno] = letter;
    this.currentSequence = myObj;
    console.log(myObj);
  };

  render() {
    if (this.state.isLoading === true) {
      return (
        <div className="container">
        <ReactLoading type="bars" color="green" height={667} width={375} />
        </div>
      );
    } else {
      return (
        <div>
          <div className="container" style = {{border: this.state.wrong ?  "1rem solid red" : "1rem solid white"}}>

          <Line style = {{marginLeft : "2rem" , marginRight: "2rem"}} percent={(this.state.time / this.state.fullTime) * 100} strokeWidth="1" strokeColor="green" />

     
            <a href={this.state.imgLink}>
              {" "}
              <img
                className="mainimg"
                src={this.state.img}
                alt="Not loaded"
              />{" "}
            </a>
            <h2>
              {`Photo by `} <a href={this.state.userLink}>{this.state.user}</a>{" "}
              {` on `} <a href="https://unsplash.com/">Unsplash</a>{" "}
            </h2>
            <div className="boxes">
              {this.state.word.split("").map((word, i) => {
                return (
                  <Box
                    key={i}
                    onDrop={this.onDrop}
                    boxno={i}
                    levelno={this.state.levelno}
                  >
                    {" "}
                  </Box>
                );
              })}
            </div>

            <div className="boxes">
              {this.state.jumbled.split("").map((word, i) => {
                return (
                  <Tile key={i} letter={word} levelno={this.state.levelno}>
                    {" "}
                  </Tile>
                );
              })}
            </div>

            <Button pressed={this.onSubmit} />
          </div>
        </div>
      );
    }
  }
}
