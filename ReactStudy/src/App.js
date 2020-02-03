import React, { Component } from "react";
import "./App.css";
import Person from "./Person/Person";

// Functional Component
// const App = () => {
//   const [personsState, setPersonsState] = useState({
//     persons: [
//       { name: 'Eric', age: 1 },
//       { name: 'Carol', age: 2 },
//       { name: 'Danny', age: 3 }
//     ]
//   });

//   const [otherState, setOtherState] = useState('some other value');

//   console.log(personsState, otherState);

//   const switchNameHandler = () => {
//     setPersonsState({
//       persons: [
//         { name: 'Eric Song', age: 2 },
//         { name: 'Carol', age: 3 },
//         { name: 'Danny', age: 4 }
//       ],
//       otherState: personsState.otherState
//     });
//   }

//   return (
//     <div className="App">
//       <h1>Hi, I'm a React App</h1>
//       <p>This is really working!</p>
//       <button onClick={switchNameHandler}>Switch Name</button>
//       <Person name={personsState.persons[0].name} age={personsState.persons[0].age}>
//       <Person name={personsState.persons[1].name} age={personsState.persons[1].age} />
//         My Hobbies: Loving Eric
//       </Person>
//       <Person name={personsState.persons[2].name} age={personsState.persons[2].age} />
//     </div>
//   );
// };

// Class Component
class App extends Component {
  state = {
    persons: [
      { name: "Eric", age: 1 },
      { name: "Carol", age: 2 },
      { name: "Danny", age: 3 }
    ],
    otherState: "some other value",
    showPersons: false
  };

  switchNameHandler = newName => {
    // console.log('Was clicked!');
    this.setState({
      persons: [
        { name: newName, age: 2 },
        { name: "Carol Kim", age: 3 },
        { name: "Danny Lee", age: 4 }
      ]
    });
  };

  nameChangeHandler = event => {
    this.setState({
      persons: [
        { name: event.target.value, age: 2 },
        { name: "Carol", age: 3 },
        { name: "Danny", age: 4 }
      ]
    });
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  };

  render() {
    const style = {
      backgroundColor: "white",
      font: "inherit",
      border: "1px solid blue",
      padding: "8px",
      cursor: "pointer"
    };

    return (
      <div className="App">
        <h1>Hi, I'm a React App</h1>
        <p>This is really working!</p>
        <button style={style} onClick={this.togglePersonsHandler}>
          Switch Name
        </button>
        { 
          this.state.showPersons === true ? 
          <div>
            <Person
              name={this.state.persons[0].name}
              age={this.state.persons[0].age}
              changed={this.nameChangeHandler}
            />
            <Person
              name={this.state.persons[1].name}
              age={this.state.persons[1].age}
              click={this.switchNameHandler.bind(this, "Song!")}
            >
              My hobby is loving Eric.
            </Person>
            <Person
              name={this.state.persons[2].name}
              age={this.state.persons[2].age}
            />
          </div> : null
        }
      </div>
    );
  }
}

export default App;
