import React from 'react';
import fishRequests from '../../firebaseRequests/fishes';
import Fish from '../Fish/Fish';

import './Inventory.css';

class Inventory extends React.Component {
  state = {
    fishes : []
  }
  componentDidMount () {
    fishRequests
      .getRequest()
      .then((fishes) => {
        this.setState({fishes: fishes}); //({fishes}) object shorthand notation
      })
      .catch((err) => {
        console.error('error with fish get request', err);
      })
  }

  render () {
    const fishComponets = this.state.fishes.map((fish) => {
      return (
        <Fish 
          key={fish.id}
          details= {fish}
        />
      );
    });
    return (
      <div className="Inventory">
      <h1>Inventory</h1>
      <ul className = "fishes">
      {fishComponets}
      </ul>
      </div>
    );
  }
}

export default Inventory;
