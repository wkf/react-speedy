import React from 'react';

export class Workflow extends React.Component {
  render() {
    console.log(this.props.store.get().step);
    return (
      <div>
        {React.cloneElement(
           this.props.children[this.props.store.get().step],
           {
             gotoStep: this.gotoStep.bind(this),
             prevStep: this.prevStep.bind(this),
             nextStep: this.nextStep.bind(this)
           }
         )}
      </div>
    );
  }

  gotoStep(n) {
    this.props.store.update({step: {$set: n}});
  }

  prevStep() {
    const step = this.props.store.get().step;
    step > 0 && this.gotoStep(step - 1);
  }

  nextStep() {
    const step = this.props.store.get().step;
    step < (this.props.children.length - 1) && this.gotoStep(step + 1);
  }
}
