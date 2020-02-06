import React, { Component } from 'react';
import Validation from './Validation/Validation';
import Char from './Char/Char';

class App extends Component {
  state = {
    userInput: ''
  };

  inputChangeHandler = (e) => {
    this.setState({ 
      userInput: e.target.value
    });
  };

  deleteCharHandler = (index) => {
    const text = this.state.userInput.split('');
    text.splice(index, 1);
    const updatedText = text.join('');
    this.setState({ userInput: updatedText });
  };

  render() {
    const charList = this.state.userInput.split('').map((ch, index) => {
      return <Char 
        char={ch} 
        clicked={() => this.deleteCharHandler(index)} 
        key={index} />
    });

    return(
      <div className="App">
        <input 
          type="text" 
          onChange={this.inputChangeHandler} 
          value={this.state.userInput} 
        />
        <p>{this.state.userInput}</p>
        <Validation inputLength={this.state.userInput.length} />
        {charList}
      </div>
    );
  };
};

export default App;
