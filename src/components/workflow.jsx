import React from 'react';

const onFirstStep = ({store}) =>
  store.get().step <= 0;

const onLastStep = ({store, children}) =>
  (store.get().step + 1) >= children.length;

const shouldShowStep = ({store, children}, step) =>
  !children[step].props.shouldShow || children[step].props.shouldShow({store});

const gotoStep = ({store}, n) =>
  store.update({step: {$set: n}});

const prevStep = (props, skip = 1) => {
  const step = props.store.get().step;

  if(onFirstStep(props)) {
    throw new Error("Workflow Error - prevStep called on first step.");
  } else if (shouldShowStep(props, step - skip)) {
    gotoStep(props, step - skip);
  } else {
    prevStep(props, skip + 1);
  }
};

const nextStep = (props, skip = 1) => {
  const step = props.store.get().step;

  if (onLastStep(props)) {
    throw new Error("Workflow Error - nextStep called on last step.");
  } else if (shouldShowStep(props, step + skip)) {
    gotoStep(props, step + skip);
  } else {
    nextStep(props, skip + 1);
  };
};

const Workflow = (props) =>
  React.cloneElement(
    props.children[props.store.get().step], {
      gotoStep: gotoStep.bind(null, props),
      prevStep: prevStep.bind(null, props),
      nextStep: nextStep.bind(null, props)
    }) ;

export default Workflow;
