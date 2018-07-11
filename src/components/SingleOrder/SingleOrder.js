import React from 'react';
import moment from 'moment';

import orderRequests from '../../firebaseRequests/orders';
import fishRequests from '../../firebaseRequests/fishes';

// import formatPrice from '../../helpers';

import './SingleOrder.css';

class SingleOrder extends React.Component {
  state = {
    order: {},
    fish: []
  }

  componentDidMount () {
    const firebaseId = this.props.match.params.id;
    orderRequests
     .getSingleRequest(firebaseId)
     .then((order) => {
       this.setState({order});
       fishRequests
        .getRequest()
        .then((fishes) => {
          this.setState({fishes});
        });
     })
     .catch(((err) => {
     console.error('error with get single request', err);
     }))
  }
  deleteOrderClick = () => {
    const firebaseId = this.props.match.params.id;
    orderRequests
      .deleteRequest(firebaseId)
      .then(() => {
        this.props.history.push('/orders');
      })
      .catch(((err) => {
        console.error('error with get delete request', err);
      }));
  }

  render () {
    const {order} = this.state;
    const orderNumber = this.props.match.params.id;

    return (
      <div className="SingleOrder col-xs-12 text-center">
        <h2>Order Number: {orderNumber}</h2>
        <h4>Order Date:{moment(order.dateTime).format('LLL')}</h4>
        <div className="row fishes">
          <div className="col-xs-8 col-xs-offset-2">
            {/* <ul>{fishComponents}</ul> */}
          </div>
        </div>
        <div className="row">
          <div className="col-xs-8 col-xs-offset-2 totals">
            <h3>
              Total Cost: <strong></strong>
            </h3>
          </div>
        </div>
        <div>
          <div className="col-xs-6">
            <button className="col-xs-12 btn btn-default">
              Update Order
            </button>
          </div>
          <div className="col-xs-6">
            <button className="col-xs-12 btn btn-danger" onClick={this.deleteOrderClick}>
              Delete Order
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default SingleOrder;