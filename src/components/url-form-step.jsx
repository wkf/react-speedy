import React from 'react';

export class UrlFormStep extends React.Component {
  render() {
    return (
      <div>
        <h2>Test your current site and see how much faster it can be!</h2>
        <input type="text" value={this.props.store.get().url} onChange={this.onChange.bind(this)}/>
        <button type="button" onClick={this.go.bind(this)}>go</button>
      </div>
    );
  }

  go() {
    // TODO: actually make a request?
    this.props.nextStep();
  }

  onChange(e) {
    this.props.get().update({url: {$set: e.target.value}});
  }
}
