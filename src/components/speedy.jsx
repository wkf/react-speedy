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
    dnsTime: 4,
    connectionTime: 2,
    timeToFirstByte: 2,
    downloadTime: 700,
    usesHttps: true,
    usesHttp2: true,
    httpsTime: 2,
    usesSecureCipher: true,
    usesSecureAlgorithm: true
  },
  theirResults: {
    dnsTime: 1000,
    connectionTime: 1000,
    timeToFirstByte: 1000,
    downloadTime: 10000,
    usesHttps: true,
    httpsTime: 100,
    usesSecureCipher: false,
    usesSecureAlgorithm: false
  },

  visiblePopoverId: null,

  resultsLoaded: false,
  apiError: null
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
