import React, { PureComponent } from "react";
import Person from "./Person/Person";

class Persons extends PureComponent {
  // LifeCycle - update : 1. getDerivedStateFromProps
  // static getDerivedStateFromProps(props, state) {
  //   console.log('[Persons.js] getDerivedStateFromProps');

  //   return state;
  // };

  // LifeCycle - update : 2. shouldComponentUpdate
  // shouldComponentUpdate(nextProps, nextStat) {
  //   console.log('[Persons.js] shouldComponentUpdate');
    
  //   if (
  //     nextProps.persons !== this.props.persons || 
  //     nextProps.changed !== this.props.changed || 
  //     nextProps.clicked !== this.props.clicked
  //   ) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // };

  // LifeCycle - update : 5. getSnapshotBeforeUpdate
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log('[Persons.js] getSnapshotBeforeUpdate');

    return { message: 'Snapshot!' };
  };

  // LifeCycle - update : 6. componentDidUpdate
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log('[Persons.js] componentDidUpdate');
    console.log(snapshot);
  };

  // LifeCycle - cleanup: componentWillUnmount
  componentWillUnmount() {
    console.log('[Persons.js] componentWillUnmount');
  };

  // LifeCycle - update : 3. render
  render() {
    console.log("[Persons.js] rendering...");
    return this.props.persons.map((person, index) => {
      return (
        // LifeCycle - update : 4. Update child component Props
        <Person
          click={() => this.props.clicked(index)}
          name={person.name}
          age={person.age}
          key={person.id}
          changed={event => this.props.changed(event, person.id)}
        />
      );
    });
  }
}

export default Persons;
