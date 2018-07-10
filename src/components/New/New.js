import React from 'react';
import Fish from '../Fish/Fish';
import Order from '../Order/Order';

import fishRequests from '../../firebaseRequests/fishes';

import './New.css';

class New extends React.Component {
  state = {
    fishes: [],
    order: {},
  };

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
      <div className="New">
      <div className="col-xs-8 inventory-container">
      <h2>Inventory</h2>
      <ul className="fishes">
        {fishComponets}
       </ul>
       </div>
       <Order />
      </div>
    );
  }
}

export default New;
