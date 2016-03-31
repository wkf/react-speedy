import React from 'react';
import update from 'react-addons-update';
import SpeedyWorkflow from './speedy-workflow';

const SEED = {
  step: 0,
  url: "",
  questions: [
    {
      title: 'Is your site static?',
      options: ['Yes', 'No', 'Not Sure'],
      selected: null
    },
    {
      title: 'Is your site mode with any of these tools?',
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

export default class Speedy extends React.Component {
  constructor(props) {
    super(props);
    this.state = SEED;
    this.store = {
      get: this.getState.bind(this),
      update: this.updateState.bind(this)
    };
  }

  getState() {
    return this.state;
  }

  updateState(spec) {
    this.setState(update(this.state, spec));
    return this.state;
  }

  render() {
    return <SpeedyWorkflow store={this.store}/>;
  }
}
