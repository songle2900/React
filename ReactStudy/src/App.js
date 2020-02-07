import React, { Component } from "react";
import "./App.css";
// StyleRoot
import Radium, { StyleRoot } from "radium";
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
      { id: "E", name: "Eric", age: 1 },
      { id: "C", name: "Carol", age: 2 },
      { id: "D", name: "Danny", age: 3 }
    ],
    otherState: "some other value",
    showPersons: false
  };

  nameChangeHandler = (e, id) => {
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });

    const person = {
      ...this.state.persons[personIndex]
    };
    // const person = Object.assign({}, this.state.person[personIndex]);

    person.name = e.target.value;

    const persons = [...this.state.persons];
    persons[personIndex] = person;

    this.setState({ persons: persons });
  };

  deletePersonHandler = personIndex => {
    // const persons = this.state.persons.slice();
    const persons = [...this.state.persons];
    persons.splice(personIndex, 1);
    this.setState({ persons: persons });
  };

  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({ showPersons: !doesShow });
  };

  render() {
    const style = {
      backgroundColor: "green",
      color: "white",
      font: "inherit",
      border: "1px solid blue",
      padding: "8px",
      cursor: "pointer",
      // Using Radium
      ":hover": {
        backgroundColor: "lightgreen",
        color: "black"
      }
    };

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, index) => {
            return (
              <Person
                click={() => this.deletePersonHandler(index)}
                name={person.name}
                age={person.age}
                key={person.id}
                changed={e => this.nameChangeHandler(e, person.id)}
              />
            );
          })}
        </div>
      );

      style.backgroundColor = "red";
      // Using Radium
      style[":hover"] = {
        backgroundColor: "salmon",
        color: "black"
      };
    }

    // Setting className dynamically
    // let classes = ['red', 'bold'].join(' '); // red bold
    const classes = [];

    if (this.state.persons.length <= 2) {
      classes.push("red"); // classes = ['red']
    }

    if (this.state.persons.length <= 1) {
      classes.push("bold"); // classes = ['red', 'bold']
    }

    return (
      <StyleRoot>
        <div className="App">
          <h1>Hi, I'm a React App</h1>
          <p className={classes.join(" ")}>This is really working!</p>
          <button style={style} onClick={this.togglePersonsHandler}>
            Toggle Persons
          </button>
          {persons}
        </div>
      </StyleRoot>
    );
  }
}

export default Radium(App);
