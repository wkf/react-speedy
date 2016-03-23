import React from 'react';

export class Question extends React.Component {
  render() {
    const number = this.props.number;
    const question = this.props.store.get().questions[number];
    const options = question.options.map((o, i) => {
      return (
        <span key={i}>
          <input
              type="radio"
              name="question"
              value={o}
              checked={question.selected === o}
              onChange={this.onChange.bind(this, number)}
          />
          <label htmlFor={o}>{o}</label>
        </span>
      );
    });

    return (
      <div>
        <h4>{question.title}</h4>
        <form>{options}</form>
      </div>
    );
  }

  onChange(n, e) {
    // TODO: break out spec into another function describing a state change?
    this.props.store.update({questions: {[n]: {selected: {$set: e.target.value}}}});
  }
}
