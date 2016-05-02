import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {Router, Route, browserHistory} from 'react-router';
import {syncHistoryWithStore} from 'react-router-redux';
import makeStore from './store';
import Speedtest from './containers/speedtest';
import './styles/site.scss';

const store = makeStore();
const history = syncHistoryWithStore(browserHistory, store);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/speedtest" component={Speedtest}>
        <Route path=":id" component={Speedtest}/>
      </Route>
    </Router>
  </Provider>,
  document.getElementsByClassName('js-speedy')[0]);
