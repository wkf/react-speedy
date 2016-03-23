import React from 'react';
import update from 'react-addons-update';

import {Workflow} from './workflow';
import {UrlFormStep} from './url-form-step';
import {QuestionStep} from './question-step';
import {WaitingStep} from './waiting-step';
import {ResultsStep} from './results-step';

const SEED = {
  step: 0,
  url: "",
  questions: [
    {
      title: 'Is the site static?',
      options: ['Yes', 'No', 'Not Sure'],
      selected: null
    },
    {
      title: 'Is the site mode with any of these tools?',
      options: ['Wordpress', 'Drupal', 'Joomla', 'Xpress', 'Rails', 'Other', 'Not Sure'],
      selected: null
    }
  ],
  ourResults: {
    dnsTime: '100ms',
    connectionTime: '100ms',
    timeToFirstByte: '100ms',
    downloadTime: '1000ms',
    usesHttps: true,
    httpsTime: '10ms',
    usesSecureCipher: true,
    usesSecureAlgorithm: true
  },
  theirResults: {
    dnsTime: '1000ms',
    connectionTime: '1000ms',
    timeToFirstByte: '1000ms',
    downloadTime: '10000ms',
    usesHttps: true,
    httpsTime: '100ms',
    usesSecureCipher: false,
    usesSecureAlgorithm: false
  }
};


export class Speedy extends React.Component {
  constructor(props) {
    super(props);
    this.state = SEED;
    this.store = {
      get: this.getState.bind(this),
      update: this.updateState.bind(this)
    };
  }

  render() {
    return (
      <Workflow store={this.store}>
        <UrlFormStep key="url-form" store={this.store}/>
        <QuestionStep key="question-0" store={this.store} number={0}/>
        <QuestionStep key="question-1" store={this.store} number={1}/>
        <WaitingStep key="awaiting-results" store={this.store}/>
        <ResultsStep key="displaying-results" store={this.store}/>
      </Workflow>
    );
  }

  getState() {
    return this.state;
  }

  updateState(m) {
    this.setState(update(this.state, m));
    return this.state;
  }

}
