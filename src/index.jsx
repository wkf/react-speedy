import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import Store from './store';
import Speedtest from './containers/speedtest';
import './styles/site.scss';

ReactDOM.render(
  <Provider store={Store()}>
    <Speedtest/>
  </Provider>,
  document.getElementsByClassName('js-speedy')[0]);
