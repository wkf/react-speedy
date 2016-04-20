import React from 'react';
import {connect} from 'react-redux';
import {gotoWorkflowStep} from '../actions/workflow';

const onFirstStep = ({}, step) =>
  step <= 0;

const onLastStep = ({children}, step) =>
  (step + 1) >= children.length;

const shouldShowStep = ({children}, step) =>
  console.log(children, step, children[step]) || children[step].props.show !== false;

const prevStep = (props, skip = 1) => {
  const step = props.step || 0;

  if(onFirstStep(props, step)) {
    throw new Error("Workflow Error - prevStep called on first step.");
  } else if (shouldShowStep(props, step - skip)) {
    props.gotoStep(step - skip);
  } else {
    prevStep(props, skip + 1);
  }
};

const nextStep = (props, skip = 1) => {
  const step = props.step || 0;

  if (onLastStep(props, step)) {
    throw new Error("Workflow Error - nextStep called on last step.");
  } else if (shouldShowStep(props, step + skip)) {
    props.gotoStep(step + skip);
  } else {
    nextStep(props, skip + 1);
  };
};

const Workflow = (props) =>
  React.cloneElement(
    props.children[props.step || 0], {
      prevStep: prevStep.bind(null, props),
      nextStep: nextStep.bind(null, props)
    }) ;

const mapStateToProps = ({workflow}) => ({
  step: workflow.step
});

const mapDispatchToProps = (dispatch) => ({
  gotoStep: step => dispatch(gotoWorkflowStep(step))
});

export default connect(mapStateToProps, mapDispatchToProps)(Workflow);
