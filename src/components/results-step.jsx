import React from 'react';
import Loader from 'react-loader';
import {ResultsTable} from './results-table';

export class ResultsStep extends React.Component {
  render() {
    return (
      <div>
        <h2>{this.props.store.get().url}</h2>
        <h3>Results</h3>
        <ResultsTable store={this.props.store}/>
        <button type="button" onClick={this.props.prevStep}>prev</button>
        <button type="button" onClick={this.props.nextStep}>next</button>
      </div>
    );
  }
}
