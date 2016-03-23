import React from 'react';

const gotoStep = ({store}, n) =>
  store.update({step: {$set: n}});

const prevStep = ({store}) =>
  store.get().step > 0 && gotoStep({store}, store.get().step - 1);

const nextStep = ({store, children}) =>
  store.get().step < (children.length - 1) && gotoStep({store}, store.get().step + 1);

const Workflow = (props) => (
  <div>
    {React.cloneElement(
       props.children[props.store.get().step], {
         gotoStep: gotoStep.bind(null, props),
         prevStep: prevStep.bind(null, props),
         nextStep: nextStep.bind(null, props)
       })}
  </div>
);

export default Workflow;
