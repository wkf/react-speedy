import React from 'react';
import Loader from 'react-loader';
import {Question} from './question';

export class QuestionStep extends React.Component {
  render() {
    return (
      <div>
        <h2>{this.props.store.get().url}</h2>
        <Loader loaded={false}/>
        <Question store={this.props.store} number={this.props.number}/>
        <button type="button" onClick={this.props.prevStep}>prev</button>
        <button type="button" onClick={this.props.nextStep}>next</button>
      </div>
    );
  }
}
