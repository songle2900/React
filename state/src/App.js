import React, { Component } from "react";
import "./App.css";
import Person from "./Person/Person";

// Functional Component
// const App = () => {
//   return (
//     <div className="App">
//       <h1>Hi, I'm a React App</h1>
//       <p>This is really working!</p>
//       <button>Switch Name</button>
//       <Person name="Eric" age="29" />
//       <Person name="Carol" age="32">My hoppy is loving Eric.</Person>
//       <Person name="Danny" age="30" />
//     </div>
//   );

//   // Alternative way
//     // return React.createElement('div', {className: 'App'}, React.createElement('h1', null, 'Hi, I\'m a React App'));
// };

// Class Component
class App extends Component {
  state = {
    persons: [
      { name: 'Eric', age: 29 },
      { name: 'Carol', age: 32 },
      { name: 'Danny', age: 30 }
    ],
    otherState: 'some other value'
  };

  switchNameHandler = () => {
    // console.log('Was clicked!');
    this.setState({
      persons: [
        { name: 'Eric Song', age: 29 },
        { name: 'Carol Kim', age: 32 },
        { name: 'Danny Lee', age: 30 }
      ] 
    });
  };

  render() {
    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>This is really working!</p>
        <button onClick={this.switchNameHandler}>Switch Name</button>
        <Person name={this.state.persons[0].name} age={this.state.persons[0].age} />
        <Person name={this.state.persons[1].name} age={this.state.persons[1].age}>
          My hoppy is loving Eric.
        </Person>
        <Person name={this.state.persons[2].name} age={this.state.persons[2].age} />
      </div>
    );
  };
};

export default App;
