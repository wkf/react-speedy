import React from 'react';
import Loader from 'react-loader';

export class WaitingStep extends React.Component {
  render() {
    return (
      <div>
        <h2>{this.props.store.get().url}</h2>
        <Loader loaded={false}/>
        <h2>waiting for results</h2>
        <button type="button" onClick={this.props.prevStep}>prev</button>
        <button type="button" onClick={this.props.nextStep}>next</button>
      </div>
    );
  }
}
